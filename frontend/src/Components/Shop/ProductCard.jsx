import React from 'react';
import { motion } from 'framer-motion';

const BADGE_COLORS = {
    gold: 'bg-yellow-500 text-black',
    red: 'bg-red-600 text-white',
    green: 'bg-green-600 text-white',
    silver: 'bg-gray-400 text-black',
    dark: 'bg-gray-900 text-white border border-white/20'
};

const ProductCard = ({ product, ctaText = 'ADD TO LOADOUT', soldOutLabel = 'SOLD OUT', comingSoonLabel = '// COMING SOON' }) => {
    const isSoldOut    = product.status === 'sold_out';
    const isComingSoon = product.status === 'coming_soon';
    const unavailable  = isSoldOut || isComingSoon;

    return (
        <motion.div
            className="group relative bg-[#111111] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,51,51,0.15)] flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
        >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-black/50">
                <img
                    src={product.thumbnail || product.image || 'https://via.placeholder.com/600x800?text=No+Image'}
                    alt={product.name || product.title}
                    className={`h-full w-full object-cover object-center transition-all duration-500 
                        ${unavailable ? 'opacity-40 grayscale' : 'opacity-80 group-hover:opacity-100'}
                        ${product.hover_image ? 'group-hover:opacity-0' : 'group-hover:scale-110'}
                    `}
                />

                {/* Hover image swap */}
                {product.hover_image && (
                    <img
                        src={product.hover_image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                    />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Badges row */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {product.is_new && !unavailable && (
                        <span className="bg-red-600 text-white text-[9px] font-bold tracking-[0.15em] px-2 py-0.5 uppercase">NEW</span>
                    )}
                    {product.compare_at_price && product.compare_at_price > product.price && !unavailable && (
                        <span className="bg-yellow-500 text-black text-[9px] font-bold tracking-[0.15em] px-2 py-0.5 uppercase">SALE</span>
                    )}
                    {product.badges?.map((b, i) => (
                        <span key={i} className={`text-[9px] font-bold tracking-[0.15em] px-2 py-0.5 uppercase ${BADGE_COLORS[b.color] || BADGE_COLORS.dark}`}>
                            {b.label}
                        </span>
                    ))}
                </div>

                {/* Sold out / Coming soon overlay */}
                {unavailable && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="font-mono text-white text-xs tracking-[0.25em] uppercase border border-white/40 px-4 py-2 bg-black/60">
                            {isSoldOut ? soldOutLabel : comingSoonLabel}
                        </span>
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1 text-center space-y-1">
                <h3 className="font-custom text-base tracking-wider text-white uppercase leading-tight">
                    {product.name || product.title}
                </h3>
                {product.tagline && (
                    <p className="font-mono text-gray-500 text-[11px] tracking-wide">{product.tagline}</p>
                )}
                <div className="flex items-center justify-center gap-2 pt-1">
                    {product.compare_at_price && product.compare_at_price > product.price && (
                        <span className="font-mono text-gray-500 text-xs line-through">€{product.compare_at_price.toFixed(2)}</span>
                    )}
                    <span className={`font-mono text-sm ${unavailable ? 'text-gray-600' : 'text-white group-hover:text-red-400 transition-colors'}`}>
                        €{(product.price ?? 0).toFixed(2)}
                    </span>
                </div>
            </div>

            {/* CTA */}
            {!unavailable && (
                <button className="mx-4 mb-4 py-2 bg-white/10 hover:bg-red-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-white/10 hover:border-red-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    {ctaText}
                </button>
            )}
        </motion.div>
    );
};

export default ProductCard;
