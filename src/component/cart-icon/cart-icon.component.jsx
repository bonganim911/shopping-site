import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";
import "./cart-icon.styles";
import {useContext} from "react";
import {CartContext} from "../../context/cart-context";
import {CartIconContainer, ItemCount, ShoppingIconStyle} from "./cart-icon.styles";
const CartIcon = () => {
    const {cartOpen, isCartOpen} = useContext(CartContext);
    const {numberOfItems} = useContext(CartContext);
    const toggleCart = () => {
        isCartOpen(!cartOpen);
    }

    return(
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIconStyle as={ShoppingIcon} />
            <ItemCount as="span" className="item-count">{numberOfItems}</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon;