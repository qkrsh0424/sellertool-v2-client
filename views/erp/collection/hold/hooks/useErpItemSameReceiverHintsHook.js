import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpItemSameReceiverDataConnect } from "../../../../../data_connect/erpItemSameReceiverDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useErpItemSameReceiverHintsHook(erpItemPage) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpItemSameReceiverHints, setErpItemSameReceiverHints] = useState(null);

    useEffect(() => {
        if (!erpItemPage?.content || erpItemPage?.content?.length <= 0 || !workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchSameReceiversCount();
    }, [erpItemPage?.content, workspaceRedux?.workspaceInfo?.id]);

    const reqFetchSameReceiversCount = async () => {
        if (!erpItemPage?.content || erpItemPage?.content?.length <= 0 || !workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        let sameReceiverHints = erpItemPage?.content?.map(r => {
            return `${r.receiver}${r.receiverContact1}${r.destination}${r.destinationDetail}`;
        })

        let body = {
            workspaceId: workspaceRedux?.workspaceInfo?.id,
            sameReceiverHints: sameReceiverHints
        }

        await erpItemSameReceiverDataConnect().count(body)
            .then(res => {
                if (res.status === 200) {
                    setErpItemSameReceiverHints(res.data.data);
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
            ;
    }

    return {
        erpItemSameReceiverHints
    }
}