import { useState } from "react"

export function useProductCategoriesHook() {
    const [productCategories, setProductCategories] = useState([]);
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);

    const onSetProductCategories = (items) => {
        setProductCategories(items);
    }

    const onSetSelectedProductCategory = (productCategory) => {
        setSelectedProductCategory(productCategory);
    }

    const checkProductCategoryIdFormatValid = () => {
        if (!selectedProductCategory) {
            throw new Error('카테고리를 선택해 주세요.');
        }
        let isExist = productCategories?.find(r => r.id === selectedProductCategory?.id);

        if (!isExist) {
            throw new Error('잘못된 접근 방식입니다.');
        }
    }

    return {
        productCategories,
        selectedProductCategory,
        onSetProductCategories,
        onSetSelectedProductCategory,
        checkProductCategoryIdFormatValid
    }
}