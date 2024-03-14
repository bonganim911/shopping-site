import ProductCard from "../product-card/product-card.component";
import {useNavigate} from "react-router-dom";
import {CategoryPreviewContainer, Preview, Title} from "./category-preview.styles";

const CategoryPreview = ({title, products}) => {
    const navigate = useNavigate();
    const navigateToCategory = (title) => {
        navigate(`${title}`);
    }
    return(
        <CategoryPreviewContainer>
            <h2>
                <Title as="span" onClick={() => navigateToCategory(title)}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => <ProductCard product={product}/> )
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview;