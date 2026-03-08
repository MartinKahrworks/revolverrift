const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://127.0.0.1:1337';

// ─── Utilities ─────────────────────────────────────────────────────────────
const resolveUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

// ─── Shop Page (Single Type) ───────────────────────────────────────────────

export const FALLBACK_SHOP_PAGE = {
    page_title: "THE MERCH AND MORE",
    subtitle: "// Official Merch & Gear",
    featured_section_title: "FEATURED DROPS",
    featured_section_subtitle: "// Limited. Lethal. Legendary.",
    show_category_filter: true,
    grid_columns: "col_4",
    empty_state_message: "// No items found in this category.",
    cart_cta_text: "ADD TO LOADOUT",
    sold_out_label: "SOLD OUT",
    coming_soon_label: "// COMING SOON",
    hero_image: null,
    promo_banner: null
};

export const getShopPage = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/shop-page?populate=*`);
        if (!res.ok) return FALLBACK_SHOP_PAGE;
        const json = await res.json();
        const data = json.data;
        if (!data) return FALLBACK_SHOP_PAGE;
        return {
            page_title: data.page_title || FALLBACK_SHOP_PAGE.page_title,
            subtitle: data.subtitle || FALLBACK_SHOP_PAGE.subtitle,
            featured_section_title: data.featured_section_title || FALLBACK_SHOP_PAGE.featured_section_title,
            featured_section_subtitle: data.featured_section_subtitle || FALLBACK_SHOP_PAGE.featured_section_subtitle,
            show_category_filter: data.show_category_filter ?? FALLBACK_SHOP_PAGE.show_category_filter,
            grid_columns: data.grid_columns || FALLBACK_SHOP_PAGE.grid_columns,
            empty_state_message: data.empty_state_message || FALLBACK_SHOP_PAGE.empty_state_message,
            cart_cta_text: data.cart_cta_text || FALLBACK_SHOP_PAGE.cart_cta_text,
            sold_out_label: data.sold_out_label || FALLBACK_SHOP_PAGE.sold_out_label,
            coming_soon_label: data.coming_soon_label || FALLBACK_SHOP_PAGE.coming_soon_label,
            hero_image: data.hero_image ? resolveUrl(data.hero_image.url) : FALLBACK_SHOP_PAGE.hero_image,
            promo_banner: data.promo_banner || FALLBACK_SHOP_PAGE.promo_banner
        };
    } catch {
        return FALLBACK_SHOP_PAGE;
    }
};

// ─── Products (Collection Type) ───────────────────────────────────────────

const mapProduct = (item) => ({
    id: item.id,
    name: item.name || item.title || '',
    slug: item.slug || '',
    tagline: item.tagline || '',
    description: item.description || null,
    price: item.price ?? 0,
    compare_at_price: item.compare_at_price ?? null,
    status: item.status || 'available',
    featured: item.featured ?? false,
    is_new: item.is_new ?? false,
    product_type: item.product_type || '',
    order: item.order ?? 99,
    sku: item.sku || '',
    stock_quantity: item.stock_quantity ?? 0,
    thumbnail: resolveUrl(item.thumbnail?.url),
    hover_image: resolveUrl(item.hover_image?.url),
    gallery: (item.gallery || []).map(g => resolveUrl(g.url)).filter(Boolean),
    badges: item.badges || [],
    variants: item.variants || [],
    category: item.category ? { id: item.category.id, name: item.category.name, slug: item.category.slug } : null,
    related_products: item.related_products || [],
    seo_title: item.seo_title || '',
    seo_description: item.seo_description || ''
});

export const getProducts = async () => {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/products?populate[0]=thumbnail&populate[1]=hover_image&populate[2]=badges&populate[3]=category&populate[4]=variants&populate[5]=gallery&populate[6]=related_products&sort=order:asc&pagination[limit]=100`
        );
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();
        const items = json.data || [];
        return items.map(mapProduct);
    } catch {
        return [];
    }
};

export const getProductBySlug = async (slug) => {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate[0]=thumbnail&populate[1]=hover_image&populate[2]=badges&populate[3]=category&populate[4]=variants&populate[5]=gallery&populate[6]=related_products.thumbnail`
        );
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();
        const items = json.data || [];
        return items.length > 0 ? mapProduct(items[0]) : null;
    } catch {
        return null;
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/product-categories?sort=order:asc`);
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();
        return (json.data || []).map(c => ({
            id: c.id,
            name: c.name,
            slug: c.slug
        }));
    } catch {
        return [];
    }
};
