import { useRouter } from "next/router";
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { useSelector } from "react-redux";
import { useApiHook } from "./useApiHook";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";
import { useErpItemActionsHook } from "../contexts/ErpItemProvider";
import { CLASSIFICATIONS } from "../References";

const customDateUtils = CustomDateUtils();
const customURIEncoderUtils = CustomURIEncoderUtils();

export function useErpItemFetcherHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const apiHook = useApiHook();

    const erpItemActionsHook = useErpItemActionsHook();

    const reqCountErpItems = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            periodSearchCondition: router?.query?.periodSearchCondition,
            startDateTime: router?.query?.startDateTime && customDateUtils.getStartDate(router?.query?.startDateTime),
            endDateTime: router?.query?.endDateTime && customDateUtils.getEndDate(router?.query?.endDateTime),
            mpSearchCondition: router?.query?.mpSearchCondition,
            mpSearchQuery: router?.query?.mpSearchQuery,
            oiSearchCondition: router?.query?.oiSearchCondition,
            oiSearchQuery: router?.query?.oiSearchQuery,
            riSearchCondition: router?.query?.riSearchCondition,
            riSearchQuery: router?.query?.riSearchQuery,
            diSearchCondition: router?.query?.diSearchCondition,
            diSearchQuery: router?.query?.diSearchQuery,
            mmSearchCondition: router?.query?.mmSearchCondition,
            mmSearchQuery: router?.query?.mmSearchQuery,
            matchedCode: router?.query?.matchedCode || 'releaseOptionCode',
            stockReflectYn: router?.query?.stockReflectYn || null,
        }

        switch (router?.query?.classificationType) {
            case 'NEW':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'CONFIRM':
                params.salesYn = 'y';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'COMPLETE':
                params.salesYn = 'y';
                params.releaseYn = 'y';
                params.holdYn = 'n';
                break;
            case 'POSTPONE':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'y';
                break;
        }

        const result = await apiHook.reqCountErpItems({ params, headers });

        if (result) {
            let totalSize = result?.content?.totalSize;
            let size = router?.query?.size || 50;

            if (totalSize <= 0) {
                erpItemActionsHook.totalSize.onSet(0);
                erpItemActionsHook.totalPages.onSet(1);
                return;
            }

            let totalPages = Math.ceil(totalSize / size);

            erpItemActionsHook.totalSize.onSet(totalSize);
            erpItemActionsHook.totalPages.onSet(totalPages);
        }
    }

    const reqFetchErpItemSlice = async () => {
        erpItemActionsHook.isLoading.onSet(true);

        const currClassification = CLASSIFICATIONS.find(r => r.classificationType === router?.query?.classificationType) || CLASSIFICATIONS[0];

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            periodSearchCondition: router?.query?.periodSearchCondition,
            startDateTime: router?.query?.startDateTime && customDateUtils.getStartDate(router?.query?.startDateTime),
            endDateTime: router?.query?.endDateTime && customDateUtils.getEndDate(router?.query?.endDateTime),
            mpSearchCondition: router?.query?.mpSearchCondition,
            mpSearchQuery: router?.query?.mpSearchQuery,
            oiSearchCondition: router?.query?.oiSearchCondition,
            oiSearchQuery: router?.query?.oiSearchQuery,
            riSearchCondition: router?.query?.riSearchCondition,
            riSearchQuery: router?.query?.riSearchQuery,
            diSearchCondition: router?.query?.diSearchCondition,
            diSearchQuery: router?.query?.diSearchQuery,
            mmSearchCondition: router?.query?.mmSearchCondition,
            mmSearchQuery: router?.query?.mmSearchQuery,
            page: router?.query?.page || 1,
            size: router?.query?.size || 50,
            sort: router?.query?.sort?.split(',') || 'releaseAt_asc',
            matchedCode: router?.query?.matchedCode || 'releaseOptionCode',
            stockReflectYn: router?.query?.stockReflectYn || null,
            sortTypes: router?.query?.sortTypes || customURIEncoderUtils.encodeJSONList(currClassification.defaultSortTypes),
        }

        switch (router?.query?.classificationType) {
            case 'NEW':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'CONFIRM':
                params.salesYn = 'y';
                params.releaseYn = 'n';
                params.holdYn = 'n';
                break;
            case 'COMPLETE':
                params.salesYn = 'y';
                params.releaseYn = 'y';
                params.holdYn = 'n';
                break;
            case 'POSTPONE':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'y';
                break;
        }

        const result = await apiHook.reqFetchErpItemSlice({ params, headers });

        if (result) {
            erpItemActionsHook.content.onSet(result?.content);
        }

        erpItemActionsHook.isLoading.onSet(false);
    }

    return {
        reqFetchErpItemSlice,
        reqCountErpItems
    }
}