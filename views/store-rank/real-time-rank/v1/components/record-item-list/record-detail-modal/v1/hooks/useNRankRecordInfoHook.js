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
        if(!record) {
            return;
        }

        if(currentRecordInfoIdx !== 0 && !currentRecordInfoIdx) {
            return;
        }

        onUpdateSelectedRecordInfo();
    }, [record, currentRecordInfoIdx])

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

    const onUpdateSelectedRecordInfo = () => {
        let infoId = recordInfos[currentRecordInfoIdx]
        setSelectedRecordInfo(infoId);
    }

    const onChangeSelectedRecordInfo = (e) => {
        let infoId = e.target.value;
        let infoIdx = recordInfos.findIndex(r => r.id === infoId);
        let value = recordInfos[infoIdx];

        setCurrentRecordInfoIdx(infoIdx);
        setSelectedRecordInfo(value);
    }

    const onSetRecordInfos = (infos) => {
        setRecordInfos([...infos]);
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