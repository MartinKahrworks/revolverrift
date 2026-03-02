import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('rr_cart');
        return saved ? JSON.parse(saved) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('rr_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size = "ONE SIZE") => {
        setCartItems(prev => {
            // Check if item already exists in the same size
            const existingItem = prev.find(item => item.id === product.id && item.size === size);

            if (existingItem) {
                // If exists, increment quantity
                return prev.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            // Otherwise add new item
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                size: size,
                quantity: 1,
                image: product.thumbnail || product.image
            }];
        });
    };

    const updateQuantity = (id, size, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id && item.size === size) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    const removeItem = (id, size) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
