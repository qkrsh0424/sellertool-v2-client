import { useEffect, useState } from "react";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";

export default function useInventoryStocksHook({
    productOptions
}) {
    const [inventoryStocks, setInventoryStocks] = useState(null);

    useEffect(() => {
        if (!productOptions) {
            return;
        }

        reqFetchInventoryStocks();
    }, [productOptions]);

    const reqFetchInventoryStocks = async () => {
        let body = productOptions.map(r => r.id);

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