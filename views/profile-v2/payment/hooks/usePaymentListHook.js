import { useState } from "react";

export function usePaymentListHook(props) {
    const [paymentList, setPaymentList] = useState(null);

    const onSetPaymentList = (values) => {
        setPaymentList(values);
    }

    return {
        paymentList,
        onSetPaymentList
    }
}