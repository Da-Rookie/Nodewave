PRODUCT REQUIREMENTS DOCUMENT

CRM Berbasis AI untuk Manajemen Tender
BUMN Konstruksi

V3.0 - Final Draft untuk Technical Assessment

| Metadata | Nilai |

| --- | --- |

| Versi | 3.0 - Final Draft untuk review sebelum UI Prototype V3 |

| Tanggal | 30 September 2026 |

| Product Manager | Eko Prasetyo Pratomo |

| Perusahaan pengembang | Nodewave |

| Klien dan pengguna utama | Tim internal BUMN Konstruksi sebagai peserta/bidder tender |

| Status penggunaan | Acuan technical assessment. Siap direview oleh Product, Engineering, UI/UX, dan QA. |

| UI Prototype V3 | Pending - tautan Vercel ditambahkan setelah prototype V3 selesai dan disinkronkan dengan PRD. |





| Perubahan fundamental dari V2 V3 memosisikan BUMN Konstruksi sebagai pihak yang mencari peluang dan mengikuti tender untuk memenangkan proyek, bukan sebagai pihak yang menerima penawaran vendor dan memilih pemenang. Seluruh business logic, persona, lifecycle, epic, user story, AI, UI, dan QA disusun ulang dari perspektif bidder. Struktur dan kedalaman V2 dipertahankan sebagai baseline dokumentasi. |

| --- |





# Ringkasan Perubahan V3

Perspektif bisnis diubah menjadi bidder-side tender management sesuai use case Nodewave: market intelligence, pursuit, penyusunan penawaran, submission, evaluasi/clarification, negotiation, award, dan project handover.

Enam tahap minimum pada brief Nodewave diperluas menjadi 10 tahap lifecycle agar alur bidder lebih operasional. Enam tahap asli tetap tercakup; tahap tambahan diberi status product assumption/practice reference, bukan aturan tender universal.

Empat epic usulan Product Manager dipertahankan sebagai anchor: Market Intelligence & Opportunity Tracking; Document Management & Compliance; Negotiation & Evaluation Intelligence; Post-Tender & Project Synchronization.

Empat epic tambahan dimasukkan untuk menutup gap lifecycle: Bid Qualification & Pursuit Governance; Bid Planning & Submission Control; Evaluation & Clarification Management; Award, Win/Loss & Knowledge Intelligence.

Setiap epic memiliki persona, cerita/skenario, fitur inti, fitur AI berbasis data, user stories, functional requirements, dan acceptance criteria yang dapat diuji.

AI bersifat decision support/human-in-the-loop. AI boleh membaca, mengekstrak, membandingkan, memberi skor probabilitas atau rekomendasi, tetapi tidak mengambil keputusan komersial, hukum, submission, atau award secara mandiri.

Aturan V2 seperti ranking vendor, komposisi 60/40, dan batas negosiasi 10% dihapus karena berasal dari skenario procurement-side dan tidak ada pada brief Nodewave.

# 0. Dasar Dokumen dan Source Hierarchy

| Sumber | Peran dalam V3 |

| --- | --- |

| Brief Technical Test Nodewave | Sumber utama untuk objective, use case, enam tahap minimum, kewajiban AI, dan ekspektasi PRD siap dieksekusi. |

| Keputusan diskusi scope V3 | Mengunci perspektif BUMN sebagai bidder; empat anchor epic; AI sebagai asisten; lifecycle > 6 tahap; kebutuhan PRD untuk Engineer, UI/UX, dan QA. |

| PRD V2 | Baseline struktur, kedalaman, pola business rule, NFR, acceptance criteria, QA, risk, dan Definition of Done. Business scenario V2 tidak diwariskan. |

| Referensi praktik eksternal | Dipakai informatif untuk memperkaya lifecycle bidder, terutama pre-bid/capture, proposal/submission, post-bid, negotiation, award, dan transition. Bukan aturan BUMN atau regulasi nasional. |

| Dokumen tender/SOP nyata | Jika produk diimplementasikan, dokumen tender, addendum, SOP, approval matrix, dan kebijakan data klien menjadi source of truth operasional. |





Catatan: PRD ini tidak mengasumsikan satu formula evaluasi, satu batas negosiasi, atau satu set persyaratan berlaku untuk semua tender. Konfigurasi setiap tender mengikuti dokumen resmi tender dan keputusan internal BUMN yang berwenang.

# 1. Ringkasan Produk

Nodewave akan membangun CRM berbasis AI yang membantu BUMN Konstruksi mengelola lifecycle tender dari sisi peserta/bidder. Sistem menghubungkan data pasar, database pelanggan, riwayat pekerjaan, keputusan pursuit, penyusunan penawaran, compliance, submission, klarifikasi, negosiasi, hasil tender, serta handover proyek dalam satu workspace yang dapat ditelusuri.

Produk tidak menggantikan portal tender resmi dan tidak mengambil keputusan bisnis secara otonom. CRM berfungsi sebagai system of record dan decision-support layer bagi tim internal BUMN agar informasi tender tidak tersebar, deadline tidak terlewat, bukti compliance dan versi dokumen terlacak, pricing insight berbasis data tersedia, dan informasi tender yang dimenangkan dapat diteruskan ke Project Manager secara konsisten.

AI digunakan di setiap epic sebagai asisten berbasis data: mendeteksi peluang, memberi pursuit probability, mengekstrak requirement, memeriksa compliance, menganalisis perubahan/addendum, menyiapkan insight pricing/margin, merangkum win/loss, serta mengekstrak data kontrak untuk draft handover. Seluruh output AI harus menunjukkan sumber, confidence/limitation yang relevan, dan jalur review manusia.

# 2. Latar Belakang dan Pernyataan Masalah

BUMN Konstruksi yang aktif mengejar proyek membutuhkan koordinasi lintas Business Development, Tender/Bid Specialist, Estimator/Commercial, Engineer, Approver, dan Project Manager. Informasi peluang dan tender sering berasal dari berbagai kanal; dokumen tender dapat berubah melalui addendum; proposal melibatkan banyak kontributor; dan keputusan harga perlu mempertimbangkan biaya, margin, pengalaman proyek, serta informasi kompetitif yang tersedia.

Tanpa satu CRM tender yang terstruktur, tim berisiko kehilangan konteks peluang, terlambat mengambil keputusan Bid/No-Bid, menggunakan dokumen atau requirement versi lama, melewatkan compliance item, sulit menelusuri perubahan saat klarifikasi/negosiasi, dan menyerahkan informasi yang tidak lengkap kepada tim proyek setelah menang.

Pernyataan masalah: Tim BUMN membutuhkan satu sistem bidder-side yang menghubungkan market intelligence, customer/work history, pursuit decision, proposal readiness, compliance, submission, post-bid interaction, pricing intelligence, hasil tender, dan project handover sehingga setiap tindakan dapat ditelusuri ke sumber data, dokumen, aktor, dan versi yang benar.

# 3. Sasaran Produk dan Metrik Keberhasilan

## 3.1 Sasaran produk

Menyatukan peluang tender dari sumber pasar yang tersedia dengan database pelanggan dan riwayat pekerjaan perusahaan.

Membantu tim memprioritaskan peluang melalui pursuit probability dan risk/fit insight tanpa menggantikan keputusan Bid/No-Bid manusia.

Menyediakan workspace tender terpusat untuk requirement, dokumen administrasi, teknis, komersial, pemilik tugas, deadline, dan versi.

Membantu Tender Specialist memastikan readiness submission melalui compliance matrix, review gate, approval, dan submission receipt yang terdokumentasi.

Menjaga seluruh addendum, clarification, revisi teknis/komersial, dan negosiasi dapat ditelusuri ke versi sebelumnya.

Memberikan Estimator insight pricing dan margin berbasis data historis/kompetitor yang tersedia, tanpa mengatur harga final secara otomatis.

Menyimpan hasil Won/Lost, alasan yang memiliki bukti, dan lessons learned untuk meningkatkan kualitas pursuit berikutnya.

Mengotomatisasi draft handover setelah Won melalui ekstraksi kontrak/PDF dan pembuatan draft timeline/milestone yang tetap direview pengguna.

## 3.2 Metrik keberhasilan pilot

Target berikut adalah hipotesis produk untuk pilot, bukan hasil yang telah terbukti. Baseline manual harus diukur sebelum target digunakan sebagai KPI produksi.

| Metrik | Definisi | Target awal pilot |

| --- | --- | --- |

| Opportunity traceability | Persentase opportunity aktif yang memiliki sumber, owner, deadline, customer/employer, dan status pursuit. | >=95% |

| Waktu Bid/No-Bid | Median waktu dari opportunity masuk ke keputusan Bid/No-Bid yang disahkan. | Turun 30% dari baseline manual |

| Requirement coverage | Persentase requirement mandatory yang memiliki owner dan status/evidence sebelum Ready to Submit. | >=95% |

| Submission integrity | Paket yang disubmit memiliki approved snapshot, versi final, waktu submit, dan bukti penerimaan. | 100% submission pilot |

| Clarification traceability | Clarification/addendum yang memiliki sumber, owner, due date, response, dan impact record. | >=95% |

| Pricing insight traceability | Insight margin/pricing menyimpan data input, asumsi, tanggal, dan provenance. | >=90% |

| Handover completeness | Tender Won yang memiliki handover package diterima Project Manager. | >=90% |

| Kegunaan AI | Output AI yang dinilai berguna setelah review pengguna. | Diukur pada pilot; target ditetapkan setelah sampel cukup |





# 4. Pengguna dan Tanggung Jawab

| Peran | Tanggung jawab dalam produk | Keputusan yang tetap manusia |

| --- | --- | --- |

| Business Development / Capture Manager | Memantau market opportunity, customer relationship, historical work, strategic fit, dan mengusulkan pursuit. | Memutuskan apakah opportunity layak dibawa ke forum Bid/No-Bid sesuai kewenangan. |

| Tender / Bid Specialist | Mengorkestrasi tender intake, requirement matrix, dokumen, timeline, kolaborasi proposal, submission, clarification, dan audit trail. | Menentukan readiness operasional dan meminta approval sesuai workflow. |

| Estimator / Commercial | Menyusun cost estimate, pricing scenario, margin, dan analisis komersial/kompetitor yang tersedia. | Menetapkan/menyetujui angka penawaran sesuai approval matrix. |

| Technical Engineer / SME | Menyusun respons teknis, metode, resources, schedule, dan menilai dampak perubahan teknis. | Mengesahkan konten teknis yang menjadi komitmen perusahaan. |

| Legal / Compliance Reviewer | Memeriksa persyaratan legal, administratif, kontraktual, dan bukti compliance. | Memberi verification/exception sesuai dokumen tender dan SOP. |

| Approver / Management | Meninjau Bid/No-Bid, submission readiness, pricing/terms, dan keputusan penting sesuai kewenangan. | Mengesahkan pursuit, proposal final, commercial position, dan exception. |

| Project Manager / Delivery Owner | Menerima handover setelah Won dan mengonfirmasi scope, milestone, contract obligations, risks, dan assumptions. | Menerima handover dan mempublikasikan timeline/tugas operasional. |

| System Administrator | Mengelola role, access, konfigurasi integrasi, dan kebijakan sistem yang disahkan. | Tidak dapat mengambil keputusan tender hanya karena memiliki hak admin. |





Satu pegawai dapat memiliki lebih dari satu role, tetapi hak membuat/edit data dipisahkan dari hak approval. Permission harus mengikuti least privilege dan approval matrix klien.

# 5. Ruang Lingkup

## 5.1 In scope MVP

1.  Market intelligence dan opportunity tracking dari input manual, file/import, atau sumber terotorisasi yang tersedia.

2.  Customer/account database, contact, relationship note, dan historical work/project reference yang relevan.

3.  Opportunity qualification, strategic fit, capacity/risk review, dan Bid/No-Bid governance.

