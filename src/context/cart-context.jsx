import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({
    cartOpen: false,
    isCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    numberOfItems: 0,
    total: 0
});


const addProductToCart = (cartItems, productToAdd) => {
    const itemExist = cartItems.find((item) => item.id === productToAdd.id);

    if(itemExist){
        return cartItems.map((item) =>
            item.id === productToAdd.id ?  {...item, quantity: item.quantity +1}
            : item
        )
    }

    return [...cartItems, {...productToAdd, quantity:  1}]
}

const removeProductInCart = (cartItems, productToRemove) => {
    const itemExist = cartItems.find((item) => item.id === productToRemove.id);

    if(itemExist){
        if(itemExist.quantity === 1){
            return cartItems.filter((item) => item.id !== productToRemove.id)
        }
        return cartItems.map((item) =>
            item.id === productToRemove.id ?  {...item, quantity: item.quantity - 1}
                : item
        )
    }
}

const deleteProductInCart = (cartItems, productToRemove) => {
    const itemExist = cartItems.find((item) => item.id === productToRemove.id);

    if(itemExist){
        return cartItems.filter((item) => item.id !== productToRemove.id)
    }

}

export const CartProvider = ({children}) => {
    const [cartOpen, isCartOpen] = useState(false);
    const [cartItems, setCartItems] =  useState([]);
    const [numberOfItems, setNumberOfItems] =  useState(0);
    const [total, setTotal] =  useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addProductToCart(cartItems,productToAdd));
    }

    const removeItemToCart = (productToRemove) => {
        setCartItems(removeProductInCart(cartItems,productToRemove));
    }

    const deleteProductFromCart = (productToRemove) => {
        setCartItems(deleteProductInCart(cartItems, productToRemove));
    }

    useEffect(() => {
        let totalItems = cartItems.reduce((totalItems, item) => totalItems + item.quantity , 0);
        setNumberOfItems(totalItems)
    }, [cartItems]);


    useEffect(() => {
        let totalPriceOfTimes = cartItems.reduce((totalItems, item) => totalItems + item.quantity * item.price , 0);
        setTotal(totalPriceOfTimes)
    }, [cartItems]);

    const value = {
        cartOpen,
        isCartOpen,
        addItemToCart,
        cartItems,
        numberOfItems,
        removeItemToCart,
        total,
        deleteProductFromCart};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}