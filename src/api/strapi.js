import { shopData } from '../Components/Shop/shopData';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

/**
 * Validates if the Strapi connection is configured.
 */
const isStrapiConfigured = () => {
    return !!(import.meta.env.VITE_STRAPI_URL);
};

/**
 * Fetches products from Strapi or returns mock data if not configured/fails.
 */
export const getProducts = async () => {
    // If not configured, immediately return mock data
    if (!isStrapiConfigured()) {
        console.log('Strapi not configured, using mock data.');
        return shopData;
    }

    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (STRAPI_TOKEN) {
            headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
        }

        const response = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            throw new Error(`Strapi API Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform Strapi response to our app's format
        // Assumes Strapi structure: { data: [ { id, attributes: { title, price, image: { data: { attributes: { url } } } } } ] }
        return data.data.map(item => ({
            id: item.id,
            title: item.attributes.title,
            price: item.attributes.price,
            category: item.attributes.category,
            // Handle image URL safely - append STRAPI_URL if it's a relative path
            image: item.attributes.image?.data?.attributes?.url
                ? (item.attributes.image.data.attributes.url.startsWith('http')
                    ? item.attributes.image.data.attributes.url
                    : `${STRAPI_URL}${item.attributes.image.data.attributes.url}`)
                : 'https://via.placeholder.com/600x800?text=No+Image'
        }));

    } catch (error) {
        console.warn('Failed to fetch from Strapi, falling back to mock data:', error);
        return shopData;
    }
};
