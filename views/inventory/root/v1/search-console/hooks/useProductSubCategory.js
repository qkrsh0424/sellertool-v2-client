import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useProductSubCategory({
    productSubCategories
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [productSubCategory, setProductSubCategory] = useState(null);

    useEffect(() => {
        onInitProductSubCategory();
    }, [router?.query?.productSubCategoryId, productSubCategories]);

    const onChangeProductSubCategory = (productCategory) => {
        setProductSubCategory(productCategory)
    }

    const onClearProductSubCategory = () => {
        setProductSubCategory(null);
    }

    const onInitProductSubCategory = () => {
        
        if (!router?.query?.productSubCategoryId || !productSubCategories) {
            setProductSubCategory(null);
            return;
        }
        
        if (!loading) {
            return;
        }
        
        let data = productSubCategories?.find(r => r.id === router?.query?.productSubCategoryId);

        setProductSubCategory(data);
        setLoading(false);
    }

    return {
        productSubCategory,
        onChangeProductSubCategory,
        onClearProductSubCategory
    }
}