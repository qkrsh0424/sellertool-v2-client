import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";

const DEFAULT_PAGE = 1;
const DEFAULT_SIZE = 20;

export default function useProdutOptionPageHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productOptionPage, setProductOptionPage] = useState(null);
    const [mergeSearchConditionFlag, setIsMergeSearchCondition] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            setProductOptionPage(null);
            return;
        }

        reqFetchProductOptionPage();
    }, [workspaceRedux?.workspaceInfo?.id]);

    useEffect(() => {
        if (!searchQuery) {
            setIsMergeSearchCondition(false);
            return;
        }

        setIsMergeSearchCondition(true);
    }, [searchQuery])

    const reqFetchProductOptionPage = useCallback(async (reqPage, reqSize) => {
        let params = {
            searchType:'ALL',
            page: reqPage ? reqPage : DEFAULT_PAGE,
            size: reqSize ? reqSize : DEFAULT_SIZE,
            mergeSearchConditionFlag: mergeSearchConditionFlag,
            packageYn: 'n',
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
    }, [workspaceRedux?.workspaceInfo?.id, mergeSearchConditionFlag, searchQuery]);

    const onChangeSearchQuery = useCallback((e) => {
        let value = e.target.value;

        setSearchQuery(value);
    }, []);

    return {
        productOptionPage,
        searchQuery,
        reqFetchProductOptionPage,
        onChangeSearchQuery
    }
}