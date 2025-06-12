import { useRouter } from "next/router";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";
import { SortFormatUtils } from "../../../../../utils/sortFormatUtils";

const customURIEncoderUtils = CustomURIEncoderUtils();
const sortFormatUtils = SortFormatUtils();

const SORT_DIRECTION_ASC = 'ASC';
const SORT_DIRECTION_DESC = 'DESC';
const DEFAULT_SORT_DIRECTION = SORT_DIRECTION_ASC;
const DEFAULT_SORT_TYPES = customURIEncoderUtils.encodeJSONList(['PRODUCT_CID$DESC']);


export function useRouterSearchAggregationHook(props) {
    const router = useRouter();
    const query = router?.query;
    const searchFilter = query?.searchFilter;
    const sortTypes = query?.sortTypes;
    const page = query?.page || 1;
    const size = query?.size || 50;

    const productCategoryId = query?.productCategoryId;
    const productSubCategoryId = query?.productSubCategoryId;
    const searchFilterList = searchFilter ? customURIEncoderUtils.decodeJSONList(searchFilter) : [];
    const sortMethodList = sortTypes ? sortFormatUtils.convertSortTypesToSortMethodList(customURIEncoderUtils.decodeJSONList(sortTypes)) : [];

    const onChangeProductCategoryId = (productCategoryId) => {
        let newQuery = { ...query };

        delete newQuery?.productSubCategoryId;
        newQuery.page = 1;

        if (!productCategoryId) {
            delete newQuery?.productCategoryId;
        } else {
            newQuery.productCategoryId = productCategoryId;
        }


        router?.replace({
            pathname: router?.pathname,
            query: {
                ...newQuery,
            }
        }, undefined, { scroll: false })
    }

    const onChangeProductSubCategoryId = (productSubCategoryId) => {
        let newQuery = { ...query };

        newQuery.page = 1;

        if (!productSubCategoryId) {
            delete newQuery?.productSubCategoryId;
        } else {
            newQuery.productSubCategoryId = productSubCategoryId;
        }

        router?.replace({
            pathname: router?.pathname,
            query: {
                ...newQuery,
            }
        }, undefined, { scroll: false })
    }

    const onChangeSearchFilter = (searchFilterList) => {
        let newQuery = { ...query };

        newQuery.page = 1;

        if (!searchFilterList || searchFilterList?.length <= 0) {
            delete newQuery?.searchFilter;
        } else {
            newQuery.searchFilter = customURIEncoderUtils.encodeJSONList(searchFilterList);
        }

        router?.replace({
            pathname: router?.pathname,
            query: {
                ...newQuery,
            }
        }, undefined, { scroll: false })
    }

    const onChangeSortTypes = (sortMethodList) => {
        let newQuery = { ...query };

        if (!sortMethodList || sortMethodList?.length <= 0) {
            delete newQuery?.sortTypes;
        } else {
            newQuery.sortTypes = customURIEncoderUtils.encodeJSONList(sortFormatUtils.convertSortMethodListToSortTypes(sortMethodList));
        }

        router?.replace({
            pathname: router?.pathname,
            query: {
                ...newQuery,
            }
        }, undefined, { scroll: false })
    }

    const onClear = () => {
        router?.replace({
            pathname: router?.pathname,
            query: { page: 1, size: size || 50 }
        }, undefined, { scroll: false })
    }

    return {
        DEFAULT_SORT_TYPES,
        page,
        size,
        productCategoryId,
        productSubCategoryId,
        searchFilter,
        sortTypes,
        searchFilterList,
        sortMethodList,
        onChangeProductCategoryId,
        onChangeProductSubCategoryId,
        onChangeSearchFilter,
        onChangeSortTypes,
        onClear
    }
}