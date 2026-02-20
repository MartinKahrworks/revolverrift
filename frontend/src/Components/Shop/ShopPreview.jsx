import React from 'react';
import { Link } from 'react-router-dom';
import { shopData } from './shopData';

const ShopPreview = () => {
    const previewItems = shopData.slice(0, 3); // Show top 3 items

    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-lg max-w-sm w-full animate-fadeIn transition-all hover:bg-black/60">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-vintage text-xl tracking-wider uppercase">Gear Up</h3>
                <Link to="/shop" className="text-xs font-mono text-red-500 hover:text-red-400 uppercase tracking-widest border-b border-red-500/50 pb-0.5 transition-colors">
                    View All
                </Link>
            </div>

            <div className="space-y-4">
                {previewItems.map((item) => (
                    <Link key={item.id} to="/shop" className="flex items-center gap-4 group">
                        <div className="h-16 w-16 bg-white/5 rounded overflow-hidden flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-red-500 transition-colors">{item.title}</h4>
                            <p className="text-gray-400 font-mono text-xs">${item.price}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <Link to="/shop" className="block w-full mt-6 bg-white/10 hover:bg-white/20 text-white text-center py-2 text-xs font-bold uppercase tracking-widest transition-colors border border-white/10 hover:border-white/30">
                Visit Store
            </Link>
        </div>
    );
};

export default ShopPreview;
