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
            recordId: record.id
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

    const reqCreateNRankRecordDetail = async () => {
        let body = {
            keyword: record.keyword,
            mallName: record.mallName,
            nrankRecordId: record.id
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDetailDataConnect().createList(body, headers)
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