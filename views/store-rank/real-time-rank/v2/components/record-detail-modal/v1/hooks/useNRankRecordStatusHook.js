import { useState } from "react";

export default function useNRankRecordStatusHook() {
    const [currentPendingIds, setCurrentPendingIds] = useState([]);

    const onSetCurrentPendingIds = (data) => {
        setCurrentPendingIds(data);
    }

    return {
        currentPendingIds,
        onSetCurrentPendingIds
    }
}