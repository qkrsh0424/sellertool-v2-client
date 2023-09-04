import { useEffect, useState } from "react"
import _ from "lodash";

export default function useNRankRecordListHook ({
    keyword,
    mallName
}) {
    const [recordList, setRecordList] = useState(null);
    const [currentPendingRecordIds, setCurrentPendingRecordIds] = useState([]);
    const [searchedRecordList, setSearchedRecordList] = useState(null);

    useEffect(() => {
        if(!recordList) {
            return
        }
        
        if(!(keyword || mallName)) {
            setSearchedRecordList([...recordList]);
            return;
        }

        onChangeSearchedRecordList()
    }, [keyword, mallName, recordList])

    const onChangeSearchedRecordList = () => {
        let data = [];

        recordList.forEach(item => {
            if((item.keyword).includes(keyword) && (item.mall_name).includes(mallName)){
                data.unshift(item);
            }else if (keyword !== '' && (item.keyword).includes(keyword)) {
                data.push(item)
            }else if (mallName !== '' && (item.mall_name).includes(mallName)) {
                data.push(item)
            }
        })

        setSearchedRecordList(data);
    }

    const onSetRecordList = (data) => {
        let sortedData = _.orderBy(data, 'created_at', 'desc');
        setRecordList([...sortedData])
    }

    const onSetCurrentPendingRecordIds = (ids) => {
        setCurrentPendingRecordIds([...ids])
    }

    return {
        currentPendingRecordIds,
        searchedRecordList,
        onSetRecordList,
        onSetCurrentPendingRecordIds
    }
}