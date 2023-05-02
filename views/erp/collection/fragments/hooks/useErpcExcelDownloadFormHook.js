import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpcExcelDownloadFormDataConnect } from "../../../../../data_connect/erpcExcelDownloadFormDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useErpcExcelDownloadFormHook(
    erpcExcelDownloadFormId
) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const [erpcExcelDownloadForm, setErpcExcelDownloadForm] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !erpcExcelDownloadFormId) {
            return;
        }

        reqFetch();
    }, [workspaceRedux?.workspaceInfo?.id, erpcExcelDownloadFormId]);

    const reqFetch = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        let params = {
            erpcExcelDownloadFormId: erpcExcelDownloadFormId
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

    return {
        erpcExcelDownloadForm,
    }
}