import { useState } from "react";

export function useProductCategoryHook(props) {
    const [productCategoryList, setProductCategoryList] = useState(null);

    const onSetProductCategoryList = (values) => {
        setProductCategoryList(values);
    }

    return {
        productCategoryList,
        onSetProductCategoryList,
    }
}