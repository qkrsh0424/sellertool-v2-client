import { useState } from "react";

export function useInventoryAssetHook(props) {
    const [inventoryAssetPage, setInventoryAssetPage] = useState(null);
    const [inventoryAssetAmountList, setInventoryAssetAmountList] = useState(null);
    const [selectedInventoryAssetAmount, setSelectedInventoryAssetAmount] = useState(null);

    const onSetInventoryAssetPage = (values) => {
        setInventoryAssetPage(values);
    }

    const onSetInventoryAssetAmountList = (value) => {
        setInventoryAssetAmountList(value);
    }

    const onSetSelectedInventoryAssetAmount = (value) => {
        setSelectedInventoryAssetAmount(value);
    }

    return {
        inventoryAssetPage,
        inventoryAssetAmountList,
        selectedInventoryAssetAmount,
        onSetInventoryAssetPage,
        onSetInventoryAssetAmountList,
        onSetSelectedInventoryAssetAmount
    }
}