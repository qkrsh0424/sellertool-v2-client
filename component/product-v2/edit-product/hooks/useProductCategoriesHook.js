import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";

export default function useProductCategoriesHook({
    originProduct
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux)
    const [productCategories, setProductCategories] = useState(null);
    const [productCategoryId, setProductCategoryId] = useState(null);

    useEffect(() => {
        setProductCategoryId(null);

        if (!workspaceRedux?.workspaceInfo?.id) {
            setProductCategories(null);
            return;
        }
        reqFetchProductCategories();
    }, [workspaceRedux?.workspaceInfo?.id]);

    useEffect(() => {
        if (!originProduct?.productSubCategory?.productCategoryId || !productCategories) {
            return;
        }

        onInitProductCategoryId();

    }, [originProduct?.productSubCategory?.productCategoryId, productCategories])

    const reqFetchProductCategories = async () => {
        let params = {
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await productCategoryDataConnect().searchList(params)
            .then(res => {
                if (res.status === 200) {
                    setProductCategories(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const onChangeProductCategoryId = (e) => {
        let value = e.target.value;

        setProductCategoryId(value);
    }

    const onInitProductCategoryId = () => {
        setProductCategoryId(originProduct?.productSubCategory?.productCategoryId);
    }

    const checkProductCategoryIdFormatValid = () => {
        if (!productCategoryId) {
            throw new Error('카테고리를 선택해 주세요.');
        }
        let isExist = productCategories?.find(r => r.id === productCategoryId);

        if (!isExist) {
            throw new Error('잘못된 접근 방식입니다.');
        }
    }

    return {
        productCategories,
        productCategoryId,
        onChangeProductCategoryId,
        checkProductCategoryIdFormatValid
    }
}