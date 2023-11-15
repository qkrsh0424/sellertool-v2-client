import { useState } from "react";

/**
    * @typedef {Object} useStockReceiveItemHook.stockReceiveItem
    * @property {string} id - 입고 아이디
    * @property {number} unit - 입고 수량
    * @property {string} memo - 입고 메모
    * @property {number} purchaseCost - 매입 가격
    * @property {string} productOptionId - 옵션 아이디
    * @property {string} productThumbnailUri - 상품 썸네일
    * @property {string} productName - 상품명
    * @property {string} productTag - 상품 태그
    * @property {string} productOptionCode - 옵션코드
    * @property {string} productOptionName - 옵션명
    * @property {string} productOptionTag - 옵션 태그
*/
export function useStockReceiveItemHook(props) {
    /** @type {useStockReceiveItemHook.stockReceiveItem[]} */
    const [stockReceiveItemList, setStockReceiveItemList] = useState([]);

    const onSetStockReceiveItemList = (values) => {
        setStockReceiveItemList(values);
    }

    const onConcatStockReceiveItems = (values) => {
        let newStcokReceiveItemList = [...stockReceiveItemList].concat([...values]);

        onSetStockReceiveItemList(newStcokReceiveItemList);
    }

    return {
        stockReceiveItemList,
        onConcatStockReceiveItems
    }
}