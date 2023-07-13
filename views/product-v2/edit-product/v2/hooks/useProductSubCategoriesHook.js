import { useState } from "react";

export function useProductSubCategoriesHook(props) {
    const [productSubCategories, setProductSubCategories] = useState([]);
    const [selectedProductSubCategory, setSelectedProductSubCategory] = useState(null);

    const onSetProductSubCategories = (items) => {
        setProductSubCategories(items);
    }

    const onSetSelectedProductSubCategory = (productSubCategory) => {
        setSelectedProductSubCategory(productSubCategory);
    }

    const checkProductSubCategoryIdFormatValid = () => {
        if (!selectedProductSubCategory) {
            throw new Error('서브 카테고리를 선택해 주세요.');
        }
        let isExist = productSubCategories?.find(r => r.id === selectedProductSubCategory?.id);

        if (!isExist) {
            throw new Error('잘못된 접근 방식입니다.');
        }
    }

    return {
        productSubCategories,
        selectedProductSubCategory,
        onSetProductSubCategories,
        onSetSelectedProductSubCategory,
        checkProductSubCategoryIdFormatValid
    }
}