import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nRankRecordDetailDataConnect } from "../../../../../../../../data_connect/nRankRecordDetailDataConnect";
import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export default function useNRankRecordDetailHook({
    record
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [recordDetails, setRecordDetails] = useState(null);
    const [adRecordDetails, setAdRecordDetails] = useState(null);
    const [targetRecordInfo, setTargetRecordInfo] = useState(null);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    useEffect(() => {
        return () => setIsLoading(false)
    }, [])

    useEffect(() => {
        async function fetchInit() {
            await reqSearchNRankRecordDetail();
        }
        
        if(!workspaceRedux?.workspaceInfo?.id){
            return;
        }

        if(record) {
            let pendingId = getCookie('nrank_search_pending_id');
            if(pendingId === record.id) {
                setIsLoading(true)
            }else {
                setIsLoading(false);
            }
        }

        if(!(record && record.current_nrank_record_info_id)) {
            return;
        }

        fetchInit()
    }, [
        workspaceRedux?.workspaceInfo?.id,
        record
    ])

    useEffect(() => {
        if(!(record && record.current_nrank_record_info_id)) {
            return;
        }

        onActionUpdateTargetRecordInfo(record.current_nrank_record_info_id);
    }, [record])

    const onActionUpdateTargetRecordInfo = (targetId) => {
        let target = record.infos?.find(info => info.id === targetId);

        setTargetRecordInfo(target);
    }

    const reqSearchNRankRecordDetail = async () => {

        let params = {
            record_info_id: record.current_nrank_record_info_id
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDetailDataConnect().searchList(params, headers)
            .then(res => {
                if(res.status === 200) {
                    let data = res.data.data;
                    let rankDetails = []
                    let adRankDetails = []
                    data.forEach(r => {
                        if(r.advertising_yn === 'y') {
                            adRankDetails.push(r)
                        }else {
                            rankDetails.push(r)
                        }
                    })
                    setRecordDetails(rankDetails)
                    setAdRecordDetails(adRankDetails)
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
        let pendingIds = getCookie('nrank_search_pending_id');
        if(pendingIds) {
            let message = '아직 종료되지 않은 조회 내역이 있습니다. 잠시 후 다시 시도해주세요.';
            customToast.error(message, {
                ...defaultOptions,
                toastId: message
            })
            return;
        }else {
            setCookie('nrank_search_pending_id', record.id)
        }

        setIsLoading(true);

        let body = {
            record_id: record.id
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDetailDataConnect().createList(body, headers)
            .then(res => {
                if(res.status === 200) {
                    let content = `(${record.keyword} - ${record.mall_name}) 조회 결과가 업데이트되었습니다.`
                    customToast.success(content, {
                        ...defaultOptions,
                        toastId: content
                    });
                    successCallback();
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            }).finally(() => {
                deleteCookie('nrank_search_pending_id');
            })

        setIsLoading(false);
    }

    return {
        isLoading,
        recordDetails,
        adRecordDetails,
        targetRecordInfo,
        reqCreateNRankRecordDetail
    }
}