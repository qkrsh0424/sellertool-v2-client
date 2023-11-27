import { useState } from "react"
import { getRemovedPrefixZero } from "../../../../../utils/numberFormatUtils";
import { v4 as uuidv4 } from 'uuid';

const generate = (productOption) => {
    return {
        id: uuidv4(),
        productCategoryName: productOption?.productCategory?.name,
        productSubCategoryName: productOption?.productSubCategory?.name,
        productName: productOption?.product?.name,
        productOptionName: productOption?.name,
        productOptionId: productOption?.id,
        unit: '0',
        memo: '',
        purchaseCost: productOption?.totalPurchasePrice ? productOption?.totalPurchasePrice : '0'
    }
}

export function useInventoryReceiveCreateFormListHook() {
    const [inventoryReceiveCreateFormList, setInventoryReceiveCreateFormList] = useState(null);

    const onSetInventoryReceiveCreateFormList = (values) => {
        setInventoryReceiveCreateFormList(values);
    }

    const onChangeUnit = (e, reqIndex) => {
        let value = e.target.value;

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,4}$/)) {
            onSetInventoryReceiveCreateFormList(inventoryReceiveCreateFormList?.map((r, index) => {
                if (reqIndex === index) {
                    return {
                        ...r,
                        unit: value
                    }
                }

                return {
                    ...r
                }
            }));
        }
    }

    const onBulkChangeUnit = (value) => {
        onSetInventoryReceiveCreateFormList(inventoryReceiveCreateFormList?.map(r => {
            return {
                ...r,
                unit: value
            }
        }))
    }

    const onChangeMemo = (e, reqIndex) => {
        let value = e.target.value;

        onSetInventoryReceiveCreateFormList(inventoryReceiveCreateFormList?.map((r, index) => {
            if (reqIndex === index) {
                return {
                    ...r,
                    memo: value
                }
            }

            return {
                ...r
            }
        }));
    }

    const onBulkChangeMemo = (value) => {
        onSetInventoryReceiveCreateFormList(inventoryReceiveCreateFormList?.map(r => {
            return {
                ...r,
                memo: value
            }
        }))
    }

    const onChangePurchaseCost = (e, reqIndex) => {
        let value = e.target.value;

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,8}$/)) {
            onSetInventoryReceiveCreateFormList(inventoryReceiveCreateFormList?.map((r, index) => {
                if (reqIndex === index) {
                    return {
                        ...r,
                        purchaseCost: value
                    }
                }

                return {
                    ...r
                }
            }));
        }
    }

    const onBulkChangePurchaseCost = (value) => {
        onSetInventoryReceiveCreateFormList(inventoryReceiveCreateFormList?.map(r => {
            return {
                ...r,
                purchaseCost: value
            }
        }))
    }

    const onDelete = (id) => {
        onSetInventoryReceiveCreateFormList(inventoryReceiveCreateFormList?.filter(r => r.id !== id));
    }

    const checkUnitFormatValid = () => {
        inventoryReceiveCreateFormList.forEach((r, index) => {
            if (r.unit < 1 || r.unit > 1000) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n수량을 정확히 입력해 주세요.\n허용 범위 [1-1,000]`);
            }
        })
    }

    const checkMemoFormatValid = () => {
        inventoryReceiveCreateFormList.forEach((r, index) => {
            if (r.memo.length < 1 || r.memo.length > 150) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n메모를 정확히 입력해 주세요.\n허용 범위 [1-150]`);
            }
        })
    }

    const checkPurchaseCostFormatValid = () => {
        inventoryReceiveCreateFormList.forEach((r, index) => {
            if (r.purchaseCost < 1 || r.purchaseCost > 99999999) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n매입단가를 정확히 입력해 주세요.\n허용 범위 [1-99,999,999]`);
            }
        })
    }

    return {
        generate,
        inventoryReceiveCreateFormList,
        onSetInventoryReceiveCreateFormList,
        onChangeUnit,
        onBulkChangeUnit,
        onChangeMemo,
        onBulkChangeMemo,
        onChangePurchaseCost,
        onBulkChangePurchaseCost,
        onDelete,
        checkUnitFormatValid,
        checkMemoFormatValid,
        checkPurchaseCostFormatValid
    }
}