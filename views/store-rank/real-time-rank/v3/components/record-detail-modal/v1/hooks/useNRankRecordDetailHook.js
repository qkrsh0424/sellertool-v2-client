import { useState } from "react";

export default function useNRankRecordDetailHook({
    record
}) {
    const [recordDetails, setRecordDetails] = useState(null);
    const [adRecordDetails, setAdRecordDetails] = useState(null);
    const [targetRecordInfo, setTargetRecordInfo] = useState(null);

    const onActionUpdateTargetRecordInfo = (targetId) => {
        let target = record.infos?.find(info => info.id === targetId);
        setTargetRecordInfo(target);
    }

    const onSetRecordDetails = (data) => {
        setRecordDetails([...data])
    }
    const onSetAdRecordDetails = (data) => {
        setAdRecordDetails([...data])
    }
    const onSetTargetRecordInfo = (data) => {
        setTargetRecordInfo(...data)
    }

    return {
        recordDetails,
        adRecordDetails,
        targetRecordInfo,
        onActionUpdateTargetRecordInfo,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onSetTargetRecordInfo
    }
}