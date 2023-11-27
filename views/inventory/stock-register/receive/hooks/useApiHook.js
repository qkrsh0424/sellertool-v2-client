import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { CustomErrorHandler } from "../../../../../data_connect/CustomErrorHandler";
import { InventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";
import { InventoryReceiveDataConnect } from "../../../../../data_connect/inventoryReceiveDataConnect";
import { ProductCategoryDataConnect } from "../../../../../data_connect/productCategoryDataConnect";
import { ProductOptionDataConnect } from "../../../../../data_connect/productOptionDataConnect";
import { ProductSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";

const productCategoryDataConnect = ProductCategoryDataConnect.baseInventoryPage();
const productSubCategoryDataConnect = ProductSubCategoryDataConnect.baseInventoryPage();
const productOptionDataConnect = ProductOptionDataConnect.baseInventoryPage();
const inventoryDataConnect = InventoryDataConnect.baseInventoryPage();
const inventoryReceiveDataConnect = InventoryReceiveDataConnect.baseInventoryPage();

export function useApiHook(props) {
    const reqFetchProductCategoryList = async ({ headers = {} }, callbackFn = (results, response) => { }) => {
        await productCategoryDataConnect.searchList(headers)
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

    const reqFetchProductSubCategoryList = async ({ params = {}, headers = {} }, callbackFn = (results, response) => { }) => {
        await productSubCategoryDataConnect.searchList(params, headers)
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res)
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

    const reqFetchProductOptionPage = async ({ params = {}, headers = {} }, callbackFn = (results, response) => { }) => {
        await productOptionDataConnect.searchPageV2(params, headers)
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res)
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

    const reqFetchInventoryStocks = async (options = {
        body: {},
        headers: {}
    },
        callbackFn = (results, response) => { }
    ) => {

        await inventoryDataConnect.searchList(options?.body, options?.headers)
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

    const reqCreateAllInventoryReceiveList = async (options = { body: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await inventoryReceiveDataConnect.createAll(options?.body, options?.headers)
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
            ;
    }

    const reqInventoryReceiveBulkCreateExcelUpload = async (options = { formData: null, params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await inventoryReceiveDataConnect.inventoryReceiveBulkCreateExcelUpload(options?.formData, options?.headers)
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
        reqFetchProductCategoryList,
        reqFetchProductSubCategoryList,
        reqFetchProductOptionPage,
        reqFetchInventoryStocks,
        reqCreateAllInventoryReceiveList,
        reqInventoryReceiveBulkCreateExcelUpload
    }
}