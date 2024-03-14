import "./cart-item.styles";
import {CartItemContainer, Image, ItemDetails, Name} from "./cart-item.styles";
const CartItem = ({cartItem}) => {
    const {name, quantity, imageUrl, price} = cartItem;

    return (
        <CartItemContainer>
            <Image src={imageUrl} alt={name}/>
            <ItemDetails>
                <Name as="span">{name}</Name>
                <span>
                    {quantity} X ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;