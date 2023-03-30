import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { marginRecordDataConnect } from "../../../../data_connect/marginRecordDataConnect";

export default function useMarginRecordsHook(props) {
    const { enqueueSnackbar } = useSnackbar();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [marginRecords, setMarginRecords] = useState(null);

    useEffect(() => {
        reqFetchMarginRecords();
    }, [])

    const reqFetchMarginRecords = async () => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await marginRecordDataConnect().searchList(headers)
            .then(res => {
                if (res.status === 200) {
                    setMarginRecords(res.data.data)
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                if (res?.status === 403) {
                    enqueueSnackbar(res?.data?.memo, { variant: 'error', autoHideDuration: 3000, preventDuplicate:true })
                }
            })
    }

    const reqDeleteMarginRecord = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await marginRecordDataConnect().deleteMarginRecord(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    reqFetchMarginRecords();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.')
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    return {
        marginRecords,
        reqFetchMarginRecords,
        reqDeleteMarginRecord
    }
}