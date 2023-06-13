import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpcExcelDownloadFormDataConnect } from "../../../../../../data_connect/erpcExcelDownloadFormDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useErpcExcelDownloadFormHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const [erpcExcelDownloadForm, setErpcExcelDownloadForm] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !router?.query?.erpcExcelDownloadFormId) {
            return;
        }

        reqFetch();
    }, [workspaceRedux?.workspaceInfo?.id, router?.query?.erpcExcelDownloadFormId]);

    const reqFetch = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        let params = {
            erpcExcelDownloadFormId: router?.query?.erpcExcelDownloadFormId
        }

        await erpcExcelDownloadFormDataConnect().searchRelatedFormDetails(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpcExcelDownloadForm(res.data.data);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            })
            ;
    }

    const reqUpdateErpcExcelDownloadForm = async (body, successCallback) => {
        await erpcExcelDownloadFormDataConnect().update(body)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;
                if (!res) {
                    alert('네트워크가 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const reqDeleteErpcExcelDownloadForm = async (body, successCallback) => {
        await erpcExcelDownloadFormDataConnect().delete(body)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;

    }

    return {
        erpcExcelDownloadForm,
        reqUpdateErpcExcelDownloadForm,
        reqDeleteErpcExcelDownloadForm
    }
}