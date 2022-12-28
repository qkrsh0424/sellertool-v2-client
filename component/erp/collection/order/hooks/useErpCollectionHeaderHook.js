import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpCollectionHeaderDataConnect } from "../../../../../data_connect/erpCollectionHeaderDataConnect";

export default function useErpCollectionHeaderHook(selectedErpCollectionHeaderId) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpCollectionHeader, setErpCollectionHeader] = useState(null);

    useEffect(() => {
        if (!selectedErpCollectionHeaderId || !workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchErpCollectionHeader();
    }, [selectedErpCollectionHeaderId, workspaceRedux?.workspaceInfo?.id]);

    const reqFetchErpCollectionHeader = async () => {
        let params = {
            erpCollectionHeaderId: selectedErpCollectionHeaderId
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await erpCollectionHeaderDataConnect().searchRelatedErpCollectionHeaderDetails(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpCollectionHeader(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return {
        erpCollectionHeader
    }
}