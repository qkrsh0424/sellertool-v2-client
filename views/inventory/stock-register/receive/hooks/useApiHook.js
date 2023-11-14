import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { CustomErrorHandler } from "../../../../../data_connect/CustomErrorHandler";
import { InventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";
import { ProductCategoryDataConnect } from "../../../../../data_connect/productCategoryDataConnect";
import { ProductOptionDataConnect } from "../../../../../data_connect/productOptionDataConnect";
import { ProductSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";

const productCategoryDataConnect = ProductCategoryDataConnect.baseInventoryPage();
const productSubCategoryDataConnect = ProductSubCategoryDataConnect.baseInventoryPage();
const productOptionDataConnect = ProductOptionDataConnect.baseInventoryPage();
const inventoryDataConnect = InventoryDataConnect.baseInventoryPage();

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

    return {
        reqFetchProductCategoryList,
        reqFetchProductSubCategoryList,
        reqFetchProductOptionPage,
        reqFetchInventoryStocks
    }
}