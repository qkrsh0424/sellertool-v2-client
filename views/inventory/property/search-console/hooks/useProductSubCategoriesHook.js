import _ from "lodash";
import { useEffect, useState } from "react";
import { ProductSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";
import defaultErrorHandler from "../../../../../handler/dataConnectErrorHandler";
import { customBackdropController } from "../../../../../components/backdrop/default/v1/core";
import { useSelector } from "react-redux";

const productSubCategoryDataConnect = ProductSubCategoryDataConnect.baseInventoryPage();

export default function useProductSubCategoriesHook({
    productCategory
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const customBackdrop = customBackdropController();

    const [productSubCategories, setProductSubCategories] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !productCategory?.id) {
            setProductSubCategories(null);
            return;
        }

        reqFetchProductSubCategories();
    }, [workspaceRedux?.workspaceInfo?.id, productCategory?.id]);

    const reqFetchProductSubCategories = async () => {
        customBackdrop.showBackdrop();

        let params = {
            productCategoryId: productCategory?.id
        }
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await productSubCategoryDataConnect.searchList(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductSubCategories(res.data.data);
                }
            })
            .catch(err => defaultErrorHandler(err))
        customBackdrop.hideBackdrop();
    }

    return {
        productSubCategories
    }
}