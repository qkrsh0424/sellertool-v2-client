import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { productCategoryDataConnect } from "../../../../data_connect/productCategoryDataConnect";

export default function useProductCategoriesHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux)
    const [productCategories, setProductCategories] = useState(null);
    const [productCategoryId, setProductCategoryId] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setProductCategoryId(null);

        if (!workspaceRedux?.workspaceInfo?.id) {
            setProductCategories(null);
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
                enqueueSnackbar(res?.data?.memo, { variant: 'error', autoHideDuration: 3000, preventDuplicate: true });
            })
    }

    const onChangeProductCategoryId = (e) => {
        let value = e.target.value;

        setProductCategoryId(value);
    }

    const checkProductCategoryIdFormatValid = () => {
        if (!productCategoryId) {
            throw new Error('카테고리를 선택해 주세요.');
        }
        let isExist = productCategories?.find(r => r.id === productCategoryId);

        if (!isExist) {
            throw new Error('잘못된 접근 방식입니다.');
        }
    }

    return {
        productCategories,
        productCategoryId,
        onChangeProductCategoryId,
        checkProductCategoryIdFormatValid
    }
}