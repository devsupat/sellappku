import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  db: { schema: 'public' },
});

// Types
export interface Product {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string | null;
  price: string;
  category: string;
  tech_stack: string[];
  features: { title: string; description: string }[] | null;
  thumbnail_url: string;
  video_url: string | null;
  screenshots: { url: string; caption: string }[] | null;
  demo_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface App {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string | null;
  thumbnail_url: string | null;
  screenshots: { url: string; caption: string }[] | null;
  download_type: 'playstore' | 'drive' | 'mediafire' | 'other';
  download_url: string;
  has_tester: boolean;
  tester_group_url: string | null;
  tester_invite_url: string | null;
  rating: number;
  downloads: string;
  features: string[];
  version: string | null;
  size: string | null;
  updated_date: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}


export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  display_order: number;
}

export interface Web {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string | null;
  thumbnail_url: string | null;
  screenshots: { url: string; caption: string }[] | null;
  demo_url: string | null;
  price_source_code: string;
  price_subscription: string;
  tech_stack: string[];
  features: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Announcement {
  id: string;
  message: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}
