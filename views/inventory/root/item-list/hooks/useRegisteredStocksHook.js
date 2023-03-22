import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";
import { inventoryReceiveDataConnect } from "../../../../../data_connect/inventoryReceiveDataConnect";
import { inventoryReleaseDataConnect } from "../../../../../data_connect/inventoryReleaseDataConnect";
import { getEndDate, getStartDate } from "../../../../../utils/dateFormatUtils";

export default function useRegisteredStocksHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [registeredStocks, setRegisteredStocks] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchRegisteredStocks();
    }, [workspaceRedux?.workspaceInfo?.id]);

    const reqFetchRegisteredStocks = async (startDateTime, endDateTime) => {
        let body = {
            startDateTime: getStartDate(startDateTime || new Date()),
            endDateTime: getEndDate(endDateTime || new Date())
        }

        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id,
        }

        await inventoryDataConnect().searchRegisteredStocks(body, headers)
            .then(res => {
                if (res.status === 200) {
                    setRegisteredStocks(res.data.data)
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
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

    return {
        registeredStocks,
        reqFetchRegisteredStocks,
        reqChangeInventoryReceiveMemo,
        reqChangeInventoryReleaseMemo
    }
}