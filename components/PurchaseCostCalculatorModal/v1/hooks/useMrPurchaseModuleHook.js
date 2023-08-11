import { useState } from "react";

export function useMrPurchaseModuleHook(props) {
    const [mrPurchaseModuleList, setMrPurchaseModuleList] = useState(null);
    const [selectedMrPurchaseModule, setSelectedMrPurchaseModule] = useState(null);

    const onSetMrPurchaseModuleList = (values) => {
        setMrPurchaseModuleList(values);
    }

    const onSetSelectedMrPurchaseModule = (value) => {
        setSelectedMrPurchaseModule(value);
    }

    return {
        mrPurchaseModuleList,
        selectedMrPurchaseModule,
        onSetMrPurchaseModuleList,
        onSetSelectedMrPurchaseModule
    }
}