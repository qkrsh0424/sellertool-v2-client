import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 20;

export default function useProdutOptionPageHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productOptionPage, setProductOptionPage] = useState(null);
    const [pageable, setPageable] = useState({
        page: DEFAULT_PAGE,
        size: DEFAULT_SIZE
    });

    const [mergeSearchConditionFlag, setIsMergeSearchCondition] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            setProductOptionPage(null);
            return;
        }

        reqFetchProductOptionPage();
    }, [workspaceRedux?.workspaceInfo?.id, pageable]);

    useEffect(() => {
        if (!searchQuery) {
            setIsMergeSearchCondition(false);
            return;
        }

        setIsMergeSearchCondition(true);
    }, [searchQuery])

    const reqFetchProductOptionPage = useCallback(async () => {
        let params = {
            page: pageable.page,
            size: pageable.size,
            mergeSearchConditionFlag: mergeSearchConditionFlag,
            searchQuery: searchQuery,
            sort: 'cid_asc'
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productOptionDataConnect().searchPage(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductOptionPage(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }, [workspaceRedux?.workspaceInfo?.id, pageable, mergeSearchConditionFlag, searchQuery]);

    const onChangePage = useCallback((pageIndex) => {
        setPageable({
            ...pageable,
            page: pageIndex
        })
    }, [pageable]);

    const onChangeSize = useCallback((size) => {
        setPageable({
            ...pageable,
            page: 1,
            size: size
        })
    }, [pageable]);

    const onChangeSearchQuery = useCallback((e) => {
        let value = e.target.value;

        setSearchQuery(value);
    }, []);


    return {
        productOptionPage,
        pageable,
        searchQuery,
        reqFetchProductOptionPage,
        onChangePage,
        onChangeSize,
        onChangeSearchQuery
    }
}