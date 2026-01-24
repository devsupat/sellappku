import { supabase, Product, App, Web, Announcement } from './supabase';

// Announcements
export async function getActiveAnnouncements(): Promise<Announcement[]> {
    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching announcements:', error);
        return [];
    }
    return data || [];
}

// Products
export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(6);

    if (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
    return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
    return data || [];
}

// Apps
export async function getApps(): Promise<App[]> {
    const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching apps:', error);
        return [];
    }
    return data || [];
}

export async function getFeaturedApps(): Promise<App[]> {
    const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(6);

    if (error) {
        console.error('Error fetching featured apps:', error);
        return [];
    }
    return data || [];
}

export async function getAppBySlug(slug: string): Promise<App | null> {
    const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching app:', error);
        return null;
    }
    return data;
}

// Webs (Web Services)

export async function getWebs(): Promise<Web[]> {
    const { data, error } = await supabase
        .from('webs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching webs:', error);
        return [];
    }
    return data || [];
}

export async function getFeaturedWebs(): Promise<Web[]> {
    const { data, error } = await supabase
        .from('webs')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(6);

    if (error) {
        console.error('Error fetching featured webs:', error);
        return [];
    }
    return data || [];
}

export async function getWebBySlug(slug: string): Promise<Web | null> {
    const { data, error } = await supabase
        .from('webs')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error('Error fetching web:', error);
        return null;
    }
    return data;
}

