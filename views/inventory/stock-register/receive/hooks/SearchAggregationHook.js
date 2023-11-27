import { useContext } from "react";
import { SearchAggregationActionsContext, SearchAggregationValueContext } from "../contexts/SearchAggregationProvider";

export function useSearchAggregationValueHook(props) {
    const value = useContext(SearchAggregationValueContext);
    if (value === undefined) {
        throw new Error('useSearchAggregationValueHook should be used within SearchAggregationValueContext');
    }
    return {
        productCategory: value.productCategory,
        productSubCategory: value.productSubCategory,
        page: value.page,
        size: value.size,
        searchFilter: value.searchFilter,
        sortTypes: value.sortTypes
    };
}

export function useSearchAggregationActionsHook() {
    const value = useContext(SearchAggregationActionsContext);
    if (value === undefined) {
        throw new Error('useSearchAggregationActionsHook should be used within SearchAggregationActionsContext');
    }
    return {
        onChangeProductCategory: value.onChangeProductCategory,
        onChanageProductSubCategory: value.onChangeProductSubCategory,
        onChangePage: value.onChangePage,
        onChangeSize: value.onChangeSize,
        onChangeSearchFilter: value.onChangeSearchFilter,
        onChangeSortTypes: value.onChangeSortTypes,
        onClear: value.onClear,
    };
}