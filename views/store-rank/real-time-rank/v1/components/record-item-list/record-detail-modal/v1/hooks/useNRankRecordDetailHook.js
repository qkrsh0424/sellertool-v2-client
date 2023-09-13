import { useState } from "react";

export default function useNRankRecordDetailHook({
    record
}) {
    const [recordDetails, setRecordDetails] = useState([]);
    const [adRecordDetails, setAdRecordDetails] = useState([]);
    const [targetRecordInfo, setTargetRecordInfo] = useState(null);
    const [openedSubInfoRecordDetailIds, setOpenedSubInfoRecordDetailIds] = useState([]);

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

    const onAddOpenedSubInfoRecordDetailId = (recordId) => {
        setOpenedSubInfoRecordDetailIds([...openedSubInfoRecordDetailIds, recordId])
    }

    const onRemoveOpenedSubInfoRecordDetailId = (recordId) => {
        let ids = openedSubInfoRecordDetailIds.filter(id => id !== recordId)
        setOpenedSubInfoRecordDetailIds(ids)
    }

    const onActionFoldAllOptions = () => {
        let ids = recordDetails?.map(r => r.id);
        let adIds = adRecordDetails?.map(r => r.id);
        setOpenedSubInfoRecordDetailIds([...ids, ...adIds])
    }

    const onActionUnfoldAllOptions = () => {
        setOpenedSubInfoRecordDetailIds([]);
    }

    return {
        recordDetails,
        adRecordDetails,
        targetRecordInfo,
        openedSubInfoRecordDetailIds,
        onActionUpdateTargetRecordInfo,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onSetTargetRecordInfo,
        onAddOpenedSubInfoRecordDetailId,
        onRemoveOpenedSubInfoRecordDetailId,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions
    }
}