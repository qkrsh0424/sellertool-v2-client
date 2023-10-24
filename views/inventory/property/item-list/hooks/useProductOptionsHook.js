import { useEffect } from "react";
import { useState } from "react";
import { ProductOptionDataConnect } from "../../../../../data_connect/productOptionDataConnect";
import defaultErrorHandler from "../../../../../handler/dataConnectErrorHandler";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const productOptionDataConnect = ProductOptionDataConnect.baseInventoryPage();

export default function useProductOptionsHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [productOptionPage, setProductOptionPage] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            setProductOptionPage(null);
            return;
        }

        reqFetchProductOptionPage();
    }, [
        workspaceRedux?.workspaceInfo?.id,
        router?.query?.productCategoryId,
        router?.query?.productSubCategoryId,
        router?.query?.searchCondition,
        router?.query?.searchQuery,
        router?.query?.sort,
        router?.query?.page,
        router?.query?.size,
    ]);

    const toggleIsLoading = (loading) => {
        setIsLoading(loading);
    }

    const reqFetchProductOptionPage = async () => {
        toggleIsLoading(true);
        let params = {
            productCategoryId: router?.query?.productCategoryId,
            productSubCategoryId: router?.query?.productSubCategoryId,
            stockManagementYn: 'y',
            searchCondition: router?.query?.searchCondition,
            searchQuery: router?.query?.searchQuery,
            sort: router?.query?.sort || 'product.cid_asc',
            page: router?.query?.page || 1,
            size: router?.query?.size || 50,
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productOptionDataConnect.searchPagePositionInventory(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductOptionPage(res.data.data);
                }
            })
            .catch(err => defaultErrorHandler(err));
        toggleIsLoading(false);
    }

    return {
        isLoading,
        productOptionPage
    }
}