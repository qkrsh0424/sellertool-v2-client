import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productDataConnect } from "../../../../data_connect/productDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useProductsHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            setProducts(null);
            return;
        }

        reqFetchProducts();
    }, [
        workspaceRedux?.workspaceInfo?.id,
        router?.query?.productCategoryId,
        router?.query?.productSubCategoryId,
        router?.query?.searchCondition,
        router?.query?.searchQuery,
        router?.query?.sort,
        router?.query?.page,
        router?.query?.size
    ]);

    const reqFetchProducts = async () => {
        let params = {
            productCategoryId: router?.query?.productCategoryId,
            productSubCategoryId: router?.query?.productSubCategoryId,
            searchCondition: router?.query?.searchCondition,
            searchQuery: router?.query?.searchQuery,
            sort: router?.query?.sort || 'cid_asc',
            page: router?.query?.page || 1,
            size: router?.query?.size || 10
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productDataConnect().searchPage(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProducts(res.data.data);
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
    }

    const reqChangeStockManagement = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await productDataConnect().changeStockManagement(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    reqFetchProducts();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqDeleteProduct = async ({
        body,
        successCallback
    }) => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productDataConnect().delete(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                    reqFetchProducts();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    return {
        products,
        reqChangeStockManagement,
        reqDeleteProduct
    }
}