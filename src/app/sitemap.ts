import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://sellappku.netlify.app';

    // Fetch all dynamic routes
    const [products, apps, webs] = await Promise.all([
        supabase.from('products').select('slug, updated_at'),
        supabase.from('apps').select('slug, updated_at'),
        supabase.from('webs').select('slug, updated_at'),
    ]);

    const productUrls = (products.data || []).map((item) => ({
        url: `${baseUrl}/products/${item.slug}`,
        lastModified: new Date(item.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const appUrls = (apps.data || []).map((item) => ({
        url: `${baseUrl}/apps/${item.slug}`,
        lastModified: new Date(item.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    const webUrls = (webs.data || []).map((item) => ({
        url: `${baseUrl}/webs/${item.slug}`,
        lastModified: new Date(item.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/apps`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/webs`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        ...productUrls,
        ...appUrls,
        ...webUrls,
    ];
}
