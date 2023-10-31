import { useEffect, useState } from "react";

export default function useNRankRecordDetailHook() {
    const [recordDetails, setRecordDetails] = useState([]);
    const [adRecordDetails, setAdRecordDetails] = useState([]);
    const [openedSubInfoRecordDetailIds, setOpenedSubInfoRecordDetailIds] = useState([]);
    const [isFoldAll, setIsFoldAll] = useState(false);
    const [traceableRecordDetails, setTraceableRecordDetails] = useState(null);
    const [traceableAdRecordDetails, setTraceableAdRecordDetails] = useState(null);

    const [recordDetailsBySearchedInfos, setRecordDetailsBySearchedInfos] = useState(null);

    useEffect(() => {
        if(!(recordDetails && adRecordDetails)) {
            return;
        }

        handleInitOpenedSubInfoRecordDetailIds();
    }, [isFoldAll, recordDetails, adRecordDetails])

    const onSetRecordDetailsBySearchedInfos = (data) => {
        setRecordDetailsBySearchedInfos([...data]);
    }

    const onSetRecordDetails = (data) => {
        setRecordDetails([...data])
    }

    const onSetAdRecordDetails = (data) => {
        setAdRecordDetails([...data])
    }

    const onSetTraceableRecordDetails = (data) => {
        setTraceableRecordDetails([...data])
    }

    const onSetTraceableAdRecordDetails = (data) => {
        setTraceableAdRecordDetails([...data])
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

    const checkStatusForModalOpen = () => {
        if(![...recordDetails, ...adRecordDetails].length > 0 ) {
            throw Error('조회데이터가 존재하지 않습니다.')
        }
    }

    return {
        recordDetails,
        adRecordDetails,
        openedSubInfoRecordDetailIds,
        recordDetailsBySearchedInfos,
        traceableRecordDetails,
        traceableAdRecordDetails,
        onSetRecordDetailsBySearchedInfos,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onSetTraceableRecordDetails,
        onSetTraceableAdRecordDetails,
        onAddOpenedSubInfoRecordDetailId,
        onRemoveOpenedSubInfoRecordDetailId,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions,
        checkStatusForModalOpen
    }
}