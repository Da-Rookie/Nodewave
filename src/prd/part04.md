Fitur AI: AI Addendum / Clarification Impact Analyzer

AI membandingkan new addendum/request dengan baseline tender dan proposal/submission snapshot, lalu menyorot perubahan pada scope, requirement, schedule, price, contract terms, atau technical commitment serta item yang perlu dibuka ulang.

Output utama: Clarification log, impact matrix, approved responses, dan revision trail.

US-501: Sebagai Tender Specialist, saya ingin semua clarification mempunyai owner dan due date agar tidak ada response yang terlambat.

US-502: Sebagai Engineer, saya ingin melihat bagian proposal yang terdampak addendum agar saya tidak menilai dari dokumen lama.

FR-501: Pengguna dapat mencatat clarification/addendum dengan source, received date, due date, sender, category, severity, dan attachment.

FR-502: Item dapat ditautkan ke requirement, proposal section, pricing component, technical commitment, dan task.

FR-503: AI menghasilkan impact summary dan suggested affected items dengan source references.

FR-504: Response/revision memiliki draft, review, approval, sent/responded status, channel, timestamp, dan evidence.

FR-505: Perubahan material dapat memicu re-review/re-approval pada technical/commercial/legal area yang terdampak.

Acceptance criteria

AI tidak boleh menandai response sebagai Sent tanpa user action atau integration evidence resmi.

Impact suggestion yang ditolak user tetap tercatat sebagai AI suggestion history tanpa mengubah final human classification.

Jika due date berubah karena addendum, timeline menyimpan old/new value dan source.

Revision response selalu terhubung ke submission/proposal baseline yang dibandingkan.

Critical clarification yang belum ditutup terlihat pada tender workspace.

## EPIC 6 - Negotiation & Evaluation Intelligence

Tujuan epic: Membantu Estimator/Commercial menilai posisi harga dan margin serta menjaga perubahan negosiasi dapat ditelusuri terhadap baseline penawaran.

Persona utama: Estimator / Commercial + Approver + Technical Engineer

Skenario: Saat masuk negotiation, Estimator melihat historical company bids, competitor/pricing data yang tersedia untuk proyek sejenis, internal cost estimate, dan target margin. AI membuat beberapa scenario margin/price insight. Tim memutuskan posisi final dan meminta approval jika diperlukan.

Fitur inti: Competitor & Pricing Database + Negotiation Workspace

Fitur AI: Margin Optimization Engine

AI menghasilkan insight seperti margin impact, sensitivity terhadap perubahan price/cost/scope, historical range, dan competitor context yang comparable. Recommendation wajib menjelaskan input dan assumption; jika basis data tidak comparable atau terlalu tipis, sistem tidak memberikan angka seolah pasti.

Output utama: Comparable pricing context, margin scenarios, negotiation trail, dan approved final position.

US-601: Sebagai Estimator, saya ingin melihat histori harga perusahaan dan kompetitor pada proyek sejenis agar saya memiliki konteks saat negosiasi.

US-602: Sebagai Estimator, saya ingin melihat dampak setiap skenario harga terhadap margin agar keputusan komersial lebih terukur.

FR-601: Pricing database menyimpan project type, client/employer, date, scope basis, bid/contract value jika sah, currency, tax basis bila tersedia, result, dan source.

FR-602: User dapat menandai dataset Comparable / Partially Comparable / Not Comparable dengan alasan.

FR-603: Margin engine menerima internal cost estimate, current offer, target/threshold yang diizinkan, scope changes, dan comparable historical data.

FR-604: AI menampilkan scenario table: price, estimated margin, delta, assumptions, risk notes, dan data provenance.

FR-605: Negotiation log menyimpan rounds, offer/counter-offer, scope/term changes, approvals, notes, dan final commercial position.

FR-606: Technical change yang mempengaruhi cost/scope menandai pricing scenario lama sebagai Stale/Needs Recalculation.

Acceptance criteria

AI tidak memiliki aksi Set Final Price atau Send Counter Offer.

Jika cost estimate belum approved/valid, margin result ditandai Draft/Unverified.

Competitor data tanpa source tidak digunakan sebagai fact; dapat disimpan sebagai unverified note terpisah jika policy mengizinkan.

Perubahan scope yang material memicu recalculation dan technical review.

Final commercial decision memiliki approver/authority sesuai configuration.

## EPIC 7 - Award, Win/Loss & Knowledge Intelligence

Tujuan epic: Mencatat hasil tender secara resmi dan mengubah pengalaman menjadi knowledge untuk pursuit berikutnya.

Persona utama: Business Development / Tender Specialist + Approver

Skenario: Hasil tender diterima. User memasukkan official notice/evidence dan menetapkan Won/Lost/Cancelled. Untuk Lost atau Won, tim dapat membuat debrief. AI merangkum evidence dan lessons learned tanpa mengarang alasan yang tidak tersedia.

Fitur inti: Award & Debrief Workspace

Fitur AI: AI Win/Loss Intelligence

AI mengelompokkan factor yang memiliki evidence: compliance, technical, commercial, relationship, schedule/process, atau unknown. AI boleh menyarankan lessons learned dan knowledge tags, tetapi tidak menyatakan penyebab kemenangan/kekalahan tanpa bukti.

Output utama: Official result record, debrief, lessons learned, dan reusable knowledge.

US-701: Sebagai BD, saya ingin menyimpan hasil dan debrief agar data win/loss dapat dipakai untuk opportunity berikutnya.

US-702: Sebagai Tender Specialist, saya ingin menutup tender dengan seluruh evidence dan lesson learned yang terstruktur.

FR-701: User dapat mencatat result, result date, official notice/source, contract/award value jika diketahui dan boleh disimpan, serta notes.

FR-702: Status Won/Lost/Cancelled membutuhkan user confirmation dan source/notes.

FR-703: Debrief menyimpan factors, evidence, internal observation, corrective action, owner, dan due date jika ada.

FR-704: AI menghasilkan evidence-grounded win/loss summary dan suggested knowledge tags.

FR-705: Historical result dapat digunakan kembali sebagai input opportunity fit/pricing insight dengan provenance.

Acceptance criteria

AI prediction tidak dapat mengubah Award Pending menjadi Won/Lost.

Jika official reason tidak tersedia, summary menyatakan Reason Not Provided/Unknown.

Won membuka handover workflow; Lost tidak.

Lessons learned yang dihasilkan AI harus dapat diedit/ditolak.

Sensitive debrief data mengikuti RBAC dan retention policy.

## EPIC 8 - Post-Tender & Project Synchronization

Tujuan epic: Memindahkan konteks tender Won ke Project Manager tanpa kehilangan komitmen teknis, komersial, kontraktual, milestone, assumption, dan risk.

Persona utama: Project Manager / Delivery Owner + Tender Specialist

Skenario: Ketika tender berstatus Won, sistem membuat draft handover. Admin/Tender Specialist mengunggah kontrak atau award package PDF. AI/OCR membaca key fields dan membuat draft contract data entry serta draft timeline/calendar. PM meninjau, memperbaiki, lalu menerima dan mempublikasikan informasi operasional yang diperlukan.

Fitur inti: Automated Handover Protocol

Fitur AI: Smart Contract Data Entry / OCR + Handover Summary

AI mengekstrak candidate contract value, effective/start/end dates, milestone, deliverables, payment/retention/warranty/penalty terms jika ada, key contacts, obligations, exclusions, dan risk signals. Sistem harus menunjukkan halaman/sumber. Draft calendar/task dibuat otomatis tetapi berstatus Draft sampai PM/authorized user mengonfirmasi.

Output utama: Accepted handover package, verified key contract data, dan synchronized draft/approved milestones.

US-801: Sebagai Project Manager, saya ingin menerima ringkasan contract dan proposal final agar project kickoff tidak mengulang pencarian informasi.

US-802: Sebagai Project Manager, saya ingin draft milestone masuk ke kalender operasional agar administrasi handover lebih cepat.

FR-801: Handover package mengambil approved final proposal, negotiation outcome, official award/contract docs, scope, assumptions, risks, key contacts, and outstanding actions.

FR-802: AI/OCR mengekstrak key contract fields dengan source page/snippet dan confidence/status review.

FR-803: Extracted field berstatus Draft/Needs Review; user dapat Accept/Edit/Reject.

FR-804: Sistem membuat draft milestone/calendar/task dari field yang telah diekstrak, tetapi tidak mempublikasikan ke operational calendar sebelum confirmation.

FR-805: Project Manager dapat Accept Handover atau Needs Update dengan notes.

FR-806: Handover snapshot tetap menyimpan versi source document dan seluruh perubahan setelah acceptance sebagai amendment record.

Acceptance criteria

Handover hanya tersedia jika tender Won.

Jika OCR tidak yakin atau field bertentangan, sistem menandai Needs Manual Review dan tidak mengisi value final secara diam-diam.

Calendar/timeline draft tidak aktif sebelum confirmation.

PM dapat membuka sumber dokumen untuk setiap field penting.

Handover Complete hanya setelah PM menerima package; perubahan setelah itu tercatat sebagai amendment.

# 9. Fitur AI dan Guardrails

## 9.1 Prinsip AI

Evidence-grounded: output harus menunjuk ke source record/document/version ketika berasal dari data tender atau dokumen.

Advisory by default: scoring, recommendation, pricing insight, compliance suggestion, dan win/loss analysis tidak menjadi keputusan final.

Human review: status yang memiliki dampak bisnis/hukum/komersial memerlukan tindakan user berwenang.

Uncertainty visible: insufficient data, low confidence, conflicting source, atau unreadable document harus terlihat di UI.

No silent overwrite: AI re-analysis membuat hasil baru/versioned; tidak mengganti human decision tanpa jejak.

Graceful degradation: AI failure tidak boleh menghentikan workflow manual inti.

Data governance: provider AI, retention, location, logging, and sensitive data handling mengikuti persetujuan keamanan klien.

## 9.2 AI capability map

| AI capability | Input minimum | Output | Human gate |

| --- | --- | --- | --- |

| Opportunity Fit & Pursuit Probability | Opportunity + available customer/work/history data | Score/range, factors, confidence, missing data | Bid/No-Bid decision |

| Pursuit Risk Brief | Qualification checklist + evidence | Risk/fit summary, gaps, recommendation | Pursuit approval |

| Automated Compliance | Tender docs + requirement/evidence files | Requirement suggestions, evidence candidates, gaps | Requirement verification |

| Timeline/Readiness Assistant | Deadlines + requirements + task/review states | Task plan, deadline risk, anomaly/readiness flags | Final readiness approval |

| Impact Analyzer | Baseline + addendum/clarification | Changed clauses/items, affected tasks/price/technical areas | Response/revision approval |

| Margin Optimization Engine | Cost + offer + assumptions + comparable historical data | Scenario and margin impact | Final commercial decision |

| Win/Loss Intelligence | Official result + debrief/evidence | Evidence-grounded summary and lessons | Knowledge publication |

