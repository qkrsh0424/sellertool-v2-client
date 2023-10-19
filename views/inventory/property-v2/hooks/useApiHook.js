import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { InventoryAssetDataConnect } from "../../../../data_connect/InventoryAssetDataConnect"
import { ProductCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";
import { ProductSubCategoryDataConnect } from "../../../../data_connect/productSubCategoryDataConnect";

const productCategoryDataConnect = ProductCategoryDataConnect.baseInventoryPage();
const productSubCategoryDataConnect = ProductSubCategoryDataConnect.baseInventoryPage();
const inventoryAssetDataConnect = InventoryAssetDataConnect.baseInventoryPage();

export function useApiHook(props) {
    const reqFetchInventoryAssetPage = async ({ params = {}, headers = {} }, callbackFn = (results, response) => { }) => {
        await inventoryAssetDataConnect.searchPage({ params, headers })
            .then(res => {
                callbackFn(res?.data?.data, res);
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

    const reqFetchInventoryAssetAmountList = async ({ params = {}, headers = {} }, callbackFn = (results, response) => { }) => {
        await inventoryAssetDataConnect.searchAmountList({ params, headers })
            .then(res => {
                callbackFn(res?.data?.data, res);
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

    return {
        reqFetchInventoryAssetPage,
        reqFetchInventoryAssetAmountList,
        reqFetchProductCategoryList,
        reqFetchProductSubCategoryList,
    }
}