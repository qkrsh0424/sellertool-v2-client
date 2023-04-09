import _ from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productSubCategoryDataConnect } from "../../../../data_connect/productSubCategoryDataConnect";

export default function useProductSubCategoriesHook({
    productCategory
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productSubCategories, setProductSubCategories] = useState(null);
    const [productSubCategory, setProductSubCategory] = useState(null);
    const [productSubCategoryId, setProductSubCategoryId] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !productCategory?.id) {
            setProductSubCategories(null);
            return;
        }

        reqFetchProductSubCategories();
    }, [workspaceRedux?.workspaceInfo?.id, productCategory?.id]);

    useEffect(() => {
        if (!router?.query?.productSubCategoryId) {
            setProductSubCategoryId(null);
            return;
        }

        setProductSubCategoryId(router?.query?.productSubCategoryId);

    }, [router?.query?.productSubCategoryId]);

    useEffect(() => {
        if (!productSubCategories || !productSubCategoryId) {
            setProductSubCategory(null);
            return;
        }

        onSetProductSubCategory();
    }, [productSubCategories, productSubCategoryId]);

    const reqFetchProductSubCategories = async () => {

        let params = {
            productCategoryId: productCategory?.id
        }

        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await productSubCategoryDataConnect().searchList(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductSubCategories(res.data.data);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                enqueueSnackbar(res?.data?.memo, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            })
    }

    const reqChangeName = async ({
        body,
        successCallback
    }) => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productSubCategoryDataConnect().changeName(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchProductSubCategories();
                    successCallback();
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

    const reqDeleteProductSubCategory = async ({
        body,
        successCallback
    }) => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productSubCategoryDataConnect().delete(body, headers)
            .then(res => {
                if (res.status === 200) {
                    reqFetchProductSubCategories();
                    successCallback();
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

    const onChangeProductSubCategory = (productSubCategoryId) => {
        let data = productSubCategories?.find(r => r.id === productSubCategoryId);

        setProductSubCategory(_.cloneDeep(data));
    }

    const onSetProductSubCategory = () => {
        let productSubCategoryId = router?.query?.productSubCategoryId;
        let data = productSubCategories?.find(r => r.id === productSubCategoryId);

        setProductSubCategory(_.cloneDeep(data));
    }

    const clearProductSubCategory = () => {
        setProductSubCategoryId(null);
    }

    return {
        productSubCategories,
        productSubCategory,
        reqChangeName,
        reqDeleteProductSubCategory,
        onChangeProductSubCategory,
        clearProductSubCategory
    }
}