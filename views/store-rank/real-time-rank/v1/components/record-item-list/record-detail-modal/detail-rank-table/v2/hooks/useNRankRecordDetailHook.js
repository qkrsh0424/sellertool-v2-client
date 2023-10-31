import { useState } from "react";

export default function useNRankRecordDetailHook() {
    const [traceableRecordDetails, setTraceableRecordDetails] = useState(null);
    const [traceableAdRecordDetails, setTraceableAdRecordDetails] = useState(null);

    const [recordDetailsBySearchedInfos, setRecordDetailsBySearchedInfos] = useState(null);

    const onSetRecordDetailsBySearchedInfos = (data) => {
        setRecordDetailsBySearchedInfos([...data]);
    }

    const onSetTraceableRecordDetails = (data) => {
        setTraceableRecordDetails([...data])
    }

    const onSetTraceableAdRecordDetails = (data) => {
        setTraceableAdRecordDetails([...data])
    }

    const onActionFoldAllOptions = () => {
        setIsFoldAll(true);
    }

    const onActionUnfoldAllOptions = () => {
        setIsFoldAll(false);
    }

    const checkStatusForModalOpen = () => {
        if(![...traceableAdRecordDetails, ...traceableRecordDetails].length > 0 ) {
            throw Error('조회데이터가 존재하지 않습니다.')
        }
    }

    return {
        recordDetailsBySearchedInfos,
        traceableRecordDetails,
        traceableAdRecordDetails,
        onSetRecordDetailsBySearchedInfos,
        onSetTraceableRecordDetails,
        onSetTraceableAdRecordDetails,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions,
        checkStatusForModalOpen
    }
}