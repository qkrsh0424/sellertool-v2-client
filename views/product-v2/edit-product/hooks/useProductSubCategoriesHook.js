import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { productSubCategoryDataConnect } from "../../../../data_connect/productSubCategoryDataConnect";

export default function useProductSubCategoriesHook({
    productCategoryId,
    originProduct
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux)
    const [productSubCategories, setProductSubCategories] = useState(null);
    const [productSubCategoryId, setProductSubCategoryId] = useState(null);

    useEffect(() => {
        if (!productCategoryId || !workspaceRedux?.workspaceInfo?.id) {
            setProductSubCategories(null);
            return;
        }

        reqFetchProductSubCategories();
    }, [productCategoryId, workspaceRedux?.workspaceInfo?.workspaceId]);

    useEffect(() => {
        if (!originProduct?.productSubCategoryId) {
            return;
        }

        onInitProductSubCategoryId();
    }, [originProduct?.productSubCategoryId]);

    useEffect(() => {
        if (!productSubCategoryId || !productSubCategories) {
            return;
        }

        let currId = productSubCategories?.find(r => r.id == productSubCategoryId);
        if (!currId) {
            setProductSubCategoryId(null);
        }
    }, [productSubCategoryId, productSubCategories])

    const reqFetchProductSubCategories = async () => {
        let params = {
            productCategoryId: productCategoryId
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id,
        }

        await productSubCategoryDataConnect().searchList(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductSubCategories(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const onChangeProductSubCategoryId = (e) => {
        let value = e.target.value;

        setProductSubCategoryId(value);
    }

    const onInitProductSubCategoryId = () => {
        setProductSubCategoryId(originProduct?.productSubCategoryId)
    }

    const checkProductSubCategoryIdFormatValid = () => {
        if (!productSubCategoryId) {
            throw new Error('서브 카테고리를 선택해 주세요.');
        }
        let isExist = productSubCategories?.find(r => r.id === productSubCategoryId);

        if (!isExist) {
            throw new Error('잘못된 접근 방식입니다.');
        }
    }

    return {
        productSubCategories,
        productSubCategoryId,
        onChangeProductSubCategoryId,
        checkProductSubCategoryIdFormatValid
    }
}