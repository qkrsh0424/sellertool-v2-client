import { useState } from "react";

export function useProductCategoriesHook() {
    const [productCategories, setProductCategories] = useState(null);
    const [productCategory, setProductCategory] = useState(null);

    const onSetProductCategories = (items = []) => {
        setProductCategories(items);
    }

    const onSetProductCategory = (item = {}) => {
        setProductCategory(item);
    }

    return {
        productCategories,
        productCategory,
        onSetProductCategories,
        onSetProductCategory
    }
}