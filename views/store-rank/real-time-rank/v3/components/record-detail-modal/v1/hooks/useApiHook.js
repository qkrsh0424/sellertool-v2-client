import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDetailDataConnect } from "../../../../../../../../data_connect/nRankRecordDetailDataConnect";

export function useApiHook({
    record
}) {
    const onReqCreateNRankRecrodDetail = async (
        options = {params: {}, body: {}, headers: {}},
        callbackFn = {
            successCallback: (results, response) => {},
            failCallback: () => {}
        }
    ) => {
        let pendingIds = getCookie('nrank_search_pending_ids');
        let updatedIds = pendingIds ? pendingIds.concat(" ", record.id) : record.id
        setCookie('nrank_search_pending_ids', updatedIds);

        await nRankRecordDetailDataConnect().createList(options?.body, options?.headers)
            .then(res => {
                if(res.status === 200) {
                    let content = `[${record.keyword} - ${record.mall_name}] 랭킹 업데이트 완료 !`
                    customToast.success(content, {
                        ...defaultOptions,
                        toastId: content
                    });
                    callbackFn.successCallback(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            }).finally(() => {
                let pendingIds = getCookie('nrank_search_pending_ids');
                let ids = pendingIds.split(" ");
                let updatedIds = ids.filter(id => id !== record.id).join(" ");
                updatedIds.length === 0 ? deleteCookie('nrank_search_pending_ids') : setCookie('nrank_search_pending_ids', updatedIds);
            })
    }

    const onReqSearchNRankRecordDetail = async (
        options = {params: {}, headers: {}},
        callbackFn = {
            successCallback: (results, response) => {},
            failCallback: () => {}
        }
    ) => {
        await nRankRecordDetailDataConnect().searchList(options?.params, options?.headers)
            .then(res => {
                if (res.status === 200) {
                    callbackFn.successCallback(res?.data?.data, res);
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                })
            })
    }

    return {
        onReqCreateNRankRecrodDetail,
        onReqSearchNRankRecordDetail
    }
}