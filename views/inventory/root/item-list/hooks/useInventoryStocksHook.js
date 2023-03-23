import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";

export default function useInventoryStocksHook({
    productOptions
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [inventoryStocks, setInventoryStocks] = useState(null);

    useEffect(() => {
        if (!productOptions) {
            return;
        }

        reqFetchInventoryStocks();
    }, [productOptions]);

    const reqFetchInventoryStocks = async () => {
        let productOptionIds = productOptions.map(r => r.id);

        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        const body = {
            productOptionIds: productOptionIds
        }

        await inventoryDataConnect().searchList(body, headers)
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