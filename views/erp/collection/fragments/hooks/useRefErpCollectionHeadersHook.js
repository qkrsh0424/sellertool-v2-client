import { useEffect, useState } from "react";
import { refErpCollectionHeaderDataConnect } from "../../../../../data_connect/refErpCollectionHeaderDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useRefErpCollectionHeadersHook(props) {
    const [refErpCollectionHeaders, setRefErpCollectionHeaders] = useState(null);

    useEffect(() => {
        reqFetchRefErpCollectionHeaders();
    }, []);

    const reqFetchRefErpCollectionHeaders = async () => {
        await refErpCollectionHeaderDataConnect().searchList()
            .then(res => {
                if (res.status === 200) {
                    setRefErpCollectionHeaders(res.data.data);
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
    return {
        refErpCollectionHeaders,
        reqFetchRefErpCollectionHeaders
    }
}