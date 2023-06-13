import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productDataConnect } from "../../../../data_connect/productDataConnect";
import formatValidUtils from "../../../../utils/formatValidUtils";

export default function useProductHook({
    originProduct
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!originProduct) {
            return;
        }

        setProduct(_.cloneDeep({
            code: originProduct.code,
            id: originProduct.id,
            memo: originProduct.memo,
            name: originProduct.name,
            productSubCategoryId: originProduct.productSubCategoryId,
            productTag: originProduct.productTag,
            purchaseUri: originProduct.purchaseUri,
            thumbnailUri: originProduct.thumbnailUri,
            workspaceId: originProduct.workspaceId,
        }))
    }, [originProduct]);

    const reqUpdateProduct = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await productDataConnect().update(body, headers)
            .then(res => {
                if (res.status === 200) {
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
    const onChangeProductValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setProduct({
            ...product,
            [name]: value
        })
    }

    const onChangeProductThumbnailUri = (imageUri) => {
        setProduct({
            ...product,
            thumbnailUri: imageUri
        })
    }

    const checkProductFormatValid = () => {
        try {
            checkProductNameFormatValid();
            checkProductTagFormatValid();
            checkPurchaseUriFormatValid();
            checkMemoFormatValid();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    const checkProductNameFormatValid = () => {
        let spaceBool = formatValidUtils.hasSpaceInFrontAndBack(product.name);
        if (spaceBool) {
            throw new Error('상품명의 앞뒤 공백은 허용하지 않습니다.');
        }

        if (product.name.length < 1 || product.name.length > 100) {
            throw new Error('상품명은 1-100자 필수 입력입니다.');
        }
    }

    const checkProductTagFormatValid = () => {
        let spaceBool = formatValidUtils.hasSpaceInFrontAndBack(product.productTag);
        if (spaceBool) {
            throw new Error('상품 태그의 앞뒤 공백은 허용하지 않습니다.');
        }

        if (product.productTag.length < 0 || product.productTag.length > 100) {
            throw new Error('상품 태그는 0-100자 내외로 입력해 주세요.');
        }
    }

    const checkPurchaseUriFormatValid = () => {
        if (product.purchaseUri.length < 0 || product.purchaseUri.length > 400) {
            throw new Error('매입 사이트 URL은 0-400자 내외로 입력해 주세요.');
        }
    }

    const checkMemoFormatValid = () => {
        if (product.memo.length < 0 || product.memo.length > 200) {
            throw new Error('상품별 메모는 0-200자 내외로 입력해 주세요.');
        }
    }

    const getSubmitValue = () => {
        let newData = _.cloneDeep(product);

        newData = {
            ...newData,
            name: newData.name.trim(),
            productTag: newData.productTag.trim(),
            thumbnailUri: newData.thumbnailUri.trim(),
            purchaseUri: newData.purchaseUri.trim(),
            memo: newData.memo.trim(),
        }

        return newData;
    }
    return {
        product,
        onChangeProductValueOfName,
        onChangeProductThumbnailUri,
        checkProductFormatValid,
        getSubmitValue,
        reqUpdateProduct
    }
}