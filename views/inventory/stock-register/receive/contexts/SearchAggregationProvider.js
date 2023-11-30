import { createContext, useMemo, useState } from "react";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";
import { useContext } from "react";
import { SortFormatUtils } from "../../../../../utils/sortFormatUtils";

export const SearchAggregationValueContext = createContext();
export const SearchAggregationActionsContext = createContext();

const customURIEncoderUtils = CustomURIEncoderUtils();
const sortFormatUtils = SortFormatUtils();

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 50;
const DEFAULT_STATE = {
    productCategoryId: null,
    productSubCategoryId: null,
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    searchFilter: null,
    searchFilterList: [],
    sortTypes: null,
    sortMethodList: []
};
const DEFAULT_SORT_TYPES = customURIEncoderUtils.encodeJSONList(['PRODUCT_CID$DESC']);

export function SearchAggregationProvider({ children }) {
    const [searchAggregationState, setSearchAggregationState] = useState(DEFAULT_STATE);

    const actions = useMemo(
        () => {
            return {
                onChangeProductCategoryId(value) {
                    setSearchAggregationState((prev) => {
                        let newState = { ...prev };

                        newState.productSubCategoryId = null;
                        newState.page = DEFAULT_PAGE;
                        newState.productCategoryId = !value ? null : value;

                        return { ...newState }
                    })
                },
                onChangeProductSubCategoryId(value) {
                    setSearchAggregationState((prev) => {
                        let newState = { ...prev };

                        newState.productSubCategoryId = !value ? null : value;
                        newState.page = DEFAULT_PAGE;

                        return { ...newState }
                    })
                },
                onChangeSearchFilter(searchFilterList) {
                    setSearchAggregationState((prev) => {
                        let newState = { ...prev };

                        newState.page = DEFAULT_PAGE;

                        if (!searchFilterList || searchFilterList?.length <= 0) {
                            newState.searchFilter = null;
                            newState.searchFilterList = [];
                        } else {
                            newState.searchFilter = customURIEncoderUtils.encodeJSONList(searchFilterList);
                            newState.searchFilterList = [...searchFilterList];
                        }
                        return { ...newState };
                    })
                },
                onChangeSortTypes(sortMethodList) {
                    setSearchAggregationState((prev) => {
                        let newState = { ...prev };

                        if (!sortMethodList || sortMethodList?.length <= 0) {
                            newState.sortTypes = null;
                            newState.sortMethodList = [];
                        } else {
                            newState.sortTypes = customURIEncoderUtils.encodeJSONList(sortFormatUtils.convertSortMethodListToSortTypes(sortMethodList));
                            newState.sortMethodList = [...sortMethodList];
                        }
                        return { ...newState };
                    })
                },
                onChangePage(value) {
                    setSearchAggregationState((prev) => {
                        return {
                            ...prev,
                            page: value
                        }
                    })
                },
                onChangeSize(value) {
                    setSearchAggregationState((prev) => {
                        return {
                            ...prev,
                            size: value,
                            page: DEFAULT_PAGE
                        }
                    })
                },
                onClear() {
                    setSearchAggregationState(DEFAULT_STATE);
                }
            }
        },
        []
    )

    return (
        <SearchAggregationActionsContext.Provider value={actions}>
            <SearchAggregationValueContext.Provider value={searchAggregationState}>
                {children}
            </SearchAggregationValueContext.Provider>
        </SearchAggregationActionsContext.Provider>
    );
}

export function useSearchAggregationValueHook(props) {
    const value = useContext(SearchAggregationValueContext);
    if (value === undefined) {
        throw new Error('useSearchAggregationValueHook should be used within SearchAggregationValueContext');
    }
    return {
        productCategoryId: value.productCategoryId,
        productSubCategoryId: value.productSubCategoryId,
        page: value.page,
        size: value.size,
        searchFilter: value.searchFilter,
        searchFilterList: value.searchFilterList,
        sortTypes: value.sortTypes,
        sortMethodList: value.sortMethodList,
        DEFAULT_SORT_TYPES: DEFAULT_SORT_TYPES
    };
}

export function useSearchAggregationActionsHook() {
    const value = useContext(SearchAggregationActionsContext);
    if (value === undefined) {
        throw new Error('useSearchAggregationActionsHook should be used within SearchAggregationActionsContext');
    }
    return {
        onChangeProductCategoryId: value.onChangeProductCategoryId,
        onChangeProductSubCategoryId: value.onChangeProductSubCategoryId,
        onChangePage: value.onChangePage,
        onChangeSize: value.onChangeSize,
        onChangeSearchFilter: value.onChangeSearchFilter,
        onChangeSortTypes: value.onChangeSortTypes,
        onClear: value.onClear,
    };
}