import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgImage from '../../assets/shot2.webp'; // New premium background
import poster1 from '../../assets/poster1.png';
import poster2 from '../../assets/poster2.png';
import poster3 from '../../assets/poster3.png';
import ProductCard from './ProductCard';
import { getProducts, getCategories, getShopPage, FALLBACK_SHOP_PAGE } from '../../api/shopApi';
import { FaShoppingCart, FaSearch, FaGamepad } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const GRID_COLS = {
    col_2: 'grid-cols-1 sm:grid-cols-2',
    col_3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    col_4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    col_5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
};

function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [shopPage, setShopPage] = useState(FALLBACK_SHOP_PAGE);
    const [activeCategory, setCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const { cartCount } = useCart();

    useEffect(() => {
        const load = async () => {
            const [prods, cats, page] = await Promise.all([
                getProducts(),
                getCategories(),
                getShopPage()
            ]);

            // Mock Data Fallback for Development
            const mockProducts = [
                {
                    id: 'mock1',
                    name: "TACTICAL HOODIE (NIGHT OPS)",
                    tagline: "Heavyweight Fleece",
                    price: 75.00,
                    category: { slug: 'apparel' },
                    thumbnail: poster1,
                    status: "available",
                    is_new: true,
                    badges: [{ label: "PREMIUM", color: "dark" }]
                },
                {
                    id: 'mock2',
                    name: "REVOLVER RIFT TEE",
                    tagline: "100% Cotton Black Tee",
                    price: 29.99,
                    category: { slug: 'apparel' },
                    thumbnail: poster2,
                    status: "available",
                    compare_at_price: 40.00
                },
                {
                    id: 'mock3',
                    name: "LIMITED EDITION POSTER",
                    tagline: "Signed Size A3",
                    price: 45.00,
                    category: { slug: 'collectibles' },
                    thumbnail: poster3,
                    status: "coming_soon"
                }
            ];

            const mockCategories = [
                { id: '1', name: 'Apparel', slug: 'apparel' },
                { id: '2', name: 'Collectibles', slug: 'collectibles' }
            ];

            setProducts(prods && prods.length > 0 ? prods : mockProducts);
            setCategories(cats && cats.length > 0 ? cats : mockCategories);
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
        <section className="relative min-h-screen bg-[#050505] text-white pt-24 pb-20 overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-20 object-top" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#0a0a0a]" />
                <div className="absolute top-20 left-1/4 w-[30vw] h-[30vw] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center mb-16 space-y-4 pt-10"
                >
                    <div className="flex items-center space-x-3 mb-2">
                        <FaGamepad className="text-red-500 text-xl" />
                        <span className="font-mono text-red-500 text-xs sm:text-sm tracking-[0.3em] uppercase">Official Gear</span>
                    </div>
                    <h1 className="font-custom text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-widest uppercase text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        {shopPage.page_title || 'THE MERCH AND MORE'}
                    </h1>
                    <div className="flex items-center gap-4 py-4 w-full justify-center">
                        <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-red-600" />
                        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_#ffb700]" />
                        <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-red-600" />
                    </div>
                    <p className="font-mono text-gray-400 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase max-w-2xl text-center leading-relaxed">
                        {shopPage.subtitle || 'Equip yourself with the finest merchandise and gear from the Revolver Rift universe.'}
                    </p>
                </motion.div>

                {/* ── Tools / Cart & Category Filter ── */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl relative z-20">

                    {/* Categories */}
                    <div className="flex-1 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {shopPage.show_category_filter !== false && categories.length > 0 && (
                            <div className="flex items-center gap-2 sm:gap-4 min-w-max px-2">
                                <button
                                    onClick={() => setCategory('all')}
                                    className={`relative font-mono text-[10px] sm:text-xs md:text-[11px] font-bold tracking-[0.15em] uppercase px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 overflow-hidden
                                        ${activeCategory === 'all'
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {activeCategory === 'all' && (
                                        <motion.div layoutId="activeCatBg" className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] z-0" />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        All Items
                                    </span>
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategory(cat.slug)}
                                        className={`relative font-mono text-[10px] sm:text-xs md:text-[11px] font-bold tracking-[0.15em] uppercase px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 overflow-hidden
                                            ${activeCategory === cat.slug
                                                ? 'text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {activeCategory === cat.slug && (
                                            <motion.div layoutId="activeCatBg" className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] z-0" />
                                        )}
                                        <span className="relative z-10">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Tool */}
                    <div className="flex items-center justify-end gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8 w-full lg:w-auto px-2 sm:px-4 mt-2 lg:mt-0">
                        <Link to="/cart" className="group flex items-center gap-3 bg-white/5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] w-full sm:w-auto justify-center">
                            <div className="relative">
                                <FaShoppingCart className="text-gray-300 group-hover:text-red-500 transition-colors text-base sm:text-lg" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] sm:text-[9px] font-bold h-3.5 sm:h-4 w-3.5 sm:w-4 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                                        {cartCount > 9 ? '9+' : cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-white group-hover:text-amber-400 transition-colors">VIEW CART</span>
                        </Link>
                    </div>
                </div>

                {/* ── Grid ── */}
                {loading ? (
                    <div className="flex justify-center items-center h-64 mt-20">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-t-2 border-b-2 border-red-600 absolute inset-0"></div>
                            <div className="animate-spin rounded-full h-12 sm:h-16 w-12 sm:w-16 border-l-2 border-r-2 border-amber-500 absolute inset-0 rotate-45 select-none animation-delay-150"></div>
                        </div>
                    </div>
                ) : filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 sm:py-32 px-4 space-y-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm mx-2"
                    >
                        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/5 flex items-center justify-center">
                            <FaSearch className="text-gray-500 text-2xl sm:text-3xl" />
                        </div>
                        <p className="text-center font-mono text-gray-400 text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase max-w-sm">
                            {shopPage.empty_state_message || '// No intel found for this category. Return to base.'}
                        </p>
                        <button onClick={() => setCategory('all')} className="mt-4 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 font-mono text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-300">
                            View All Gear
                        </button>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, staggerChildren: 0.1 }}
                            className={`grid gap-4 sm:gap-6 md:gap-8 ${gridClass}`}
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