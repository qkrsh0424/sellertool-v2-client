import { useState } from "react";

export function useRefSubscriptionPlanHook(props) {
    const [refSubscriptionPlan, setRefSubscriptionPlan] = useState(null);

    const onSetRefSubscriptionPlan = (value) => {
        setRefSubscriptionPlan(value);
    }

    return {
        refSubscriptionPlan,
        onSetRefSubscriptionPlan
    }
}