import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nRankRecordDataConnect } from "../../../../../../../data_connect/nRankRecordDataConnect";
import { customToast, defaultOptions } from "../../../../../../../components/toast/custom-react-toastify/v1";

export default function useNRankRecordHook() {
    const router = useRouter();
    const [record, setRecord] = useState(null);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchNRankRecord();
        }

        if(!router.query?.recordId) {
            return;
        }

        fetchInit();
    }, [router?.query?.recordId])
    
    const reqSearchNRankRecord = async () => {
        let params = {
            id: router.query.recordId
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDataConnect().searchOne(params, headers)
            .then(res => {
                if (res.status === 200) {
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

    return {
        record
    }
}