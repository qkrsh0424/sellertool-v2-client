import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpcExcelDownloadFormDataConnect } from "../../../../../../data_connect/erpcExcelDownloadFormDataConnect";

export default function useErpcExcelDownloadFormsHook(edF) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpcExcelDownloadForms, setErpcExcelDownloadForms] = useState(null);

    useEffect(() => {
        if (!edF || edF === 'fold' || !workspaceRedux?.workspaceInfo?.id || erpcExcelDownloadForms) {
            return;
        }

        reqFetch();
    }, [edF, workspaceRedux?.workspaceInfo?.id]);

    const reqFetch = async () => {
        let params = {}
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await erpcExcelDownloadFormDataConnect().searchList(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpcExcelDownloadForms(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return {
        erpcExcelDownloadForms
    }
}