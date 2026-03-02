const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://127.0.0.1:1337';

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
    coming_soon_label: "// COMING SOON"
};

export const getShopPage = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/shop-page`);
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
            coming_soon_label: data.coming_soon_label || FALLBACK_SHOP_PAGE.coming_soon_label
        };
    } catch {
        return FALLBACK_SHOP_PAGE;
    }
};

// ─── Products (Collection Type) ───────────────────────────────────────────

const resolveUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
};

const mapProduct = (item) => ({
    id: item.id,
    name: item.name || item.title || '',
    slug: item.slug || '',
    tagline: item.tagline || '',
    price: item.price ?? 0,
    compare_at_price: item.compare_at_price ?? null,
    status: item.status || 'available',
    featured: item.featured ?? false,
    is_new: item.is_new ?? false,
    product_type: item.product_type || '',
    order: item.order ?? 99,
    thumbnail: resolveUrl(item.thumbnail?.url),
    hover_image: resolveUrl(item.hover_image?.url),
    gallery: (item.gallery || []).map(g => resolveUrl(g.url)).filter(Boolean),
    badges: item.badges || [],
    category: item.category ? { id: item.category.id, name: item.category.name, slug: item.category.slug } : null
});

export const getProducts = async () => {
    try {
        const res = await fetch(
            `${STRAPI_URL}/api/products?populate[0]=thumbnail&populate[1]=hover_image&populate[2]=badges&populate[3]=category&sort=order:asc&pagination[limit]=100`
        );
        if (!res.ok) throw new Error('Failed');
        const json = await res.json();
        const items = json.data || [];
        return items.map(mapProduct);
    } catch {
        return [];
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
