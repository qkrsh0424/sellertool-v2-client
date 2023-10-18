import { useState } from "react";

export function useInventoryAssetHook(props) {
    const [inventoryAssetPage, setInventoryAssetPage] = useState(null);

    const onSetInventoryAssetPage = (values) => {
        setInventoryAssetPage(values);
    }

    return {
        inventoryAssetPage,
        onSetInventoryAssetPage
    }
}