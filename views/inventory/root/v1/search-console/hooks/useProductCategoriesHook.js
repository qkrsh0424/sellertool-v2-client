import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productCategoryDataConnect } from "../../../../../../data_connect/productCategoryDataConnect";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function useProductCategoriesHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const [productCategories, setProductCategories] = useState(null);


    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchProductCategories();
    }, [workspaceRedux?.workspaceInfo?.id]);

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
    return {
        productCategories
    }
}