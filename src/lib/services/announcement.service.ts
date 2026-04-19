import { BaseService } from './base';
import { Announcement } from '../supabase';

export class AnnouncementService extends BaseService {
  private static instance: AnnouncementService;

  private constructor() {
    super();
  }

  public static getInstance(): AnnouncementService {
    if (!AnnouncementService.instance) {
      AnnouncementService.instance = new AnnouncementService();
    }
    return AnnouncementService.instance;
  }

  async getActive(): Promise<Announcement[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('announcements')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true }),
        'AnnouncementService.getActive'
      )) || []
    );
  }
}

export const announcementService = AnnouncementService.getInstance();
