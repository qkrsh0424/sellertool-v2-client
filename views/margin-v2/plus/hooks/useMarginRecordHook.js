import { useState } from "react"

export function useMarginRecordHook(props) {
    const [marginRecordList, setMarginRecordList] = useState(null);
    const [selectedMarginRecord, setSelectedMarginRecord] = useState(null);

    const onSetMarginRecordList = (values) => {
        setMarginRecordList(values);
    }

    const onSetSelectedMarginRecord = (value) => {
        setSelectedMarginRecord(value);
    }

    return {
        marginRecordList,
        selectedMarginRecord,
        onSetMarginRecordList,
        onSetSelectedMarginRecord
    }
}