import { useEffect } from "react";
import { FgSearchConsole } from "../../../../../../../../fragments/FgSearchConsole";
import { useApiHook } from "../../../../../../hooks/useApiHook";
import { useProductCategoryHook } from "../../../../../../hooks/useProductCategoryHook";
import { useProductSubCategoryHook } from "../../../../../../hooks/useProductSubCategoryHook";
import { useSelector } from "react-redux";
import { useSearchAggregationActionsHook, useSearchAggregationValueHook } from "../../../../../../contexts/SearchAggregationProvider";

export function SearchConsoleState(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const productCategoryHook = useProductCategoryHook();
    const productSubCategoryHook = useProductSubCategoryHook();

    const searchAggregationValueHook = useSearchAggregationValueHook();
    const searchAggregationActionsHook = useSearchAggregationActionsHook();

    const productCategory = productCategoryHook?.productCategoryList?.find(r => r.id === searchAggregationValueHook?.productCategoryId);
    const productSubCategory = productSubCategoryHook?.productSubCategoryList?.find(r => r.id === searchAggregationValueHook?.productSubCategoryId);

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
            if (!wsId || !searchAggregationValueHook?.productCategoryId) {
                productSubCategoryHook.onSetProductSubCategoryList([]);
                return;
            }

            await apiHook.reqFetchProductSubCategoryList({ params: { productCategoryId: searchAggregationValueHook?.productCategoryId }, headers: { wsId: wsId } }, (results) => {
                productSubCategoryHook.onSetProductSubCategoryList(results);
            })
        }

        fetchProductSubCategoryList();
    }, [wsId, searchAggregationValueHook?.productCategoryId]);

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
                searchFilterList={searchAggregationValueHook?.searchFilterList}
                sortMethodList={searchAggregationValueHook?.sortMethodList}

                onSelectProductCategoryId={searchAggregationActionsHook.onChangeProductCategoryId}
                onSelectProductSubCategoryId={searchAggregationActionsHook.onChangeProductSubCategoryId}
                onChangeSearchFilter={searchAggregationActionsHook.onChangeSearchFilter}
                onChangeSortTypes={searchAggregationActionsHook.onChangeSortTypes}
                onClear={searchAggregationActionsHook.onClear}
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
        sortTarget: 'PRODUCT_CID',
        name: '상품등록'
    },
    {
        sortTarget: 'PRODUCT_NAME',
        name: '상품명'
    },
    {
        sortTarget: 'PRODUCT_TAG',
        name: '상품태그'
    },
    {
        sortTarget: 'PRODUCT_OPTION_NAME',
        name: '옵션명'
    },
    {
        sortTarget: 'PRODUCT_OPTION_TAG',
        name: '옵션태그'
    },
    {
        sortTarget: 'STATUS',
        name: '상태'
    },
    {
        sortTarget: 'RELEASE_LOCATION',
        name: '출고지'
    },
    {
        sortTarget: 'MEMO',
        name: '메모'
    },
]