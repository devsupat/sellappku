import { BaseService } from './base';
import { Game } from '../supabase';

export class GameService extends BaseService {
  private static instance: GameService;

  private constructor() {
    super();
  }

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  async getAll(): Promise<Game[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('games')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false }),
        'GameService.getAll'
      )) || []
    );
  }

  async getFeatured(limit = 6): Promise<Game[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('games')
            .select('id, slug, title, short_description, genre, platform, thumbnail_url, rating, downloads, is_featured, is_active')
            .eq('is_active', true)
            .eq('is_featured', true)
            .limit(limit),
        'GameService.getFeatured'
      )) || []
    );
  }

  async getBySlug(slug: string): Promise<Game | null> {
    return await this.tryFetch(
      () =>
        this.supabase
          .from('games')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single(),
      `GameService.getBySlug(${slug})`
    );
  }

  async getRelated(genre: string, currentSlug: string, limit = 4): Promise<Game[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('games')
            .select('*')
            .eq('is_active', true)
            .eq('genre', genre)
            .neq('slug', currentSlug)
            .limit(limit),
        'GameService.getRelated'
      )) || []
    );
  }
}

export const gameService = GameService.getInstance();
