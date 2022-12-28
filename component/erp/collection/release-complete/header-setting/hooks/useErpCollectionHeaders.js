import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { erpCollectionHeaderDataConnect } from "../../../../../../data_connect/erpCollectionHeaderDataConnect";

export default function useErpCollectionHeaders(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpCollectionHeaders, setErpCollectionHeaders] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchErpCollectionHeaders();
    }, [workspaceRedux?.workspaceInfo?.id]);

    const reqFetchErpCollectionHeaders = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await erpCollectionHeaderDataConnect().searchList(null, headers)
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