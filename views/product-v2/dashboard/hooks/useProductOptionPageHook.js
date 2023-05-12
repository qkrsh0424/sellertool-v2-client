import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

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
            size: reqSize ? reqSize : DEFAULT_SIZE,
            page: reqPage ? reqPage : DEFAULT_PAGE,
            searchCondition:'ALL',
            searchQuery: searchQuery,
            packageYn: 'n',
            sort: 'product.createdAt_asc'
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
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
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