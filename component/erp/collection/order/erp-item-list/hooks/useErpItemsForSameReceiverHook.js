import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../../data_connect/erpItemDataConnect";

export default function useErpItemsFormSameReceiverHook(sameReceiverId) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const router = useRouter();
    const [erpItems, setErpItems] = useState(null);

    useEffect(() => {
        reqFetchErpItems();
    }, [workspaceRedux?.workspaceInfo?.id, sameReceiverId]);

    const reqFetchErpItems = async () => {
        if (!sameReceiverId || !workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            sameReceiverId: sameReceiverId,
            matchedCode: router?.query?.matchedCode || 'releaseOptionCode'
        }

        await erpItemDataConnect().searchListBySameReceiverId(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpItems(res.data.data?.filter(r => r.salesYn === 'n' && r.releaseYn === 'n'));
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
            ;
    }

    return {
        erpItems
    }
}