import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { nRankRecordDataConnect } from "../../../../../../data_connect/nRankRecordDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";
import _ from "lodash";

export default function useNRankRecordListHook () {
    const [recordList, setRecordList] = useState(null);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    useEffect(() => {
        async function fetchInit() {
            await reqSearchNRankRecord();
        }
        
        if (workspaceRedux?.workspaceInfo?.id) {
            fetchInit()
        }
    }, [workspaceRedux?.workspaceInfo?.id])

    const reqSearchNRankRecord = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await nRankRecordDataConnect().searchRecordList(headers)
            .then(res => {
                if(res.status === 200) {
                    let sortedData = _.orderBy(res.data.data, 'createdAt', 'desc');
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

    return {
        recordList
    }
}