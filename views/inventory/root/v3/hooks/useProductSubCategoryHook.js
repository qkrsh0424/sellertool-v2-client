import { useState } from "react";

export function useProductSubCategoryHook(props) {
    const [productSubCategoryList, setProductSubCategoryList] = useState(null);
    const [productSubCategory, setProductSubCategory] = useState(null);

    const onSetProductSubCategoryList = (values) => {
        setProductSubCategoryList(values);
    }

    const onSetProductSubCategory = (value) => {
        setProductSubCategory(value);
    }

    return {
        productSubCategoryList,
        productSubCategory,
        onSetProductSubCategoryList,
        onSetProductSubCategory,
    }
}