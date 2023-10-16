import { useEffect } from "react";
import { useState } from "react"

export default function useNRankRecordInfoHook({
    record
}) {
    const [currentRecordInfoIdx, setCurrentRecordInfoIdx] = useState(null);
    const [selectedRecordInfo, setSelectedRecordInfo] = useState(null);

    useEffect(() => {
        if(!record) {
            return;
        }

        if(currentRecordInfoIdx !== 0 && !currentRecordInfoIdx) {
            return;
        }

        onUpdateSelectedRecordInfo();
    }, [record, currentRecordInfoIdx])

    const onSetCurrentRecordInfoIdx = (idx) => {
        if(idx < 0 || idx >= record?.infos.length) {
            return;
        }

        setCurrentRecordInfoIdx(idx);
    }

    const onUpdateSelectedRecordInfo = () => {
        let infos = [...record.infos]
        let infoId = infos[currentRecordInfoIdx]
        setSelectedRecordInfo(infoId);
    }

    const onChangeSelectedRecordInfo = (e) => {
        let infoId = e.target.value;
        let infoIdx = record.infos.findIndex(r => r.id === infoId);
        let value = record.infos[infoIdx];

        setCurrentRecordInfoIdx(infoIdx);
        setSelectedRecordInfo(value);
    }

    return {
        selectedRecordInfo,
        currentRecordInfoIdx,
        onSetCurrentRecordInfoIdx,
        onChangeSelectedRecordInfo
    }
}