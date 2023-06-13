import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpCollectionHeaderDataConnect } from "../../../../../../data_connect/erpCollectionHeaderDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useErpCollectionHeadersHook(vhF) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpCollectionHeaders, setErpCollectionHeaders] = useState(null);

    useEffect(() => {
        if (!vhF || vhF === 'fold' || !workspaceRedux?.workspaceInfo?.id || erpCollectionHeaders) {
            return;
        }

        reqFetchErpCollectionHeaders();
    }, [vhF, workspaceRedux?.workspaceInfo?.id]);

    const reqFetchErpCollectionHeaders = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await erpCollectionHeaderDataConnect().searchList(headers)
            .then(res => {
                if (res.status === 200) {
                    setErpCollectionHeaders(res.data.data);
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
        erpCollectionHeaders,
    }
}