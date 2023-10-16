import { useState } from "react";

export default function useNRankRecordDetailHook({
    record
}) {
    const [recordDetails, setRecordDetails] = useState([]);
    const [adRecordDetails, setAdRecordDetails] = useState([]);
    const [lastSearchedRecordInfo, setLastSearchedRecordInfo] = useState(null);
    const [openedSubInfoRecordDetailIds, setOpenedSubInfoRecordDetailIds] = useState([]);

    const onActionUpdateLastSearchedRecordInfo = (targetId) => {
        let target = record?.infos.find(info => info.id === targetId);
        setLastSearchedRecordInfo(target);
    }

    const onSetRecordDetails = (data) => {
        setRecordDetails([...data])
    }

    const onSetAdRecordDetails = (data) => {
        setAdRecordDetails([...data])
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
        lastSearchedRecordInfo,
        openedSubInfoRecordDetailIds,
        onActionUpdateLastSearchedRecordInfo,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onAddOpenedSubInfoRecordDetailId,
        onRemoveOpenedSubInfoRecordDetailId,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions
    }
}