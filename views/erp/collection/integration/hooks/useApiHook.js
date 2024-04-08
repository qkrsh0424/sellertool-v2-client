import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { ErpItemDataConnect } from "../../../../../data_connect/erpItemDataConnect";
import { productOptionPackageDataConnect } from "../../../../../data_connect/productOptionPackageDataConnect";

const productOptionPackageDataConn = productOptionPackageDataConnect();
const erpItemDataConnect = ErpItemDataConnect.baseErpCollectionPage();

export function useApiHook(props) {

    const reqFetchProductOptionPackageList = async ({ body, headers }) => {
        return await productOptionPackageDataConn.searchProductInfoListByProductOptionIdsWithStocks(body, headers)
            .then(res => {
                return {
                    res: res,
                    content: res?.data?.data
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

    const reqCountErpItems = async ({ params, headers }) => {
        return await erpItemDataConnect.count({ params, headers })
            .then(res => {
                return {
                    res: res,
                    content: res?.data?.data
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

    const reqFetchErpItemSlice = async ({ params, headers }) => {
        return await erpItemDataConnect.searchSlice({ params, headers })
            .then(res => {
                return {
                    res: res,
                    content: res?.data?.data
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
        reqFetchProductOptionPackageList,
        reqCountErpItems,
        reqFetchErpItemSlice
    }
}