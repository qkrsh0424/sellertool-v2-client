import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { nRankRecordDataConnect } from "../../../../../../data_connect/nRankRecordDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";
import _ from "lodash";
import { customBackdropController } from "../../../../../../components/backdrop/default/v1";

export default function useNRankRecordListHook () {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [recordList, setRecordList] = useState(null);
    const customBackground = customBackdropController();

    useEffect(() => {
        async function fetchInit() {
            let headers = {
                wsId: workspaceRedux?.workspaceInfo?.id
            }

            customBackground.showBackdrop();
            await reqSearchNRankRecord(headers);
            customBackground.hideBackdrop();
        }
        
        if(!workspaceRedux?.workspaceInfo?.id){
            return;
        }
        
        fetchInit()
    }, [workspaceRedux?.workspaceInfo?.id])

    const reqSearchNRankRecord = async (headers) => {
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

    return {
        recordList
    }
}