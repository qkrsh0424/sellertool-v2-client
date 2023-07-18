import { useState } from "react";

export function useProductSubCategoriesHook() {
    const [productSubCategories, setProductSubCategories] = useState(null);
    const [productSubCategory, setProductSubCategory] = useState(null);

    const onSetProductSubCategories = (items) => {
        setProductSubCategories(items);
    }

    const onSetProductSubCategory = (item) => {
        setProductSubCategory(item)
    }

    return {
        productSubCategories,
        productSubCategory,
        onSetProductSubCategories,
        onSetProductSubCategory
    }
}