4.  Tender intake, key dates, requirement register, addendum register, task ownership, dan tender workspace.

5.  Centralized proposal workspace untuk dokumen administrasi, teknis, komersial, versioning, status, owner, dan approval.

6.  Automated compliance assistant untuk extraction requirement, mapping evidence, gap/expiry/inconsistency flag, dan manual verification.

7.  Bid planning, review gate, submission readiness checklist, final snapshot, submission log, dan receipt/evidence.

8.  Evaluation/clarification/addendum response management dan impact tracking terhadap requirement, proposal, pricing, dan timeline.

9.  Competitor and pricing database berdasarkan data historis/internal/publik yang sah; margin optimization insight untuk Estimator.

10.  Negotiation workspace yang menyimpan commercial/technical change, scenario, approval, dan final position tanpa autonomous pricing.

11.  Won/Lost result, debrief, win/loss evidence, lessons learned, dan knowledge reuse.

12.  Automated handover protocol setelah Won, termasuk smart contract data entry/OCR untuk draft key terms, milestone, calendar, risk, dan action items.

13.  AI provenance, manual review, RBAC, audit trail, data versioning, dan asynchronous AI status.

## 5.2 Out of scope MVP

Scraping portal pasar/pengadaan yang melanggar Terms of Service, robots policy, otorisasi, atau kontrol akses.

Autonomous submission ke portal tender eksternal atau penggunaan credential pengguna oleh AI tanpa integrasi resmi dan kontrol keamanan.

AI yang memutuskan Bid/No-Bid, menetapkan harga final, menerima terms legal, menandatangani kontrak, atau menyatakan perusahaan menang/kalah tanpa bukti resmi.

Full construction project management setelah handover, termasuk field progress, BIM, procurement material, payroll, invoicing, payment, dan cost control proyek secara penuh.

ERP/accounting integration produksi yang belum diberikan endpoint, data contract, atau persetujuan.

Real-time competitor pricing yang tidak memiliki sumber data legal/reliable.

Penggantian fungsi legal/commercial/technical approval dengan model AI.

# 6. Lifecycle Tender dan Nilai Produk

| Mengapa V3 memakai 10 tahap Brief Nodewave menyebut enam tahap sebagai contoh "tetapi tidak terbatas". V3 memecah alur bidder menjadi 10 tahap agar titik keputusan Bid/No-Bid, tender intake/planning, submission readiness, receipt tracking, dan Won/Lost handover dapat dimodelkan secara eksplisit untuk Engineering, UI/UX, dan QA. Tahap tambahan adalah product design decision untuk technical assessment, bukan klaim satu standar wajib untuk seluruh tender konstruksi. |

| --- |





| # | Tahap lifecycle | Pekerjaan tim BUMN sebagai bidder | Nilai CRM / AI |

| --- | --- | --- | --- |

| 1 | Market Intelligence & Opportunity Identification | Mencari/mencatat opportunity, employer/customer, sumber, nilai/timeline jika tersedia, dan proyek sejenis. | Aggregator, customer/work history, similarity insight, pursuit probability dengan source/confidence. |

| 2 | Qualification & Bid/No-Bid | Menilai eligibility, strategic fit, capacity, deadline, risk, resource demand, dan alasan pursuit. | Decision workspace, risk brief, approval trail; AI memberi rekomendasi/summary, bukan keputusan. |

| 3 | Tender Intake & Bid Planning | Mendaftarkan tender, dokumen resmi, key dates, addendum, requirement categories, team, RACI, dan review plan. | Single tender workspace; AI mengekstrak dates/requirements dan mengusulkan task plan. |

| 4 | Document Compliance & Proposal Preparation | Mengumpulkan/menyusun administrasi, teknis, komersial, evidence, metode, dan pricing draft. | Centralized proposal workspace, versioning, compliance matrix, AI gap/expiry/inconsistency detection. |

| 5 | Internal Review & Submission Readiness | Melakukan review teknis/komersial/legal, menutup mandatory gap, approval, final QA, dan freeze snapshot. | Readiness gate, approval matrix, AI proposal quality/readiness checks. |

| 6 | Bid Submission & Receipt | Mengirim melalui kanal resmi di luar CRM/terintegrasi bila sah, lalu mencatat timestamp, package version, channel, dan receipt. | Submission log, immutable snapshot, reminder, receipt/evidence tracking. |

| 7 | Evaluation, Clarification & Addendum Response | Menerima pertanyaan, addendum, presentasi, klarifikasi, dan menyiapkan revisi/response. | Clarification center, impact matrix, AI change detection dan response brief. |

| 8 | Negotiation & Final Offer | Membahas harga, scope, terms, jadwal, atau persyaratan teknis; mengelola approval internal. | Pricing/competitor history, margin scenario, negotiation log, AI margin optimization insight. |

| 9 | Award, Win/Loss & Debrief | Mencatat hasil resmi, notice, debrief, alasan berbukti, dan lessons learned. | Won/Lost record, evidence, AI win/loss summary dan knowledge capture. |

| 10 | Project Handover & Execution Synchronization | Jika Won, menyerahkan contract/offer final, scope, milestone, assumptions, risks, obligations, dan contacts kepada PM. | Automated handover protocol, OCR/smart data entry, draft calendar/milestone; PM review sebelum publish. |





## 6.1 Status proses dan state transition

| Objek | State utama |

| --- | --- |

| Opportunity | Detected -> Reviewed -> Qualified -> Bid/No-Bid Pending -> Bid / No-Bid / Archived |

| Tender / Pursuit | Intake -> Planning -> Proposal Development -> Internal Review -> Ready to Submit -> Submitted -> Evaluation/Clarification -> Negotiation -> Award Pending -> Won / Lost / Cancelled / Withdrawn |

| Requirement | Detected -> Mapped -> In Progress -> Evidence Attached -> Verified / Gap / Not Applicable -> Reopened jika addendum berdampak |

| Document | Draft -> In Review -> Approved -> Superseded; versi lama tidak dihapus |

| Clarification/Addendum | Received -> Impact Analysis -> Assigned -> Response Draft -> Approved -> Responded / Closed |

| Handover | Not Started -> Draft Generated -> PM Review -> Accepted / Needs Update -> Handover Complete |





State terminal No-Bid, Lost, Cancelled, atau Withdrawn tetap menyimpan seluruh audit trail. Hanya tender Won yang dapat masuk Handover. Reopen harus memiliki alasan, aktor, waktu, dan referensi versi.

## 6.2 Traceability lifecycle ke epic

| Lifecycle | Epic utama | Persona utama | AI utama |

| --- | --- | --- | --- |

| 1. Market intelligence | E1 Market Intelligence & Opportunity Tracking | BD / Capture | Opportunity Fit & Pursuit Probability |

| 2. Qualification & Bid/No-Bid | E2 Bid Qualification & Pursuit Governance | BD + Approver | AI Pursuit Risk Brief |

| 3. Tender intake & planning | E4 Bid Planning & Submission Control | Tender Specialist | AI Requirement/Timeline Planner |

| 4. Compliance & proposal prep | E3 Document Management & Compliance | Tender Specialist + Engineer + Legal | Automated Compliance Assistant |

| 5. Internal review & readiness | E4 Bid Planning & Submission Control | Tender Specialist + Approver | AI Submission Readiness Review |

| 6. Submission & receipt | E4 Bid Planning & Submission Control | Tender Specialist | AI Pre-submit Anomaly Check |

| 7. Evaluation/clarification | E5 Evaluation & Clarification Management | Tender Specialist + Engineer | AI Addendum/Clarification Impact Analyzer |

| 8. Negotiation | E6 Negotiation & Evaluation Intelligence | Estimator + Approver | Margin Optimization Engine |

| 9. Award / Won-Lost | E7 Award, Win/Loss & Knowledge Intelligence | BD + Tender Specialist | AI Win/Loss Intelligence |

| 10. Handover | E8 Post-Tender & Project Synchronization | Project Manager | Smart Contract Data Entry / OCR |





# 7. Business Rules dan Model Keputusan

BR-01 - Source of truth: Tender document, addendum, official clarification, dan SOP/approval matrix yang berlaku mengalahkan data hasil AI atau asumsi produk. Sistem menyimpan referensi sumber untuk rule dan requirement.

BR-02 - Opportunity probability bukan keputusan: Opportunity Fit/Pursuit Probability adalah advisory score. Score harus menyimpan input yang digunakan, tanggal kalkulasi, model/version jika relevan, confidence/limitation, dan tidak dapat mengubah status Bid/No-Bid secara otomatis.

BR-03 - Bid/No-Bid membutuhkan manusia: Keputusan Bid atau No-Bid hanya sah setelah aktor berwenang mengesahkan alasan dan snapshot data. AI boleh menyiapkan recommendation brief, tetapi tombol approval tetap manusia.

BR-04 - Requirement register mengikuti versi tender: Setiap requirement memiliki category, mandatory/optional jika dinyatakan dokumen, source page/section, owner, due date, status, dan evidence. Addendum yang mengubah requirement menandai item terdampak dan dapat membuka kembali approval/readiness yang relevan.

BR-05 - Mandatory tidak diasumsikan universal: Sistem tidak membuat aturan kelulusan generik untuk semua tender. Mandatory gate hanya aktif jika requirement tersebut berasal dari dokumen tender/SOP yang telah dikonfirmasi pengguna.

BR-06 - Submission readiness adalah snapshot: Ready to Submit hanya dapat ditetapkan pada snapshot proposal tertentu setelah mandatory checks, required approvals, final pricing/technical review, dan package integrity selesai sesuai konfigurasi tender. Perubahan material setelah approval membatalkan readiness item terkait.

BR-07 - Submission evidence immutable: Setelah submission dicatat, sistem menyimpan package version, timestamp, channel, submitter, dan receipt/evidence. Koreksi dibuat sebagai record baru atau amendment; record lama tidak ditimpa diam-diam.

BR-08 - Addendum dan clarification punya impact trail: Setiap addendum/clarification harus dapat ditelusuri ke requirement, document, task, price/technical impact, response, dan approver yang terdampak.

BR-09 - Margin optimization bersifat insight: Margin Optimization Engine hanya menghasilkan scenario/range/impact berdasarkan input cost, target margin, historical/company data, competitor evidence yang tersedia, dan assumptions. Sistem tidak menetapkan price final atau mengirim counter-offer otomatis.

BR-10 - Competitor intelligence harus berprovenance: Data kompetitor/harga historis memiliki source, project context, date, currency, tax/scope basis bila tersedia. Jika basis tidak comparable, insight ditandai Not Comparable / Needs Commercial Review.

BR-11 - Won/Lost membutuhkan bukti atau konfirmasi: Status Won/Lost tidak ditetapkan AI hanya dari prediksi. Status memerlukan official notice, portal evidence, atau manual confirmation oleh user berwenang dengan sumber/catatan.

BR-12 - Handover hanya setelah Won: Tender Won dapat membuat draft handover. Tender Lost/No-Bid/Cancelled tidak membuat project handover dan diarahkan ke debrief/knowledge capture.

BR-13 - OCR contract menghasilkan draft data: AI boleh mengekstrak contract value, dates, milestone, obligations, key contacts, retention/warranty/other terms jika ditemukan, tetapi nilai masuk sebagai Draft/Needs Review. Calendar/timeline operational baru dipublikasikan setelah review user yang berwenang.

