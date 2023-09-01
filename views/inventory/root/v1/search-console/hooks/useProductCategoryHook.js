import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useProductCategoryHook({
    productCategories
}) {
    const router = useRouter();
    const [productCategory, setProductCategory] = useState(false);

    useEffect(() => {
        onInitProductCategory();
    }, [router?.query?.productCategoryId, productCategories]);

    const onChangeProductCategory = (productCategory) => {
        setProductCategory(productCategory)
    }

    const onInitProductCategory = () => {
        if (!router?.query?.productCategoryId || !productCategories) {
            setProductCategory(null);
            return;
        }

        let data = productCategories?.find(r => r.id === router?.query?.productCategoryId);

        setProductCategory(data);
    }

    return {
        productCategory,
        onChangeProductCategory
    }
}