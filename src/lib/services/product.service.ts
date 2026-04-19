import { BaseService } from './base';
import { Product } from '../supabase';

export class ProductService extends BaseService {
  private static instance: ProductService;

  private constructor() {
    super();
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  /**
   * Fetch all active products
   */
  async getAll(): Promise<Product[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false }),
        'ProductService.getAll'
      )) || []
    );
  }

  /**
   * Fetch featured products with optimized column selection for homepage
   */
  async getFeatured(limit = 6): Promise<Product[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('products')
            .select('id, slug, title, short_description, price, category, thumbnail_url, is_featured, is_active')
            .eq('is_active', true)
            .eq('is_featured', true)
            .limit(limit),
        'ProductService.getFeatured'
      )) || []
    );
  }

  /**
   * Fetch a single product by slug
   */
  async getBySlug(slug: string): Promise<Product | null> {
    return await this.tryFetch(
      () =>
        this.supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .eq('is_active', true)
          .single(),
      `ProductService.getBySlug(${slug})`
    );
  }

  /**
   * Fetch products by category
   */
  async getByCategory(category: string): Promise<Product[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('products')
            .select('*')
            .eq('is_active', true)
            .eq('category', category)
            .order('created_at', { ascending: false }),
        'ProductService.getByCategory'
      )) || []
    );
  }

  /**
   * Fetch related products
   */
  async getRelated(category: string, currentSlug: string, limit = 4): Promise<Product[]> {
    return (
      (await this.tryFetch(
        () =>
          this.supabase
            .from('products')
            .select('id, slug, title, short_description, price, category, thumbnail_url')
            .eq('is_active', true)
            .eq('category', category)
            .neq('slug', currentSlug)
            .limit(limit),
        'ProductService.getRelated'
      )) || []
    );
  }
}

export const productService = ProductService.getInstance();
