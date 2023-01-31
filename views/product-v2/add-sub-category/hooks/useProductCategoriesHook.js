import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";

export default function useProductCategoriesHook(props) {
    const [productCategories, setProductCategories] = useState(null);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            setProductCategories(null);
            return;
        }

        reqFetchProductCategories();
    }, [workspaceRedux?.workspaceInfo?.id]);

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

    return {
        productCategories
    }
}