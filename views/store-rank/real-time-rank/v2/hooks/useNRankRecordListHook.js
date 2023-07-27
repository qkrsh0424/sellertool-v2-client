import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import _ from "lodash";
import { nRankRecordDataConnect } from "../../../../../data_connect/nRankRecordDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { customBackdropController } from "../../../../../components/backdrop/default/v1";

export default function useNRankRecordListHook ({
    keyword,
    mallName
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [recordList, setRecordList] = useState(null);
    const [searchedRecordList, setSearchedRecordList] = useState(null);
    const customBackground = customBackdropController();

    useEffect(() => {
        async function fetchInit() {
            customBackground.showBackdrop();
            await reqSearchNRankRecordList();
            customBackground.hideBackdrop();
        }
        
        if(!workspaceRedux?.workspaceInfo?.id){
            return;
        }
        
        fetchInit()
    }, [workspaceRedux?.workspaceInfo?.id])

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

    const reqSearchNRankRecordList = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDataConnect().searchRecordList(headers)
            .then(res => {
                if(res.status === 200) {
                    let sortedData = _.orderBy(res.data.data, 'created_at', 'desc');
                    setRecordList(sortedData)
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                })
            })
    }

    const reqDeleteNRankRecord = async (params, headers, successCallback) => {
        await nRankRecordDataConnect().deleteOne(params, headers)
            .then(res => {
                if(res.status === 200) {
                    successCallback();
                    reqSearchNRankRecordList();
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                })
            })
    }

    return {
        searchedRecordList,
        reqDeleteNRankRecord,
        reqSearchNRankRecordList
    }
}