import {useContext} from "react";
import {CartContext} from "../../context/cart-context";
import "./checkout-item.styles";
import {
    Arrow,
    CheckoutItemContainer,
    ImageContainer,
    ImageStyle,
    Name,
    Price,
    Quantity,
    Value
} from "./checkout-item.styles";

const CheckoutItem = ({item}) => {
    const {name, quantity, imageUrl, price} = item;
    const {removeItemToCart, addItemToCart, deleteProductFromCart} = useContext(CartContext);

    const removeItemHandler = (item) => {
        removeItemToCart(item)
    }
    const addItemHandler = (item) => addItemToCart(item)

    const removeProductHandler = (item) => deleteProductFromCart(item);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <ImageStyle src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name as="span">{name}</Name>
            <Quantity >
                <Arrow as="span" onClick={() => removeItemHandler(item)}>&#10094;</Arrow>
                <Value as="span">{quantity}</Value>
                <Arrow onClick={() => addItemHandler(item)}>&#10095;</Arrow>
            </Quantity>
            <Price as="span">${price}</Price>
            <div className="remove-button" onClick={() => removeProductHandler(item)}>&#10005;</div>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;