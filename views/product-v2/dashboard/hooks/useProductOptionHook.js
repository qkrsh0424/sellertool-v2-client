import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useProductOptionHook({
    productOptionId
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productOption, setProductOption] = useState(null);

    useEffect(() => {
        if (!productOptionId || !workspaceRedux?.workspaceInfo?.id) {
            setProductOption(null);
            return;
        }


        reqFetchProductOption();
    }, [productOptionId, workspaceRedux?.workspaceInfo?.id]);

    const reqFetchProductOption = useCallback(async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        };

        await productOptionDataConnect().searchById(productOptionId, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductOption(res.data.data);
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
    }, [productOptionId, workspaceRedux?.workspaceInfo?.id]);

    return {
        productOption,
        reqFetchProductOption
    }
}