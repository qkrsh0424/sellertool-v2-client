import { useEffect, useState } from "react";

export default function useNRankRecordDetailHook() {
    const [recordDetails, setRecordDetails] = useState([]);
    const [adRecordDetails, setAdRecordDetails] = useState([]);
    const [openedSubInfoRecordDetailIds, setOpenedSubInfoRecordDetailIds] = useState([]);
    const [isFoldAll, setIsFoldAll] = useState(false);

    useEffect(() => {
        if(!(recordDetails && adRecordDetails)) {
            return;
        }

        handleInitOpenedSubInfoRecordDetailIds();
    }, [isFoldAll, recordDetails, adRecordDetails])

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
        setIsFoldAll(true);
    }

    const handleInitOpenedSubInfoRecordDetailIds = () => {
        if(isFoldAll) {
            let ids = recordDetails?.map(r => r.id);
            let adIds = adRecordDetails?.map(r => r.id);
            setOpenedSubInfoRecordDetailIds([...ids, ...adIds])
        }else {
            setOpenedSubInfoRecordDetailIds([]);
        }
    }

    const onActionUnfoldAllOptions = () => {
        setIsFoldAll(false);
    }

    return {
        recordDetails,
        adRecordDetails,
        openedSubInfoRecordDetailIds,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onAddOpenedSubInfoRecordDetailId,
        onRemoveOpenedSubInfoRecordDetailId,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions
    }
}