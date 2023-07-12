import { useState } from "react"
import { productCategoryDataConnect } from "/data_connect/productCategoryDataConnect";
import { customToast, defaultOptions } from "/components/toast/custom-react-toastify/v1";

export function useProductCategoriesHook() {
    const [productCategories, setProductCategories] = useState([]);
    const [selectedProductCategory, setSelectedProductCategory] = useState(null);

    const onReqFetchProductCategories = async (options = { params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productCategoryDataConnect().searchList(options?.headers)
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
        onReqFetchProductCategories,
        onSetProductCategories,
        onSetSelectedProductCategory,
        checkProductCategoryIdFormatValid
    }
}