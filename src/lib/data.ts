import { productService } from './services/product.service';
import { appService } from './services/app.service';
import { webService } from './services/web.service';
import { gameService } from './services/game.service';
import { announcementService } from './services/announcement.service';

/**
 * @deprecated Use productService.getAll() directly
 */
export const getProducts = () => productService.getAll();

/**
 * @deprecated Use productService.getFeatured() directly
 */
export const getFeaturedProducts = () => productService.getFeatured();

/**
 * @deprecated Use productService.getBySlug() directly
 */
export const getProductBySlug = (slug: string) => productService.getBySlug(slug);

/**
 * @deprecated Use productService.getByCategory() directly
 */
export const getProductsByCategory = (category: string) => productService.getByCategory(category);

/**
 * @deprecated Use productService.getRelated() directly
 */
export const getRelatedProducts = (category: string, currentSlug: string) => productService.getRelated(category, currentSlug);

/**
 * @deprecated Use appService.getAll() directly
 */
export const getApps = () => appService.getAll();

/**
 * @deprecated Use appService.getFeatured() directly
 */
export const getFeaturedApps = () => appService.getFeatured();

/**
 * @deprecated Use appService.getBySlug() directly
 */
export const getAppBySlug = (slug: string) => appService.getBySlug(slug);

/**
 * @deprecated Use appService.getRelated() directly
 */
export const getRelatedApps = (currentSlug: string) => appService.getRelated(currentSlug);

/**
 * @deprecated Use webService.getAll() directly
 */
export const getWebs = () => webService.getAll();

/**
 * @deprecated Use webService.getFeatured() directly
 */
export const getFeaturedWebs = () => webService.getFeatured();

/**
 * @deprecated Use webService.getBySlug() directly
 */
export const getWebBySlug = (slug: string) => webService.getBySlug(slug);

/**
 * @deprecated Use webService.getRelated() directly
 */
export const getRelatedWebs = (currentSlug: string) => webService.getRelated(currentSlug);

/**
 * @deprecated Use gameService.getAll() directly
 */
export const getGames = () => gameService.getAll();

/**
 * @deprecated Use gameService.getFeatured() directly
 */
export const getFeaturedGames = () => gameService.getFeatured();

/**
 * @deprecated Use gameService.getBySlug() directly
 */
export const getGameBySlug = (slug: string) => gameService.getBySlug(slug);

/**
 * @deprecated Use gameService.getRelated() directly
 */
export const getRelatedGames = (genre: string, currentSlug: string) => gameService.getRelated(genre, currentSlug);

/**
 * @deprecated Use announcementService.getActive() directly
 */
export const getActiveAnnouncements = () => announcementService.getActive();
