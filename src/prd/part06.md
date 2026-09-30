Given proposal snapshot sudah Ready/Approved. When addendum baru mengubah technical requirement. Then impacted requirement/proposal section ditandai Reopened/Needs Review dan approval/readiness terkait menjadi stale sampai review selesai.

## Skenario F - Submission integrity

Given final snapshot approved. When Tender Specialist mencatat submission. Then sistem menyimpan timestamp, submitter, channel, package snapshot, dan receipt. Editing working docs sesudah submit tidak mengubah submitted snapshot.

## Skenario G - Clarification impact

Given clarification meminta perubahan schedule dan metode. When AI impact analyzer dijalankan. Then suggested affected technical section/tasks muncul dengan source; Engineer review menentukan final impact dan response approval.

## Skenario H - Margin engine advisory

Given approved cost estimate dan comparable historical data tersedia. When Estimator membuka margin scenarios. Then beberapa scenario menampilkan price/margin/assumptions/provenance; tidak ada auto-set final price atau auto-send counter offer.

## Skenario I - Non-comparable competitor data

Given competitor price berasal dari scope/currency basis yang tidak sebanding. When pricing insight dihitung. Then dataset ditandai Not Comparable/Needs Commercial Review dan tidak diperlakukan sebagai direct benchmark.

## Skenario J - Award evidence

Given tender masih Award Pending dan AI probability tinggi. When dashboard refresh. Then status tetap Award Pending. Only after authorized user attaches/confirms official result can status become Won/Lost.

## Skenario K - Won handover OCR

Given tender Won dan contract PDF diunggah. When OCR extracts milestone/date. Then field berstatus Draft/Needs Review dengan source page; draft calendar dibuat tetapi belum published. After PM confirms, milestone dapat dipublikasikan.

## Skenario L - AI service gagal

Given AI service timeout saat compliance/readiness. When user membuka workspace. Then error/status terlihat, data manual tetap tersedia, user dapat melanjutkan review dan menyelesaikan workflow tanpa AI.

## Skenario M - Lost tender debrief

Given result Lost telah dikonfirmasi. When debrief dibuat. Then AI boleh merangkum evidence yang tersedia dan menandai unknown reason; system tidak membuat project handover.

## Skenario N - Permission boundary

Given user memiliki System Admin tetapi bukan Commercial Approver. When user mencoba approve final price. Then action ditolak; audit mencatat denied attempt sesuai security policy bila logging diterapkan.

# 14. Asumsi, Batasan, Risiko, dan Keputusan Terbuka

| Hal | Status / penanganan |

| --- | --- |

| Peran BUMN | V3 mengasumsikan BUMN adalah bidder/peserta tender berdasarkan interpretasi use case Nodewave: mencari informasi proyek, mengikuti lelang potensial, dan mengelola pelanggan/pekerjaan. |

| Lifecycle 10 tahap | Product design decision untuk assessment. Brief hanya memberi enam contoh minimum dan tidak menetapkan jumlah final. |

| SOP/approval matrix | Belum diberikan. Role authority, approval threshold, exception policy, dan mandatory gate harus dapat dikonfigurasi/ divalidasi sebelum produksi. |

| Market data source | Sumber/API/izin belum diberikan. MVP mendukung manual/import/authorized source; scraping tanpa izin tidak diasumsikan. |

| Customer/work history quality | AI opportunity insight sangat bergantung pada data historis yang konsisten. Missing/dirty data harus mempengaruhi confidence dan ditampilkan. |

| Competitor data | Ketersediaan dan legal basis belum diketahui. Sistem tidak mengarang competitor price; provenance/comparability wajib. |

| Margin model | Formula margin internal, overhead allocation, risk contingency, threshold, dan approval belum diberikan; engine harus configurable dan advisory. |

| Tender portal integration | Endpoint/credential/security belum diberikan. Submission integration berada di luar MVP; CRM mencatat submission/evidence. |

| Contract OCR | Kualitas scan dan struktur dokumen bervariasi. Low-confidence/conflict diarahkan ke manual review. |

| Sensitive data & AI | Pricing, contract, legal, customer, dan bidder data memerlukan keputusan retention/provider/access sebelum produksi. |

| AI model evaluation | Dataset test, acceptable accuracy, hallucination tolerance, dan fallback threshold belum disepakati; perlu test set sebelum production. |

| UI prototype | Belum dibuat pada tahap PRD V3. Tautan Vercel akan diisi setelah prototype sinkron selesai. |





## 14.1 Keputusan P0 sebelum implementasi produksi

Sample tender document + addendum + actual submission package untuk validation requirement extraction.

Role/approval matrix dan exception policy BUMN.

Daftar mandatory/optional rule per tender dan cara N/A/waiver jika diizinkan.

Data source dan izin untuk market/customer/competitor/history.

Pricing/margin definition dan allowed data fields.

Security, retention, provider AI, logging, data residency, dan confidential document handling.

Integration endpoints yang benar-benar tersedia untuk calendar/ERP/project management/portal tender.

Acceptance threshold dan test set untuk setiap AI capability production.

# 15. Kriteria Selesai MVP / Definition of Done

1.  Tim dapat menjalankan satu opportunity dari market intelligence sampai Won/Lost tanpa kehilangan keterkaitan source, customer, tender, document, dan decision history.

2.  Bid/No-Bid hanya dapat disahkan oleh role berwenang dan memiliki reason + snapshot.

3.  Requirement/document memiliki version integrity, source provenance, owner, status, dan evidence yang dapat ditelusuri.

4.  Ready to Submit memiliki configured gate, approval, dan immutable final snapshot.

5.  Submission record menyimpan timestamp/channel/package/receipt dan tidak berubah ketika working document diedit.

6.  Clarification/addendum dapat ditelusuri ke impact, response, revision, dan approval.

7.  Margin/competitor insight tidak dapat menetapkan final price secara otomatis dan selalu menyajikan assumptions/provenance.

8.  Won/Lost tidak dapat ditetapkan hanya oleh AI prediction.

9.  Tender Won dapat menghasilkan handover package; contract OCR field penting direview sebelum operational publish.

10.  AI dapat gagal/dimatikan tanpa menghentikan core manual workflow.

11.  UI states yang didefinisikan di Bagian 10 dapat dipetakan ke requirement dan QA scenarios.

12.  QA dapat menjalankan seluruh skenario Bagian 13 dan memperoleh hasil sesuai acceptance criteria.

13.  Tidak ada requirement P0 yang bergantung pada aturan 60/40, ranking vendor procurement-side, atau batas negosiasi 10% dari V2.

# 16. Handoff Checklist untuk Engineer, UI/UX, dan QA

| Peran | Harus dapat menjawab dari PRD ini |

| --- | --- |

| Engineering | Objek/data apa yang dibutuhkan; state transition; business rules; permission; source/version model; AI boundaries; error/fallback; integration boundary; NFR; acceptance criteria. |

| UI/UX | Persona dan job-to-be-done; user flow; screen list; critical information hierarchy; AI explanation/source; loading/empty/error/permission states; approval/confirmation states; comparison/version behavior. |

| QA | Given/When/Then outcome; role boundary; state transition; version/addendum behavior; AI failure/manual fallback; source traceability; positive/negative/edge cases; DoD. |





| Alignment rule PRD v3.0, UI Prototype v3.0, dan QA Scenario Pack v3.0 harus menggambarkan behavior yang sama. Jika prototype menampilkan behavior yang tidak memiliki requirement, atau requirement tidak tercermin pada prototype ketika seharusnya terlihat di UI, hal tersebut dianggap inconsistency dan harus diselesaikan sebelum handoff. |

| --- |





# 17. Referensi Informatif

Referensi berikut digunakan untuk memperkaya struktur lifecycle bidder dan bukan untuk menetapkan aturan tender BUMN:

| Referensi | Kegunaan |

| --- | --- |

| Nodewave Technical Test - Product Manager | Brief yang diberikan pengguna (Objective, Use Case, enam tahap minimum, tugas, dan kriteria penilaian). |

| PRD CRM Berbasis AI untuk Manajemen Tender BUMN Konstruksi v2.0 | Baseline struktur/dokumentasi; business scenario procurement-side digantikan V3. |

| APMP - Winning Business Ecosystem | Referensi informatif tentang pre-bid/capture, bid/proposal, submission/follow-up, post-bid, contract award, dan transition. |

| World Bank - Standard Bidding Documents, Procurement of Works | Referensi informatif bahwa bidder mempersiapkan bid, submit, menghadapi evaluation, dan award sesuai dokumen bidding. |

| World Bank - Information to Offerors | Referensi informatif tentang proposal preparation/submission, evaluation, negotiations, dan contract award. |





APMP: https://members.apmp.org/Web/Web/About-Us/Winning-Business-Ecosystem.aspx

World Bank - Procurement of Works SBD: https://documents1.worldbank.org/curated/en/323361581052752931/pdf/Standard-Bidding-Documents-Procurement-of-Works.pdf

World Bank - Information to Offerors: https://thedocs.worldbank.org/en/doc/9e3dbc25f2ffb948118948d68ef5f485-0180012024/information-to-offerors

# 18. Batas Finalitas Dokumen

PRD V3.0 ini adalah final draft untuk technical assessment berdasarkan brief Nodewave, keputusan scope yang telah dikunci, struktur V2 sebagai baseline dokumentasi, serta referensi praktik bidder yang bersifat informatif. Dokumen ini siap direview sebelum tahap UI Kit / interactive prototype. Implementasi produksi tetap memerlukan validasi SOP, tender documents, authority matrix, data governance, dan integration constraints BUMN Konstruksi.
