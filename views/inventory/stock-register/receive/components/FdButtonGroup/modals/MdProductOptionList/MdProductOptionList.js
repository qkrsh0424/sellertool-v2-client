import { useEffect, useState } from "react";
import { CustomSlideDialog } from "../../../../../../../../components/dialog/slide-v1/CustomSlideDialog";
import { FdSearchConsole } from "./components/FdSearchConsole/FdSearchConsole";
import { St } from "./MdProductOptionList.styled";
import { useApiHook } from "../../../../hooks/useApiHook";
import { useSelector } from "react-redux";
import { useProductCategoryHook } from "../../../../hooks/useProductCategoryHook";
import { useProductSubCategoryHook } from "../../../../hooks/useProductSubCategoryHook";
import { useSearchFilterHook } from "../../../../hooks/useSearchFilterHook";
import { ProductOptionRequestData } from "../../../../../../../../data_connect/request_datas/ProductOptionRequestData";
import { useProductOptionHook } from "../../../../hooks/useProductOptionHook";
import { FdItemList } from "./components/FdItemList/FdItemList";
import { useInventoryStocksHook } from "../../../../../../root/v2/hooks";
import { FdFooterAppBar } from "./components/FdFooterAppBar";
import { FdPagenation } from "./components/FdPagenation/FdPagenation";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 50;

export function MdProductOptionList({
    open,
    onClose
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const productCategoryHook = useProductCategoryHook();
    const productSubCategoryHook = useProductSubCategoryHook();
    const productOptionHook = useProductOptionHook();
    const inventoryStocksHook = useInventoryStocksHook();
    const searchFilterHook = useSearchFilterHook();

    const [selectedItemList, setSelectedItemList] = useState([]);
    const [page, setPage] = useState(DEFAULT_PAGE);
    const [size, setSize] = useState(DEFAULT_SIZE);

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
            if (!open || !wsId || !productCategoryHook?.productCategory) {
                return;
            }

            await apiHook.reqFetchProductSubCategoryList({ params: { productCategoryId: productCategoryHook?.productCategory?.id }, headers: { wsId: wsId } }, (results) => {
                productSubCategoryHook.onSetProductSubCategoryList(results);
            })
        }

        fetchProductSubCategoryList();
    }, [open, wsId, productCategoryHook?.productCategory]);

    // fetch productOptionPage And inventoryStocks
    useEffect(() => {
        if (!open || !wsId) {
            return;
        }

        async function initialize() {
            let resultProductOptionPage = null;
            let resultInventoryStocks = null;

            let fetchProductOptionPageParams = { ...ProductOptionRequestData().SearchPage };
            fetchProductOptionPageParams.productCategoryId = productCategoryHook?.productCategory?.id;
            fetchProductOptionPageParams.productSubCategoryId = productSubCategoryHook?.productSubCategory?.id;
            fetchProductOptionPageParams.searchFilter = searchFilterHook?.searchFilter;
            fetchProductOptionPageParams.packageYn = 'n';
            fetchProductOptionPageParams.page = page;
            fetchProductOptionPageParams.size = size;

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
        productCategoryHook?.productCategory,
        productSubCategoryHook?.productSubCategory,
        searchFilterHook?.searchFilter,
        page,
        size
    ]);

    const handleSelectProductCategory = (value) => {
        productCategoryHook?.onSetProductCategory(value);
        productSubCategoryHook?.onSetProductSubCategory(null);
        setPage(DEFAULT_PAGE);
    }

    const handleSelectProductSubCategory = (value) => {
        productSubCategoryHook?.onSetProductSubCategory(value);
        setPage(DEFAULT_PAGE);
    }


    const handleSetSearchFilter = (value) => {
        searchFilterHook.onSetSearchFilter(value);
        setPage(DEFAULT_PAGE);
    }

    const handleClearAllSearchCondition = () => {
        productCategoryHook?.onSetProductCategory(null);
        productSubCategoryHook?.onSetProductSubCategoryList(null);
        productSubCategoryHook?.onSetProductSubCategory(null);
        searchFilterHook.onSetSearchFilter(null);
        setPage(DEFAULT_PAGE);
    }

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

    const handleChangePage = async (value) => {
        setPage(value);
    }

    const handleChangeSize = async (value) => {
        setPage(DEFAULT_PAGE)
        setSize(value);
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
                        productCategory={productCategoryHook?.productCategory}
                        productSubCategory={productSubCategoryHook?.productSubCategory}
                        searchFilter={searchFilterHook?.searchFilter}

                        onSelectProductCategory={handleSelectProductCategory}
                        onSelectProductSubCategory={handleSelectProductSubCategory}
                        onSetSearchFilter={handleSetSearchFilter}
                        onClearAllSearchCondition={handleClearAllSearchCondition}
                    />
                    <FdPagenation
                        productOptionPage={productOptionHook?.productOptionPage}
                        selectedItemList={selectedItemList}
                        size={size}

                        onChangePage={handleChangePage}
                        onChangeSize={handleChangeSize}
                        onClearAllSelectedItemList={handleClearAllSelectedItemList}
                    />
                    <FdItemList
                        productOptionPage={productOptionHook?.productOptionPage}
                        inventoryStocks={inventoryStocksHook?.inventoryStocks}
                        selectedItemList={selectedItemList}
                        page={page}
                        size={size}

                        onSelectItem={handleSelectItem}
                    />
                    <FdFooterAppBar
                        selectedItemList={selectedItemList}
                        onClose={() => onClose()}
                    />
                </St.Container>
            </CustomSlideDialog>
        </>
    );
}