const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const SOURCE_PARTS = ['part01.md','part02.md','part03.md','part04.md','part05.md','part06.md'];
const BASENAME = 'PRD_CRM_AI_Tender_BUMN_Konstruksi_v3';

function readSource() {
  return SOURCE_PARTS.map((name) => fs.readFileSync(path.join(process.cwd(), 'src', 'prd', name), 'utf8')).join('');
}

function normalizeLine(line) {
  return line
    .replace(/^\|\s*/,'')
    .replace(/\s*\|$/,'')
    .replace(/\s*\|\s*/g,'  |  ')
    .replace(/\\\|/g,'|')
    .trim();
}

function sourceLines() {
  return readSource().split(/\r?\n/).filter((line, i, arr) => {
    const t = line.trim();
    if (!t) return i === 0 || (arr[i-1] && arr[i-1].trim());
    if (/^\|?\s*---(?:\s*\|\s*---)*\s*\|?$/.test(t)) return false;
    return true;
  });
}

function makeDocxParagraph(line) {
  const t = line.trim();
  if (!t) return new Paragraph({ text: '' });
  if (t.startsWith('### ')) return new Paragraph({ text: t.slice(4), heading: HeadingLevel.HEADING_3, spacing: { before: 180, after: 80 } });
  if (t.startsWith('## ')) return new Paragraph({ text: t.slice(3), heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 100 } });
  if (t.startsWith('# ')) return new Paragraph({ text: t.slice(2), heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 120 } });
  if (/^\d+\.\s+/.test(t)) return new Paragraph({ children: [new TextRun({ text: t, size: 20 })], spacing: { after: 90 } });
  if (t.startsWith('|')) return new Paragraph({ children: [new TextRun({ text: normalizeLine(t), font: 'Aptos', size: 18 })], shading: { fill: 'F3F7F4' }, spacing: { after: 55 } });
  if (/^(BR-|FR-|US-)/.test(t) || /^(Tujuan epic:|Persona utama:|Skenario:|Fitur inti:|Fitur AI:|Output utama:|Acceptance criteria)/.test(t)) {
    return new Paragraph({ children: [new TextRun({ text: t, bold: /^(BR-|FR-|US-|Tujuan epic:|Persona utama:|Fitur inti:|Fitur AI:|Output utama:|Acceptance criteria)/.test(t), size: 20 })], spacing: { after: 80 } });
  }
  return new Paragraph({ children: [new TextRun({ text: t, size: 20 })], spacing: { after: 90 }, lineSpacing: 276 });
}

async function buildDocx() {
  const lines = sourceLines();
  const body = [
    new Paragraph({ children: [new TextRun({ text: 'PRODUCT REQUIREMENTS DOCUMENT', bold: true, color: '145C3A', size: 20 })], spacing: { after: 100 } }),
    new Paragraph({ children: [new TextRun({ text: 'CRM Berbasis AI untuk Manajemen Tender BUMN Konstruksi', bold: true, color: '145C3A', size: 34 })], spacing: { after: 100 } }),
    new Paragraph({ children: [new TextRun({ text: 'V3.0 - Final Draft untuk Technical Assessment', bold: true, size: 22 })], spacing: { after: 260 } }),
    ...lines.slice(5).map(makeDocxParagraph),
  ];
  const doc = new Document({ sections: [{ properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } }, children: body }] });
  return Packer.toBuffer(doc);
}

function buildPdf() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 54, bottom: 54, left: 54, right: 54 }, bufferPages: true, info: { Title: 'PRD CRM AI Tender BUMN Konstruksi V3', Author: 'Eko Prasetyo Pratomo', Subject: 'Nodewave Technical Assessment' } });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const green = '#145C3A';
    doc.fillColor(green).font('Helvetica-Bold').fontSize(10).text('PRODUCT REQUIREMENTS DOCUMENT');
    doc.moveDown(0.6).fontSize(23).text('CRM Berbasis AI untuk Manajemen Tender BUMN Konstruksi', { lineGap: 2 });
    doc.moveDown(0.35).fillColor('#17231C').fontSize(11).text('V3.0 - Final Draft untuk Technical Assessment');
    doc.moveDown(1.0);

    for (const raw of sourceLines().slice(5)) {
      const t = raw.trim();
      if (!t) { doc.moveDown(0.35); continue; }
      if (t.startsWith('# ')) { doc.moveDown(0.6).fillColor(green).font('Helvetica-Bold').fontSize(16).text(t.slice(2)); doc.moveDown(0.25); continue; }
      if (t.startsWith('## ')) { doc.moveDown(0.45).fillColor(green).font('Helvetica-Bold').fontSize(13).text(t.slice(3)); doc.moveDown(0.2); continue; }
      if (t.startsWith('### ')) { doc.moveDown(0.3).fillColor(green).font('Helvetica-Bold').fontSize(11.5).text(t.slice(4)); doc.moveDown(0.15); continue; }
      const line = t.startsWith('|') ? normalizeLine(t) : t;
      const strong = /^(BR-|FR-|US-|Tujuan epic:|Persona utama:|Fitur inti:|Fitur AI:|Output utama:|Acceptance criteria)/.test(line);
      doc.fillColor('#17231C').font(strong ? 'Helvetica-Bold' : 'Helvetica').fontSize(t.startsWith('|') ? 8.5 : 9.2).text(line.replace(/[–—]/g,'-').replace(/→/g,'->').replace(/≥/g,'>='), { lineGap: 2, paragraphGap: 4 });
    }

    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.font('Helvetica').fontSize(8).fillColor('#6B746F').text(`PRD - CRM AI Tender BUMN Konstruksi - v3.0`, 54, 806, { align: 'left', width: 360 });
      doc.text(`Halaman ${i + 1}`, 414, 806, { align: 'right', width: 128 });
    }
    doc.end();
  });
}

module.exports = async (req, res) => {
  try {
    const format = String(req.query.format || '').toLowerCase();
    if (format === 'docx') {
      const buffer = await buildDocx();
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${BASENAME}.docx"`);
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      return res.status(200).send(buffer);
    }
    if (format === 'pdf') {
      const buffer = await buildPdf();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${BASENAME}.pdf"`);
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      return res.status(200).send(buffer);
    }
    res.status(400).json({ error: 'Use ?format=pdf or ?format=docx' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate PRD file.' });
  }
};
