import { useState } from "react";

export function useRefSubscriptionPlanListHook(props) {
    const [refSubscriptionPlanList, setRefSubscriptionPlanList] = useState();

    const onSetRefSubscriptionPlanList = (values) => {
        setRefSubscriptionPlanList(values);
    }

    return {
        refSubscriptionPlanList,
        onSetRefSubscriptionPlanList
    }
}