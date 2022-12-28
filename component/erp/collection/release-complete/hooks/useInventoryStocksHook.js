import { useEffect, useState } from "react";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";

export default function useInventoryStocksHook(erpItems) {
    const [inventoryStocks, setInventoryStocks] = useState(null);

    useEffect(() => {
        if (!erpItems) {
            return;
        }

        reqFetchInventoryStocks();
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

    return {
        inventoryStocks,
        reqFetchInventoryStocks
    }
}