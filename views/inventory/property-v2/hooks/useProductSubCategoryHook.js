import { useState } from "react";

export function useProductSubCategoryHook(props) {
    const [productSubCategoryList, setProductSubCategoryList] = useState(null);

    const onSetProductSubCategoryList = (values) => {
        setProductSubCategoryList(values);
    }

    return {
        productSubCategoryList,
        onSetProductSubCategoryList,
    }
}