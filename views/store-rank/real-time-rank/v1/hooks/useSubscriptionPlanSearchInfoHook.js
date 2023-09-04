import { useState } from "react";

export default function useSubscriptionPlanSearchInfoHook() {
    const [rankSearchInfo, setRankSearchInfo] = useState(null);

    const onSetRankSearchInfo = (data) => {
        setRankSearchInfo({...data})
    }

    return {
        rankSearchInfo,
        onSetRankSearchInfo
    }
}