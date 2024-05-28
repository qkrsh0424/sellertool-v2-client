import { useEffect, useState } from "react";
import { erpCollectionHeaderDataConnect } from "../../../../../data_connect/erpCollectionHeaderDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { useSellertoolDatasValueHook } from "../../../../../contexts/SellertoolDatasGlobalProvider";
import { useRouter } from "next/router";

function getErpcHeaderIdFromClassificationType(sellertoolDatas, classificationType) {
    switch (classificationType) {
        case 'ALL':
            return sellertoolDatas?.allHeaderIdForErpc;
        case 'NEW':
            return sellertoolDatas?.orderHeaderIdForErpc;
        case 'CONFIRM':
            return sellertoolDatas?.salesHeaderIdForErpc;
        case 'COMPLETE':
            return sellertoolDatas?.releaseCompleteHeaderIdForErpc;
        case 'POSTPONE':
            return sellertoolDatas?.holdHeaderIdForErpc;
        default:
            return null;
    }
}

export default function useErpCollectionHeaderHook() {
    const router = useRouter();
    const classificationType = router?.query?.classificationType || null;
    const sellertoolDatasValueHook = useSellertoolDatasValueHook();
    const wsId = sellertoolDatasValueHook?.wsId;

    const currentErpCollectionHeaderId = getErpcHeaderIdFromClassificationType(sellertoolDatasValueHook, classificationType);

    const [erpCollectionHeader, setErpCollectionHeader] = useState(null);

    useEffect(() => {
        if (!currentErpCollectionHeaderId || !wsId) {
            return setErpCollectionHeader(null);
        }

        reqFetchErpCollectionHeader();

        return () => setErpCollectionHeader(null);
    }, [currentErpCollectionHeaderId, wsId]);

    const reqFetchErpCollectionHeader = async () => {
        let params = {
            erpCollectionHeaderId: currentErpCollectionHeaderId
        }

        let headers = {
            wsId: wsId
        }

        await erpCollectionHeaderDataConnect().searchRelatedErpCollectionHeaderDetails(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpCollectionHeader(res.data.data);
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
        erpCollectionHeader
    }
}