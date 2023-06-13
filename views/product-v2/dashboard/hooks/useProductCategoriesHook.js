import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useProductCategoriesHook(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const [productCategories, setProductCategories] = useState(null);
    const [productCategory, setProductCategory] = useState(null);


    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchProductCategories();
    }, [workspaceRedux?.workspaceInfo?.id]);

    useEffect(() => {
        if (!productCategories || !router?.query?.productCategoryId) {
            setProductCategory(null);
            return;
        }

        onInitProductCategory();
    }, [productCategories, router?.query?.productCategoryId])

    const reqFetchProductCategories = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productCategoryDataConnect().searchList(headers)
            .then(res => {
                if (res.status === 200) {
                    setProductCategories(res.data.data);
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

    const reqChangeProductCategoryName = async ({
        body,
        successCallback
    }) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await productCategoryDataConnect().changeName(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchProductCategories();
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

    const reqDeleteProductCategory = async ({
        body,
        successCallback
    }) => {
        body = {
            ...body,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await productCategoryDataConnect().delete(body)
            .then(res => {
                if (res.status === 200) {
                    reqFetchProductCategories();
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

    const onChangeProductCategory = (productCategoryId) => {
        let data = productCategories?.find(r => r.id === productCategoryId);
        setProductCategory(_.cloneDeep(data));
    }

    const onInitProductCategory = () => {
        let productCategoryId = router?.query?.productCategoryId;
        let data = productCategories?.find(r => r.id === productCategoryId);

        setProductCategory(_.cloneDeep(data));
    }

    return {
        productCategories,
        productCategory,
        reqChangeProductCategoryName,
        reqDeleteProductCategory,
        onChangeProductCategory
    }
}