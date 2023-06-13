import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useProductOptionsHook({
    product
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productOptions, setProductOptions] = useState(null);

    const reqFetchProductOptions = useCallback(async () => {
        if (!product?.id || !workspaceRedux?.workspaceInfo?.id) {
            setProductOptions(null);
            return;
        }

        let params = {
            productId: product?.id
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productOptionDataConnect().searchListByProductId(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductOptions(res.data.data);
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
    }, []);

    return {
        productOptions,
        reqFetchProductOptions
    }
}