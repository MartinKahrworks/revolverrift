import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'rr_cart';

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const existing = state.find(i => i.id === action.product.id);
            if (existing) {
                return state.map(i =>
                    i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...state, { ...action.product, qty: 1 }];
        }
        case 'REMOVE':
            return state.filter(i => i.id !== action.id);
        case 'UPDATE_QTY':
            if (action.qty < 1) return state.filter(i => i.id !== action.id);
            return state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i);
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

    const addToCart    = (product) => dispatch({ type: 'ADD', product });
    const removeItem   = (id)      => dispatch({ type: 'REMOVE', id });
    const updateQty    = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
    const clearCart    = ()        => dispatch({ type: 'CLEAR' });

    const totalItems   = items.reduce((s, i) => s + i.qty, 0);
    const totalPrice   = items.reduce((s, i) => s + i.price * i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
};
