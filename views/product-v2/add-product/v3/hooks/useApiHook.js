import { productCategoryDataConnect } from "../../../../../data_connect/productCategoryDataConnect";
import { productSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";
import { productDataConnect } from "../../../../../data_connect/productDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export function useApiHook() {
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

    const onReqCreateProduct = async (options = { body: {}, params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productDataConnect().createOne(options?.body, options?.headers)
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                let res = err.response;
                let errorMessage = 'undefined';
                console.log(res);

                if (!res) {
                    errorMessage = '네트워크 연결이 원활하지 않습니다.';
                } else if (res.status === 500) {
                    errorMessage = 'undefined error. 관리자에 문의해 주세요.'
                } else {
                    errorMessage = res?.data?.memo;
                }

                customToast.error(errorMessage, {
                    ...defaultOptions,
                    toastId: errorMessage
                });
            })
    }

    const onReqProductOptionBulkCreateExcelUpload = async (options = { formData: null, params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productDataConnect().productOptionBulkCreateExcelUpload(options?.formData, options?.headers)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            });
    }

    return {
        onReqFetchProductCategories,
        onReqFetchProductSubCategories,
        onReqCreateProduct,
        onReqProductOptionBulkCreateExcelUpload
    }
}