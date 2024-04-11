import {Route, Routes} from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {useEffect} from "react";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.util";
import PRODUCT_DATA from "../../shop-data";
import {useDispatch} from "react-redux";
import {setCategoriesMap} from "../../store/categories/categories.actions";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments('categories', PRODUCT_DATA)
            dispatch(setCategoriesMap(categories));
        };
        getCategories();

    },[dispatch])
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    )
}

export default Shop;