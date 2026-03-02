import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'rr_cart';

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            // Match by id + size combo so different sizes are separate entries
            const existing = state.find(
                i => i.id === action.product.id && i.size === action.product.size
            );
            if (existing) {
                return state.map(i =>
                    i.id === action.product.id && i.size === action.product.size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...state, { ...action.product, quantity: 1 }];
        }
        case 'REMOVE':
            return state.filter(i => !(i.id === action.id && i.size === action.size));
        case 'UPDATE_QTY': {
            const newQty = (state.find(
                i => i.id === action.id && i.size === action.size
            )?.quantity ?? 0) + action.delta;
            if (newQty < 1) return state.filter(i => !(i.id === action.id && i.size === action.size));
            return state.map(i =>
                i.id === action.id && i.size === action.size
                    ? { ...i, quantity: newQty }
                    : i
            );
        }
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [items, dispatch] = useReducer(
        cartReducer,
        [],
        () => {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                return saved ? JSON.parse(saved) : [];
            } catch {
                return [];
            }
        }
    );

    // Persist to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    // Add to cart — accepts a product object (with optional .size)
    const addToCart = (product) => dispatch({
        type: 'ADD',
        product: { ...product, size: product.size || 'ONE SIZE' }
    });

    // Remove by id + size
    const removeItem = (id, size = 'ONE SIZE') => dispatch({ type: 'REMOVE', id, size });

    // Increment/decrement by delta (+1 or -1)
    const updateQuantity = (id, size = 'ONE SIZE', delta = 1) =>
        dispatch({ type: 'UPDATE_QTY', id, size, delta });

    const clearCart = () => dispatch({ type: 'CLEAR' });

    // Computed values
    const cartTotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const cartCount = items.reduce((s, i) => s + i.quantity, 0);

    return (
        <CartContext.Provider value={{
            // New API (used by Cart.jsx, Shop.jsx, Navbar.jsx)
            cartItems: items,
            addToCart,
            removeItem,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
};
