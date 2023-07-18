import { useState } from "react";

export function useRegisteredStocksHook() {
    const [registeredStocks, setRegisteredStocks] = useState(null);

    const onSetRegisteredStocks = (values) => {
        setRegisteredStocks(values);
    }

    return {
        registeredStocks,
        onSetRegisteredStocks
    }
}