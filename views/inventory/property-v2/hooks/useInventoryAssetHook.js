import { useState } from "react";

export function useInventoryAssetHook(props) {
    const [inventoryAssetPage, setInventoryAssetPage] = useState(null);
    const [inventoryAssetAmount, setInventoryAssetAmount] = useState(null);

    const onSetInventoryAssetPage = (values) => {
        setInventoryAssetPage(values);
    }

    const onSetInventoryAssetAmount = (value) => {
        setInventoryAssetAmount(value);
    }

    return {
        inventoryAssetPage,
        inventoryAssetAmount,
        onSetInventoryAssetPage,
        onSetInventoryAssetAmount
    }
}