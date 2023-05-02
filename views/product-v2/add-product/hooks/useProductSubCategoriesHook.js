import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { productSubCategoryDataConnect } from "../../../../data_connect/productSubCategoryDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useProductSubCategoriesHook({
    productCategoryId
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux)
    const [productSubCategories, setProductSubCategories] = useState(null);
    const [productSubCategoryId, setProductSubCategoryId] = useState(null);

    useEffect(() => {
        setProductSubCategoryId(null);

        if (!productCategoryId || !workspaceRedux?.workspaceInfo?.id) {
            setProductSubCategories(null);
            return;
        }

        reqFetchProductSubCategories();
    }, [productCategoryId, workspaceRedux?.workspaceInfo?.workspaceId]);

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
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            })
    }

    const onChangeProductSubCategoryId = (e) => {
        let value = e.target.value;

        setProductSubCategoryId(value);
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