import React, { useState, useEffect } from 'react';
import bgImage from '../../assets/Texturelabs_Grunge_353M.jpg';
import ProductCard from './ProductCard';
import { getProducts } from '../../api/strapi';

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            // Add a small artificial delay only if it loads too fast to show the loader (optional, prevents flickering)
            const minLoadTime = new Promise(resolve => setTimeout(resolve, 500));

            const [data] = await Promise.all([
                getProducts(),
                minLoadTime
            ]);

            setProducts(data);
            setLoading(false);
        };
        loadProducts();
    }, []);

    return (
        <section
            className=" text-white relative bg-cover bg-fixed bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <h1 className="font-custom text-5xl md:text-7xl text-white tracking-widest uppercase text-center">
                        Store
                    </h1>
                    <div className="h-1 w-24 bg-red-600" />
                    <p className="font-mono text-gray-400 text-sm tracking-wider uppercase">
                        Official Merch & Gear
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Shop;