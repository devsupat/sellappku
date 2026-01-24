1. Product Overview
Product Name: Sellappku by Ahmad
Tagline: Premium Source Code and webs ai – Direct from Developer GuruDokAi, No Middleman, No Fees
Vision:
A professional, conversion-optimized personal storefront for selling custom-built source code directly to clients. This is NOT a marketplace—every product is your original work.
Core Objectives:

Establish personal brand as a trusted indie developer
Showcase portfolio with production-ready source code
Generate qualified leads through strategic WhatsApp funnel
Maintain zero infrastructure costs

Technology Stack:

Frontend: Next.js 14+ (App Router)
UI Library: Joko UI (shadcn/ui compatible)
Database: Supabase (PostgreSQL, Free tier)
Hosting: Vercel (Free tier)
Analytics: Vercel Analytics (Free)


2. Design Principles
Non-Negotiable Requirements

Zero Cost Architecture

All services must remain on free tiers
No payment processing integrations
No server-side infrastructure costs


WhatsApp-First Funnel

No shopping cart or checkout flow
Direct conversion path to WhatsApp consultation
Pre-filled messages with product context


Clarity Over Complexity

Users understand value proposition in < 5 seconds
Maximum 3 clicks from landing to WhatsApp
Mobile-first, accessible design


Personal Brand Authenticity

Showcase your story and credibility
Direct relationship with customers
Trust-building through transparency




3. Target Audience
Primary Users

Educators: Teachers needing school management systems
SME Owners: Business owners wanting custom automation
Content Creators: YouTubers/influencers needing specialized tools
Early-Stage Founders: Entrepreneurs validating MVP ideas

User Characteristics

Non-technical background
Budget-conscious
Value personal support over corporate solutions
Need working solutions, not frameworks


4. Value Proposition
Unique Selling Points

Direct Developer Access

Speak with the person who built it
No support ticket hell
Real-time problem solving


Customization Potential

Source code included, not SaaS lock-in
Can request modifications
White-label ready


Transparent Pricing

One-time payment, no subscriptions
See exactly what you're buying
No hidden costs


Quality Assurance

Production-tested code
Full documentation included
Active maintenance commitment




5. Feature Specification (MVP)
5.1 Landing Page
Hero Section:
H1: "Punya Ide Aplikasi Tapi Tidak Bisa Ngoding?"
Subheadline: "Saya Sudah Siapkan Source Code Siap Pakai. 
Hemat Waktu, Hemat Biaya, Langsung Deploy."
Components:

Hero with gradient background + code snippet animation
3-column benefit grid (Hemat Waktu, Hemat Biaya, Full Support)
Social proof section (testimonials/stats)
Featured products carousel
Trust signals (tech stack badges, GitHub stats)
CTA: "Lihat Semua Produk" → Catalog


5.2 Product Catalog
Layout:

Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
Filter by category (sticky sidebar on desktop)
Search by keyword (debounced)

Product Card:
jsx- Thumbnail (16:9 aspect ratio)
- Category badge (top-left overlay)
- Title (max 2 lines, truncate)
- Price (large, prominent)
- Tech stack icons (max 4 visible)
- CTA: "Lihat Detail"
```

**Categories:**
- Web Apps
- Mobile Apps
- Admin Dashboards
- E-commerce
- Educational Tools
- Games

---

### 5.3 Product Detail Page

**Structure:**

1. **Media Section** (50% viewport width on desktop)
   - Video demo (YouTube/Vimeo embed, autoplay muted)
   - Screenshot slider (Swiper.js, lazy load)
   - Thumbnail gallery

2. **Info Section** (50% viewport width on desktop)
   - Product title + category
   - Price (large, with "One-time payment" label)
   - Short description (2-3 sentences)
   - Key features list (max 6 bullets)
   - Tech stack tags
   - **Primary CTA:** "Tanya via WhatsApp"
   - **Secondary CTA:** "Lihat Demo Live" (if available)

3. **Detailed Description** (full width)
   - Markdown content support
   - Code syntax highlighting
   - Expandable sections (What's Included, Requirements, Support)

4. **FAQ Accordion**
   - "Apakah bisa custom?"
   - "Berapa lama support?"
   - "Format pengiriman?"

---

### 5.4 WhatsApp Integration

**Pre-filled Message Template:**
```
Halo Ahmad, saya tertarik dengan [{PRODUCT_TITLE}].

Saya ingin tahu lebih lanjut tentang:
- Fitur lengkapnya
- Cara installasi
- Harga dan metode pembayaran

Terima kasih!
Implementation:
javascriptconst whatsappURL = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
```

---

### 5.5 About/Trust Section

**"Kenapa Beli dari Saya?" Page**

- Professional headshot photo
- Bio narrative:
```
  "Saya Ahmad, guru TIK yang juga indie developer. 
  Sejak 2018, saya membuat tools untuk memudahkan pekerjaan 
  saya dan rekan guru. Sekarang saya share ke publik."

Credibility markers:

Years of experience
Number of satisfied clients
GitHub contribution graph
Tech certifications (if any)


Work principles (Fast Response, No BS, Fair Pricing)


6. Data Architecture
6.1 Supabase Schema
Table: products
sqlCREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT, -- Markdown supported
  price TEXT NOT NULL, -- Store as text for flexibility (e.g., "Rp 500.000")
  category TEXT NOT NULL,
  tech_stack TEXT[], -- Array of technologies
  features JSONB, -- Array of feature objects {title, description}
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  screenshots JSONB, -- Array of {url, caption}
  demo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
Table: categories (optional, for dynamic filtering)
sqlCREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT, -- Lucide icon name
  display_order INT DEFAULT 0
);

6.2 Example Product Data
json{
  "id": "uuid-here",
  "slug": "sistem-absensi-siswa",
  "title": "Sistem Absensi Siswa Berbasis QR",
  "short_description": "Absensi otomatis dengan scan QR, laporan real-time, cocok untuk sekolah.",
  "description": "# Fitur Utama\n\n- QR Code generator per siswa\n- Dashboard real-time...",
  "price": "Rp 750.000",
  "category": "Educational Tools",
  "tech_stack": ["Next.js", "Supabase", "Tailwind"],
  "features": [
    {"title": "Multi-class Support", "description": "Kelola banyak kelas..."},
    {"title": "Export Excel", "description": "Download laporan..."}
  ],
  "thumbnail_url": "/images/absensi-thumb.jpg",
  "video_url": "https://youtube.com/watch?v=...",
  "screenshots": [
    {"url": "/images/screenshot1.jpg", "caption": "Dashboard utama"},
    {"url": "/images/screenshot2.jpg", "caption": "QR Scanner"}
  ],
  "demo_url": "https://demo-absensi.vercel.app",
  "is_featured": true,
  "is_active": true
}
```

---

## 7. System Architecture

### 7.1 Architecture Diagram
```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────────────────────┐
│         Vercel Edge Network         │
│  (CDN + Static Site Generation)     │
└──────┬──────────────────────────────┘
       │
       ├─── Static Pages (Landing, About)
       │
       ├─── ISR Pages (Catalog, Product Details)
       │    (Revalidate every 60s)
       │
       └─── API Routes (optional, for search)
              │
              ▼
       ┌─────────────────┐
       │    Supabase     │
       │   PostgreSQL    │
       │  (Free Tier)    │
       └─────────────────┘
7.2 Technical Decisions
Rendering Strategy:

Landing Page: Static Generation (SSG)
Catalog: Incremental Static Regeneration (ISR, revalidate 60s)
Product Detail: ISR with dynamic generateStaticParams
Search: Client-side filtering (if < 50 products), else API route

Why ISR?

Near-instant page loads (pre-rendered)
Fresh data without full rebuilds
SEO-friendly
Zero cost on Vercel free tier

Data Fetching:
typescript// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// lib/products.ts
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
```

---

## 8. Project Structure
```
sourcecode-sales/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Landing page
│   ├── products/
│   │   ├── page.tsx            # Catalog page (ISR)
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail (ISR)
│   ├── about/
│   │   └── page.tsx            # About/trust page
│   └── api/
│       └── search/
│           └── route.ts        # Optional search API
├── components/
│   ├── ui/                     # Joko UI components
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── VideoPlayer.tsx
│   ├── ImageSlider.tsx
│   ├── WhatsAppButton.tsx
│   ├── TrustBadges.tsx
│   └── Navigation.tsx
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── products.ts             # Product data helpers
│   ├── utils.ts                # Utility functions
│   └── constants.ts            # Config constants
├── public/
│   ├── images/
│   └── videos/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── tailwind.config.ts
└── package.json

9. Development Plan
Phase 1: Foundation (Week 1)
Goal: MVP with 3 products live

 Initialize Next.js project with Joko UI
 Set up Supabase project and products table
 Build landing page with hero + benefits
 Create product catalog page (static data)
 Build product detail template
 Implement WhatsApp integration
 Deploy to Vercel

Deliverable: Functional site with hard-coded products

Phase 2: Dynamic Content (Week 2)
Goal: Connect to Supabase, add 10 products

 Integrate Supabase client
 Migrate hard-coded products to database
 Implement ISR for catalog and detail pages
 Add image optimization
 Build About page with personal story
 Add basic SEO (metadata, Open Graph)

Deliverable: Database-driven site with SEO

Phase 3: Enhancement (Week 3-4)
Goal: Improve UX and conversion

 Add category filtering (client-side)
 Implement search functionality
 Add video demo players
 Create screenshot slider component
 Build FAQ accordion
 Add testimonial section (if available)
 Implement analytics tracking

Deliverable: Polished, conversion-optimized site

Phase 4: Growth (Ongoing)
Goal: Content and SEO

 Add blog for SEO (tutorials, case studies)
 Implement i18n for English version
 Create sitemap and robots.txt
 Optimize images with WebP
 Add structured data (JSON-LD)
 Build email capture (optional, via Formspree)


10. Content Strategy
10.1 Copywriting Guidelines
Tone of Voice:

Conversational but professional
Empathetic (understand user pain points)
Confident without arrogance
Indonesian-first, English-optional

Messaging Hierarchy:

Pain Point: "Punya ide tapi tidak bisa ngoding?"
Solution: "Source code siap pakai dari developer berpengalaman"
Benefit: "Hemat waktu 3 bulan, hemat biaya 10 juta"
Proof: Testimonials, demo videos
CTA: "Konsultasi gratis via WhatsApp"


10.2 Product Descriptions Template
markdown## [Product Title]

**Untuk siapa?**
[Target user persona dan use case]

**Masalah yang diselesaikan:**
- [Pain point 1]
- [Pain point 2]
- [Pain point 3]

**Yang Anda dapatkan:**
- ✅ Full source code (commented)
- ✅ Dokumentasi instalasi
- ✅ Video tutorial setup
- ✅ 30 hari support via WhatsApp
- ✅ Update gratis (minor version)

**Tech Stack:**
[List with brief explanation for non-tech users]

**Live Demo:** [Link]
```

---

## 11. Internationalization (i18n)

### Implementation (Optional Phase)

**Strategy:**
- Default: Indonesian (90% of traffic)
- Optional: English (for portfolio/showcase)

**Tool:** `next-intl` or `next-i18next`

**File Structure:**
```
messages/
├── id.json
└── en.json
Language Switcher:

Floating button (bottom-right)
Persist choice in localStorage
Apply to all pages


12. Performance Targets
Core Web Vitals

LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1

Optimization Techniques

Images:

Use Next.js <Image> component
Serve WebP with JPEG fallback
Lazy load below fold images


Fonts:

Self-host Google Fonts
Use font-display: swap


Code Splitting:

Dynamic imports for heavy components
Separate vendor bundles


Caching:

Aggressive caching headers on Vercel
Supabase query caching (60s TTL)




13. Analytics & Metrics
Key Performance Indicators (KPIs)
Business Metrics:

WhatsApp click-through rate (CTR)
Product page → WhatsApp conversion rate
Avg. time on product pages
Returning visitor rate

Traffic Metrics:

Unique visitors/month
Top traffic sources
Top landing pages
Bounce rate by page

Product Metrics:

Most viewed products
Category popularity
Demo link clicks

Implementation
Vercel Analytics (Free):
typescript// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
Custom Event Tracking:
typescript// Track WhatsApp clicks
import { track } from '@vercel/analytics';

function handleWhatsAppClick(productTitle: string) {
  track('whatsapp_click', { product: productTitle });
  window.open(whatsappURL, '_blank');
}

14. SEO Strategy
On-Page SEO
Metadata Template:
typescript// app/products/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);
  
  return {
    title: `${product.title} | SourceCode by Ahmad`,
    description: product.short_description,
    openGraph: {
      title: product.title,
      description: product.short_description,
      images: [product.thumbnail_url],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.short_description,
      images: [product.thumbnail_url],
    }
  };
}
Structured Data (JSON-LD):
json{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Sistem Absensi Siswa Berbasis QR",
  "description": "...",
  "image": "https://...",
  "offers": {
    "@type": "Offer",
    "price": "750000",
    "priceCurrency": "IDR"
  }
}

Content Marketing (Phase 4)
Blog Topics (SEO-focused):

"Cara Membuat Sistem Absensi Sendiri (Step-by-Step)"
"Next.js vs Laravel: Mana yang Lebih Cocok untuk UMKM?"
"Hemat 10 Juta: Beli Source Code vs Hire Developer"


15. Roadmap
Q1 2026 - MVP Launch

✅ Landing + 3 products live
✅ WhatsApp funnel functional
✅ Vercel deployment
✅ Basic SEO setup

Q2 2026 - Growth

Add 10 more products
Implement search & filters
Add testimonials section
Launch blog (5 articles)

Q3 2026 - Scale

English version (i18n)
Advanced analytics
Email capture for newsletter
Affiliate program (referral links)

Q4 2026 - Optimize

A/B test CTAs
Video content marketing
Partnerships with educators
Premium product tier


16. Risk Mitigation
Potential Risks & Solutions
RiskImpactMitigationSupabase free tier limitsHighMonitor usage, implement caching, upgrade if revenue justifiesVercel bandwidth exceededMediumOptimize images, use CDN for videos (YouTube)WhatsApp spam/unqualified leadsLowAdd qualification questions in pre-filled messageProduct piracyMediumWatermark demos, deliver via secure link after paymentSEO not rankingLowFocus on long-tail keywords, build backlinks via guest posts

17. Success Criteria
Launch Success (30 days)

500 unique visitors
50 WhatsApp clicks
5 closed sales
90+ Lighthouse score

6-Month Success

2,000 visitors/month
10% WhatsApp CTR
20 sales total
Profitable (revenue > time invested)


README.md
markdown# SourceCode by Ahmad

> Jual Source Code Pribadi – Langsung dari Developer, Tanpa Marketplace, Tanpa Potongan.

Personal storefront untuk menjual source code custom-built dengan zero infrastructure cost.

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** Joko UI / shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Styling:** Tailwind CSS
- **Analytics:** Vercel Analytics

## 📁 Project Structure
```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   ├── products/        # Product catalog & detail
│   └── about/           # About/trust page
├── components/          # React components
│   ├── ui/             # Joko UI components
│   └── ...             # Custom components
├── lib/                # Utilities
│   ├── supabase.ts     # Supabase client
│   └── products.ts     # Product helpers
└── public/             # Static assets
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Vercel account

### Installation
```bash
# Clone repository
git clone https://github.com/devsupat/sellappku.git
cd sourcecode-sales

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=6285189536359

# Site
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Database Setup

### Supabase Schema
```sql
-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  category TEXT NOT NULL,
  tech_stack TEXT[],
  features JSONB,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT,
  screenshots JSONB,
  demo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
```

### Seed Data
```bash
npm run seed
```

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy
```bash
vercel --prod
```

### Post-Deployment

- [ ] Configure custom domain
- [ ] Set up Vercel Analytics
- [ ] Test WhatsApp integration
- [ ] Submit sitemap to Google

## 📈 Performance

- ✅ Lighthouse Score: 95+
- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3s
- ✅ Core Web Vitals: All green

## 🎨 Design System

Based on Joko UI with custom modifications:

- **Colors:** Custom brand palette
- **Typography:** Inter (headings), System (body)
- **Spacing:** 4px base unit
- **Breakpoints:** Mobile-first (640px, 768px, 1024px, 1280px)

## 🔒 Security

- No authentication required (public site)
- No payment processing (WhatsApp-based)
- Environment variables for sensitive data
- HTTPS enforced (Vercel default)

## 📄 License

MIT License - Free to use for personal projects

## 🤝 Contributing

This is a personal project, but suggestions welcome via issues.

## 📞 Contact

- **WhatsApp:** +62 812-3456-789
- **Email:** ahmad@example.com
- **Website:** https://sourcecode.example.com

---

**Built with ❤️ by Ahmad | Zero Cost, Maximum Impact**

ARCHITECTURE.md
markdown# System Architecture

## Overview

This is a **Jamstack** application with a serverless architecture designed for zero operational cost while maintaining professional quality and performance.

## Architecture Diagram
```
┌──────────────────────────────────────────────────────────┐
│                        User Browser                       │
└────────────────────────┬─────────────────────────────────┘
                         │
                         │ HTTPS (HTTP/2)
                         ▼
┌──────────────────────────────────────────────────────────┐
│               Vercel Edge Network (CDN)                   │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Static Assets (Images, CSS, JS) - Edge Cached    │  │
│  └────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌────────┐     ┌─────────┐    ┌──────────┐
    │  SSG   │     │   ISR   │    │   API    │
    │ Pages  │     │  Pages  │    │  Routes  │
    └────────┘     └─────────┘    └──────────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   Supabase Cloud    │
              │  ┌───────────────┐  │
              │  │  PostgreSQL   │  │
              │  │   Database    │  │
              │  └───────────────┘  │
              │  ┌───────────────┐  │
              │  │   Storage     │  │
              │  │  (Optional)   │  │
              │  └───────────────┘  │
              └─────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   External APIs     │
              │  ┌───────────────┐  │
              │  │   WhatsApp    │  │
              │  │    Fontee  │  │
              │  └───────────────┘  │
              └─────────────────────┘
```

## Component Breakdown

### 1. Frontend Layer (Next.js)

**Rendering Strategies:**

| Page Type | Strategy | Revalidation | Reasoning |
|-----------|----------|--------------|-----------|
| Landing (`/`) | SSG | On build | Rarely changes, max performance |
| About (`/about`) | SSG | On build | Static content |
| Catalog (`/products`) | ISR | 60 seconds | Semi-dynamic, frequent updates |
| Product Detail (`/products/[slug]`) | ISR | 60 seconds | Product data may change |
| Search Results | CSR | N/A | User-specific, no SEO benefit |

**Why ISR over SSR?**
- **Performance:** Pre-rendered pages = instant load
- **Cost:** No server runtime = free hosting
- **SEO:** Full HTML indexing by search engines
- **Freshness:** Automatic revalidation keeps data current

**Rendering Flow:**
```typescript
// app/products/page.tsx - ISR Example
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProductsPage() {
  const products = await getProducts(); // Fetch at build/revalidate time
  
  return ;
}
```

---

### 2. Data Layer (Supabase)

**Database Schema:**
```sql
products
├── id (uuid, PK)
├── slug (text, unique, indexed)
├── title (text)
├── short_description (text)
├── description (text, markdown)
├── price (text)
├── category (text, indexed)
├── tech_stack (text[])
├── features (jsonb)
├── thumbnail_url (text)
├── video_url (text)
├── screenshots (jsonb)
├── demo_url (text)
├── is_featured (boolean, indexed)
├── is_active (boolean)
├── created_at (timestamptz)
└── updated_at (timestamptz)
```

**Access Patterns:**

1. **Get all active products** (Catalog page)
```sql
   SELECT * FROM products 
   WHERE is_active = true 
   ORDER BY created_at DESC;
```

2. **Get product by slug** (Detail page)
```sql
   SELECT * FROM products 
   WHERE slug = $1 AND is_active = true 
   LIMIT 1;
```

3. **Get featured products** (Landing page)
```sql
   SELECT * FROM products 
   WHERE is_featured = true AND is_active = true 
   LIMIT 3;
```

**Supabase Client Configuration:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: { persistSession: false }, // No auth needed
    db: { schema: 'public' },
    global: {
      headers: {
        'x-application-name': 'sourcecode-sales'
      }
    }
  }
);
```

---

### 3. Hosting Layer (Vercel)

**Edge Network Features:**

- **Global CDN:** 100+ edge locations
- **Automatic HTTPS:** SSL certificates managed
- **Image Optimization:** Next.js Image component leverages Vercel's image optimization
- **Analytics:** Built-in Web Vitals tracking

**Deployment Pipeline:**
```
GitHub Push → Vercel Build → Deploy to Edge
     ↓              ↓                ↓
  (main)      (next build)    (CDN Distribution)
```

**Environment Configuration:**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['Continue00:03your-supabase-project.supabase.co'],
formats: ['image/webp', 'image/avif'],
},
// Enable SWC minification
swcMinify: true,
// Compression
compress: true,
// ISR configuration
experimental: {
isrMemoryCacheSize: 0, // Disable memory cache on free tier
},
};

---

### 4. Integration Layer

**WhatsApp Business API:**
```typescript
// lib/whatsapp.ts
export function generateWhatsAppLink(product: Product): string {
  const message = `Halo Ahmad, saya tertarik dengan ${product.title}.

Saya ingin tahu lebih lanjut tentang:
- Fitur lengkapnya
- Cara installasi
- Harga dan metode pembayaran

Terima kasih!`;

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
```

**Analytics Integration:**
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Data Flow

### User Journey: Landing → Product Detail → WhatsApp

User lands on homepage (SSG)
└─> Vercel serves pre-rendered HTML from edge
User clicks "Lihat Produk"
└─> Navigate to /products (ISR)
└─> If cached (< 60s): Serve from edge
└─> If stale: Revalidate in background, serve stale
User clicks product card
└─> Navigate to /products/[slug] (ISR)
└─> Same ISR logic as catalog
User clicks "Tanya via WhatsApp"
└─> Client-side: Generate WhatsApp link with product context
└─> Open in new tab: https://wa.me/...


### Product Update Flow

Admin updates product in Supabase dashboard
└─> UPDATE products SET ... WHERE id = ...
Next request after 60s triggers ISR
└─> Vercel fetches new data from Supabase
└─> Regenerates page in background
└─> Updates edge cache
Subsequent users see updated content


---

## Performance Optimization

### Image Optimization Strategy
```typescript
// components/ProductCard.tsx
import Image from 'next/image';

<Image
  src={product.thumbnail_url}
  alt={product.title}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL={product.thumbnail_blur} // Generated at build time
  className="object-cover"
/>
```

**Optimization Techniques:**
- Automatic WebP/AVIF conversion
- Responsive images (srcset)
- Lazy loading below fold
- Blur placeholders for LCP

---

### Code Splitting
```typescript
// Dynamic imports for heavy components
const VideoPlayer = dynamic(() => import('@/components/VideoPlayer'), {
  loading: () => <Skeleton className="aspect-video" />,
  ssr: false, // Client-side only
});

const ImageSlider = dynamic(() => import('@/components/ImageSlider'));
```

---

### Caching Strategy

**Browser Cache:**
Static Assets: 1 year (immutable)
HTML Pages: No cache (rely on CDN)
API Routes: No cache (fresh data)

**CDN Cache:**
SSG Pages: Until deployment
ISR Pages: 60 seconds (stale-while-revalidate)
Images: 1 year

**Supabase Cache:**
```typescript
// lib/products.ts with memoization
import { cache } from 'react';

export const getProducts = cache(async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true);
  
  if (error) throw error;
  return data;
});
```

---

## Security Considerations

### Public Access Model
- **No authentication:** All content is public
- **No sensitive data:** Product info only
- **No payment processing:** Handled via WhatsApp

### Supabase RLS (Row Level Security)
```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Public read access" ON products
  FOR SELECT
  USING (is_active = true);

-- Policy: Restrict write access (admin only via dashboard)
CREATE POLICY "Admin write access" ON products
  FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');
```

### Environment Variables
```env
# Public (safe to expose)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_WHATSAPP_NUMBER=...

# Private (Vercel environment only)
SUPABASE_SERVICE_ROLE_KEY=... (if needed for admin tasks)
```

---

## Scalability Considerations

### Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- 100 GB-hours build time/month
- 100,000 serverless function invocations/day

**Supabase:**
- 500 MB database storage
- 1 GB file storage
- 50,000 monthly active users
- 2 GB bandwidth/month

### Mitigation Strategies

1. **Bandwidth:**
   - Optimize images (WebP, proper sizing)
   - Use external CDN for large videos (YouTube)
   - Enable Vercel image optimization

2. **Database:**
   - Archive old/inactive products
   - Use JSONB efficiently (avoid large objects)
   - Implement soft deletes (is_active flag)

3. **Serverless Functions:**
   - Maximize ISR (reduce SSR)
   - Client-side filtering where possible
   - Batch operations

### Upgrade Path (if needed)
Free Tier → Hobby ($20/mo) → Pro ($20-100/mo)
↓              ↓                  ↓
100GB BW → Unlimited BW → Enterprise features

---

## Monitoring & Observability

### Metrics to Track

**Vercel Dashboard:**
- Deployment frequency
- Build time
- Bandwidth usage
- Error rate

**Vercel Analytics:**
- Page views
- Unique visitors
- Top pages
- Web Vitals (LCP, FID, CLS)

**Custom Events:**
```typescript
import { track } from '@vercel/analytics';

// Track WhatsApp clicks
track('whatsapp_click', {
  product: productTitle,
  category: productCategory,
  price: productPrice,
});

// Track demo link clicks
track('demo_click', {
  product: productTitle,
});
```

### Logging Strategy
```typescript
// lib/logger.ts
export const logger = {
  error: (message: string, error: Error) => {
    console.error(`[ERROR] ${message}`, error);
    // In production, send to external service (Sentry, LogRocket)
  },
  
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
  },
};
```

---

## Deployment Checklist

### Pre-Launch
- [ ] All environment variables set in Vercel
- [ ] Supabase RLS policies configured
- [ ] Products seeded in database
- [ ] WhatsApp number tested
- [ ] Custom domain configured
- [ ] SSL certificate verified

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Vercel Analytics
- [ ] Test all CTA links
- [ ] Monitor error logs (first 48 hours)
- [ ] Check Web Vitals scores

### Ongoing
- [ ] Weekly: Review analytics
- [ ] Monthly: Check bandwidth usage
- [ ] Quarterly: Update products
- [ ] Yearly: Review architecture for optimizations

---

## Disaster Recovery

### Backup Strategy

**Database:**
```bash
# Supabase automatic backups (daily)
# Manual export via Supabase dashboard: Settings > Database > Export

# Programmatic backup (optional)
supabase db dump > backup-$(date +%Y%m%d).sql
```

**Code:**
- GitHub repository (source of truth)
- Vercel deployment history (last 100 deployments)

### Rollback Procedure
```bash
# Via Vercel dashboard: Deployments > Select previous > Promote to Production

# Via CLI
vercel rollback [deployment-url]
```

---

## Future Architecture Considerations

### When to Evolve

**Add Authentication** (if selling premium products):
Current: No auth → Future: Supabase Auth
Reason: Protect paid content, track purchases

**Add Payment Processing** (if scaling beyond WhatsApp):
Current: WhatsApp → Future: Stripe integration
Reason: Automate transactions, reduce manual work

**Add Admin Dashboard** (if frequently updating products):
Current: Supabase dashboard → Future: Custom CMS
Reason: Better UX for content management

---

## Conclusion

This architecture balances:
- **Cost:** Zero infrastructure costs
- **Performance:** Edge-first, sub-2s load times
- **Scalability:** Can handle 10,000+ visitors/month on free tier
- **Simplicity:** No complex backend, easy maintenance
- **SEO:** Fully indexable, static-first approach

**Philosophy:** Start simple, scale when revenue justifies complexity.

---

**Last Updated:** January 2026  
**Version:** 1.0  
**Maintainer:** Ahmad