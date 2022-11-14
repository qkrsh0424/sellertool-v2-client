import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productSubCategoryDataConnect } from "../../../../data_connect/productSubCategoryDataConnect";
import valueUtils from "../../../../utils/valueUtils";

export default function useProductSubCategoriesHook({
    productCategory
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productSubCategories, setProductSubCategories] = useState(null);
    const [productSubCategory, setProductSubCategory] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !productCategory?.id) {
            setProductSubCategories(null);
            return;
        }

        reqFetchProductSubCategories();
    }, [workspaceRedux?.workspaceInfo?.id, productCategory?.id]);

    useEffect(() => {
        if (!productSubCategories || !router?.query?.productSubCategoryId) {
            setProductSubCategory(null);
            return;
        }

        onSetProductSubCategory();
    }, [productSubCategories, router?.query?.productSubCategoryId]);

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
                console.log(err, err.response);
            })
    }

    const reqChangeName = async ({
        body,
        successCallback
    }) => {
        await productSubCategoryDataConnect().changeName(body)
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
        await productSubCategoryDataConnect().delete(body)
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

    const onSetProductSubCategory = () => {
        let productSubCategoryId = router?.query?.productSubCategoryId;
        let data = productSubCategories?.find(r => r.id === productSubCategoryId);

        setProductSubCategory(_.cloneDeep(data));
    }

    return {
        productSubCategories,
        productSubCategory,
        reqChangeName,
        reqDeleteProductSubCategory
    }
}