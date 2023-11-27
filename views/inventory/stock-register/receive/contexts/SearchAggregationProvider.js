import { createContext, useMemo, useState } from "react";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";

export const SearchAggregationValueContext = createContext();
export const SearchAggregationActionsContext = createContext();

const customURIEncoderUtils = CustomURIEncoderUtils();

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 50;
const DEFAULT_STATE = {
    productCategory: null,
    productSubCategory: null,
    page: DEFAULT_PAGE,
    size: DEFAULT_SIZE,
    searchFilter: null,
    sortTypes: null
};

export function SearchAggregationProvider({ children }) {
    const [searchAggregationState, setSearchAggregationState] = useState(DEFAULT_STATE);

    const actions = useMemo(
        () => {
            return {
                onChangeProductCategory(value) {
                    setSearchAggregationState((prev) => {
                        return {
                            ...prev,
                            productCategory: value,
                            productSubCategory: null,
                            page: DEFAULT_PAGE
                        }
                    })
                },
                onChangeProductSubCategory(value) {
                    setSearchAggregationState((prev) => {
                        return {
                            ...prev,
                            productSubCategory: value,
                            page: DEFAULT_PAGE
                        }
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
                onChangeSearchFilter(value) {
                    setSearchAggregationState((prev) => {
                        return {
                            ...prev,
                            searchFilter: customURIEncoderUtils.encodeJSONList(value),
                            page: DEFAULT_PAGE
                        }
                    })
                },
                onChangeSortTypes(value) {
                    setSearchAggregationState((prev) => {
                        return {
                            ...prev,
                            sortTypes: customURIEncoderUtils.encodeJSONList(value),
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