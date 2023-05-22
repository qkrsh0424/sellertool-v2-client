import { useEffect, useState } from "react"
import { inventoryDataConnect } from "../../../../../../../data_connect/inventoryDataConnect";
import defaultErrorHandler from "../../../../../../../handler/dataConnectErrorHandler";
import { useSelector } from "react-redux";

const DEFAULT_SEARCH_CONDITION = {
    assetType: 'PROPERTY_PRICE',
    orderType: 'DESC'
}
export default function useProductOptionInventoryByRankHook() {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    const [searchCondition, setSearchCondition] = useState(DEFAULT_SEARCH_CONDITION);
    const [rankedProductOptions, setRankedProductOptions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            setRankedProductOptions(null);
            return;
        }

        let params = {
            size: rankedProductOptions?.size || 20,
            page: 1,
            assetType: searchCondition?.assetType,
            orderType: searchCondition?.orderType
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo.id
        }

        reqFetchRankedProductOptions(params, headers);
    }, [
        workspaceRedux?.workspaceInfo?.id,
        searchCondition
    ])

    const toggleIsLoading = (loading) => {
        setIsLoading(loading);
    }

    const onChangeSearchCondition = (data) => {
        let assetType = data?.assetType || 'PROPERTY_PRICE';
        let orderType = data?.orderType || 'DESC';

        setSearchCondition({
            ...searchCondition,
            assetType,
            orderType
        });
    }

    const reqFetchRankedProductOptions = async (params, headers) => {
        toggleIsLoading(true);

        await inventoryDataConnect().searchRankedInventory(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setRankedProductOptions(res.data.data);
                }
            })
            .catch(err => defaultErrorHandler(err));

        toggleIsLoading(false);
    }

    return {
        isLoading,
        rankedProductOptions,
        searchCondition,
        onChangeSearchCondition,
        reqFetchRankedProductOptions
    }
}