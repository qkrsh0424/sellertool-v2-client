import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productSubCategoryDataConnect } from "../../../../../data_connect/productSubCategoryDataConnect";

export default function useProductSubCategoriesHook({
    productCategory
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productSubCategories, setProductSubCategories] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !productCategory?.id) {
            setProductSubCategories(null);
            return;
        }

        reqFetchProductSubCategories();
    }, [workspaceRedux?.workspaceInfo?.id, productCategory?.id]);

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

    return {
        productSubCategories
    }
}