import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative bg-[#111111] p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <div className="relative aspect-[3/4] overflow-hidden bg-black/50 mb-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="text-center space-y-2">
                <h3 className="font-custom text-xl tracking-wider text-white uppercase">{product.title}</h3>
                <p className="font-mono text-gray-400 group-hover:text-white transition-colors">
                    ${product.price}
                </p>
            </div>

            <button className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-white text-black px-6 py-2 uppercase font-bold tracking-widest text-sm hover:bg-gray-200">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
