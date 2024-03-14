import Button from "../button/button.component";
import "./cart-dropdown.styles";
import CartItem from "../cart-Item/cart-item";
import {useContext} from "react";
import {CartContext} from "../../context/cart-context";
import {useNavigate} from "react-router-dom";
import {CartDropdownContainer, CartItems} from "./cart-dropdown.styles";

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigation = useNavigate()


    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>)}
            </CartItems>
            <Button style={{marginTop: '20px'}} onClick={() => navigation('/checkout')}>Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;