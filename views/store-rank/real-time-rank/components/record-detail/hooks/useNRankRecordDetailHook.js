import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nRankRecordDataConnect } from "../../../../../../data_connect/nRankRecordDataConnect";
import { nRankRecordDetailDataConnect } from "../../../../../../data_connect/nRankRecordDetailDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useNRankRecordDetailHook() {
    const router = useRouter()
    const [record, setRecord] = useState(null);
    const [recordDetails, setRecordDetails] = useState(null);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchNRankRecord();
            // await reqSearchNRankRecordDetail();
        }
        
        if(!workspaceRedux?.workspaceInfo?.id){
            return;
        }

        if(!router.query.recordId) {
            return;
        }

        fetchInit()
    }, [
        workspaceRedux?.workspaceInfo?.id,
        router.query
    ])

    const reqSearchNRankRecord = async () => {
        let body = {
            id: router.query.recordId
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDataConnect().searchOne(body, headers)
            .then(res => {
                if(res.status === 200) {
                    setRecord(res.data.data)
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

    const reqSearchNRankRecordDetail = async () => {
        let body = {
            recordId: router.query.recordId
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDetailDataConnect().searchList(body, headers)
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
            id: record.id,
            keyword: record.keyword,
            mallName: record.mallName
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
        record,
        recordDetails,
        reqCreateNRankRecordDetail
    }
}