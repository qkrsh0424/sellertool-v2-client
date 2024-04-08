import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useApiHook } from "../hooks/useApiHook";
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";
import { CLASSIFICATIONS } from "../References";

const ErpItemValueContext = createContext();
const ErpItemActionsContext = createContext();

const customDateUtils = CustomDateUtils();
const customURIEncoderUtils = CustomURIEncoderUtils();

export function ErpItemProvider({ children }) {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalSize, setTotalSize] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const contentActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setContent(value);
                }
            }
        },
        []
    );

    const isLoadingActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setIsLoading(value);
                }
            }
        },
        []
    );

    const totalSizeActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setTotalSize(value);
                }
            }
        },
        []
    );

    const totalPagesActions = useMemo(
        () => {
            return {
                onSet(value) {
                    setTotalPages(value);
                }
            }
        },
        []
    );

    return (
        <>
            <ErpItemActionsContext.Provider value={{ content: contentActions, isLoading: isLoadingActions, totalSize: totalSizeActions, totalPages: totalPagesActions }}>
                <ErpItemValueContext.Provider value={{ content: content, isLoading: isLoading, totalSize: totalSize, totalPages: totalPages }}>
                    {children}
                </ErpItemValueContext.Provider>
            </ErpItemActionsContext.Provider>
        </>
    );
}

export function useErpItemValueHook(props) {
    const value = useContext(ErpItemValueContext);

    if (value === undefined) {
        throw new Error('useErpItemValueHook should be used within ErpItemValueContext');
    }

    return {
        content: value.content,
        isLoading: value.isLoading,
        totalSize: value.totalSize,
        totalPages: value.totalPages
    };
}

export function useErpItemActionsHook(props) {
    const value = useContext(ErpItemActionsContext);

    if (value === undefined) {
        throw new Error('useErpItemActionsHook should be used within ErpItemActionsContext');
    }

    return {
        content: {
            onSet: value.content.onSet
        },
        isLoading: {
            onSet: value.isLoading.onSet
        },
        totalSize: {
            onSet: value.totalSize.onSet
        },
        totalPages: {
            onSet: value.totalPages.onSet
        }
    };
}

export function ErpItemFetcher() {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const apiHook = useApiHook();

    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();

    const [isRenderLoading, setIsRenderLoading] = useState(true);

    useEffect(() => {
        if (router.isReady) {
            setIsRenderLoading(false);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (
            isRenderLoading ||
            !workspaceRedux?.workspaceInfo?.id
        ) {
            return;
        }
        handleReqFetchErpItemSlice();
    }, [
        isRenderLoading,
        workspaceRedux?.workspaceInfo?.id,
        router?.query?.classificationType,
        router?.query?.periodSearchCondition,
        router?.query?.startDateTime,
        router?.query?.endDateTime,
        router?.query?.mpSearchCondition,
        router?.query?.mpSearchQuery,
        router?.query?.oiSearchCondition,
        router?.query?.oiSearchQuery,
        router?.query?.riSearchCondition,
        router?.query?.riSearchQuery,
        router?.query?.diSearchCondition,
        router?.query?.diSearchQuery,
        router?.query?.mmSearchCondition,
        router?.query?.mmSearchQuery,
        router?.query?.stockReflectYn,
        router?.query?.sortTypes,
        router?.query?.size,
        router?.query?.matchedCode,
        router?.query?.page,
        router?.query?.sort,
    ]);

    // count를 호출할때는 페이지 변경, sort 변경에서는 반응하지 않도록 한다.
    useEffect(() => {
        if (
            isRenderLoading ||
            !workspaceRedux?.workspaceInfo?.id
        ) {
            return;
        }

        handleReqCountErpItems();
    }, [
        isRenderLoading,
        workspaceRedux?.workspaceInfo?.id,
        router?.query?.classificationType,
        router?.query?.periodSearchCondition,
        router?.query?.startDateTime,
        router?.query?.endDateTime,
        router?.query?.mpSearchCondition,
        router?.query?.mpSearchQuery,
        router?.query?.oiSearchCondition,
        router?.query?.oiSearchQuery,
        router?.query?.riSearchCondition,
        router?.query?.riSearchQuery,
        router?.query?.diSearchCondition,
        router?.query?.diSearchQuery,
        router?.query?.mmSearchCondition,
        router?.query?.mmSearchQuery,
        router?.query?.stockReflectYn,
        router?.query?.size,
        router?.query?.matchedCode,
    ]);

    const handleReqCountErpItems = async () => {
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
            case 'HOLD':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'y';
                break;
        }

        const result = await apiHook.reqCountErpItems({ params, headers });

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

    const handleReqFetchErpItemSlice = async () => {
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
            case 'HOLD':
                params.salesYn = 'n';
                params.releaseYn = 'n';
                params.holdYn = 'y';
                break;
        }

        const result = await apiHook.reqFetchErpItemSlice({ params, headers });

        erpItemActionsHook.content.onSet(result?.content);
        erpItemActionsHook.isLoading.onSet(false);
    }
    return <></>
}