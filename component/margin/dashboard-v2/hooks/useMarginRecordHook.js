import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { marginRecordDataConnect } from "../../../../data_connect/marginRecordDataConnect";

export default function useMarginRecordHook(props) {
    const router = useRouter();
    const [marginRecord, setMarginRecord] = useState(null);

    useEffect(() => {
        if (!router?.query?.marginRecordId) {
            setMarginRecord(null);
            return;
        }

        reqFetchMarginRecord();
    }, [router?.query?.marginRecordId]);

    const reqFetchMarginRecord = async () => {
        let params = {
            marginRecordId: router?.query?.marginRecordId
        }

        await marginRecordDataConnect().searchMarginRecord(params)
            .then(res => {
                if (res.status === 200) {
                    setMarginRecord(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
                let res = err.response;

                if (res?.status === 403 && res?.data?.message === 'access_denied') {
                    alert('접근 권한이 없습니다.');
                    return;
                }
            })
    }

    const reqCreateMarginRecord = async ({
        body,
        successCallback
    }) => {
        await marginRecordDataConnect().createMarginRecord(body)
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
        await marginRecordDataConnect().updateMarginRecord(body)
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
        await marginRecordDataConnect().deleteMarginRecord(body)
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