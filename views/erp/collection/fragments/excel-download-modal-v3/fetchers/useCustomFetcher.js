import { useEffect } from "react";
import { refErpCollectionHeaderDataConnect } from "../../../../../../data_connect/refErpCollectionHeaderDataConnect";
import { customToast } from "../../../../../../components/toast/custom-react-toastify/v1";
import { useSelector } from "react-redux";
import { erpcExcelDownloadFormDataConnect } from "../../../../../../data_connect/erpcExcelDownloadFormDataConnect";
import { useRefErpCollectionHeadersActionsContextHook } from "../contexts/ref-erp-collection-headers-context";
import { useErpcExcelDownloadFormsActionsContextHook } from "../contexts/erpc-excel-download-forms-context";

export function useCustomFetcher(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const workspaceId = workspaceRedux?.workspaceInfo?.id;
    const refErpCollectionHeadersActionsContextHook = useRefErpCollectionHeadersActionsContextHook();
    const erpcExcelDownloadFormsActionsContextHook = useErpcExcelDownloadFormsActionsContextHook();

    useEffect(() => {
        handleReqFetchRefErpCollectionHeaders();
    }, []);

    useEffect(() => {
        if (!workspaceId) {
            return;
        }

        handleReqFetchErpcExcelDownloadForms();
    }, [workspaceId])

    const handleReqFetchRefErpCollectionHeaders = async () => {
        await refErpCollectionHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200) {
                    refErpCollectionHeadersActionsContextHook.refErpCollectionHeaders.onSet(res.data.data);
                    return;
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

    const handleReqFetchErpcExcelDownloadForms = async () => {
        let headers = {
            wsId: workspaceId
        }
        await erpcExcelDownloadFormDataConnect().searchList(headers)
            .then(res => {
                if (res.status === 200) {
                    erpcExcelDownloadFormsActionsContextHook.erpcExcelDownloadForms.onSet(res.data.data);
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

    return {
        handleReqFetchRefErpCollectionHeaders,
        handleReqFetchErpcExcelDownloadForms
    };
}