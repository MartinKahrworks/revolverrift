import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import bgImage from '../../assets/shot2.webp';


const Cart = () => {
    const { cartItems, updateQuantity, removeItem, cartTotal } = useCart();

    const subtotal = cartTotal;
    const shipping = subtotal > 0 ? 15.00 : 0;
    const total = subtotal + shipping;

    return (
        <section className="relative min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src={bgImage} alt="Background" className="w-full h-full object-cover opacity-10 object-top grayscale" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/95 to-[#050505]" />
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-red-600/5 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">

                {/* ── Header ── */}
                <div className="mb-8 md:mb-12">
                    <Link to="/shop" className="inline-flex items-center gap-2 md:gap-3 text-gray-400 hover:text-red-500 hover:tracking-[0.25em] transition-all duration-300 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-6 md:mb-8">
                        <FaArrowLeft /> RETURN TO MERCH
                    </Link>
                    <h1 className="font-custom text-3xl sm:text-5xl md:text-6xl text-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,51,51,0.2)]">
                        YOUR CART
                    </h1>
                    <div className="h-1 w-16 md:w-24 bg-red-600 mt-4 md:mt-6" />
                </div>

                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 md:py-32 px-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
                    >
                        <FaShieldAlt className="text-gray-500 text-5xl md:text-6xl mb-6 opacity-30" />
                        <h2 className="text-xl md:text-2xl font-custom tracking-widest mb-4">CACHE EMPTY</h2>
                        <p className="font-mono text-gray-400 text-xs md:text-sm tracking-widest uppercase mb-8 text-center">No gear selected for deployment.</p>
                        <Link to="/shop" className="bg-red-600 text-white font-mono text-[10px] md:text-sm tracking-[0.2em] uppercase px-8 md:px-10 py-3.5 md:py-4 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all duration-300 rounded-lg font-bold text-center">
                            BROWSE SHOP
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">
                            {cartItems.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={`${item.id}-${item.size}`}
                                    className="flex flex-col sm:flex-row gap-4 md:gap-6 bg-white/5 border border-white/10 p-3 md:p-6 rounded-xl relative group hover:bg-white/10 transition-colors"
                                >
                                    {/* Product Image */}
                                    <div className="w-full sm:w-28 md:w-32 h-32 sm:h-36 md:h-40 bg-black/50 rounded-lg overflow-hidden flex-shrink-0 border border-white/5 mx-auto sm:mx-0">
                                        <img src={item.image || item.thumbnail} alt={item.name} className="w-full h-full object-cover mix-blend-lighten opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between py-1 md:py-2">
                                        <div>
                                            <div className="flex justify-between items-start mb-1 md:mb-2">
                                                <h3 className="font-custom text-base sm:text-lg md:text-xl tracking-wider text-white uppercase max-w-[85%]">{item.name}</h3>
                                                <button onClick={() => removeItem(item.id, item.size)} className="text-gray-500 hover:text-red-500 p-1 md:p-2 transition-colors">
                                                    <FaTrash size={12} className="md:w-3.5 md:h-3.5" />
                                                </button>
                                            </div>
                                            <p className="font-mono text-gray-400 text-[10px] md:text-xs tracking-widest uppercase mb-1">SIZE: <span className="text-white">{item.size}</span></p>
                                        </div>

                                        <div className="flex justify-between items-end mt-4 sm:mt-0">
                                            <div className="flex items-center gap-2 md:gap-4 bg-black/40 border border-white/10 rounded-lg p-1">
                                                <button onClick={() => updateQuantity(item.id, item.size, -1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors font-mono text-sm md:text-lg">-</button>
                                                <span className="font-mono text-xs md:text-sm w-3 md:w-4 tracking-widest text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.size, 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors font-mono text-sm md:text-lg">+</button>
                                            </div>
                                            <div className="font-mono text-base md:text-lg tracking-wider font-bold">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-4"
                        >
                            <div className="bg-black/60 border border-white/20 p-6 md:p-8 rounded-2xl lg:sticky lg:top-32 backdrop-blur-md">
                                <h3 className="font-custom text-xl md:text-2xl tracking-widest uppercase mb-5 md:mb-6 flex items-center gap-2 md:gap-3">
                                    <FaShieldAlt className="text-amber-500" />
                                    ORDER <br /> SUMMARY
                                </h3>

                                <div className="space-y-3 md:space-y-4 font-mono text-[10px] md:text-sm tracking-widest uppercase text-gray-400 mb-6 md:mb-8 border-t border-white/10 pt-5 md:pt-6">
                                    <div className="flex justify-between items-center">
                                        <span>Subtotal </span>
                                        <span className="text-white">€{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="max-w-[70%]">Shipping</span>
                                        <span className="text-white">€{shipping.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/20 pt-5 md:pt-6 mb-6 md:mb-8 flex justify-between items-end">
                                    <span className="font-mono text-xs md:text-sm tracking-widest uppercase text-white">Total</span>
                                    <span className="font-mono text-2xl md:text-3xl font-bold tracking-wider text-amber-500">€{total.toFixed(2)}</span>
                                </div>

                                <button className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase px-4 md:px-6 py-4 md:py-5 rounded-xl font-bold border border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300 relative overflow-hidden group">
                                    <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                                        Proceed to Checkout <FaArrowLeft className="rotate-180" />
                                    </span>
                                    {/* Hover sweep effect */}
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                </button>

                                <div className="mt-5 md:mt-6 flex justify-center gap-4 text-gray-500">
                                    <span className="text-[8px] md:text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
                                        <FaShieldAlt /> 🔒 Secure Checkout
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
