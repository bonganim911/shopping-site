import {createContext, useEffect, useReducer, useState} from "react";

export const CartContext = createContext({
    cartOpen: true,
    isCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    totalItems: 0,
    totalAmount: 0
});

const INITIAL_STATE = {
    cartItems: [],
    numberOfItems: 0,
    totalAmount: 0
}

const CART_ACTION_TYPES = {
    SET_ITEM_TO_CART: "SET_ITEM_TO_CART",
    CART_IS_OPEN: "CART_IS_OPEN"
}
const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_ITEM_TO_CART:
            return {...state, ...payload}
        case CART_ACTION_TYPES.CART_IS_OPEN:
            return {...state, cartOpen: payload}
        default:
            throw new Error(`unhandled type ${type} in cart reducer`);
    }
}

const addProductToCart = (cartItems, productToAdd) => {
    const itemExist = cartItems.find((item) => item.id === productToAdd.id);

    if (itemExist) {
        return cartItems.map((item) =>
            item.id === productToAdd.id ? {...item, quantity: item.quantity + 1}
                : item
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeProductInCart = (cartItems, productToRemove) => {
    const itemExist = cartItems.find((item) => item.id === productToRemove.id);

    if (itemExist) {
        if (itemExist.quantity === 1) {
            return cartItems.filter((item) => item.id !== productToRemove.id)
        }
        return cartItems.map((item) =>
            item.id === productToRemove.id ? {...item, quantity: item.quantity - 1}
                : item
        )
    }
}

const deleteProductInCart = (cartItems, productToRemove) => {
    const itemExist = cartItems.find((item) => item.id === productToRemove.id);

    if (itemExist) {
        return cartItems.filter((item) => item.id !== productToRemove.id)
    }

}

export const CartProvider = ({children}) => {
    const [{cartItems, numberOfItems, totalAmount, cartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItem = (newCartItems) => {
        let numberOfItems = newCartItems.reduce((totalItems, item) => totalItems + item.quantity, 0);

        let totalAmount = newCartItems.reduce((totalItems, item) => totalItems + item.quantity * item.price, 0);

        dispatch({
            type: CART_ACTION_TYPES.SET_ITEM_TO_CART,
            payload: {cartItems: newCartItems, numberOfItems: numberOfItems, totalAmount: totalAmount}
        })

    }

    const isCartOpen = (payload) => {
        dispatch({type: CART_ACTION_TYPES.CART_IS_OPEN, payload: payload})
    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = addProductToCart(cartItems, productToAdd);
        updateCartItem(newCartItems);
    }

    const removeItemToCart = (productToRemove) => {
       const newCartItems = removeProductInCart(cartItems, productToRemove);
        updateCartItem(newCartItems);
    }

    const deleteProductFromCart = (productToRemove) => {
       const newCartItems = deleteProductInCart(cartItems, productToRemove);
       updateCartItem(newCartItems);
    }

    const value = {
        cartOpen,
        isCartOpen,
        addItemToCart,
        cartItems,
        numberOfItems,
        removeItemToCart,
        totalAmount,
        deleteProductFromCart
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}