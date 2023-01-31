import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../data_connect/erpItemDataConnect";
import { getEndDate, getStartDate } from "../../../../../utils/dateFormatUtils";

export default function useErpItemPageHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpItemPage, setErpItemPage] = useState(null);
    const [erpItemPagePending, setErpItemPagePending] = useState(false);
    const [totalSize, setTotalSize] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (
            !workspaceRedux?.workspaceInfo?.id
        ) {
            return;
        }
        reqFetchErpItemPage();
        return () => setErpItemPage(null);
    }, [
        workspaceRedux?.workspaceInfo?.id,
        router?.query,
    ]);

    useEffect(() => {
        if (
            !workspaceRedux?.workspaceInfo?.id
        ) {
            return;
        }
        reqFetchCountErpItems();
    }, [
        workspaceRedux?.workspaceInfo?.id,
        router?.query?.salesYn,
        router?.query?.releaseYn,
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
        router?.query?.size,
        router?.query?.matchedCode
    ]);

    const reqFetchCountErpItems = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            salesYn: 'y',
            releaseYn: 'y',
            periodSearchCondition: router?.query?.periodSearchCondition,
            startDateTime: router?.query?.startDateTime && getStartDate(router?.query?.startDateTime),
            endDateTime: router?.query?.endDateTime && getEndDate(router?.query?.endDateTime),
            mpSearchCondition: router?.query?.mpSearchCondition,
            mpSearchQuery: router?.query?.mpSearchQuery,
            oiSearchCondition: router?.query?.oiSearchCondition,
            oiSearchQuery: router?.query?.oiSearchQuery,
            riSearchCondition: router?.query?.riSearchCondition,
            riSearchQuery: router?.query?.riSearchQuery,
            diSearchCondition: router?.query?.diSearchCondition,
            diSearchQuery: router?.query?.diSearchQuery,
            matchedCode: router?.query?.matchedCode || 'releaseOptionCode'
        }

        let size = router?.query?.size || 50;

        await erpItemDataConnect().count(params, headers)
            .then(res => {
                if (res.status === 200) {
                    let resTotalSize = res.data.data.totalSize;
                    if (resTotalSize <= 0) {
                        setTotalSize(0);
                        setTotalPages(1);
                        return;
                    }

                    let totalPages = Math.ceil(resTotalSize / size);
                    setTotalSize(resTotalSize);
                    setTotalPages(totalPages);

                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqFetchErpItemPage = async () => {
        onSetErpItemPagePending(true);
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            salesYn: 'y',
            releaseYn: 'y',
            periodSearchCondition: router?.query?.periodSearchCondition,
            startDateTime: router?.query?.startDateTime && getStartDate(router?.query?.startDateTime),
            endDateTime: router?.query?.endDateTime && getEndDate(router?.query?.endDateTime),
            mpSearchCondition: router?.query?.mpSearchCondition,
            mpSearchQuery: router?.query?.mpSearchQuery,
            oiSearchCondition: router?.query?.oiSearchCondition,
            oiSearchQuery: router?.query?.oiSearchQuery,
            riSearchCondition: router?.query?.riSearchCondition,
            riSearchQuery: router?.query?.riSearchQuery,
            diSearchCondition: router?.query?.diSearchCondition,
            diSearchQuery: router?.query?.diSearchQuery,
            page: router?.query?.page || 1,
            size: router?.query?.size || 50,
            sort: router?.query?.sort?.split(',') || 'releaseAt_asc',
            matchedCode: router?.query?.matchedCode || 'releaseOptionCode'
        }

        await erpItemDataConnect().searchSlice(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpItemPage(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
            .finally(() => {
                onSetErpItemPagePending(false);
            })
    }

    const onSetErpItemPagePending = (bool) => {
        setErpItemPagePending(bool);
    }

    const reqChangeOptionCode = async (body, successCallback) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await erpItemDataConnect().changeOptionCode(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchErpItemPage();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqChangeReleaseOptionCode = async (body, successCallback) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await erpItemDataConnect().changeReleaseOptionCode(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchErpItemPage();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqUpdateErpItems = async (body, successCallback) => {
        await erpItemDataConnect().updateAll(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchErpItemPage();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqDeleteErpItems = async (body, successCallback) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }
        await erpItemDataConnect().deleteByIds(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchErpItemPage();
                    reqFetchCountErpItems();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqChangeStatusToSales = async (body, successCallback) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id,
        }

        await erpItemDataConnect().changeStatusToSales(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchErpItemPage();
                    reqFetchCountErpItems();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqChangeStatusToRelease = async (body, successCallback) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id,
        }

        await erpItemDataConnect().changeStatusToRelease(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchErpItemPage();
                    reqFetchCountErpItems();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqChangeStatusToOrder = async (body, successCallback) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id,
        }

        await erpItemDataConnect().changeStatusToOrder(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchErpItemPage();
                    reqFetchCountErpItems();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqCopyCreateErpItems = async (body, successCallback) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await erpItemDataConnect().copyCreateErpItems(body)
            .then(res => {
                if (res.status === 200) {
                    alert(res.data.memo);
                    reqFetchErpItemPage();
                    reqFetchCountErpItems();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    return {
        erpItemPage,
        erpItemPagePending,
        totalSize,
        totalPages,

        reqFetchErpItemPage,
        reqChangeOptionCode,
        reqChangeReleaseOptionCode,
        reqUpdateErpItems,
        reqDeleteErpItems,
        reqChangeStatusToSales,
        reqChangeStatusToRelease,
        reqChangeStatusToOrder,
        reqCopyCreateErpItems
    }
}