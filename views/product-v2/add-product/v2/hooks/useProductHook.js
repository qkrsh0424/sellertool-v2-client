import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import formatValidUtils from "/utils/formatValidUtils";

export function useProductHook() {
    const [product, setProduct] = useState({
        id: uuidv4(),
        name: '', // 입력 필수
        productTag: '', // 입력
        thumbnailUri: '', // 입력
        purchaseUri: '', // 입력
        memo: '', // 입력
    });

    const onChangeProductValueOfName = (name, value) => {
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

        if (product.name?.length < 1 || product.name?.length > 100) {
            throw new Error('상품명은 1-100자 필수 입력입니다.');
        }
    }

    const checkProductTagFormatValid = () => {
        let spaceBool = formatValidUtils.hasSpaceInFrontAndBack(product.productTag);
        if (spaceBool) {
            throw new Error('상품 태그의 앞뒤 공백은 허용하지 않습니다.');
        }

        if (product.productTag?.length < 0 || product.productTag?.length > 100) {
            throw new Error('상품 태그는 0-100자 내외로 입력해 주세요.');
        }
    }

    const checkPurchaseUriFormatValid = () => {
        if (product.purchaseUri?.length < 0 || product.purchaseUri?.length > 400) {
            throw new Error('매입 사이트 URL은 0-400자 내외로 입력해 주세요.');
        }
    }

    const checkMemoFormatValid = () => {
        if (product.memo?.length < 0 || product.memo?.length > 200) {
            throw new Error('상품별 메모는 0-200자 내외로 입력해 주세요.');
        }
    }

    return {
        product,
        onChangeProductValueOfName,
        onChangeProductThumbnailUri,
        checkProductFormatValid
    }
}