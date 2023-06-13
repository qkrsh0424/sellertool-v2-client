import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpcExcelDownloadFormDataConnect } from "../../../../../data_connect/erpcExcelDownloadFormDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useErpcExcelDownloadFormsHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpcExcelDownloadForms, setErpcExcelDownloadForms] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetch();
    }, [workspaceRedux?.workspaceInfo?.id]);

    const reqFetch = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await erpcExcelDownloadFormDataConnect().searchList(headers)
            .then(res => {
                if (res.status === 200) {
                    setErpcExcelDownloadForms(res.data.data);
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
    }

    const reqDownloadForm = async (erpcExcelDownloadFormId, downloadOrderItemsBody, fileName) => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await erpcExcelDownloadFormDataConnect().actionExcelDownload(erpcExcelDownloadFormId, downloadOrderItemsBody, headers)
            .then(res => {
                // if (res.status === 200 && res.data.message === 'success') {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                const link = document.createElement('a');
                link.href = url;

                link.setAttribute('download', fileName + '.xlsx');
                document.body.appendChild(link);
                link.click();
                // }
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
    }

    return {
        erpcExcelDownloadForms,
        reqDownloadForm
    }
}