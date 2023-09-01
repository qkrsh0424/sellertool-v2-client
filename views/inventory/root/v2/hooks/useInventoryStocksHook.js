import { useState } from "react";

export function useInventoryStocksHook() {
    const [inventoryStocks, setInventoryStocks] = useState(null);

    const onSetInventoryStocks = (values) => {
        setInventoryStocks(values);
    }

    return {
        inventoryStocks,
        onSetInventoryStocks
    }
}