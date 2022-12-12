import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpCollectionHeaderDataConnect } from "../../../../../../data_connect/erpCollectionHeaderDataConnect";

export default function useErpCollectionHeadersHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpCollectionHeaders, setErpCollectionHeaders] = useState(null);

    useEffect(() => {
        reqFetchErpCollectionHeaders();
    }, [workspaceRedux?.workspaceInfo?.id]);

    const reqFetchErpCollectionHeaders = async () => {
        let params = {}
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await erpCollectionHeaderDataConnect().searchList(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpCollectionHeaders(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return {
        erpCollectionHeaders
    }
}