import {createContext, useEffect, useState} from 'react';
import PRODUCT_DATA from "../shop-data.js";
import {getCategoriesAndDocuments} from "../utils/firebase/firebase.util";
export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments('categories', PRODUCT_DATA)
            setCategoriesMap(categories);
        };
        getCategories();

    },[])

    const value =  {categoriesMap};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}