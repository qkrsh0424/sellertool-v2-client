import { useState } from "react";
import { useEffect } from "react";
import { ProductOptionDataConnect } from "../../../../../../../data_connect/productOptionDataConnect";
import defaultErrorHandler from "../../../../../../../handler/dataConnectErrorHandler";
import { useSelector } from "react-redux";

const productOptionDataConnect = ProductOptionDataConnect.baseInventoryPage();

export default function useProductOptionsHook() {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    const [productOptionTotalSize, setProductOptionTotalSize] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            setProductOptionTotalSize(null);
            return;
        }

        reqSearchProductOptionTotalSize();
    }, [
        workspaceRedux?.workspaceInfo?.id
    ])

    const reqSearchProductOptionTotalSize = async () => {
        let params = {
            stockManagementYn: 'y'
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productOptionDataConnect.searchPositionTotalSize(params, headers)
            .then(res => {
                if (res.status === 200) {
                    let result = res.data.data;
                    setProductOptionTotalSize(result?.totalSize ?? 0);
                }
            })
            .catch(err => defaultErrorHandler(err));
    }

    return {
        productOptionTotalSize
    }
}