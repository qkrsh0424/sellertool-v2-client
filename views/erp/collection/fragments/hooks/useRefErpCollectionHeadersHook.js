import { useEffect, useState } from "react";
import { refErpCollectionHeaderDataConnect } from "../../../../../data_connect/refErpCollectionHeaderDataConnect";

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
                console.log(err, err.response);
            })
    }
    return {
        refErpCollectionHeaders,
        reqFetchRefErpCollectionHeaders
    }
}