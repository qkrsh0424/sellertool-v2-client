import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { inventoryDataConnect } from "../../../../../data_connect/inventoryDataConnect";

export default function useInventoryStockCyclePageHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const workspaceId = workspaceRedux?.workspaceInfo?.id;
    const productCategoryId = router?.query?.productCategoryId;
    const productSubCategoryId = router?.query?.productSubCategoryId;
    const searchCondition = router?.query?.searchCondition;
    const searchQuery = router?.query?.searchQuery;
    const sort = router?.query?.sort;
    const page = router?.query?.page;
    const size = router?.query?.size;
    const days = router?.query?.days;
    const availableSalesDays = router?.query?.availableSalesDays;

    const [inventoryStockCyclePage, setInventoryStockCyclePage] = useState(null);

    useEffect(() => {
        if (!workspaceId || !productCategoryId || !days) {
            setInventoryStockCyclePage(null);
            return;
        }
        reqFetchInventoryStockCyclePage();

    }, [
        workspaceId,
        productCategoryId,
        productSubCategoryId,
        searchCondition,
        searchQuery,
        sort,
        page,
        size,
        days,
        availableSalesDays,
    ]);

    const reqFetchInventoryStockCyclePage = async () => {
        let params = {
            searchCondition: searchCondition,
            searchQuery: searchQuery,
            productCategoryId: productCategoryId,
            productSubCategoryId: productSubCategoryId,
            sort: sort || 'product.name_asc',
            page: page || 1,
            size: size || 20,
            days: days || 10,
            availableSalesDays: availableSalesDays,
            utcHourDiff: 9
        }

        let headers = {
            wsId: workspaceId
        }

        await inventoryDataConnect().inventoryStockCyclePage(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setInventoryStockCyclePage(res.data.data);
                }
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    return {
        inventoryStockCyclePage
    }
}