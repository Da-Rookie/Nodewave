BR-14 - Human override harus terkontrol: Jika user menolak output AI atau mengambil keputusan berbeda dari rekomendasi, sistem menyimpan final human decision dan, untuk keputusan berisiko/approval, alasan sesuai policy. AI tidak menghalangi keputusan berwenang.

BR-15 - Audit dan version integrity: Perubahan penting pada opportunity, Bid/No-Bid, requirement, document approval, pricing scenario, submission, clarification, negotiation, result, dan handover menyimpan aktor, waktu, alasan/notes, dan versi referensi.

# 8. Persyaratan Fungsional dan User Stories

Empat epic anchor berasal dari scope yang dikunci dalam diskusi. Epic tambahan ditambahkan hanya untuk menutup gap lifecycle sehingga PRD dapat dipakai Engineer, UI/UX, dan QA secara end-to-end.

## EPIC 1 - Market Intelligence & Opportunity Tracking

Tujuan epic: Membantu tim menemukan, mencatat, mengkonsolidasikan, dan memprioritaskan peluang tender dengan konteks customer dan historical work.

Persona utama: Business Development / Capture Manager

Skenario: BD menemukan tender baru dari data pasar. Sistem menghubungkannya dengan customer/employer dan proyek sejenis internal. AI memberi pursuit probability dan faktor pendorong/penghambat, tetapi BD/management tetap menentukan langkah berikutnya.

Fitur inti: Tender Aggregator Dashboard + Customer & Work History

Fitur AI: Opportunity Fit & Pursuit Probability Scoring

AI menghitung probability/fit dari data yang tersedia seperti similarity proyek terdahulu, relationship/history, ukuran/nilai jika ada, lokasi/category, deadline, capacity signals, serta historical win/loss. Jika data tidak cukup, sistem wajib menampilkan low confidence atau insufficient data, bukan membuat fakta.

Output utama: Opportunity record, fit insight, customer/work context, dan candidate pursuit.

US-101: Sebagai BD, saya ingin melihat opportunity dari beberapa sumber dalam satu dashboard agar tidak kehilangan peluang relevan.

US-102: Sebagai BD, saya ingin melihat historical work dan customer context agar saya dapat menilai strategic fit dengan cepat.

FR-101: Pengguna dapat membuat/import opportunity dengan title, source, employer/customer, location, category, value estimate bila tersedia, deadline, link/source evidence, owner, dan status.

FR-102: Sistem mendukung search/filter/sort berdasarkan source, customer, category, location, deadline, status, owner, dan score/confidence.

FR-103: Opportunity dapat ditautkan ke customer/account, contacts, dan historical work/projects.

FR-104: AI dapat membuat fit/probability score dan explanation factors dengan timestamp dan data provenance.

FR-105: User dapat menandai score sebagai useful/not useful dan memberikan note tanpa mengubah historical score record.

Acceptance criteria

Opportunity dapat disimpan walau estimated value tidak tersedia; sistem tidak mengisi angka buatan.

Setiap opportunity memiliki source atau catatan asal yang dapat dibuka.

Score AI tidak otomatis mengubah status menjadi Bid atau No-Bid.

Jika historical/fit data tidak cukup, UI menampilkan Insufficient Data atau Low Confidence.

Perubahan score setelah data baru tersedia tersimpan sebagai recalculation baru, bukan menimpa jejak sebelumnya.

## EPIC 2 - Bid Qualification & Pursuit Governance

Tujuan epic: Membuat keputusan Bid/No-Bid eksplisit, terdokumentasi, dan konsisten sebelum organisasi mengalokasikan resource besar.

Persona utama: Business Development / Capture Manager + Approver / Management

Skenario: Opportunity yang menarik masuk qualification. Tim menilai basic eligibility, resource/capacity, strategic fit, timeframe, risk, and commercial attractiveness. AI menyiapkan risk brief dan recommendation, kemudian approver menetapkan Bid/No-Bid.

Fitur inti: Bid/No-Bid Decision Workspace

Fitur AI: AI Pursuit Risk Brief

AI merangkum evidence untuk eligibility, capacity, schedule pressure, strategic fit, past performance, dan data gap. Output berupa recommendation + rationale + missing information, bukan keputusan final.

Output utama: Approved pursuit decision, risk brief, dan audit snapshot.

US-201: Sebagai BD, saya ingin menjalankan qualification checklist agar pursuit decision tidak hanya berdasarkan intuisi.

US-202: Sebagai Approver, saya ingin melihat evidence dan risk brief sebelum mengesahkan Bid/No-Bid.

FR-201: Setiap opportunity dapat memiliki qualification checklist yang dikonfigurasi berdasarkan kebutuhan internal dan informasi tender awal.

FR-202: Pengguna dapat mengisi assessment, evidence/link, owner, severity, dan notes untuk setiap qualification factor.

FR-203: AI membuat Pursuit Risk Brief yang memisahkan facts, assumptions, missing data, dan recommendation.

FR-204: Workflow mendukung Draft -> Review -> Approved Bid / Approved No-Bid dengan approver, date, reason, dan snapshot.

FR-205: Opportunity berstatus No-Bid tetap tersedia untuk analysis dan future knowledge reuse.

Acceptance criteria

Tidak ada tombol AI untuk approve Bid/No-Bid.

Keputusan tidak dapat disahkan tanpa approver dan alasan minimal.

Jika critical information belum tersedia, AI harus menandai Missing/Unknown dan tidak mengasumsikan nilainya.

Perubahan keputusan setelah approval membuat revision record dengan alasan dan approver baru.

No-Bid tidak membuat tender submission workflow kecuali keputusan direopen secara sah.

## EPIC 3 - Document Management & Compliance

Tujuan epic: Menjaga seluruh dokumen tender dan proposal berada pada workspace terpusat, terversi, memiliki owner/status, serta dapat dicek terhadap requirement resmi.

Persona utama: Tender / Bid Specialist + Legal/Compliance Reviewer + Technical Engineer

Skenario: Tender Specialist menerima dokumen tender dan membangun centralized proposal workspace. Tim mengunggah administrasi, teknis, dan komersial. AI mengekstrak requirement dan mencari evidence yang relevan, lalu menandai gap. Reviewer manusia memverifikasi.

Fitur inti: Centralized Proposal Workspace + Requirement/Compliance Matrix

Fitur AI: Automated Compliance Assistant

AI mengekstrak requirement dari tender document/addendum, mengusulkan category, mandatory indicator jika eksplisit, due date, source section/page, serta candidate evidence. AI juga menandai missing, expired, inconsistent, atau unreadable evidence. Semua hasil berstatus suggested/unverified sampai direview.

Output utama: Versioned proposal workspace, verified compliance matrix, dan evidence trail.

US-301: Sebagai Tender Specialist, saya ingin melacak status penyelesaian dokumen administrasi/teknis/komersial agar submission tidak kehilangan persyaratan.

US-302: Sebagai Compliance Reviewer, saya ingin melihat requirement berdampingan dengan evidence dan sumber agar verifikasi dapat dipertanggungjawabkan.

FR-301: Workspace menyimpan official tender files, addenda, proposal docs, category, owner, status, version, approval state, dan relationships.

FR-302: Requirement register menyimpan source document/version/page/section, description, category, mandatory/optional jika diketahui, owner, due date, status, dan evidence.

FR-303: AI dapat mengekstrak requirement dan candidate evidence dengan confidence dan citation ke sumber.

FR-304: Reviewer dapat Accept/Edit/Reject AI suggestion dan menetapkan Verified/Gap/Not Applicable sesuai kewenangan.

FR-305: Dokumen baru tidak menghapus versi lama; setiap requirement/evidence link mengacu ke versi spesifik.

FR-306: Addendum baru menjalankan impact check dan menandai requirement/evidence yang mungkin harus direview ulang.

Acceptance criteria

Dokumen yang tidak dapat dibaca tetap dapat disimpan dan diberi Needs Manual Review.

AI tidak boleh menandai requirement Verified tanpa tindakan manusia.

Jika addendum mengubah requirement yang sudah Verified, item terdampak kembali ke Needs Review/Reopened.

Requirement mandatory yang belum selesai terlihat jelas pada readiness dashboard.

User dapat membuka sumber requirement dan evidence versi terkait dari satu konteks layar.

## EPIC 4 - Bid Planning & Submission Control

Tujuan epic: Mengelola timeline, ownership, review gate, approval, package freeze, submission, dan receipt secara konsisten.

Persona utama: Tender / Bid Specialist + Approver

Skenario: Setelah Bid diputuskan, Tender Specialist membuat plan, milestone, internal due dates, review gates, dan submission package. Menjelang deadline, sistem menjalankan readiness check. Setelah approval, final snapshot dibekukan dan submission evidence dicatat.

Fitur inti: Tender Plan, Review Gate & Submission Readiness Workspace

Fitur AI: AI Requirement/Timeline Planner + Submission Readiness Review

AI mengusulkan milestone dan task dari deadline/requirements, mendeteksi due-date collision, unresolved mandatory item, stale version, missing approval, dan anomaly sebelum submit. AI tidak mengirim proposal ke portal eksternal secara mandiri.

Output utama: Tender plan, approved final snapshot, submission log, dan receipt evidence.

US-401: Sebagai Tender Specialist, saya ingin timeline dan owner terlihat sehingga saya tahu risiko deadline lebih awal.

US-402: Sebagai Approver, saya ingin melihat final readiness snapshot sebelum proposal dikirim.

FR-401: Sistem mendukung key dates, internal milestones, task owner, dependency, reminder, dan status.

FR-402: AI dapat mengusulkan timeline/task plan dari tender dates dan requirement; user dapat menerima/edit/menolak.

FR-403: Readiness check memeriksa configured mandatory requirements, required approvals, document version, final technical/commercial status, dan unresolved critical issue.

FR-404: Approver dapat mengesahkan final proposal snapshot; perubahan material sesudahnya memicu re-approval sesuai rule.

FR-405: Submission log menyimpan channel, timestamp, submitter, package snapshot/version, receipt/reference number bila ada, dan attachment evidence.

FR-406: Sistem mendukung amendment/resubmission sebagai record baru yang terkait submission sebelumnya.

Acceptance criteria

Proposal tidak dapat diberi Ready to Submit jika configured mandatory gate belum memenuhi rule yang disahkan.

User tetap dapat bekerja manual bila AI planner/readiness service gagal.

Final approved snapshot tidak berubah ketika working documents selanjutnya diedit.

Submission record tidak dapat kehilangan file/version yang menjadi dasar submit.

External portal submission berada di luar MVP kecuali integration resmi tersedia.

## EPIC 5 - Evaluation & Clarification Management

Tujuan epic: Mengelola komunikasi dan revisi setelah submission agar setiap pertanyaan, addendum, response, dan dampaknya terdokumentasi.

Persona utama: Tender / Bid Specialist + Technical Engineer + Legal/Compliance

Skenario: Penyelenggara tender mengirim clarification atau addendum. Sistem menghubungkan request dengan requirement/dokumen/price/technical section, menentukan owner dan due date, lalu tim menyiapkan response. AI meringkas perubahan dan impact, manusia menyetujui response.

Fitur inti: Clarification & Addendum Center

