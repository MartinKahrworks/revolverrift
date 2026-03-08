import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaShoppingCart, FaCheck, FaTimes } from 'react-icons/fa';
import { getProductBySlug } from '../../api/shopApi';
import { useCart } from '../../context/CartContext';
import bgImage from '../../assets/shot2.webp';

const BADGE_COLORS = {
    gold: 'bg-yellow-500 text-black',
    red: 'bg-red-600 text-white',
    green: 'bg-green-600 text-white',
    silver: 'bg-gray-400 text-black',
    dark: 'bg-gray-900 text-white border border-white/20'
};

function ProductDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            const data = await getProductBySlug(slug);
            if (data) {
                setProduct(data);
                // Select first available variant by default
                if (data.variants && data.variants.length > 0) {
                    const firstAvailable = data.variants.find(v => v.is_available) || data.variants[0];
                    setSelectedVariant(firstAvailable);
                }
            }
            setLoading(false);
        };
        loadProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (!product) return;
        
        const variantLabel = selectedVariant ? selectedVariant.variant_label : 'ONE SIZE';
        const variantPrice = selectedVariant && selectedVariant.price_modifier 
            ? product.price + selectedVariant.price_modifier 
            : product.price;

        addToCart({
            ...product,
            price: variantPrice,
            size: variantLabel
        }, variantLabel);
        
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    if (loading) {
        return (
            <section className="relative min-h-screen bg-[#050505] text-white pt-24 pb-20">
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (!product) {
        return (
            <section className="relative min-h-screen bg-[#050505] text-white pt-24 pb-20">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                    <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
                        <FaTimes className="text-red-500 text-6xl" />
                        <h2 className="font-custom text-2xl tracking-widest">PRODUCT NOT FOUND</h2>
                        <Link to="/shop" className="bg-red-600 text-white px-8 py-3 font-mono text-xs tracking-widest hover:bg-red-700 transition-colors">
                            BACK TO SHOP
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const allImages = [product.thumbnail, ...(product.gallery || [])].filter(Boolean);
    const isSoldOut = product.status === 'sold_out';
    const isComingSoon = product.status === 'coming_soon';
    const unavailable = isSoldOut || isComingSoon;

    return (
        <section className="relative min-h-screen bg-[#050505] text-white pt-24 pb-20 overflow-hidden font-sans">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-20 object-top" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#0a0a0a]" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                {/* Back Button */}
                <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 transition-all duration-300 font-mono text-xs uppercase tracking-wider mb-8">
                    <FaArrowLeft /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <motion.div 
                            className="relative aspect-[3/4] overflow-hidden bg-black/50 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    src={allImages[selectedImage] || product.thumbnail}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                                {product.is_new && !unavailable && (
                                    <span className="bg-red-600 text-white text-[9px] font-bold tracking-wider px-3 py-1 uppercase">NEW</span>
                                )}
                                {product.compare_at_price && product.compare_at_price > product.price && !unavailable && (
                                    <span className="bg-yellow-500 text-black text-[9px] font-bold tracking-wider px-3 py-1 uppercase">SALE</span>
                                )}
                                {product.badges?.map((b, i) => (
                                    <span key={i} className={`text-[9px] font-bold tracking-wider px-3 py-1 uppercase ${BADGE_COLORS[b.color] || BADGE_COLORS.dark}`}>
                                        {b.label}
                                    </span>
                                ))}
                            </div>

                            {unavailable && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="font-mono text-white text-sm tracking-widest uppercase border border-white/40 px-6 py-3">
                                        {isSoldOut ? 'SOLD OUT' : 'COMING SOON'}
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        {/* Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                                            selectedImage === idx ? 'border-red-600' : 'border-white/10 hover:border-white/30'
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <motion.div 
                        className="space-y-6"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {/* Title & Category */}
                        <div>
                            {product.category && (
                                <p className="font-mono text-red-500 text-xs tracking-widest uppercase mb-2">
                                    {product.category.name}
                                </p>
                            )}
                            <h1 className="font-custom text-3xl md:text-5xl tracking-wider text-white uppercase leading-tight mb-3">
                                {product.name}
                            </h1>
                            {product.tagline && (
                                <p className="font-mono text-gray-400 text-sm tracking-wide">{product.tagline}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4">
                            {product.compare_at_price && product.compare_at_price > product.price && (
                                <span className="font-mono text-gray-500 text-xl line-through">
                                    €{product.compare_at_price.toFixed(2)}
                                </span>
                            )}
                            <span className="font-mono text-3xl text-white">
                                €{(selectedVariant && selectedVariant.price_modifier 
                                    ? product.price + selectedVariant.price_modifier 
                                    : product.price
                                ).toFixed(2)}
                            </span>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="prose prose-invert prose-sm max-w-none">
                                <div className="text-gray-300 leading-relaxed space-y-2">
                                    {typeof product.description === 'string' ? (
                                        <p>{product.description}</p>
                                    ) : (
                                        product.description
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="space-y-3">
                                <label className="font-mono text-xs tracking-widest uppercase text-gray-400">
                                    Select {product.variants[0].variant_type}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((variant, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedVariant(variant)}
                                            disabled={!variant.is_available}
                                            className={`px-4 py-2 font-mono text-xs tracking-wider uppercase border transition-all ${
                                                selectedVariant?.variant_label === variant.variant_label
                                                    ? 'bg-red-600 border-red-600 text-white'
                                                    : variant.is_available
                                                    ? 'bg-white/5 border-white/20 text-white hover:border-red-600'
                                                    : 'bg-white/5 border-white/10 text-gray-600 cursor-not-allowed line-through'
                                            }`}
                                        >
                                            {variant.variant_label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="space-y-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={unavailable || (product.variants?.length > 0 && !selectedVariant?.is_available)}
                                className={`w-full py-4 font-mono text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 ${
                                    unavailable || (product.variants?.length > 0 && !selectedVariant?.is_available)
                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]'
                                }`}
                            >
                                {addedToCart ? (
                                    <>
                                        <FaCheck /> ADDED TO CART
                                    </>
                                ) : (
                                    <>
                                        <FaShoppingCart /> ADD TO LOADOUT
                                    </>
                                )}
                            </button>

                            {/* Product Details */}
                            <div className="border border-white/10 p-4 space-y-2 font-mono text-xs text-gray-400">
                                {product.sku && (
                                    <div className="flex justify-between">
                                        <span>SKU:</span>
                                        <span className="text-white">{product.sku}</span>
                                    </div>
                                )}
                                {product.product_type && (
                                    <div className="flex justify-between">
                                        <span>Type:</span>
                                        <span className="text-white uppercase">{product.product_type}</span>
                                    </div>
                                )}
                                {!product.variants?.length && product.stock_quantity !== undefined && (
                                    <div className="flex justify-between">
                                        <span>Stock:</span>
                                        <span className="text-white">{product.stock_quantity} available</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {product.related_products && product.related_products.length > 0 && (
                    <div className="mt-20">
                        <h2 className="font-custom text-2xl md:text-3xl tracking-widest uppercase mb-8 text-center">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {product.related_products.slice(0, 4).map((related) => (
                                <Link
                                    key={related.id}
                                    to={`/shop/${related.slug}`}
                                    className="group bg-[#111111] hover:shadow-[0_0_20px_rgba(255,51,51,0.15)] transition-all duration-300"
                                >
                                    <div className="aspect-[3/4] overflow-hidden bg-black/50">
                                        <img
                                            src={related.thumbnail}
                                            alt={related.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-3 text-center">
                                        <h3 className="font-custom text-sm tracking-wider text-white uppercase">
                                            {related.name}
                                        </h3>
                                        <p className="font-mono text-xs text-white/70 mt-1">
                                            €{related.price.toFixed(2)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProductDetail;
