import { useEffect } from "react";
import { useState } from "react"

export default function useNRankRecordInfoHook({
    record
}) {
    const [recordInfos, setRecordInfos] = useState(null);
    const [lastSearchedRecordInfo, setLastSearchedRecordInfo] = useState(null);
    const [currentRecordInfoIdx, setCurrentRecordInfoIdx] = useState(null);
    const [selectedRecordInfo, setSelectedRecordInfo] = useState(null);

    useEffect(() => {
        if(!record) {
            return;
        }

        onInitLastSearchedRecordInfo();
    }, [record])

    useEffect(() => {
        if(!recordInfos) {
            return;
        }

        if(currentRecordInfoIdx !== 0 && !currentRecordInfoIdx) {
            return;
        }

        onSetSelectedRecordInfoByCurrentIdx();
    }, [recordInfos, currentRecordInfoIdx])

    const onInitLastSearchedRecordInfo = () => {
        let info = record.nrank_record_info
        setLastSearchedRecordInfo(info)
    }

    const onSetCurrentRecordInfoIdx = (idx) => {
        if(idx < 0 || idx >= recordInfos?.length) {
            return;
        }

        setCurrentRecordInfoIdx(idx);
    }

    const onChangeSelectedRecordInfo = (e) => {
        let infoId = e.target.value;
        let infoIdx = recordInfos.findIndex(r => r.id === infoId);

        setCurrentRecordInfoIdx(infoIdx);
    }

    const onSetRecordInfos = (infos) => {
        setRecordInfos([...infos]);
    }

    const onSetSelectedRecordInfoByCurrentIdx = () => {
        let info = recordInfos[currentRecordInfoIdx];
        setSelectedRecordInfo(info);
    }

    return {
        recordInfos,
        lastSearchedRecordInfo,
        selectedRecordInfo,
        currentRecordInfoIdx,
        onSetCurrentRecordInfoIdx,
        onChangeSelectedRecordInfo,
        onSetRecordInfos
    }
}