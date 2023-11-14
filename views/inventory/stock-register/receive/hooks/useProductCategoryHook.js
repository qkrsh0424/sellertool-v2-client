import { useState } from "react";

export function useProductCategoryHook(props) {
    const [productCategoryList, setProductCategoryList] = useState(null);
    const [productCategory, setProductCategory] = useState(null);

    const onSetProductCategoryList = (values) => {
        setProductCategoryList(values);
    }

    const onSetProductCategory = (value) => {
        setProductCategory(value);
    }

    return {
        productCategoryList,
        productCategory,
        onSetProductCategoryList,
        onSetProductCategory,
    }
}