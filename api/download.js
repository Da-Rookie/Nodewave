const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, VerticalAlign, Header, Footer,
  PageNumber, TextDirection
} = require('docx');

const SOURCE_PARTS = ['part01.md','part02.md','part03.md','part04.md','part05.md','part06.md'];
const BASENAME = 'PRD_CRM_AI_Tender_BUMN_Konstruksi_v3';
const GREEN = '1F5A45';
const LIGHT_GREEN = 'E7F0EB';
const DARK = '17362B';
const GRAY = '666666';

function normalizeSource(source) {
  let s = source;
  s = s.replace('V3.0 - Final Draft untuk Technical Assessment', 'V3.0 - Final Draft');
  s = s.replace('| Versi | 3.0 - Final Draft untuk review sebelum UI Prototype V3 |', '| Versi | 3.0 - Final Draft |');
  s = s.replace('| Status penggunaan | Acuan technical assessment. Siap direview oleh Product, Engineering, UI/UX, dan QA. |', '| Status penggunaan | Acuan pengembangan untuk technical assessment. Requirement, acceptance criteria, dan skenario QA pada dokumen ini menjadi baseline implementasi V3. |');
  s = s.replace(/\n\| UI Prototype V3 \|[^\n]+\|\n/, '\n');

  const changeStart = s.indexOf('| Perubahan fundamental dari V2');
  const sourceStart = s.indexOf('# 0. Dasar Dokumen dan Source Hierarchy');
  const productStart = s.indexOf('# 1. Ringkasan Produk');
  const backgroundStart = s.indexOf('# 2. Latar Belakang dan Pernyataan Masalah');
  if (changeStart >= 0 && sourceStart > changeStart && productStart > sourceStart && backgroundStart > productStart) {
    let sourceBlock = s.slice(sourceStart, productStart).replace('# 0. Dasar Dokumen dan Source Hierarchy', '## 1.1 Asal Informasi dalam PRD').trim();
    const productBlock = s.slice(productStart, backgroundStart).trim();
    s = s.slice(0, changeStart).trimEnd() + '\n\n' + productBlock + '\n\n' + sourceBlock + '\n\n' + s.slice(backgroundStart);
  }
  return s;
}

function readSource() {
  const raw = SOURCE_PARTS.map((name) => fs.readFileSync(path.join(process.cwd(), 'src', 'prd', name), 'utf8')).join('');
  return normalizeSource(raw);
}

function cleanCell(s) {
  return String(s || '').replace(/\\\|/g, '|').replace(/\s+/g, ' ').trim();
}

function splitTableRow(line) {
  const t = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return t.split(/(?<!\\)\|/).map(cleanCell);
}

function isSeparatorRow(cells) {
  return cells.length && cells.every((c) => /^:?-{3,}:?$/.test(c.replace(/\s/g, '')));
}

function parseBlocks(source) {
  const lines = source.replace(/\r/g, '').split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const raw = lines[i];
    const t = raw.trim();
    if (!t) { i++; continue; }

    if (t.startsWith('|')) {
      const rows = [];
      while (i < lines.length) {
        const x = lines[i].trim();
        if (!x) { i++; continue; }
        if (!x.startsWith('|')) break;
        const cells = splitTableRow(x);
        if (!isSeparatorRow(cells)) rows.push(cells);
        i++;
      }
      if (rows.length) blocks.push({ type: rows[0].length === 1 ? 'callout' : 'table', rows });
      continue;
    }

    const hm = t.match(/^(#{1,3})\s+(.+)$/);
    if (hm) { blocks.push({ type: 'heading', level: hm[1].length, text: hm[2] }); i++; continue; }
    if (/^[-*•]\s+/.test(t)) { blocks.push({ type: 'bullet', text: t.replace(/^[-*•]\s+/, '') }); i++; continue; }
    if (/^\d+\.\s+/.test(t)) { blocks.push({ type: 'numbered', text: t }); i++; continue; }

    const parts = [t];
    i++;
    while (i < lines.length) {
      const n = lines[i].trim();
      if (!n) break;
      if (n.startsWith('|') || /^(#{1,3})\s+/.test(n) || /^[-*•]\s+/.test(n) || /^\d+\.\s+/.test(n)) break;
      parts.push(n); i++;
    }
    blocks.push({ type: 'paragraph', text: parts.join(' ') });
  }
  return blocks;
}

function extractCover(blocks) {
  const copy = [...blocks];
  const cover = { kicker: 'PRODUCT REQUIREMENTS DOCUMENT', title: 'CRM Berbasis AI untuk Manajemen Tender BUMN Konstruksi', subtitle: 'V3.0 - Final Draft', metadata: [] };
  let removed = 0;
  while (copy.length && removed < 4 && copy[0].type === 'paragraph') {
    const text = copy.shift().text;
    removed++;
    if (text === 'PRODUCT REQUIREMENTS DOCUMENT') cover.kicker = text;
    else if (/^CRM Berbasis AI/.test(text)) cover.title = text;
    else if (/^BUMN Konstruksi$/.test(text)) cover.title += ' ' + text;
    else if (/^V3\.0/.test(text)) cover.subtitle = text;
  }
  if (copy.length && copy[0].type === 'table' && copy[0].rows[0][0].toLowerCase() === 'metadata') {
    const tbl = copy.shift();
    cover.metadata = tbl.rows.slice(1);
  }
  return { cover, blocks: copy };
}

function normalizeAscii(s) {
  return String(s).replace(/[–—]/g, '-').replace(/→/g, '->').replace(/≥/g, '>=').replace(/≤/g, '<=');
}

function buildPdf() {
  return new Promise((resolve, reject) => {
    const parsed = extractCover(parseBlocks(readSource()));
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 50, right: 42, bottom: 54, left: 42 },
      bufferPages: true,
      info: { Title: 'PRD CRM AI Tender BUMN Konstruksi V3', Author: 'Eko Prasetyo Pratomo', Subject: 'Nodewave Technical Assessment' }
    });
    const chunks = [];
    doc.on('data', c => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const pageW = 595.28;
    const pageH = 841.89;
    const left = 42;
    const right = 42;
    const contentW = pageW - left - right;
    const bottomY = pageH - 58;

    function need(h) {
      if (doc.y + h > bottomY) doc.addPage();
    }
    function gap(v=4) { doc.y += v; }
    function drawHeading(text, level) {
      const sizes = {1: 15.2, 2: 11.6, 3: 10.2};
      const before = level === 1 ? 9 : 6;
      need(30); gap(before);
      doc.fillColor('#'+GREEN).font('Helvetica-Bold').fontSize(sizes[level] || 11).text(normalizeAscii(text), left, doc.y, { width: contentW, lineGap: 1.2 });
      gap(3);
    }
    function drawRichParagraph(text, opts={}) {
      text = normalizeAscii(text);
      need(22);
      const x = opts.indent ? left + opts.indent : left;
      const w = contentW - (opts.indent || 0);
      const fs = opts.fontSize || 9.1;
      const lineGap = opts.lineGap ?? 1.5;
      const prefix = text.match(/^(Pernyataan masalah:|Catatan:|Tujuan epic:|Persona utama:|Skenario:|Fitur inti:|Fitur AI:|Output utama:|Acceptance criteria:?|US-\d+:|FR-\d+:|BR-\d+\s+-\s+[^:]+:)/);
      if (prefix) {
        const p = prefix[1];
        doc.font('Helvetica-Bold').fontSize(fs).fillColor(p.startsWith('Fitur AI') || p.startsWith('Acceptance') ? '#'+GREEN : '#222').text(p, x, doc.y, { continued: true, width: w, lineGap });
        doc.font('Helvetica').fillColor('#222').text(text.slice(p.length), { width: w, lineGap });
      } else {
        doc.font(opts.bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(fs).fillColor(opts.color || '#222').text(text, x, doc.y, { width: w, lineGap, align: opts.align || 'left' });
      }
      gap(opts.after ?? 3.2);
    }
    function drawBullet(text) {
      need(18);
      const y = doc.y;
      doc.fillColor('#222').font('Helvetica').fontSize(9).text('•', left, y, { width: 12 });
      doc.text(normalizeAscii(text), left + 17, y, { width: contentW - 17, lineGap: 1.2 });
      gap(2.5);
    }
    function drawNumbered(text) { drawRichParagraph(text, { indent: 4, fontSize: 9.0, after: 2.4 }); }

    function widthsFor(headers) {
      const n = headers.length;
      if (n === 2) return [0.50, 0.50];
      if (n === 3) return [0.33, 0.34, 0.33];
      if (n === 4 && headers[0] === '#') return [0.07, 0.25, 0.33, 0.35];
      if (n === 4) return [0.25, 0.30, 0.22, 0.23];
      return Array(n).fill(1/n);
    }
    function cellHeight(text, width, fs, bold=false) {
      doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(fs);
      return doc.heightOfString(normalizeAscii(text), { width: Math.max(20, width - 10), lineGap: 1.0 }) + 9;
    }
    function drawTable(rows) {
      if (!rows.length) return;
      const headers = rows[0];
      const ratios = widthsFor(headers);
      const widths = ratios.map(r => r * contentW);
      const fs = rows.length > 9 || headers.length >= 4 ? 7.6 : 8.2;
      const headerFs = fs;
      const drawRow = (row, idx, isHeader=false) => {
        let h = 0;
        for (let c=0;c<row.length;c++) h = Math.max(h, cellHeight(row[c], widths[c], fs, isHeader));
        h = Math.max(h, isHeader ? 24 : 21);
        if (doc.y + h > bottomY) {
          doc.addPage();
          if (!isHeader) drawRow(headers, 0, true);
        }
        const y = doc.y;
        let x = left;
        for (let c=0;c<row.length;c++) {
          const fill = isHeader ? '#'+GREEN : (idx % 2 === 0 ? '#FFFFFF' : '#'+LIGHT_GREEN);
          doc.save().rect(x, y, widths[c], h).fillAndStroke(fill, '#222222').restore();
          doc.fillColor(isHeader ? '#FFFFFF' : '#222222').font(isHeader ? 'Helvetica-Bold' : 'Helvetica').fontSize(headerFs)
            .text(normalizeAscii(row[c]), x + 5, y + 5, { width: widths[c] - 10, height: h - 8, lineGap: 1.0 });
          x += widths[c];
        }
        doc.y = y + h;
      };
      need(28);
      drawRow(headers, 0, true);
      for (let r=1;r<rows.length;r++) drawRow(rows[r], r, false);
      gap(7);
    }
    function drawCallout(rows) {
      const text = normalizeAscii(rows.map(r => r.join(' ')).join(' '));
      doc.font('Helvetica').fontSize(9.1);
      const h = doc.heightOfString(text, { width: contentW - 20, lineGap: 1.5 }) + 24;
      need(h + 8);
      const y = doc.y;
      doc.save().rect(left, y, contentW, h).fillAndStroke('#'+LIGHT_GREEN, '#'+GREEN).restore();
      const firstSentence = text.match(/^([^.!?]{1,90})([.!?]|$)/);
      if (firstSentence && firstSentence[1].length < 70) {
        doc.fillColor('#'+GREEN).font('Helvetica-Bold').fontSize(9.5).text(firstSentence[1], left+8, y+8, { width: contentW-16 });
        const rest = text.slice(firstSentence[0].length).trim();
        if (rest) doc.fillColor('#222').font('Helvetica').fontSize(9).text(rest, left+8, doc.y+2, { width: contentW-16, lineGap: 1.3 });
      } else {
        doc.fillColor('#222').font('Helvetica').fontSize(9).text(text, left+8, y+9, { width: contentW-16, lineGap: 1.3 });
      }
      doc.y = y + h + 7;
    }

    doc.fillColor('#'+GRAY).font('Helvetica-Bold').fontSize(9).text(parsed.cover.kicker, left, doc.y);
    gap(10);
    doc.fillColor('#'+GREEN).font('Helvetica-Bold').fontSize(23).text(parsed.cover.title, left, doc.y, { width: contentW, lineGap: 2 });
    gap(4);
    doc.moveTo(left, doc.y).lineTo(left + contentW, doc.y).lineWidth(1.2).strokeColor('#'+GREEN).stroke();
    gap(7);
    doc.fillColor('#'+DARK).font('Helvetica-Bold').fontSize(11).text(parsed.cover.subtitle, left, doc.y);
    gap(8);
    if (parsed.cover.metadata.length) drawTable([['Metadata','Nilai'], ...parsed.cover.metadata]);

    for (const b of parsed.blocks) {
      if (b.type === 'heading') drawHeading(b.text, b.level);
      else if (b.type === 'table') drawTable(b.rows);
      else if (b.type === 'callout') drawCallout(b.rows);
      else if (b.type === 'bullet') drawBullet(b.text);
      else if (b.type === 'numbered') drawNumbered(b.text);
      else drawRichParagraph(b.text);
    }

    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      doc.font('Helvetica').fontSize(7.5).fillColor('#'+GRAY).text('PRD - CRM Berbasis AI untuk Manajemen Tender BUMN Konstruksi - v3.0', left, 29, { width: 360 });
      doc.text(`Nodewave Technical Assessment | Halaman ${i + 1}`, pageW - right - 220, pageH - 32, { width: 220, align: 'right' });
    }
    doc.end();
  });
}

function docxText(text, options={}) {
  return new TextRun({ text: normalizeAscii(text), font: 'Arial', size: options.size || 18, bold: !!options.bold, color: options.color });
}

function docxCell(text, {header=false, shade=false, widthPct}={}) {
  return new TableCell({
    width: widthPct ? { size: widthPct, type: WidthType.PERCENTAGE } : undefined,
    verticalAlign: VerticalAlign.TOP,
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: header ? GREEN : (shade ? LIGHT_GREEN : 'FFFFFF') },
    margins: { top: 90, bottom: 90, left: 90, right: 90 },
    children: [new Paragraph({ spacing: { after: 0 }, children: [docxText(text, { size: 16, bold: header, color: header ? 'FFFFFF' : undefined })] })]
  });
}

function makeDocxTable(rows) {
  const headers = rows[0];
  const ratios = headers.length === 2 ? [50,50] : headers.length === 3 ? [33,34,33] : (headers.length === 4 && headers[0] === '#' ? [7,25,33,35] : [25,30,22,23]);
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map((row, r) => new TableRow({
      tableHeader: r === 0,
      cantSplit: true,
      children: row.map((cell, c) => docxCell(cell, { header: r === 0, shade: r > 0 && r % 2 === 0, widthPct: ratios[c] || Math.floor(100/row.length) }))
    }))
  });
}

function makeDocxParagraph(text, type='paragraph', level=0) {
  text = normalizeAscii(text);
  if (type === 'heading') {
    return new Paragraph({ text, heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3, spacing: { before: level === 1 ? 180 : 120, after: 70 }, keepNext: true });
  }
  if (type === 'bullet') return new Paragraph({ bullet: { level: 0 }, spacing: { after: 45 }, children: [docxText(text, { size: 18 })] });
  if (type === 'numbered') return new Paragraph({ spacing: { after: 45 }, children: [docxText(text, { size: 18 })] });

  const prefix = text.match(/^(Pernyataan masalah:|Catatan:|Tujuan epic:|Persona utama:|Skenario:|Fitur inti:|Fitur AI:|Output utama:|Acceptance criteria:?|US-\d+:|FR-\d+:|BR-\d+\s+-\s+[^:]+:)/);
  const children = [];
  if (prefix) {
    children.push(docxText(prefix[1], { size: 18, bold: true, color: prefix[1].startsWith('Fitur AI') || prefix[1].startsWith('Acceptance') ? GREEN : undefined }));
    children.push(docxText(text.slice(prefix[1].length), { size: 18 }));
  } else children.push(docxText(text, { size: 18 }));
  return new Paragraph({ spacing: { after: 65, line: 250 }, children });
}

async function buildDocx() {
  const parsed = extractCover(parseBlocks(readSource()));
  const children = [];
  children.push(new Paragraph({ spacing: { after: 90 }, children: [docxText(parsed.cover.kicker, { size: 18, bold: true, color: GRAY })] }));
  children.push(new Paragraph({ spacing: { after: 80 }, children: [docxText(parsed.cover.title, { size: 34, bold: true, color: GREEN })] }));
  children.push(new Paragraph({ spacing: { after: 140 }, children: [docxText(parsed.cover.subtitle, { size: 22, bold: true, color: DARK })] }));
  if (parsed.cover.metadata.length) children.push(makeDocxTable([['Metadata','Nilai'], ...parsed.cover.metadata]));
  children.push(new Paragraph({ text: '', spacing: { after: 0 } }));

  for (const b of parsed.blocks) {
    if (b.type === 'heading') children.push(makeDocxParagraph(b.text, 'heading', b.level));
    else if (b.type === 'table') { children.push(makeDocxTable(b.rows)); children.push(new Paragraph({ text: '', spacing: { after: 0 } })); }
    else if (b.type === 'callout') {
      children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [new TableRow({ cantSplit: true, children: [new TableCell({ shading: { type: ShadingType.CLEAR, fill: LIGHT_GREEN }, margins: { top: 120, bottom: 120, left: 120, right: 120 }, children: [makeDocxParagraph(b.rows.map(r => r.join(' ')).join(' '))] })] })] }));
      children.push(new Paragraph({ text: '' }));
    } else if (b.type === 'bullet') children.push(makeDocxParagraph(b.text, 'bullet'));
    else if (b.type === 'numbered') children.push(makeDocxParagraph(b.text, 'numbered'));
    else children.push(makeDocxParagraph(b.text));
  }

  const doc = new Document({
    styles: {
      default: { document: { run: { font: 'Arial', size: 18, color: '191919' }, paragraph: { spacing: { after: 65, line: 250 } } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { color: GREEN, size: 34, bold: true, font: 'Arial' } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { color: GREEN, size: 28, bold: true, font: 'Arial' }, paragraph: { spacing: { before: 180, after: 80 }, keepNext: true } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { color: GREEN, size: 22, bold: true, font: 'Arial' }, paragraph: { spacing: { before: 130, after: 65 }, keepNext: true } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { color: GREEN, size: 19, bold: true, font: 'Arial' }, paragraph: { spacing: { before: 100, after: 55 }, keepNext: true } }
      ]
    },
    sections: [{
      properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
      headers: { default: new Header({ children: [new Paragraph({ children: [docxText('PRD - CRM Berbasis AI untuk Manajemen Tender BUMN Konstruksi - v3.0', { size: 14, color: GRAY })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [docxText('Nodewave Technical Assessment | Halaman ', { size: 14, color: GRAY }), new TextRun({ children: [PageNumber.CURRENT], font: 'Arial', size: 14, color: GRAY })] })] }) },
      children
    }]
  });
  return Packer.toBuffer(doc);
}

module.exports = async (req, res) => {
  try {
    const format = String(req.query.format || '').toLowerCase();
    if (format === 'pdf') {
      const buffer = await buildPdf();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${BASENAME}.pdf"`);
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      return res.status(200).send(buffer);
    }
    if (format === 'docx') {
      const buffer = await buildDocx();
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${BASENAME}.docx"`);
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      return res.status(200).send(buffer);
    }
    return res.status(400).json({ error: 'Use ?format=pdf or ?format=docx' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to generate PRD V3 file.' });
  }
};
