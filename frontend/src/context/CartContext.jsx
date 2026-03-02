import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

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

export const CartProvider = ({ children }) => {
    const [items, dispatch] = useReducer(cartReducer, [], () => {
        try {
            const saved = localStorage.getItem('rr_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Persist to localStorage on every change
    React.useEffect(() => {
        localStorage.setItem('rr_cart', JSON.stringify(items));
    }, [items]);

    // Add to cart — accepts a product object (with optional .size)
    const addToCart = (product, size = 'ONE SIZE') => dispatch({
        type: 'ADD',
        product: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.thumbnail || product.image,
            size: size
        }
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
};
