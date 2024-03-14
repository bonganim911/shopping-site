import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import "./product-card.styles.scss";
import {useContext} from "react";
import {CartContext} from "../../context/cart-context";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = (product) => {
        addItemToCart(product)
    }
    return (
        <div className="product-card-container">
            <img className="img" src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={() => addProductToCart(product)}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;