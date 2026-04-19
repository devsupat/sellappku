import { BaseService } from './base';
import { Web } from '../supabase';

export class WebService extends BaseService {
  private static instance: WebService;

  private constructor() {
    super();
  }

  public static getInstance(): WebService {
    if (!WebService.instance) {
      WebService.instance = new WebService();
    }
    return WebService.instance;
  }

  async getAll(): Promise<Web[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('webs')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false }),
        'WebService.getAll'
      )) || []
    );
  }

  async getFeatured(limit = 6): Promise<Web[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('webs')
            .select('id, slug, title, short_description, thumbnail_url, price_source_code, price_subscription, is_featured, is_active')
            .eq('is_active', true)
            .eq('is_featured', true)
            .limit(limit),
        'WebService.getFeatured'
      )) || []
    );
  }

  async getBySlug(slug: string): Promise<Web | null> {
    return await this.tryFetch(
      () =>
        this.supabase
          .from('webs')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single(),
      `WebService.getBySlug(${slug})`
    );
  }

  async getRelated(currentSlug: string, limit = 4): Promise<Web[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('webs')
            .select('*')
            .eq('is_active', true)
            .neq('slug', currentSlug)
            .limit(limit),
        'WebService.getRelated'
      )) || []
    );
  }
}

export const webService = WebService.getInstance();
