import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { InventoryDataConnect } from "../../../../../../data_connect/inventoryDataConnect";
import { InventoryReceiveDataConnect } from "../../../../../../data_connect/inventoryReceiveDataConnect";
import { InventoryReleaseDataConnect } from "../../../../../../data_connect/inventoryReleaseDataConnect";
import { getEndDate, getStartDate } from "../../../../../../utils/dateFormatUtils";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

const inventoryDataConnect = InventoryDataConnect.baseInventoryPage();
const inventoryReceiveDataConnect = InventoryReceiveDataConnect.baseInventoryPage();
const inventoryReleaseDataConnect = InventoryReleaseDataConnect.baseInventoryPage();

export default function useInventoryStockRegisterStatusesHook({
    productOptionId
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [inventoryStockRegisterStatuses, setInventoryStockRegisterStatuses] = useState(null);
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [chartStartDateTime, setChartStartDateTime] = useState(getStartDate(new Date()));
    const [chartEndDateTime, setChartEndDateTime] = useState(getEndDate(new Date()));

    useEffect(() => {
        if (!productOptionId) {
            return;
        }

        reqFetchInventoryStockRegisterStatuses();
    }, [productOptionId]);

    const reqFetchInventoryStockRegisterStatuses = async () => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            productOptionId: productOptionId,
            startDateTime: getStartDate(startDateTime || new Date()),
            endDateTime: getEndDate(endDateTime || new Date())
        }

        await inventoryDataConnect.searchInventoryStockRegisterStatuses(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setInventoryStockRegisterStatuses(res.data.data);
                    setChartStartDateTime(startDateTime);
                    setChartEndDateTime(endDateTime);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            });
    }

    const reqChangeInventoryReceiveMemo = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await inventoryReceiveDataConnect.changeMemo(body, headers)
            .then(res => {
                if (res.status === 200) {
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

    const reqChangeInventoryReleaseMemo = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await inventoryReleaseDataConnect.changeMemo(body, headers)
            .then(res => {
                if (res.status === 200) {
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

    const reqDeleteInventoryReceive = async (body, successCallback) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await inventoryReceiveDataConnect.delete(body, headers)
            .then(async res => {
                if (res.status === 200) {
                    await successCallback();
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
            });
    }

    const reqDeleteInventoryRelease = async (body, successCallback) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await inventoryReleaseDataConnect.delete(body, headers)
            .then(async res => {
                if (res.status === 200) {
                    await successCallback();
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
            });
    }

    const onChangeStartDateTime = (value) => {
        setStartDateTime(new Date(value));
    }

    const onChangeEndDateTime = (value) => {
        setEndDateTime(new Date(value));
    }

    return {
        inventoryStockRegisterStatuses,
        startDateTime,
        endDateTime,
        chartStartDateTime,
        chartEndDateTime,
        onChangeStartDateTime,
        onChangeEndDateTime,
        reqFetchInventoryStockRegisterStatuses,
        reqChangeInventoryReceiveMemo,
        reqChangeInventoryReleaseMemo,
        reqDeleteInventoryReceive,
        reqDeleteInventoryRelease
    }
}