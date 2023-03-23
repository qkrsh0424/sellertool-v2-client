import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { productDataConnect } from "../../../../../data_connect/productDataConnect";
import { productOptionDataConnect } from "../../../../../data_connect/productOptionDataConnect";

export default function useProductOptionsHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

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

    const reqFetchProductOptionPage = async () => {
        let params = {
            searchType: 'CONDITION',
            mergeSearchConditionFlag: false,
            productCategoryId: router?.query?.productCategoryId,
            productSubCategoryId: router?.query?.productSubCategoryId,
            searchCondition: router?.query?.searchCondition,
            searchQuery: router?.query?.searchQuery,
            sort: router?.query?.sort || 'product.createdAt_asc',
            page: router?.query?.page || 1,
            size: router?.query?.size || 50,
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productOptionDataConnect().searchPagePositionInventory(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductOptionPage(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
            ;
    }

    return {
        productOptionPage
    }
}