import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../../data_connect/erpItemDataConnect";
import { getEndDate, getStartDate } from "../../../../../../utils/dateFormatUtils";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useOrderManagementCountHook(props) {
    const [orderManagementCount, setOrderManagementCount] = useState(null);
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

        await erpItemDataConnect().countOrderManagement(headers, params)
            .then(res => {
                if (res.status === 200) {
                    setOrderManagementCount(res.data.data);
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
        orderManagementCount
    }
}