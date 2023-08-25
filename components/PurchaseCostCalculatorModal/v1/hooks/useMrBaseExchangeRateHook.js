import { useState } from "react";

export function useMrBaseExchangeRateHook(props) {
    const [mrBaseExchangeRateList, setMrBaseExchangeRateList] = useState(null);

    const onSetMrBaseExchangeRateList = (values) => {
        setMrBaseExchangeRateList(values);
    }

    return {
        mrBaseExchangeRateList,
        onSetMrBaseExchangeRateList
    }
}