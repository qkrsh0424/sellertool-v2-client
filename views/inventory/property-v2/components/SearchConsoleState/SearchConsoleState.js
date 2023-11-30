import { useSelector } from "react-redux";
import { FgSearchConsole } from "../../../fragments/FgSearchConsole";
import { useEffect } from "react";
import { useApiHook } from "../../hooks/useApiHook";
import { useProductCategoryHook } from "../../hooks/useProductCategoryHook";
import { useProductSubCategoryHook } from "../../hooks/useProductSubCategoryHook";
import { useRouterSearchAggregationHook } from "../../hooks/useRouterSearchAggregationHook";

export function SearchConsoleState(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const productCategoryHook = useProductCategoryHook();
    const productSubCategoryHook = useProductSubCategoryHook();
    const routerSearchAggregationHook = useRouterSearchAggregationHook();

    const productCategory = productCategoryHook?.productCategoryList?.find(r => r?.id === routerSearchAggregationHook?.productCategoryId);
    const productSubCategory = productSubCategoryHook?.productSubCategoryList?.find(r => r?.id === routerSearchAggregationHook?.productSubCategoryId);

    // fetch productCategoryList
    useEffect(() => {
        async function fetchProductCategoryList() {
            if (!wsId) {
                return;
            }

            await apiHook.reqFetchProductCategoryList({ headers: { wsId: wsId } }, (results) => {
                productCategoryHook.onSetProductCategoryList(results);
            })
        }

        fetchProductCategoryList();
    }, [wsId]);

    // fetch productSubCategoryList
    useEffect(() => {
        async function fetchProductSubCategoryList() {
            if (!wsId || !productCategory) {
                productSubCategoryHook.onSetProductSubCategoryList(null);
                return;
            }

            await apiHook.reqFetchProductSubCategoryList({ params: { productCategoryId: productCategory?.id }, headers: { wsId: wsId } }, (results) => {
                productSubCategoryHook.onSetProductSubCategoryList(results);
            })
        }

        fetchProductSubCategoryList();
    }, [wsId, productCategory]);
    return (
        <>
            <FgSearchConsole
                SEARCH_CONDITIONS={SEARCH_CONDITIONS}
                SORT_METHODS={SORT_METHODS}
                DEFAULT_SORT_DIRECTION={'ASC'}

                productCategoryList={productCategoryHook?.productCategoryList}
                productSubCategoryList={productSubCategoryHook?.productSubCategoryList}
                productCategory={productCategory}
                productSubCategory={productSubCategory}
                searchFilterList={routerSearchAggregationHook?.searchFilterList}
                sortMethodList={routerSearchAggregationHook?.sortMethodList}

                onSelectProductCategoryId={routerSearchAggregationHook.onChangeProductCategoryId}
                onSelectProductSubCategoryId={routerSearchAggregationHook.onChangeProductSubCategoryId}
                onChangeSearchFilter={routerSearchAggregationHook.onChangeSearchFilter}
                onChangeSortTypes={routerSearchAggregationHook.onChangeSortTypes}
                onClear={routerSearchAggregationHook.onClear}
            />
        </>
    );
}

const SEARCH_CONDITIONS = [
    {
        fieldName: 'PRODUCT_NAME',
        name: '상품명',
    },
    {
        fieldName: 'PRODUCT_CODE',
        name: '상품코드',
    },
    {
        fieldName: 'PRODUCT_TAG',
        name: '상품태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_NAME',
        name: '옵션명',
    },
    {
        fieldName: 'PRODUCT_OPTION_CODE',
        name: '옵션코드',
    },
    {
        fieldName: 'PRODUCT_OPTION_TAG',
        name: '옵션태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_STATUS',
        name: '옵션상태',
    },
    {
        fieldName: 'PRODUCT_OPTION_RELEASE_LOCATION',
        name: '출고지',
    }
]

const SORT_METHODS = [
    {
        sortTarget: 'REMAINED_ASSETS',
        name: '재고자산'
    },
    {
        sortTarget: 'ESTIMATE_SALES',
        name: '예상 매출액'
    },
    {
        sortTarget: 'TOTAL_REMAINED_QUANTITY',
        name: '재고수량'
    },
    {
        sortTarget: 'PRODUCT_CID',
        name: '상품등록'
    },
    {
        sortTarget: 'PRODUCT_NAME',
        name: '상품명'
    },
]