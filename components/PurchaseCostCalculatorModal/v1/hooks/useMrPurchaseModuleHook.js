import { useState } from "react";

export function useMrPurchaseModuleHook(props) {
    const [selectedMrPurchaseModule, setSelectedMrPurchaseModule] = useState(null);

    const onSetSelectedMrPurchaseModule = (value) => {
        setSelectedMrPurchaseModule(value);
    }

    return {
        selectedMrPurchaseModule,
        onSetSelectedMrPurchaseModule
    }
}