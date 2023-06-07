import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useProductSubCategoryHook({
    productSubCategories
}) {
    const router = useRouter();
    const [productSubCategory, setProductSubCategory] = useState(null);

    useEffect(() => {
        if (!router?.query?.productSubCategoryId || !productSubCategories) {
            setProductSubCategory(null);
            return;
        }

        onInitProductSubCategory();
    }, [router?.query?.productSubCategoryId, productSubCategories]);

    const onChangeProductSubCategory = (productCategory) => {
        setProductSubCategory(productCategory)
    }

    const onClearProductSubCategory = () => {
        setProductSubCategory(null);
    }

    const onInitProductSubCategory = () => {
        let data = productSubCategories?.find(r => r.id === router?.query?.productSubCategoryId);
        setProductSubCategory(data);
    }

    return {
        productSubCategory,
        onChangeProductSubCategory,
        onClearProductSubCategory
    }
}