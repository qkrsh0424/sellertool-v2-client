import { useEffect, useState } from "react";
import { ProductCategoryDataConnect } from "../../../../../data_connect/productCategoryDataConnect";
import defaultErrorHandler from "../../../../../handler/dataConnectErrorHandler";
import { customBackdropController } from "../../../../../components/backdrop/default/v1/core";
import { useSelector } from "react-redux";

const productCategoryDataConnect = ProductCategoryDataConnect.baseInventoryPage();

export default function useProductCategoriesHook() {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    const [productCategories, setProductCategories] = useState(null);
    const customBackdrop = customBackdropController();

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }
        async function fetchInit() {
            let headers = {
                wsId: workspaceRedux?.workspaceInfo?.id
            }

            await reqSearchCategoryAnalysis(headers);
        }

        fetchInit();
    }, [workspaceRedux?.workspaceInfo?.id])

    const reqSearchCategoryAnalysis = async (body, headers) => {
        customBackdrop.showBackdrop();
        await productCategoryDataConnect.searchList(body, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductCategories(res.data.data);
                }
            })
            .catch(err => defaultErrorHandler(err));
        customBackdrop.hideBackdrop();
    }

    return {
        productCategories
    }
}