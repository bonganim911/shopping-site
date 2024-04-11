import {useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import ProductCard from "../../component/product-card/product-card.component";
import "./category.styles.scss"
import {useSelector} from "react-redux";
import {categoriesSelector} from "../../store/categories/categories.selector";

const Category = () => {
    const categoriesMap = useSelector(categoriesSelector);

    const {category} = useParams();
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [categoriesMap, category]);

    return (
        <Fragment>
            <span className="category-title">{category}</span>
            <div className="category-container">
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </Fragment>
    )
}

export default Category;