import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../../assets/Texturelabs_Grunge_353M.jpg';
import ProductCard from './ProductCard';
import { getProducts, getCategories, getShopPage, FALLBACK_SHOP_PAGE } from '../../api/shopApi';

const GRID_COLS = {
    col_2: 'grid-cols-1 md:grid-cols-2',
    col_3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    col_4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
};

function Shop() {
    const [products, setProducts]         = useState([]);
    const [categories, setCategories]     = useState([]);
    const [shopPage, setShopPage]         = useState(FALLBACK_SHOP_PAGE);
    const [activeCategory, setCategory]   = useState('all');
    const [loading, setLoading]           = useState(true);

    useEffect(() => {
        const load = async () => {
            const [prods, cats, page] = await Promise.all([
                getProducts(),
                getCategories(),
                getShopPage()
            ]);
            setProducts(prods);
            setCategories(cats);
            setShopPage(page);
            setLoading(false);
        };
        load();
    }, []);

    const filtered = activeCategory === 'all'
        ? products
        : products.filter(p => p.category?.slug === activeCategory);

    const gridClass = GRID_COLS[shopPage.grid_columns] || GRID_COLS.col_4;

    return (
        <section
            className="text-white relative bg-cover bg-fixed bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">

                {/* ── Header ── */}
                <div className="flex flex-col items-center mb-12 space-y-3">
                    <h1 className="font-custom text-5xl md:text-7xl text-white tracking-widest uppercase text-center">
                        {shopPage.page_title}
                    </h1>
                    <div className="h-1 w-24 bg-red-600" />
                    <p className="font-mono text-gray-400 text-sm tracking-wider uppercase">
                        {shopPage.subtitle}
                    </p>
                </div>

                {/* ── Category Filter ── */}
                {shopPage.show_category_filter && categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        <button
                            onClick={() => setCategory('all')}
                            className={`font-mono text-xs tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-200
                                ${activeCategory === 'all'
                                    ? 'bg-red-600 border-red-600 text-white'
                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                                }`}
                        >
                            ALL
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.slug)}
                                className={`font-mono text-xs tracking-[0.2em] uppercase px-5 py-2 border transition-all duration-200
                                    ${activeCategory === cat.slug
                                        ? 'bg-red-600 border-red-600 text-white'
                                        : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50 hover:text-white'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* ── Grid ── */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600" />
                    </div>
                ) : filtered.length === 0 ? (
                    <p className="text-center font-mono text-gray-500 text-sm tracking-widest py-24">
                        {shopPage.empty_state_message}
                    </p>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`grid gap-8 ${gridClass}`}
                        >
                            {filtered.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    ctaText={shopPage.cart_cta_text}
                                    soldOutLabel={shopPage.sold_out_label}
                                    comingSoonLabel={shopPage.coming_soon_label}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </section>
    );
}

export default Shop;