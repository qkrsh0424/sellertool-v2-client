import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useProductCategoryHook({
    productCategories
}) {
    const router = useRouter();
    const [productCategory, setProductCategory] = useState(null);

    useEffect(() => {
        if (!router?.query?.productCategoryId || !productCategories) {
            setProductCategory(null);
            return;
        }

        onInitProductCategory();
    }, [router?.query?.productCategoryId, productCategories]);

    const onChangeProductCategory = (productCategory) => {
        setProductCategory(productCategory)
    }

    const onInitProductCategory = () => {
        let data = productCategories?.find(r => r.id === router?.query?.productCategoryId);
        setProductCategory(data);
    }

    return {
        productCategory,
        onChangeProductCategory
    }
}