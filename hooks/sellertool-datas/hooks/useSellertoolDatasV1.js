import { useSelector } from "react-redux";
import { useLocalStorageHook } from "../../local_storage/useLocalStorageHook";
import _ from "lodash";

export function useSellertoolDatasV1() {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [sellertoolDatas, setSellertoolDatas] = useLocalStorageHook('sellertool-datas-v1', []);
    const wsId = workspaceRedux?.workspaceInfo?.id;
    const sellertoolData = sellertoolDatas?.find(r => r.wsId === wsId);
    const excelTranslatorHeaderIds = sellertoolData?.excelTranslatorHeaderIds ?? [];
    const favoriteExcelTranslatorHeaderIdsForErpcUpload = sellertoolData?.favoriteExcelTranslatorHeaderIdsForErpcUpload ?? [];
    const favoriteViewHeaderIdsForErpc = sellertoolData?.favoriteViewHeaderIdsForErpc ?? [];
    const favoriteDownloadFormIdsForErpc = sellertoolData?.favoriteDownloadFormIdsForErpc ?? [];
    const allHeaderIdForErpc = sellertoolData?.allHeaderIdForErpc ?? null;
    const orderHeaderIdForErpc = sellertoolData?.orderHeaderIdForErpc ?? null;
    const salesHeaderIdForErpc = sellertoolData?.salesHeaderIdForErpc ?? null;
    const releaseCompleteHeaderIdForErpc = sellertoolData?.releaseCompleteHeaderIdForErpc ?? null;
    const holdHeaderIdForErpc = sellertoolData?.holdHeaderIdForErpc ?? null;
    const bookmarkExcelTranslatorIdListForTranslator = sellertoolData?.bookmarkExcelTranslatorIdListForTranslator ?? [];
    const bookmarkExcelTranslatorIdListForErpc = sellertoolData?.bookmarkExcelTranslatorIdListForErpc ?? [];

    const _onResetDatas = (workspaces) => {
        if (workspaces && workspaces?.length > 0) {
            setSellertoolDatas(sellertoolDatas?.filter(r => workspaces?.some(r2 => r2?.id === r.wsId)));
        }
    }

    const _onSetExcelTranslatorHeaderIds = (array) => {
        if (!sellertoolData) {
            setSellertoolDatas([...sellertoolDatas, {
                wsId: wsId,
                excelTranslatorHeaderIds: [...array]
            }])
        } else {
            setSellertoolDatas(sellertoolDatas.map(r => {
                if (r.wsId === wsId) {
                    return {
                        ...r,
                        excelTranslatorHeaderIds: [...array]
                    }
                } else {
                    return {
                        ...r
                    }
                }
            }))
        }
    }

    const _onSetFavoriteExcelTranslatorHeaderIdsForErpcUpload = (array) => {
        if (!sellertoolData) {
            setSellertoolDatas([...sellertoolDatas, {
                wsId: wsId,
                favoriteExcelTranslatorHeaderIdsForErpcUpload: [...array]
            }])
        } else {
            setSellertoolDatas(sellertoolDatas.map(r => {
                if (r.wsId === wsId) {
                    return {
                        ...r,
                        favoriteExcelTranslatorHeaderIdsForErpcUpload: [...array]
                    }
                } else {
                    return {
                        ...r
                    }
                }
            }))
        }
    }

    const _onSetFavoriteViewHeaderIds = (array) => {
        if (!sellertoolData) {
            setSellertoolDatas([...sellertoolDatas, {
                wsId: wsId,
                favoriteViewHeaderIdsForErpc: [...array]
            }])
        } else {
            setSellertoolDatas(sellertoolDatas.map(r => {
                if (r.wsId === wsId) {
                    return {
                        ...r,
                        favoriteViewHeaderIdsForErpc: [...array]
                    }
                } else {
                    return {
                        ...r
                    }
                }
            }))
        }
    }

    const _onSetFavoriteDownloadFormIds = (array) => {
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
    }

    const _onSetAllHeaderIdForErpc = (headerId) => {
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
    }

    const _onSetOrderHeaderIdForErpc = (headerId) => {
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
    }

    const _onSetSalesHeaderIdForErpc = (headerId) => {
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
    }

    const _onSetReleaseCompleteHeaderIdForErpc = (headerId) => {
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
    }

    const _onSetHoldHeaderIdForErpc = (headerId) => {
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
    }

    const _onSetBookmarkExcelTranslatorIdListForTranslator = (array) => {
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

    const _onSetBookmarkExcelTranslatorIdListForErpc = (array) => {
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
    }

    return {
        wsId: wsId,
        excelTranslatorHeaderIds,
        favoriteExcelTranslatorHeaderIdsForErpcUpload,
        favoriteViewHeaderIdsForErpc,
        favoriteDownloadFormIdsForErpc,
        allHeaderIdForErpc,
        orderHeaderIdForErpc,
        salesHeaderIdForErpc,
        releaseCompleteHeaderIdForErpc,
        holdHeaderIdForErpc,
        bookmarkExcelTranslatorIdListForTranslator,
        bookmarkExcelTranslatorIdListForErpc,

        _onResetDatas,
        _onSetExcelTranslatorHeaderIds,
        _onSetFavoriteExcelTranslatorHeaderIdsForErpcUpload,
        _onSetFavoriteViewHeaderIds,
        _onSetFavoriteDownloadFormIds,
        _onSetAllHeaderIdForErpc,
        _onSetOrderHeaderIdForErpc,
        _onSetSalesHeaderIdForErpc,
        _onSetReleaseCompleteHeaderIdForErpc,
        _onSetHoldHeaderIdForErpc,
        _onSetBookmarkExcelTranslatorIdListForTranslator,
        _onSetBookmarkExcelTranslatorIdListForErpc
    }
}