import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nRankRecordDetailDataConnect } from "../../../../../../data_connect/nRankRecordDetailDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useNRankRecordDetailHook({
    record
}) {
    const [recordDetails, setRecordDetails] = useState(null);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchNRankRecordDetail();
        }
        
        if(!workspaceRedux?.workspaceInfo?.id){
            return;
        }

        if(!record) {
            return;
        }

        fetchInit()
    }, [
        workspaceRedux?.workspaceInfo?.id,
        record
    ])

    const reqSearchNRankRecordDetail = async () => {
        let params = {
            record_id: record.id
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDetailDataConnect().searchList(params, headers)
            .then(res => {
                if(res.status === 200) {
                    setRecordDetails(res.data.data)
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

    const reqCreateNRankRecordDetail = async (successCallback) => {
        let body = {
            keyword: record.keyword,
            mall_name: record.mall_name,
            nrank_record_id: record.id
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDetailDataConnect().createList(body, headers)
            .then(res => {
                if(res.status === 200) {
                    successCallback()
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
        recordDetails,
        reqCreateNRankRecordDetail
    }
}