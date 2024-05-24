import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { ErpItemDataConnect } from "../../../../../data_connect/erpItemDataConnect";
import { InventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";
import { productOptionPackageDataConnect } from "../../../../../data_connect/productOptionPackageDataConnect";

const productOptionPackageDataConn = productOptionPackageDataConnect();
const erpItemDataConnect = ErpItemDataConnect.baseErpCollectionPage();
const inventoryDataConnect = InventoryDataConnect.baseErpCollectionPage();

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

    const reqFetchErpItemListByIds = async ({ body, headers }) => {
        return await erpItemDataConnect.searchListByIds({ body, headers })
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

    const reqChangeErpItem_OptionCode = async ({ body, headers }) => {
        return await erpItemDataConnect.change_optionCode({ body, headers })
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

    const reqChangeErpItem_ReleaseOptionCode = async ({ body, headers }) => {
        return await erpItemDataConnect.change_releaseOptionCode({ body, headers })
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

    const reqUpdateErpItemList = async ({ body, headers }) => {
        return await erpItemDataConnect.updateList({ body, headers })
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

    const reqDeleteErpItemList = async ({ body, headers }) => {
        return await erpItemDataConnect.deleteList({ body, headers })
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

    const reqChangeErpItemList_Status = async ({ body, headers }) => {
        return await erpItemDataConnect.changeList_status({ body, headers })
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

    const reqCopyCreateErpItemList = async ({ body, headers }) => {
        return await erpItemDataConnect.copyCreate({ body, headers })
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
            ;
    }

    const reqFetchInventoryStockList = async ({ body, headers }) => {
        return await inventoryDataConnect.searchStockList({ body, headers })
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
        reqFetchErpItemSlice,
        reqFetchErpItemListByIds,
        reqChangeErpItem_OptionCode,
        reqChangeErpItem_ReleaseOptionCode,
        reqUpdateErpItemList,
        reqDeleteErpItemList,
        reqChangeErpItemList_Status,
        reqCopyCreateErpItemList,

        reqFetchInventoryStockList
    }
}