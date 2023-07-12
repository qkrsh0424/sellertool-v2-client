import { useState } from "react";
import { productSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export function useProductSubCategoriesHook(props) {
    const [productSubCategories, setProductSubCategories] = useState([]);
    const [selectedProductSubCategory, setSelectedProductSubCategory] = useState(null);

    const onReqFetchProductSubCategories = async (options = { params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productSubCategoryDataConnect().searchList(options?.params, options?.headers)
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
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
        onReqFetchProductSubCategories,
        onSetProductSubCategories,
        onSetSelectedProductSubCategory,
        checkProductSubCategoryIdFormatValid
    }
}