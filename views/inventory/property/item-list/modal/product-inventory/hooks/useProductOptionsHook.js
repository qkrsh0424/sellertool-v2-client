import { useEffect } from "react";
import { useState } from "react";
import { productOptionDataConnect } from "../../../../../../../data_connect/productOptionDataConnect";
import defaultErrorHandler from "../../../../../../../handler/dataConnectErrorHandler";
import { useSelector } from "react-redux";

export default function useProductOptionsHook({
    selectedProduct
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [productOptions, setProductOptions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchInit() {
            let params = {
                productId: selectedProduct.id
            }

            let headers = {
                wsId: workspaceRedux?.workspaceInfo.id
            }

            await reqSearchProductOptionByProductId(params, headers);
        }

        if (!selectedProduct) {
            setProductOptions(null);
            return;
        }

        fetchInit();
    }, [selectedProduct])

    const toggleIsLoading = (loading) => {
        setIsLoading(loading);
    }

    const reqSearchProductOptionByProductId = async (params, headers) => {
        toggleIsLoading(true);

        await productOptionDataConnect().searchListByProductId(params, headers)
            .then(res => {
                if (res.status === 200 && res.data.message === 'success') {
                    setProductOptions(res.data.data);
                }
            })
            .catch(err => defaultErrorHandler(err))

        toggleIsLoading(false);
    }

    return {
        isLoading,
        productOptions
    }
}