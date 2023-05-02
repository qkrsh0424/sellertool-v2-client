import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { marginRecordDataConnect } from "../../../../data_connect/marginRecordDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useMarginRecordHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [marginRecord, setMarginRecord] = useState(null);

    useEffect(() => {
        if (!router?.query?.marginRecordId || !workspaceRedux?.workspaceInfo?.id) {
            setMarginRecord(null);
            return;
        }

        reqFetchMarginRecord();
    }, [router?.query?.marginRecordId, workspaceRedux?.workspaceInfo?.id]);

    const reqFetchMarginRecord = async () => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        let params = {
            marginRecordId: router?.query?.marginRecordId
        }

        await marginRecordDataConnect().searchMarginRecord(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setMarginRecord(res.data.data);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                if (res?.status === 403) {
                    customToast.error(res?.data?.memo, {
                        ...defaultOptions,
                        toastId: res?.data?.memo
                    });
                }
            })
    }

    const reqCreateMarginRecord = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await marginRecordDataConnect().createMarginRecord(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    router.replace({
                        pathname: router.pathname,
                        query: { ...router.query, marginRecordId: res.data?.data?.id }
                    })
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

    const reqUpdateMarginRecord = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await marginRecordDataConnect().updateMarginRecord(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    reqFetchMarginRecord();
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
        marginRecord,
        reqCreateMarginRecord,
        reqUpdateMarginRecord,
        reqDeleteMarginRecord
    }
}