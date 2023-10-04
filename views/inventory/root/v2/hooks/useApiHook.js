import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { InventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";
import { InventoryReceiveDataConnect } from "../../../../../data_connect/inventoryReceiveDataConnect";
import { InventoryReleaseDataConnect } from "../../../../../data_connect/inventoryReleaseDataConnect";
import { ProductCategoryDataConnect } from "../../../../../data_connect/productCategoryDataConnect";
import { ProductOptionDataConnect } from "../../../../../data_connect/productOptionDataConnect";
import { ProductSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";

const productCategoryDataConnect = ProductCategoryDataConnect.baseInventoryPage();
const productSubCategoryDataConnect = ProductSubCategoryDataConnect.baseInventoryPage();
const productOptionDataConnect = ProductOptionDataConnect.baseInventoryPage();
const inventoryDataConnect = InventoryDataConnect.baseInventoryPage();
const inventoryReceiveDataConnect = InventoryReceiveDataConnect.baseInventoryPage();
const inventoryReleaseDataConnect = InventoryReleaseDataConnect.baseInventoryPage();

export function useApiHook() {
    const onReqFetchProductCategories = async (options = { params: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await productCategoryDataConnect.searchList(options?.headers)
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
        await productSubCategoryDataConnect.searchList(options?.params, options?.headers)
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

    const onReqFetchProductOptionPage = async (
        options = {
            params: {
                searchCondition: null,
                searchQuery: null,
                productCategoryId: null,
                productSubCategoryId: null,
                sort: 'product.cid_desc',
                page: 1,
                size: 50
            },
            headers: { wsId: null }
        },
        callbackFn = (results, response) => { }
    ) => {
        await productOptionDataConnect.searchPage(options?.params, options?.headers)
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

    const onReqFetchInventoryStocks = async (options = {
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

    const onReqFetchRegisteredStocks = async (
        options = {
            body: {
                startDateTime: new Date(),
                endDateTime: new Date()
            },
            headers: { wsId: null }
        },
        callbackFn = (results, response) => { }
    ) => {
        await inventoryDataConnect.searchRegisteredStocks(options?.body, options?.headers)
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

    const onReqChangeInventoryReceiveMemo = async (
        options = {
            body: {},
            headers: {},
        },
        callbackFn = (results, response) => { }
    ) => {
        await inventoryReceiveDataConnect.changeMemo(options?.body, options?.headers)
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

    const onReqChangeInventoryReleaseMemo = async (
        options = {
            body: {},
            headers: {},
        },
        callbackFn = (results, response) => { }
    ) => {
        await inventoryReleaseDataConnect.changeMemo(options?.body, options?.headers)
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

    const onReqBulkCreateInventoryReceives = async (options = { body: {}, headers: {} }, callbackFn = (results, response) => { }) => {
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

    const onReqBulkCreateInventoryReleases = async (options = { body: {}, headers: {} }, callbackFn = (results, response) => { }) => {
        await inventoryReleaseDataConnect.createAll(options?.body, options?.headers)
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

    return {
        onReqFetchProductCategories,
        onReqFetchProductSubCategories,
        onReqFetchProductOptionPage,
        onReqFetchInventoryStocks,
        onReqFetchRegisteredStocks,
        onReqChangeInventoryReceiveMemo,
        onReqChangeInventoryReleaseMemo,
        onReqBulkCreateInventoryReceives,
        onReqBulkCreateInventoryReleases
    }
}