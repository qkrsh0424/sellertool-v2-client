import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { erpCollectionHeaderDataConnect } from "../../../../../../data_connect/erpCollectionHeaderDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useErpCollectionHeaderHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpCollectionHeader, setErpCollectionHeader] = useState(null);

    useEffect(() => {
        if (!router?.query?.erpCollectionHeaderId || !workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchErpCollectionHeader();
    }, [router?.query?.erpCollectionHeaderId, workspaceRedux?.workspaceInfo?.id]);

    const reqFetchErpCollectionHeader = async () => {
        let params = {
            erpCollectionHeaderId: router?.query?.erpCollectionHeaderId
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await erpCollectionHeaderDataConnect().searchRelatedErpCollectionHeaderDetails(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setErpCollectionHeader(res.data.data);
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
    }

    const reqUpdateErpCollectionHeader = async ({
        body,
        successCallback
    }) => {
        await erpCollectionHeaderDataConnect().update(body)
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

    const reqDeleteErpCollectionHeader = async ({
        body,
        successCallback
    }) => {
        await erpCollectionHeaderDataConnect().delete(body)
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
        erpCollectionHeader,
        reqUpdateErpCollectionHeader,
        reqDeleteErpCollectionHeader
    }
}