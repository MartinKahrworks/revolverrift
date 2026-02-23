const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

// ─── Strapi v5 Response Format ────────────────────────────────────────────────
// In Strapi v5, fields are DIRECTLY on the item object (no `attributes` wrapper)
// v4: item.attributes.title   →   v5: item.title
// v4: item.attributes.cover_image.data.attributes.url  →  v5: item.cover_image.url
//
// ─── Image URL Note ──────────────────────────────────────────────────────────
// When using Cloudinary, Strapi returns a full absolute URL (https://res.cloudinary.com/...)
// When using local storage, Strapi returns a relative path (/uploads/...)
// We check for 'http' prefix to avoid double-prefixing Cloudinary URLs.

const resolveImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;           // Cloudinary / external — already absolute
    return `${STRAPI_URL}${url}`;                     // Local upload — prepend Strapi base URL
};

export const getBlogs = async () => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?populate=*`);

    if (!res.ok) {
        console.error(`Strapi API error: ${res.status} ${res.statusText}`);
        return [];
    }

    const data = await res.json();

    if (!data?.data) return [];

    return data.data.map((item) => ({
        id: item.id,
        title: item.title,
        link: item.slug,
        description: item.excerpt,
        fullDescription: item.content,
        image: resolveImageUrl(item.cover_image?.url),
        publishDate: item.publish_date,
    }));
};

export const getBlogBySlug = async (slug) => {
    const res = await fetch(
        `${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`
    );

    if (!res.ok) {
        console.error(`Strapi API error: ${res.status} ${res.statusText}`);
        return null;
    }

    const data = await res.json();

    if (!data?.data?.length) return null;

    const item = data.data[0];

    return {
        id: item.id,
        title: item.title,
        link: item.slug,
        description: item.excerpt,
        fullDescription: item.content,
        image: resolveImageUrl(item.cover_image?.url),
        publishDate: item.publish_date,
    };
};