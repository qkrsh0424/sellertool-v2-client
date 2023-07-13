import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { productCategoryDataConnect } from "../../../../../data_connect/productCategoryDataConnect";
import { productDataConnect } from "../../../../../data_connect/productDataConnect";
import { productSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";

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

    const onReqFetchProductWithRelatedData = async (options = { params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productDataConnect().searchForUpdate(options?.params, options?.headers)
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
            ;
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

    const onReqProductOptionBulkCreateExcelUpload = async (options = { formData: null, params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productDataConnect().productOptionBulkCreateExcelUpload(options?.formData, options?.headers)
            .then(res => {
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

    const onReqUpdateProduct = async (options = { body: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productDataConnect().update(options?.body, options?.headers)
            .then(res => {
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
            })
    }

    return {
        onReqFetchProductCategories,
        onReqFetchProductWithRelatedData,
        onReqFetchProductSubCategories,
        onReqProductOptionBulkCreateExcelUpload,
        onReqUpdateProduct
    }
}