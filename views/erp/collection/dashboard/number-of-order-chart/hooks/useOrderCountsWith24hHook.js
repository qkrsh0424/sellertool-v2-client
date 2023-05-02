import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../../data_connect/erpItemDataConnect";
import { getEndDate, getStartDate } from "../../../../../../utils/dateFormatUtils";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useOrderCountsWith24hHook(props) {
    const [orderCountsWith24h, setOrderCountsWith24h] = useState(null);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }
        fetch();
    }, [workspaceRedux?.workspaceInfo?.id]);

    const fetch = async () => {
        let params = {
            startDateTime: getStartDate(new Date()),
            endDateTime: getEndDate(new Date())
        }
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await erpItemDataConnect().countOrderWith24H(headers, params)
            .then(res => {
                if (res.status === 200) {
                    setOrderCountsWith24h(res.data.data);
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
            ;
    }
    return {
        orderCountsWith24h
    }
} 