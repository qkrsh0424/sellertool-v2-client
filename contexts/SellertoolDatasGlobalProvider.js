import { createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocalStorageHook } from "../hooks/local_storage/useLocalStorageHook";

const SellertoolDatasValueContext = createContext();
const SellertoolDatasActionsContext = createContext();

export function SellertoolDatasGlobalProvider({ children }) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;
    const [sellertoolDatas, setSellertoolDatas] = useLocalStorageHook('sellertool-datas-v1', []);
    const sellertoolData = sellertoolDatas?.find(r => r.wsId === wsId);

    const allHeaderIdForErpc = sellertoolData?.allHeaderIdForErpc ?? null;
    const orderHeaderIdForErpc = sellertoolData?.orderHeaderIdForErpc ?? null;
    const salesHeaderIdForErpc = sellertoolData?.salesHeaderIdForErpc ?? null;
    const releaseCompleteHeaderIdForErpc = sellertoolData?.releaseCompleteHeaderIdForErpc ?? null;
    const holdHeaderIdForErpc = sellertoolData?.holdHeaderIdForErpc ?? null;
    const bookmarkExcelTranslatorIdListForErpc = sellertoolData?.bookmarkExcelTranslatorIdListForErpc ?? [];
    const bookmarkViewHeaderIdsForErpc = sellertoolData?.bookmarkViewHeaderIdsForErpc ?? [];
    const favoriteDownloadFormIdsForErpc = sellertoolData?.favoriteDownloadFormIdsForErpc ?? [];
    const bookmarkSearchConditionsForErpc = sellertoolData?.bookmarkSearchConditionsForErpc ?? [];

    const bookmarkExcelTranslatorIdListForTranslator = sellertoolData?.bookmarkExcelTranslatorIdListForTranslator ?? [];

    const rootActions = useMemo(
        () => {
            return {
                onReset: (workspaces) => {
                    if (workspaces && workspaces?.length > 0) {
                        setSellertoolDatas(sellertoolDatas?.filter(r => workspaces?.some(r2 => r2?.id === r.wsId)));
                    }
                }
            }
        },
        [
            wsId,
            sellertoolDatas,
            sellertoolData
        ]
    )

    const erpcActions = useMemo(
        () => {
            return {
                onSetAllHeaderId: (headerId) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            allHeaderIdForErpc: headerId
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    allHeaderIdForErpc: headerId
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetOrderHeaderId: (headerId) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            orderHeaderIdForErpc: headerId
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    orderHeaderIdForErpc: headerId
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetSalesHeaderId: (headerId) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            salesHeaderIdForErpc: headerId
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    salesHeaderIdForErpc: headerId
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetReleaseCompleteHeaderId: (headerId) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            releaseCompleteHeaderIdForErpc: headerId
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    releaseCompleteHeaderIdForErpc: headerId
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetHoldHeaderId: (headerId) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            holdHeaderIdForErpc: headerId
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    holdHeaderIdForErpc: headerId
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetBookmarkExcelTranslatorIdList: (array) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            bookmarkExcelTranslatorIdListForErpc: [...array]
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    bookmarkExcelTranslatorIdListForErpc: [...array]
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetBookmarkViewHeaderIds: (array) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            bookmarkViewHeaderIdsForErpc: [...array]
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    bookmarkViewHeaderIdsForErpc: [...array]
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetFavoriteDownloadFormIds: (array) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            favoriteDownloadFormIdsForErpc: [...array]
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    favoriteDownloadFormIdsForErpc: [...array]
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                },
                onSetBookmarkSearchConditionsForErpc: (array) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            bookmarkSearchConditionsForErpc: [...array]
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    bookmarkSearchConditionsForErpc: [...array]
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                }
            }
        },
        [
            wsId,
            sellertoolDatas,
            sellertoolData
        ]
    );

    const excelTranslatorActions = useMemo(
        () => {
            return {
                onSetBookmarkExcelTranslatorIdList: (array) => {
                    if (!sellertoolData) {
                        setSellertoolDatas([...sellertoolDatas, {
                            wsId: wsId,
                            bookmarkExcelTranslatorIdListForTranslator: [...array]
                        }])
                    } else {
                        setSellertoolDatas(sellertoolDatas.map(r => {
                            if (r.wsId === wsId) {
                                return {
                                    ...r,
                                    bookmarkExcelTranslatorIdListForTranslator: [...array]
                                }
                            } else {
                                return {
                                    ...r
                                }
                            }
                        }))
                    }
                }
            }
        },
        [
            wsId,
            sellertoolDatas,
            sellertoolData
        ]
    )

    return (
        <>
            <SellertoolDatasActionsContext.Provider
                value={{
                    rootActions: rootActions,
                    erpcActions: erpcActions,
                    excelTranslatorActions: excelTranslatorActions,
                }}
            >
                <SellertoolDatasValueContext.Provider
                    value={{
                        sellertoolDatas: sellertoolDatas,
                        wsId: wsId,
                        allHeaderIdForErpc: allHeaderIdForErpc,
                        orderHeaderIdForErpc: orderHeaderIdForErpc,
                        salesHeaderIdForErpc: salesHeaderIdForErpc,
                        releaseCompleteHeaderIdForErpc: releaseCompleteHeaderIdForErpc,
                        holdHeaderIdForErpc: holdHeaderIdForErpc,
                        bookmarkExcelTranslatorIdListForErpc: bookmarkExcelTranslatorIdListForErpc,
                        bookmarkViewHeaderIdsForErpc: bookmarkViewHeaderIdsForErpc,
                        favoriteDownloadFormIdsForErpc: favoriteDownloadFormIdsForErpc,
                        bookmarkSearchConditionsForErpc: bookmarkSearchConditionsForErpc,

                        bookmarkExcelTranslatorIdListForTranslator: bookmarkExcelTranslatorIdListForTranslator
                    }}
                >
                    {children}
                </SellertoolDatasValueContext.Provider>
            </SellertoolDatasActionsContext.Provider>
        </>
    );
}

export function useSellertoolDatasValueHook(props) {
    const value = useContext(SellertoolDatasValueContext);

    if (value === undefined) {
        throw new Error('useSellertoolDatasValueHook should be used within SellertoolDatasProvider');
    }

    return {
        sellertoolDatas: value.sellertoolDatas,
        wsId: value.wsId,
        allHeaderIdForErpc: value.allHeaderIdForErpc,
        orderHeaderIdForErpc: value.orderHeaderIdForErpc,
        salesHeaderIdForErpc: value.salesHeaderIdForErpc,
        releaseCompleteHeaderIdForErpc: value.releaseCompleteHeaderIdForErpc,
        holdHeaderIdForErpc: value.holdHeaderIdForErpc,
        bookmarkExcelTranslatorIdListForErpc: value.bookmarkExcelTranslatorIdListForErpc,
        bookmarkViewHeaderIdsForErpc: value.bookmarkViewHeaderIdsForErpc,
        favoriteDownloadFormIdsForErpc: value.favoriteDownloadFormIdsForErpc,
        bookmarkSearchConditionsForErpc: value.bookmarkSearchConditionsForErpc,

        bookmarkExcelTranslatorIdListForTranslator: value.bookmarkExcelTranslatorIdListForTranslator
    };
}

export function useSellertoolDatasActionsHook(props) {
    const value = useContext(SellertoolDatasActionsContext);

    if (value === undefined) {
        throw new Error('useSellertoolDatasActionsHook should be used within SellertoolDatasProvider');
    }

    return {
        rootActions: {
            onReset: value.rootActions.onReset,
        },
        erpcActions: {
            onSetAllHeaderId: value.erpcActions.onSetAllHeaderId,
            onSetOrderHeaderId: value.erpcActions.onSetOrderHeaderId,
            onSetSalesHeaderId: value.erpcActions.onSetSalesHeaderId,
            onSetReleaseCompleteHeaderId: value.erpcActions.onSetReleaseCompleteHeaderId,
            onSetHoldHeaderId: value.erpcActions.onSetHoldHeaderId,
            onSetBookmarkExcelTranslatorIdList: value.erpcActions.onSetBookmarkExcelTranslatorIdList,
            onSetBookmarkViewHeaderIds: value.erpcActions.onSetBookmarkViewHeaderIds,
            onSetFavoriteDownloadFormIds: value.erpcActions.onSetFavoriteDownloadFormIds,
            onSetBookmarkSearchConditionsForErpc: value.erpcActions.onSetBookmarkSearchConditionsForErpc,
        },
        excelTranslatorActions: {
            onSetBookmarkExcelTranslatorIdList: value.excelTranslatorActions.onSetBookmarkExcelTranslatorIdList
        }
    };
}