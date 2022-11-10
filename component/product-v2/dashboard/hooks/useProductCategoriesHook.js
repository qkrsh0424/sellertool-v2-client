import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";

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
        let params = {
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await productCategoryDataConnect().searchList(params)
            .then(res => {
                if (res.status === 200) {
                    setProductCategories(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqChangeProductCategoryName = async ({
        body,
        successCallback
    }) => {
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

    const onInitProductCategory = () => {
        let productCategoryId = router?.query?.productCategoryId;
        let data = productCategories?.find(r => r.id === productCategoryId);

        setProductCategory(_.cloneDeep(data));
    }

    return {
        productCategories,
        productCategory,
        reqChangeProductCategoryName,
        reqDeleteProductCategory
    }
}