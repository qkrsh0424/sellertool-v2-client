import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inventoryDataConnect } from "../../../../../../data_connect/inventoryDataConnect";

export default function useInventoryStocksHook(erpItems) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [inventoryStocks, setInventoryStocks] = useState(null);

    useEffect(() => {
        if (!erpItems) {
            return;
        }

        if (inventoryStocks) {
            return;
        }
        reqFetchInventoryStocks();
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
                console.log(err, err.response);
            })
    }

    return {
        inventoryStocks,
        reqFetchInventoryStocks
    }
}