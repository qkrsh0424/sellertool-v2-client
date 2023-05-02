import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useInventoryStocksHook(erpItems) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [inventoryStocks, setInventoryStocks] = useState(null);

    useEffect(() => {
        if (!erpItems) {
            return;
        }

        reqFetchInventoryStocks();

        return () => setInventoryStocks(null);
    }, [erpItems]);

    const reqFetchInventoryStocks = async () => {
        let productOptionIds = new Set();

        erpItems?.forEach(r => {
            if (r.productOptionId) {
                productOptionIds.add(r.productOptionId);
            }
        })

        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        const body = {
            productOptionIds: [...productOptionIds]
        }

        await inventoryDataConnect().searchList(body, headers)
            .then(res => {
                if (res.status === 200) {
                    setInventoryStocks(res.data.data);
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

    const reqStockRelease = async (body, successCallback) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await inventoryDataConnect().createReleaseByErpItems(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;
                if (!res) {
                    alert('네트워크가 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqCancelStockRelease = async (body, successCallback) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await inventoryDataConnect().cancelReleaseByErpItems(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;
                if (!res) {
                    alert('네트워크가 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    return {
        inventoryStocks,
        reqFetchInventoryStocks,
        reqStockRelease,
        reqCancelStockRelease
    }
}