import {useParams} from "react-router-dom";
import {Fragment, useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../context/categories-context";
import ProductCard from "../../component/product-card/product-card.component";
import "./category.styles.scss"

const Category = () => {
    const {categoriesMap} = useContext(CategoriesContext);

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