import { useState } from "react"

export default function useNRankRecordListHook () {
    const [recordListPage, setRecordListPage] = useState(null);
    const [recordList, setRecordList] = useState(null);
    const [currentPendingRecordIds, setCurrentPendingRecordIds] = useState([]);

    const onSetRecordListPage = (data) => {
        setRecordListPage({...data});
    }

    const onSetRecordList = (data) => {
        setRecordList([...data]);
    }

    const onSetCurrentPendingRecordIds = (ids) => {
        setCurrentPendingRecordIds([...ids]);
    }

    return {
        currentPendingRecordIds,
        recordListPage,
        recordList,
        onSetRecordListPage,
        onSetRecordList,
        onSetCurrentPendingRecordIds
    }
}