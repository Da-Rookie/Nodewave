| Smart Contract Data Entry/OCR | Award/contract PDF | Draft structured fields + source + milestone draft | Field verification + calendar publish |





# 10. User Flow dan Kebutuhan UI/UX

## 10.1 Alur utama

1.  BD melihat/mencatat opportunity dari data pasar dan menghubungkannya dengan customer serta historical work.

2.  AI menampilkan pursuit probability/fit dan missing data; BD membawa candidate opportunity ke qualification.

3.  Tim mengisi Bid/No-Bid assessment; approver mengesahkan Bid atau No-Bid.

4.  Untuk Bid, Tender Specialist membuat tender workspace, key dates, team, requirements, dan plan.

5.  AI membantu mengekstrak requirement/timeline; user memverifikasi dan menugaskan owner.

6.  Tim menyusun dokumen administrasi, teknis, dan komersial di centralized proposal workspace; AI compliance menandai gap.

7.  Internal review menutup gap, menyelesaikan approval, dan menghasilkan approved submission snapshot.

8.  Tender Specialist mencatat submission dan receipt/evidence dari kanal resmi.

9.  Clarification/addendum masuk; AI melakukan impact analysis; tim menyiapkan response/revision yang direview manusia.

10.  Jika negotiation terjadi, Estimator membuka pricing/competitor history dan margin scenarios; final position disetujui manusia.

11.  Hasil resmi dicatat sebagai Won/Lost/Cancelled; AI membantu debrief/knowledge capture.

12.  Jika Won, automated handover protocol membuat draft contract data dan milestone; PM meninjau dan menerima handover.

## 10.2 Daftar layar yang harus dirancang UI/UX

| Layar | Informasi/tindakan utama | State penting untuk QA |

| --- | --- | --- |

| Executive / Tender Dashboard | Pipeline opportunity/tender, deadline risk, stage, owner, Won/Lost summary, AI alerts. | Loading, empty, partial data, stale AI, permission denied. |

| Market Intelligence & Opportunities | Aggregator, filters, source, employer, deadline, score/confidence. | Insufficient data, duplicate candidate, archived/no-bid. |

| Customer & Work History | Account/contact, relationship notes, past projects, related bids/results. | No history, restricted note, duplicate account. |

| Opportunity Detail / Pursuit | Fit factors, risk, qualification checklist, evidence, decision history. | Draft, pending approval, Bid, No-Bid, reopened. |

| Tender Workspace Overview | Stage, deadline, team, key dates, addenda, tasks, critical gaps, activity. | On track, at risk, overdue, cancelled/withdrawn. |

| Requirement & Compliance Matrix | Requirement/source left; evidence/status/owner/actions right; AI suggestions. | Unverified, verified, gap, N/A, reopened after addendum. |

| Proposal Workspace | Docs by admin/technical/commercial, versions, owner, review/approval. | Draft, review, approved, superseded, unreadable. |

| Review & Submission Readiness | Gate summary, unresolved issues, approvals, final snapshot, submit log. | Not ready, ready, approved, changed-after-approval, submitted. |

| Clarification & Addendum Center | Requests, due dates, impact links, response drafts, approvals, evidence. | Received, impact pending, overdue, responded, reopened. |

| Pricing & Competitor Intelligence | Comparable history, cost/offer, margin scenarios, assumptions, provenance. | Comparable/not comparable, unverified cost, stale scenario. |

| Negotiation Workspace | Rounds, price/scope/term changes, approval, final position. | Draft, pending approval, accepted/rejected/countered. |

| Award & Debrief | Official result, evidence, win/loss factors, lessons, actions. | Award pending, Won, Lost, cancelled, reason unknown. |

| Project Handover | Final proposal/contract, extracted fields, scope, risks, milestones, acceptance. | Draft OCR, needs review, PM review, accepted, needs update. |

| AI Evidence Drawer (cross-cutting) | Source citation/snippet/page, confidence/limitation, model run, user feedback. | Source missing, conflicting source, low confidence, service failed. |





## 10.3 Prinsip interaksi

Setiap critical status menjawab tiga hal: apa statusnya, mengapa, dan apa tindakan berikutnya.

AI insight tidak hanya menampilkan angka; user dapat membuka factors, source, confidence/limitation, dan data yang digunakan.

Mandatory gap, deadline risk, missing approval, dan stale version memiliki visual hierarchy yang konsisten dan tidak hanya mengandalkan warna.

Approved/submitted snapshot dibedakan jelas dari working version.

Perubahan dokumen, price, scope, atau requirement dapat dibandingkan side-by-side dengan baseline.

Destructive atau commitment action seperti approve, submit-record finalization, final price approval, Won/Lost confirmation, dan handover acceptance memerlukan confirmation sesuai role.

Empty/error/loading/permission/AI-failure state harus didesain, bukan dianggap edge case tanpa UI.

Responsive target utama desktop/laptop enterprise; layar kritis tetap usable pada tablet, tetapi complex comparison tidak dipaksa menjadi mobile-first.

## 10.4 Design / Prototype reference

| Status UI Prototype V3 Belum dibuat pada tahap ini. Setelah PRD V3 direview dan disetujui, UI Kit / interactive prototype V3 dibangun di repository GitHub dan dideploy ke Vercel. Tautan Vercel yang nyata kemudian dimasukkan ke bagian ini. PRD, prototype, dan QA scenarios wajib sinkron pada versi yang sama; perbedaan dianggap inconsistency yang harus diperbaiki sebelum handoff. |

| --- |





| Artefak | Versi | Status | Tautan |

| --- | --- | --- | --- |

| PRD | v3.0 | Final Draft - current document | Dokumen ini |

| UI Kit / Interactive Prototype | v3.0 | Pending setelah PRD review | TBD - tidak mencantumkan tautan rekaan |

| QA Scenario Pack | v3.0 | Didefinisikan di Bagian 13; akan disinkronkan dengan prototype | Bagian 13 |





# 11. Persyaratan Nonfungsional

Nilai berikut adalah target awal untuk technical assessment/pilot dan perlu diuji terhadap infrastruktur, keamanan, volume data, serta kebijakan klien.

| Area | Kebutuhan |

| --- | --- |

| Security & RBAC | Role-based access; least privilege; sensitive pricing/legal/contract data hanya terlihat sesuai permission; approval action dipisahkan dari admin permission. |

| Auditability | Perubahan critical menyimpan actor, timestamp, before/after atau referenced version, reason/notes, dan approval record. |

| Version integrity | Official tender docs, addendum, proposal, pricing snapshot, submission, response, dan handover tidak tertimpa; superseded version tetap dapat ditelusuri. |

| Performance | Halaman inti ditargetkan tampil <=3 detik pada p95 untuk volume pilot yang disepakati. Long-running AI berjalan async dengan progress/status. |

| Reliability | AI failure tidak menghilangkan data dan tidak memblokir pekerjaan manual. Save operation yang sukses tetap persisten bila AI job gagal. |

| AI observability | Setiap AI run memiliki timestamp, capability/model identifier bila tersedia, status, input references, output status, error, dan user feedback. |

| Explainability & provenance | Score/insight menyajikan faktor dan source/assumption. Document AI menunjuk ke document/version/page/section bila tersedia. |

| Privacy & retention | Retention, data residency, provider access, prompt/log policy, deletion, dan export mengikuti kebijakan klien sebelum produksi. |

| Accessibility | Keyboard-operable untuk kontrol inti; focus state; label jelas; status tidak hanya menggunakan warna; error message menjelaskan tindakan pemulihan. |

| Compatibility | Browser enterprise modern yang disepakati; export PDF/CSV bila diperlukan untuk review/arsip. |

| Backup & recovery | Strategi backup/restore dan RPO/RTO ditetapkan saat environment produksi diketahui; MVP harus mendukung recovery tanpa kehilangan audit/version link yang konsisten. |





# 12. Prioritas Pengembangan

## 12.1 MVP - wajib untuk demonstrasi end-to-end

Opportunity aggregator, customer/work history, dan basic pursuit probability dengan source/confidence.

Bid/No-Bid workspace, risk brief, human approval, dan audit snapshot.

Tender workspace, key dates, requirement register, task ownership, dan addendum register.

Centralized proposal/document workspace, versioning, compliance matrix, automated compliance suggestions.

Review/readiness gate, final approved snapshot, submission log, dan receipt evidence.

Clarification/addendum center dengan impact analysis dan revision tracking.

Pricing/competitor history dan margin optimization scenario yang advisory.

Negotiation log dan approval final commercial position.

Won/Lost result + debrief/knowledge capture.

Won handover dengan contract OCR draft, source references, PM review, dan draft milestone/calendar.

RBAC, audit trail, AI fallback/manual mode, dan core NFR.

## 12.2 Setelah MVP

Authorized API/connectors untuk market/tender sources dan enterprise data sources.

Deeper semantic search/RAG lintas historical tender, contracts, lessons learned, dan proposal library.

Advanced capacity/resource modeling untuk pursuit decision.

Advanced pricing analytics, inflation/index normalization, probabilistic scenario, dan competitor trend jika data legal/reliable tersedia.

Integration ke ERP/project management/calendar production setelah data contract dan security approval tersedia.

External tender portal submission integration jika API resmi dan control framework tersedia.

Advanced model evaluation, feedback loops, prompt/version management, and red-team testing untuk AI production.

Urutan demo MVP: Opportunity -> Pursuit Probability -> Bid/No-Bid -> Tender Intake -> Compliance/Proposal -> Review & Ready to Submit -> Submission Record -> Clarification/Addendum -> Negotiation/Margin Insight -> Won/Lost -> Handover jika Won.

# 13. Skenario Uji End-to-End untuk Engineering dan QA

## Skenario A - AI opportunity score tidak mengambil keputusan

Given opportunity memiliki historical match tetapi beberapa data capacity belum tersedia. When AI menghitung probability. Then score menampilkan factors + missing data/low confidence; status tetap Reviewed/Qualification dan tidak berubah menjadi Bid.

## Skenario B - Bid/No-Bid approval

Given qualification selesai dan AI merekomendasikan Bid. When approver memilih No-Bid dengan alasan bisnis. Then final status No-Bid, human reason tersimpan, AI recommendation tetap sebagai historical evidence, dan tender submission workflow tidak dibuat.

## Skenario C - Mandatory compliance gap

Given tender memiliki requirement mandatory yang dikonfirmasi user dan evidence belum tersedia. When readiness check dijalankan. Then item berstatus Gap/Unresolved dan package tidak dapat dinyatakan Ready to Submit sesuai configured rule.

## Skenario D - AI salah membaca dokumen

Given AI mengusulkan dokumen A sebagai evidence tetapi reviewer melihat isi tidak sesuai. When reviewer Reject suggestion. Then requirement tetap Unverified/Gap, alasan tersimpan, dan AI tidak mengubah status final.

## Skenario E - Addendum setelah approval

