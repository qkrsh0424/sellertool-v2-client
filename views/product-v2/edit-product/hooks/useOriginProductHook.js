import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productDataConnect } from "../../../../data_connect/productDataConnect";

export default function useOriginProductHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [originProduct, setOriginProduct] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        reqFetchOriginProduct();
    }, [router?.query?.productId, workspaceRedux?.workspaceInfo?.id]);

    const reqFetchOriginProduct = async () => {
        if (!router?.query?.productId || !workspaceRedux?.workspaceInfo?.id) {
            setOriginProduct(null);
            return;
        }

        let params = {
            productId: router?.query?.productId
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productDataConnect().searchForUpdate(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setOriginProduct(res.data.data);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                enqueueSnackbar(res?.data?.memo, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            })
            ;
    }
    return {
        originProduct
    }
}