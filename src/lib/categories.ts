import { 
    Code2, 
    Smartphone, 
    LayoutDashboard, 
    ShoppingCart, 
    GraduationCap, 
    Gamepad2, 
    Monitor,
    Globe,
    Layers,
    BookOpen
} from 'lucide-react';

export const PRODUCT_CATEGORIES = [
    { slug: 'web-apps', name: 'Websites', icon: Globe },
    { slug: 'desktop-apps', name: 'Desktop App', icon: Monitor },
    { slug: 'mobile-apps', name: 'Mobile App', icon: Smartphone },
    { slug: 'saas', name: 'SaaS', icon: Layers },
    { slug: 'admin-dashboards', name: 'Admin Dashboard', icon: LayoutDashboard },
    { slug: 'e-commerce', name: 'E-commerce', icon: ShoppingCart },
    { slug: 'educational-tools', name: 'Educational Tools', icon: GraduationCap },
    { slug: 'games', name: 'Games', icon: Gamepad2 },
    { slug: 'ujian-cbt', name: 'Ujian CBT', icon: BookOpen },
    { slug: 'portfolios', name: 'Portfolio', icon: Code2 },
] as const;

export type CategorySlug = typeof PRODUCT_CATEGORIES[number]['slug'];

export function getCategoryName(slug: string) {
    return PRODUCT_CATEGORIES.find(c => c.slug === slug)?.name || slug;
}

export function getCategoryIcon(slug: string) {
    return PRODUCT_CATEGORIES.find(c => c.slug === slug)?.icon || Code2;
}
