import { BaseService } from './base';
import { App } from '../supabase';

export class AppService extends BaseService {
  private static instance: AppService;

  private constructor() {
    super();
  }

  public static getInstance(): AppService {
    if (!AppService.instance) {
      AppService.instance = new AppService();
    }
    return AppService.instance;
  }

  async getAll(): Promise<App[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('apps')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false }),
        'AppService.getAll'
      )) || []
    );
  }

  async getFeatured(limit = 6): Promise<App[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('apps')
            .select('id, slug, title, short_description, thumbnail_url, download_type, has_tester, is_featured, is_active')
            .eq('is_active', true)
            .eq('is_featured', true)
            .limit(limit),
        'AppService.getFeatured'
      )) || []
    );
  }

  async getBySlug(slug: string): Promise<App | null> {
    return await this.tryFetch(
      () =>
        this.supabase
          .from('apps')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single(),
      `AppService.getBySlug(${slug})`
    );
  }

  async getRelated(currentSlug: string, limit = 4): Promise<App[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('apps')
            .select('id, slug, title, short_description, thumbnail_url, download_type, has_tester')
            .eq('is_active', true)
            .neq('slug', currentSlug)
            .limit(limit),
        'AppService.getRelated'
      )) || []
    );
  }
}

export const appService = AppService.getInstance();
