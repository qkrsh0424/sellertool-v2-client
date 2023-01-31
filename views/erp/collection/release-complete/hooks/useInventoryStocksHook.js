import { useEffect, useState } from "react";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";

export default function useInventoryStocksHook(erpItems) {
    const [inventoryStocks, setInventoryStocks] = useState(null);

    useEffect(() => {
        if (!erpItems) {
            return;
        }

        reqFetchInventoryStocks();

        return () => setInventoryStocks(null);
    }, [erpItems]);

    const reqFetchInventoryStocks = async () => {
        let body = new Set();

        erpItems?.forEach(r => {
            if (r.productOptionId) {
                body.add(r.productOptionId);
            }
        })

        body = [...body];

        await inventoryDataConnect().searchList(body)
            .then(res => {
                if (res.status === 200) {
                    setInventoryStocks(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqStockRelease = async (body, successCallback) => {
        await inventoryDataConnect().createReleaseByErpItems(body)
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
        await inventoryDataConnect().cancelReleaseByErpItems(body)
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
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