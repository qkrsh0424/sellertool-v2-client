import { useEffect, useState } from "react";
import { CustomSlideDialog } from "../../../../../../../../components/dialog/slide-v1/CustomSlideDialog";
import { FdSearchConsole } from "./components/FdSearchConsole/FdSearchConsole";
import { St } from "./MdProductOptionList.styled";
import { useApiHook } from "../../../../hooks/useApiHook";
import { useSelector } from "react-redux";
import { useProductCategoryHook } from "../../../../hooks/useProductCategoryHook";
import { useProductSubCategoryHook } from "../../../../hooks/useProductSubCategoryHook";
import { ProductOptionRequestData } from "../../../../../../../../data_connect/request_datas/ProductOptionRequestData";
import { useProductOptionHook } from "../../../../hooks/useProductOptionHook";
import { FdItemList } from "./components/FdItemList/FdItemList";
import { useInventoryStocksHook } from "../../../../../../root/v2/hooks";
import { FdFooterAppBar } from "./components/FdFooterAppBar";
import { FdPagenation } from "./components/FdPagenation/FdPagenation";
import { usePrepareReleaseItemListActionsHook, usePrepareReleaseItemListValueHook } from "../../../../contexts/PrepareReleaseItemListProvider";
import { v4 as uuidv4 } from 'uuid';
import { useSearchAggregationValueHook } from "../../../../contexts/SearchAggregationProvider";

export function MdProductOptionList({
    open,
    onClose,
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;
    
    const searchAggregationValueHook = useSearchAggregationValueHook();
    const prepareReleaseItemListValueHook = usePrepareReleaseItemListValueHook();
    const prepareReleaseItemListActionsHook = usePrepareReleaseItemListActionsHook();

    const apiHook = useApiHook();
    const productCategoryHook = useProductCategoryHook();
    const productSubCategoryHook = useProductSubCategoryHook();
    const productOptionHook = useProductOptionHook();
    const inventoryStocksHook = useInventoryStocksHook();

    const [selectedItemList, setSelectedItemList] = useState([]);

    // fetch productCategoryList
    useEffect(() => {
        async function fetchProductCategoryList() {
            if (!wsId || !open) {
                return;
            }

            await apiHook.reqFetchProductCategoryList({ headers: { wsId: wsId } }, (results) => {
                productCategoryHook.onSetProductCategoryList(results);
            })
        }

        fetchProductCategoryList();
    }, [open, wsId]);

    // fetch productSubCategoryList
    useEffect(() => {
        async function fetchProductSubCategoryList() {
            if (!open || !wsId || !searchAggregationValueHook?.productCategory) {
                return;
            }

            await apiHook.reqFetchProductSubCategoryList({ params: { productCategoryId: searchAggregationValueHook?.productCategory?.id }, headers: { wsId: wsId } }, (results) => {
                productSubCategoryHook.onSetProductSubCategoryList(results);
            })
        }

        fetchProductSubCategoryList();
    }, [open, wsId, searchAggregationValueHook?.productCategory]);

    // fetch productOptionPage And inventoryStocks
    useEffect(() => {
        if (!open || !wsId) {
            return;
        }

        async function initialize() {
            let resultProductOptionPage = null;
            let resultInventoryStocks = null;

            let fetchProductOptionPageParams = { ...ProductOptionRequestData().SearchPage };
            fetchProductOptionPageParams.productCategoryId = searchAggregationValueHook?.productCategory?.id;
            fetchProductOptionPageParams.productSubCategoryId = searchAggregationValueHook?.productSubCategory?.id;
            fetchProductOptionPageParams.page = searchAggregationValueHook?.page;
            fetchProductOptionPageParams.size = searchAggregationValueHook?.size;
            fetchProductOptionPageParams.searchFilter = searchAggregationValueHook?.searchFilter;
            fetchProductOptionPageParams.sortTypes = searchAggregationValueHook?.sortTypes;
            fetchProductOptionPageParams.packageYn = 'n';

            await apiHook.reqFetchProductOptionPage({
                params: fetchProductOptionPageParams,
                headers: { wsId: wsId }
            },
                (results, response) => {
                    resultProductOptionPage = results;
                }
            );

            if (resultProductOptionPage && resultProductOptionPage?.content) {
                let productOptionIds = resultProductOptionPage?.content?.map(r => r.id);
                await apiHook.reqFetchInventoryStocks({
                    body: { productOptionIds: productOptionIds },
                    headers: { wsId: wsId }
                },
                    (results, response) => {
                        resultInventoryStocks = results;
                    }
                )
            }

            productOptionHook.onSetProductOptionPage(resultProductOptionPage);
            inventoryStocksHook.onSetInventoryStocks(resultInventoryStocks);
        }

        initialize();
    }, [
        open,
        wsId,
        searchAggregationValueHook?.productCategory,
        searchAggregationValueHook?.productSubCategory,
        searchAggregationValueHook?.page,
        searchAggregationValueHook?.size,
        searchAggregationValueHook?.searchFilter,
        searchAggregationValueHook?.sortTypes
    ]);

    const handleSelectItem = (value) => {
        let currentSelectedItemList = [...selectedItemList];
        let targetItem = currentSelectedItemList?.find(r => r?.id === value?.id);

        if (targetItem) {
            currentSelectedItemList = currentSelectedItemList?.filter(r => r?.id !== targetItem?.id);
        } else {
            currentSelectedItemList.push(value);
        }

        setSelectedItemList(currentSelectedItemList);
    }

    const handleClearAllSelectedItemList = () => {
        setSelectedItemList([]);
    }

    const handleSubmitConfirm = () => {
        let newItemList = [...prepareReleaseItemListValueHook];

        newItemList = newItemList.concat(selectedItemList.map(r => {
            return {
                id: uuidv4(),
                unit: '',
                memo: '',
                purchaseCost: r?.totalPurchasePrice,
                productOptionId: r?.id,
                productThumbnailUri: r?.product?.thumbnailUri,
                productName: r?.product?.name,
                productTag: r?.product?.productTag,
                productOptionCode: r?.code,
                productOptionName: r?.name,
                productOptionTag: r?.optionTag,
            }
        }))

        prepareReleaseItemListActionsHook.onSet(newItemList);
        handleClearAllSelectedItemList();
        onClose();
    }
    return (
        <>
            <CustomSlideDialog
                fullScreen
                open={open}
                onClose={() => onClose()}
                borderRadius={0}
                backgroundColor={'#ffffff'}
            >
                <CustomSlideDialog.CloseButton onClose={() => onClose()} />
                <St.Container>
                    <FdSearchConsole
                        productCategoryList={productCategoryHook?.productCategoryList}
                        productSubCategoryList={productSubCategoryHook?.productSubCategoryList}
                    />
                    <FdPagenation
                        productOptionPage={productOptionHook?.productOptionPage}
                        selectedItemList={selectedItemList}

                        onClearAllSelectedItemList={handleClearAllSelectedItemList}
                    />
                    <FdItemList
                        productOptionPage={productOptionHook?.productOptionPage}
                        inventoryStocks={inventoryStocksHook?.inventoryStocks}
                        selectedItemList={selectedItemList}

                        onSelectItem={handleSelectItem}
                    />
                    <FdFooterAppBar
                        selectedItemList={selectedItemList}
                        onClose={() => onClose()}
                        onConfirm={() => handleSubmitConfirm()}
                    />
                </St.Container>
            </CustomSlideDialog>
        </>
    );
}