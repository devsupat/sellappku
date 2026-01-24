-- =============================================
-- Sellappku Database Schema & Seed Data
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  features JSONB DEFAULT '[]',
  thumbnail_url TEXT,
  video_url TEXT,
  screenshots JSONB DEFAULT '[]',
  demo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;

-- =============================================
-- APPS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  screenshots JSONB DEFAULT '[]',
  download_type TEXT NOT NULL DEFAULT 'playstore',
  download_url TEXT NOT NULL,
  has_tester BOOLEAN DEFAULT false,
  tester_group_url TEXT,
  tester_invite_url TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  downloads TEXT DEFAULT '0',
  features TEXT[] DEFAULT '{}',
  version TEXT,
  size TEXT,
  updated_date TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);
CREATE INDEX IF NOT EXISTS idx_apps_active ON apps(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_apps_featured ON apps(is_featured) WHERE is_featured = true;

-- =============================================
-- WEBS TABLE (Web Services with dual pricing)
-- =============================================
CREATE TABLE IF NOT EXISTS webs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  screenshots JSONB DEFAULT '[]',
  demo_url TEXT,
  price_source_code TEXT NOT NULL,
  price_subscription TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_webs_slug ON webs(slug);
CREATE INDEX IF NOT EXISTS idx_webs_active ON webs(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_webs_featured ON webs(is_featured) WHERE is_featured = true;

-- =============================================
-- CATEGORIES TABLE (Optional)
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  display_order INT DEFAULT 0
);

-- =============================================
-- ANNOUNCEMENTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_announcements_order ON announcements(display_order);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE webs ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
DROP POLICY IF EXISTS "Public read access" ON products;
CREATE POLICY "Public read access" ON products FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read access" ON apps;
CREATE POLICY "Public read access" ON apps FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read access" ON webs;
CREATE POLICY "Public read access" ON webs FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read access categories" ON categories;
CREATE POLICY "Public read access categories" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access announcements" ON announcements;
CREATE POLICY "Public read access announcements" ON announcements FOR SELECT USING (is_active = true);

-- =============================================
-- SEED DATA: PRODUCTS
-- =============================================
INSERT INTO products (slug, title, short_description, description, price, category, tech_stack, features, demo_url, is_featured) VALUES
(
  'sistem-absensi-qr',
  'Sistem Absensi QR Code',
  'Absensi otomatis dengan scan QR, laporan real-time, cocok untuk sekolah & kantor. Dilengkapi dashboard admin dan export Excel.',
  E'# Sistem Absensi QR Code\n\nAplikasi absensi modern dengan teknologi QR Code yang memudahkan pencatatan kehadiran siswa, guru, atau karyawan.\n\n## Fitur Utama\n\n- **QR Code Generator** - Setiap entitas memiliki QR unik\n- **Scanner Real-time** - Scan cepat dengan kamera HP/webcam\n- **Dashboard Admin** - Monitor kehadiran secara real-time\n- **Laporan Excel** - Export laporan bulanan/tahunan\n- **Multi-class/Departemen** - Kelola banyak grup sekaligus\n- **Notifikasi Telegram** - Kirim laporan otomatis ke orang tua/atasan\n\n## Tech Stack\n\n- **Frontend**: Next.js 14, Tailwind CSS\n- **Backend**: Supabase (PostgreSQL + Auth)\n- **QR**: react-qr-code, html5-qrcode\n- **Hosting**: Vercel-ready',
  'Rp 750.000',
  'educational-tools',
  ARRAY['Next.js', 'Supabase', 'Tailwind', 'QR Scanner', 'Telegram Bot'],
  '[{"title": "QR Code Generator", "description": "Generate QR unik untuk setiap siswa/karyawan"}, {"title": "Real-time Scanner", "description": "Scan absensi langsung dari browser"}, {"title": "Dashboard Admin", "description": "Monitor kehadiran dengan visualisasi data"}, {"title": "Laporan Excel", "description": "Export laporan ke format Excel"}, {"title": "Multi-class Support", "description": "Kelola banyak kelas/departemen"}, {"title": "Telegram Integration", "description": "Kirim notifikasi ke orang tua/atasan"}]'::jsonb,
  'https://demo-absensi.vercel.app',
  true
),
(
  'pos-kasir-umkm',
  'POS Kasir UMKM',
  'Aplikasi kasir lengkap dengan manajemen stok, laporan penjualan, multi outlet. Support printer thermal.',
  E'# POS Kasir UMKM\n\nSistem Point of Sale modern untuk UMKM Indonesia dengan fitur lengkap dan mudah digunakan.\n\n## Fitur Utama\n\n- **Kasir Cepat** - Interface sederhana untuk transaksi cepat\n- **Manajemen Stok** - Pantau persediaan barang real-time\n- **Multi Outlet** - Kelola banyak toko dari satu dashboard\n- **Laporan Lengkap** - Penjualan harian, mingguan, bulanan\n- **Printer Thermal** - Support cetak struk langsung\n- **Offline Mode** - Tetap bisa transaksi tanpa internet',
  'Rp 1.200.000',
  'e-commerce',
  ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'Vite'],
  '[{"title": "Quick Checkout", "description": "Transaksi cepat dengan shortcut keyboard"}, {"title": "Inventory Management", "description": "Kelola stok dengan notifikasi low-stock"}, {"title": "Multi-outlet", "description": "Satu akun untuk banyak toko"}, {"title": "Sales Report", "description": "Laporan detail dengan grafik"}, {"title": "Thermal Printer", "description": "Cetak struk langsung ke printer"}, {"title": "Offline Mode", "description": "Transaksi tanpa internet"}]'::jsonb,
  'https://demo-pos.vercel.app',
  true
),
(
  'landing-page-builder',
  'Landing Page Builder',
  'Buat landing page profesional dalam hitungan menit dengan drag & drop editor.',
  E'# Landing Page Builder\n\nBuat landing page profesional tanpa coding dengan drag & drop editor yang intuitif.\n\n## Fitur Utama\n\n- **Drag & Drop Editor** - Buat halaman tanpa coding\n- **50+ Template** - Pilih dari berbagai template siap pakai\n- **Custom Domain** - Hubungkan domain Anda sendiri\n- **Analytics** - Pantau performa halaman\n- **Form Builder** - Kumpulkan lead dengan mudah\n- **SEO Ready** - Optimasi untuk mesin pencari',
  'Rp 500.000',
  'web-apps',
  ARRAY['Next.js', 'Prisma', 'PostgreSQL', 'TipTap'],
  '[{"title": "Drag & Drop", "description": "Editor visual tanpa coding"}, {"title": "50+ Templates", "description": "Template siap pakai profesional"}, {"title": "Custom Domain", "description": "Gunakan domain sendiri"}, {"title": "Analytics", "description": "Tracking pengunjung built-in"}, {"title": "Form Builder", "description": "Formulir lead capture"}, {"title": "SEO Ready", "description": "Optimasi mesin pencari"}]'::jsonb,
  'https://demo-builder.vercel.app',
  true
),
(
  'school-management-system',
  'School Management System',
  'Sistem informasi sekolah lengkap: data siswa, guru, jadwal, nilai, dan pembayaran.',
  E'# School Management System\n\nSistem informasi sekolah terpadu untuk mengelola seluruh aspek administrasi pendidikan.\n\n## Modul Tersedia\n\n- **Data Master** - Siswa, Guru, Kelas, Mapel\n- **Akademik** - Jadwal, Nilai, Rapor\n- **Keuangan** - SPP, Pembayaran, Invoice\n- **Absensi** - Kehadiran siswa dan guru\n- **Perpustakaan** - Katalog buku, peminjaman\n- **Laporan** - Report generator lengkap',
  'Rp 2.500.000',
  'educational-tools',
  ARRAY['Laravel', 'MySQL', 'Bootstrap', 'jQuery', 'FPDF'],
  '[{"title": "Data Master", "description": "Kelola semua data sekolah"}, {"title": "Akademik", "description": "Jadwal, nilai, rapor digital"}, {"title": "Keuangan", "description": "SPP dan pembayaran"}, {"title": "Absensi", "description": "Rekap kehadiran"}, {"title": "Perpustakaan", "description": "Katalog & peminjaman"}, {"title": "Laporan", "description": "Report generator"}]'::jsonb,
  'https://demo-sims.vercel.app',
  false
),
(
  'admin-dashboard-template',
  'Admin Dashboard Template',
  'Template dashboard admin modern dengan 50+ komponen siap pakai, dark mode, dan responsive.',
  E'# Admin Dashboard Template\n\nTemplate dashboard profesional untuk aplikasi admin Anda.\n\n## Fitur\n\n- **50+ Komponen** - Button, Card, Table, Form, Chart\n- **Dark Mode** - Toggle gelap/terang\n- **Responsive** - Mobile-first design\n- **Customizable** - Mudah di-customize\n- **Well Documented** - Dokumentasi lengkap\n- **Regular Updates** - Update rutin',
  'Rp 350.000',
  'admin-dashboards',
  ARRAY['React', 'Tailwind CSS', 'Chart.js', 'React Query'],
  '[{"title": "50+ Components", "description": "Komponen UI lengkap"}, {"title": "Dark Mode", "description": "Mode gelap/terang"}, {"title": "Responsive", "description": "Semua ukuran layar"}, {"title": "Customizable", "description": "Mudah dikustomisasi"}, {"title": "Documented", "description": "Dokumentasi lengkap"}, {"title": "Updates", "description": "Update berkala"}]'::jsonb,
  NULL,
  false
),
(
  'multi-tenant-saas',
  'Multi-Tenant SaaS Boilerplate',
  'Starter kit untuk membangun aplikasi SaaS dengan multi-tenant, billing, dan auth.',
  E'# Multi-Tenant SaaS Boilerplate\n\nFoundation untuk membangun aplikasi SaaS profesional dengan arsitektur multi-tenant.\n\n## Fitur Enterprise\n\n- **Multi-Tenant** - Isolasi data per tenant\n- **Auth System** - NextAuth dengan berbagai provider\n- **Billing** - Integrasi Stripe/Midtrans\n- **Team Management** - Undang member, role-based\n- **API Rate Limiting** - Proteksi API\n- **Email Templates** - Template email siap pakai',
  'Rp 3.500.000',
  'web-apps',
  ARRAY['Next.js', 'Prisma', 'Stripe', 'NextAuth', 'PostgreSQL'],
  '[{"title": "Multi-Tenant", "description": "Arsitektur multi-tenant"}, {"title": "Authentication", "description": "NextAuth + social login"}, {"title": "Billing", "description": "Payment gateway ready"}, {"title": "Team", "description": "Manajemen tim & role"}, {"title": "Rate Limit", "description": "API protection"}, {"title": "Email", "description": "Template email"}]'::jsonb,
  'https://demo-saas.vercel.app',
  true
),
(
  'ecommerce-fullstack',
  'E-commerce Fullstack',
  'Toko online lengkap dengan keranjang, checkout, payment gateway, dan admin panel.',
  E'# E-commerce Fullstack\n\nSolusi e-commerce lengkap untuk toko online Anda.\n\n## Fitur\n\n- **Product Catalog** - Kategori, filter, search\n- **Shopping Cart** - Keranjang belanja\n- **Checkout** - Multi-step checkout\n- **Payment** - Midtrans integration\n- **Admin Panel** - Kelola produk & pesanan\n- **Order Tracking** - Lacak pengiriman',
  'Rp 1.800.000',
  'e-commerce',
  ARRAY['Next.js', 'Supabase', 'Midtrans', 'Tailwind CSS'],
  '[{"title": "Product Catalog", "description": "Katalog produk lengkap"}, {"title": "Shopping Cart", "description": "Keranjang belanja"}, {"title": "Checkout", "description": "Proses checkout mudah"}, {"title": "Payment", "description": "Midtrans gateway"}, {"title": "Admin Panel", "description": "Panel admin lengkap"}, {"title": "Tracking", "description": "Lacak pengiriman"}]'::jsonb,
  'https://demo-ecommerce.vercel.app',
  false
),
(
  'quiz-game-app',
  'Quiz Game App',
  'Aplikasi kuis interaktif dengan leaderboard, timer, dan berbagai kategori soal.',
  E'# Quiz Game App\n\nAplikasi kuis yang seru dan edukatif untuk semua usia.\n\n## Fitur Game\n\n- **Multiple Categories** - Berbagai kategori soal\n- **Timer Mode** - Tantangan waktu\n- **Leaderboard** - Papan peringkat global\n- **Achievements** - Unlock achievement\n- **Daily Quiz** - Kuis harian\n- **Offline Mode** - Main tanpa internet',
  'Rp 600.000',
  'games',
  ARRAY['Flutter', 'Firebase', 'Dart'],
  '[{"title": "Categories", "description": "Berbagai kategori"}, {"title": "Timer", "description": "Mode waktu"}, {"title": "Leaderboard", "description": "Peringkat global"}, {"title": "Achievements", "description": "Unlock achievement"}, {"title": "Daily Quiz", "description": "Kuis harian"}, {"title": "Offline", "description": "Mode offline"}]'::jsonb,
  NULL,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  tech_stack = EXCLUDED.tech_stack,
  features = EXCLUDED.features,
  demo_url = EXCLUDED.demo_url,
  is_featured = EXCLUDED.is_featured,
  updated_at = NOW();

-- =============================================
-- SEED DATA: APPS
-- =============================================
INSERT INTO apps (slug, title, short_description, description, download_type, download_url, has_tester, tester_group_url, tester_invite_url, rating, downloads, features, version, size, updated_date, is_featured) VALUES
(
  'kalender-hijriah',
  'Kalender Hijriah Indonesia',
  'Kalender lengkap dengan jadwal sholat, tanggal hijriah, dan hari libur nasional Indonesia.',
  E'Aplikasi kalender terlengkap untuk umat Muslim Indonesia. Menampilkan kalender Hijriah dan Masehi secara bersamaan, dilengkapi dengan jadwal sholat akurat untuk seluruh kota di Indonesia.\n\n## Fitur Unggulan\n\n- **Dual Calendar** - Tampilan kalender Hijriah dan Masehi\n- **Jadwal Sholat** - Waktu sholat akurat berdasarkan lokasi GPS\n- **Hari Libur** - Daftar lengkap hari libur nasional dan hari besar Islam\n- **Notifikasi** - Pengingat waktu sholat dan event penting\n- **Widget** - Widget home screen untuk akses cepat\n- **Offline Mode** - Tetap berfungsi tanpa internet',
  'playstore',
  'https://play.google.com/store/apps/details?id=com.sellappku.kalender',
  true,
  'https://groups.google.com/g/kalender-hijriah-tester',
  'https://play.google.com/apps/testing/com.sellappku.kalender',
  4.8,
  '10K+',
  ARRAY['Kalender Hijriah & Masehi', 'Jadwal Sholat Akurat', 'Hari Libur Nasional', 'Notifikasi Adzan', 'Widget Home Screen', 'Mode Offline'],
  '2.5.1',
  '15 MB',
  '10 Jan 2026',
  true
),
(
  'puzzle-game-adventure',
  'Brain Puzzle Adventure',
  'Game puzzle seru untuk mengasah otak dengan 100+ level menantang dan leaderboard global.',
  E'Tantang otakmu dengan 100+ level puzzle yang seru dan menantang! Mulai dari level mudah hingga expert, cocok untuk semua usia.\n\n## Fitur Game\n\n- **100+ Level** - Puzzle beragam dengan tingkat kesulitan bertingkat\n- **Daily Challenge** - Tantangan baru setiap hari\n- **Leaderboard** - Bersaing dengan pemain seluruh dunia\n- **Hints System** - Bantuan saat stuck di level tertentu\n- **Achievement** - Unlock berbagai achievement menarik\n- **No Ads** - Versi premium tanpa iklan',
  'playstore',
  'https://play.google.com/store/apps/details?id=com.sellappku.puzzle',
  true,
  'https://groups.google.com/g/puzzle-game-tester',
  'https://play.google.com/apps/testing/com.sellappku.puzzle',
  4.5,
  '5K+',
  ARRAY['100+ Puzzle Levels', 'Daily Challenges', 'Global Leaderboard', 'Hints System', 'Achievements', 'Premium Ad-Free'],
  '1.8.0',
  '45 MB',
  '5 Jan 2026',
  true
),
(
  'expense-tracker',
  'Expense Tracker Pro',
  'Catat pengeluaran harian dengan mudah, visualisasi grafik, dan export laporan.',
  E'Kelola keuangan pribadimu dengan aplikasi pencatat pengeluaran yang simpel dan powerful.\n\n## Fitur Utama\n\n- **Quick Entry** - Catat pengeluaran dalam hitungan detik\n- **Kategori Custom** - Buat kategori sesuai kebutuhanmu\n- **Grafik Visual** - Lihat pola pengeluaran dalam bentuk grafik\n- **Export PDF/Excel** - Download laporan bulanan\n- **Budget Tracker** - Set budget dan pantau pengeluaran\n- **Cloud Sync** - Sinkronisasi antar device',
  'drive',
  'https://drive.google.com/file/d/1234567890/view',
  false,
  NULL,
  NULL,
  4.2,
  '1K+',
  ARRAY['Quick Entry', 'Custom Categories', 'Visual Charts', 'Export Reports', 'Budget Tracking', 'Cloud Sync'],
  '3.0.2',
  '12 MB',
  '15 Jan 2026',
  false
),
(
  'quran-audio',
  'Al-Quran Audio Offline',
  'Aplikasi Al-Quran lengkap dengan audio murotal 30 qari, terjemahan, dan tafsir.',
  E'Aplikasi Al-Quran terlengkap dengan audio murotal dari 30 qari terkenal. Dilengkapi terjemahan bahasa Indonesia dan tafsir.\n\n## Fitur Lengkap\n\n- **30 Juz** - Al-Quran lengkap dengan tajwid\n- **30 Qari** - Pilihan qari favorit\n- **Terjemahan** - Bahasa Indonesia\n- **Tafsir** - Penjelasan ayat\n- **Bookmark** - Simpan ayat favorit\n- **Offline** - Download untuk offline',
  'playstore',
  'https://play.google.com/store/apps/details?id=com.sellappku.quran',
  false,
  NULL,
  NULL,
  4.9,
  '50K+',
  ARRAY['30 Juz Lengkap', '30 Qari Pilihan', 'Terjemahan Indonesia', 'Tafsir Lengkap', 'Bookmark Ayat', 'Download Offline'],
  '4.2.0',
  '25 MB',
  '20 Jan 2026',
  true
),
(
  'todo-reminder',
  'Todo & Reminder',
  'Aplikasi to-do list dengan pengingat, kategori, dan sinkronisasi cloud.',
  E'Kelola tugas harianmu dengan aplikasi todo yang simpel namun powerful.\n\n## Fitur\n\n- **Quick Add** - Tambah tugas dengan cepat\n- **Categories** - Organisasi dengan kategori\n- **Reminders** - Pengingat waktu\n- **Recurring** - Tugas berulang\n- **Cloud Sync** - Sync antar device\n- **Widget** - Widget home screen',
  'mediafire',
  'https://www.mediafire.com/file/todo-reminder.apk',
  true,
  'https://t.me/todo_reminder_tester',
  NULL,
  4.0,
  '500+',
  ARRAY['Quick Add Todo', 'Categories', 'Reminders', 'Recurring Tasks', 'Cloud Sync', 'Home Widget'],
  '2.1.0',
  '8 MB',
  '18 Jan 2026',
  false
),
(
  'word-game',
  'Word Master Indonesia',
  'Game tebak kata seru dengan ribuan kata bahasa Indonesia dan berbagai mode permainan.',
  E'Game kata yang mengasah vocabulary bahasa Indonesia Anda.\n\n## Mode Permainan\n\n- **Classic** - Tebak kata 5 huruf\n- **Time Attack** - Lawan waktu\n- **Multiplayer** - Main bareng teman\n- **Daily Word** - Kata harian\n- **Theme Mode** - Kata berdasarkan tema\n- **Kids Mode** - Mode anak-anak',
  'playstore',
  'https://play.google.com/store/apps/details?id=com.sellappku.wordgame',
  true,
  'https://groups.google.com/g/wordmaster-tester',
  'https://play.google.com/apps/testing/com.sellappku.wordgame',
  4.6,
  '2K+',
  ARRAY['Classic Mode', 'Time Attack', 'Multiplayer', 'Daily Word', 'Theme Mode', 'Kids Mode'],
  '1.5.0',
  '20 MB',
  '12 Jan 2026',
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  download_type = EXCLUDED.download_type,
  download_url = EXCLUDED.download_url,
  has_tester = EXCLUDED.has_tester,
  tester_group_url = EXCLUDED.tester_group_url,
  tester_invite_url = EXCLUDED.tester_invite_url,
  rating = EXCLUDED.rating,
  downloads = EXCLUDED.downloads,
  features = EXCLUDED.features,
  version = EXCLUDED.version,
  size = EXCLUDED.size,
  updated_date = EXCLUDED.updated_date,
  is_featured = EXCLUDED.is_featured;

-- =============================================
-- SEED DATA: WEBS (Web Services)
-- =============================================
INSERT INTO webs (slug, title, short_description, description, demo_url, price_source_code, price_subscription, tech_stack, features, is_featured) VALUES
(
  'url-shortener',
  'URL Shortener Pro',
  'Layanan pemendek URL dengan statistik klik, custom slug, dan QR code generator.',
  E'Layanan pemendek URL lengkap untuk bisnis dan personal.\n\n## Fitur Utama\n\n- **Custom Slug** - Buat URL pendek dengan nama custom\n- **Statistik Klik** - Pantau jumlah klik real-time\n- **QR Code** - Generate QR code otomatis untuk setiap link\n- **Bulk Shorten** - Pendekkan banyak URL sekaligus\n- **API Access** - Integrasi dengan aplikasi Anda\n- **Analytics Dashboard** - Dashboard statistik lengkap',
  'https://demo-shortener.vercel.app',
  'Rp 200.000',
  'Rp 15.000',
  ARRAY['Next.js', 'Supabase', 'Tailwind CSS'],
  ARRAY['Custom URL Slug', 'Click Statistics', 'QR Code Generator', 'Bulk Shorten', 'API Access', 'Analytics Dashboard'],
  true
),
(
  'invoice-generator',
  'Invoice Generator',
  'Buat invoice profesional dalam hitungan detik, kirim via email atau WhatsApp.',
  E'Solusi pembuatan invoice profesional untuk freelancer dan UMKM.\n\n## Fitur\n\n- **Template Profesional** - Pilihan template invoice modern\n- **Multi Currency** - Support berbagai mata uang\n- **Auto Calculate** - Hitung total, pajak, diskon otomatis\n- **Send via Email** - Kirim invoice langsung ke email client\n- **PDF Export** - Download invoice dalam format PDF\n- **Client Management** - Simpan data client untuk penggunaan berulang',
  'https://demo-invoice.vercel.app',
  'Rp 250.000',
  'Rp 20.000',
  ARRAY['Next.js', 'React PDF', 'Nodemailer'],
  ARRAY['Professional Templates', 'Multi Currency', 'Auto Calculate', 'Email Sending', 'PDF Export', 'Client Management'],
  true
),
(
  'qr-menu-restaurant',
  'QR Menu Restaurant',
  'Menu digital untuk restoran dengan scan QR, multi bahasa, dan update real-time.',
  E'Solusi menu digital modern untuk restoran, cafe, dan food court.\n\n## Keunggulan\n\n- **Scan QR** - Customer scan QR untuk lihat menu\n- **Multi Bahasa** - Support Indonesia & English\n- **Real-time Update** - Update menu langsung tanpa cetak ulang\n- **Kategori Menu** - Organisasi menu dengan kategori\n- **Foto Menu** - Tampilkan foto makanan\n- **Harga Dinamis** - Ubah harga kapan saja',
  'https://demo-qrmenu.vercel.app',
  'Rp 300.000',
  'Rp 25.000',
  ARRAY['Next.js', 'Supabase', 'Tailwind CSS'],
  ARRAY['QR Code Scan', 'Multi Language', 'Real-time Update', 'Categories', 'Food Photos', 'Dynamic Pricing'],
  true
),
(
  'link-in-bio',
  'Link in Bio Page',
  'Halaman link in bio untuk Instagram, TikTok dengan analytics dan custom theme.',
  E'Buat halaman link in bio profesional untuk social media Anda.\n\n## Fitur\n\n- **Custom Domain** - Gunakan domain sendiri\n- **Multiple Links** - Tambah banyak link\n- **Themes** - Pilihan theme menarik\n- **Analytics** - Statistik klik per link\n- **Social Icons** - Tampilkan icon social media\n- **Responsive** - Tampil sempurna di semua device',
  'https://demo-linkinbio.vercel.app',
  'Rp 150.000',
  'Rp 10.000',
  ARRAY['Next.js', 'Tailwind CSS', 'Vercel'],
  ARRAY['Custom Domain', 'Multiple Links', 'Custom Themes', 'Click Analytics', 'Social Icons', 'Responsive Design'],
  false
),
(
  'form-builder',
  'Form Builder Online',
  'Buat form online dengan drag & drop, terima response di email atau Google Sheet.',
  E'Buat form survey, pendaftaran, atau order dengan mudah.\n\n## Fitur Form\n\n- **Drag & Drop** - Buat form tanpa coding\n- **Input Types** - Text, email, number, date, file, dll\n- **Email Notification** - Notifikasi setiap ada response\n- **Google Sheet** - Simpan response ke Google Sheet\n- **Embed** - Pasang form di website manapun\n- **Validation** - Validasi input otomatis',
  'https://demo-formbuilder.vercel.app',
  'Rp 350.000',
  'Rp 30.000',
  ARRAY['Next.js', 'React DnD', 'Supabase'],
  ARRAY['Drag & Drop Builder', 'Multiple Input Types', 'Email Notifications', 'Google Sheet Sync', 'Embed Forms', 'Input Validation'],
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  demo_url = EXCLUDED.demo_url,
  price_source_code = EXCLUDED.price_source_code,
  price_subscription = EXCLUDED.price_subscription,
  tech_stack = EXCLUDED.tech_stack,
  features = EXCLUDED.features,
  is_featured = EXCLUDED.is_featured;

-- =============================================
-- SEED DATA: CATEGORIES
-- =============================================
INSERT INTO categories (name, slug, icon, display_order) VALUES
('Web Apps', 'web-apps', 'Globe', 1),
('Mobile Apps', 'mobile-apps', 'Smartphone', 2),
('Admin Dashboard', 'admin-dashboards', 'LayoutDashboard', 3),
('E-commerce', 'e-commerce', 'ShoppingCart', 4),
('Educational Tools', 'educational-tools', 'GraduationCap', 5),
('Games', 'games', 'Gamepad2', 6),
('Web Services', 'web-services', 'Server', 7)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- SEED DATA: ANNOUNCEMENTS
-- =============================================
INSERT INTO announcements (message, is_active, display_order) VALUES
('🎉 Promo Januari! Diskon 20% untuk semua source code hingga akhir bulan', true, 1),
('💬 Konsultasi gratis via WhatsApp 24/7 - Tanya apapun tentang produk kami', true, 2),
('🚀 Produk baru: Invoice Generator & QR Menu Restaurant sudah tersedia!', true, 3),
('⚡ Gratis update minor version selamanya untuk semua produk', true, 4)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Seed completed! Products: ' || (SELECT COUNT(*) FROM products) || ', Apps: ' || (SELECT COUNT(*) FROM apps) || ', Webs: ' || (SELECT COUNT(*) FROM webs) || ', Announcements: ' || (SELECT COUNT(*) FROM announcements) || ', Categories: ' || (SELECT COUNT(*) FROM categories);
