import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";
import { inventoryReceiveDataConnect } from "../../../../../data_connect/inventoryReceiveDataConnect";
import { inventoryReleaseDataConnect } from "../../../../../data_connect/inventoryReleaseDataConnect";
import { getEndDate, getStartDate } from "../../../../../utils/dateFormatUtils";

export default function useInventoryStockRegisterStatusesHook({
    selectedProductOption
}) {
    const [inventoryStockRegisterStatuses, setInventoryStockRegisterStatuses] = useState(null);
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());

    useEffect(() => {
        if (!selectedProductOption) {
            return;
        }

        reqFetchInventoryStockRegisterStatuses();
    }, [selectedProductOption]);

    const reqFetchInventoryStockRegisterStatuses = async () => {
        let params = {
            productOptionId: selectedProductOption.id,
            startDateTime: getStartDate(startDateTime || new Date()),
            endDateTime: getEndDate(endDateTime || new Date())
        }

        await inventoryDataConnect().searchInventoryStockRegisterStatuses(params)
            .then(res => {
                if (res.status === 200) {
                    setInventoryStockRegisterStatuses(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            });
    }

    const reqChangeInventoryReceiveMemo = async ({
        body,
        successCallback
    }) => {
        await inventoryReceiveDataConnect().changeMemo(body)
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
        await inventoryReleaseDataConnect().changeMemo(body)
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
        onChangeStartDateTime,
        onChangeEndDateTime,
        reqFetchInventoryStockRegisterStatuses,
        reqChangeInventoryReceiveMemo,
        reqChangeInventoryReleaseMemo
    }
}