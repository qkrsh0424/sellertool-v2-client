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
        stockReflectDateTime: new Date()
    }
}

export function useInventoryReleaseCreateFormListHook() {
    const [inventoryReleaseCreateFormList, setInventoryReleaseCreateFormList] = useState(null);

    const onSetInventoryReleaseCreateFormList = (values) => {
        setInventoryReleaseCreateFormList(values);
    }

    const onChangeUnit = (e, reqIndex) => {
        let value = e.target.value;

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,4}$/)) {
            onSetInventoryReleaseCreateFormList(inventoryReleaseCreateFormList?.map((r, index) => {
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
        onSetInventoryReleaseCreateFormList(inventoryReleaseCreateFormList?.map(r => {
            return {
                ...r,
                unit: value
            }
        }))
    }

    const onChangeMemo = (e, reqIndex) => {
        let value = e.target.value;

        onSetInventoryReleaseCreateFormList(inventoryReleaseCreateFormList?.map((r, index) => {
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
        onSetInventoryReleaseCreateFormList(inventoryReleaseCreateFormList?.map(r => {
            return {
                ...r,
                memo: value
            }
        }))
    }

    const onDelete = (id) => {
        onSetInventoryReleaseCreateFormList(inventoryReleaseCreateFormList?.filter(r => r.id !== id));
    }

    const checkUnitFormatValid = () => {
        inventoryReleaseCreateFormList.forEach((r, index) => {
            if (r.unit < 1 || r.unit > 1000) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n수량을 정확히 입력해 주세요.\n허용 범위 [1-1,000]`);
            }
        })
    }

    const checkMemoFormatValid = () => {
        inventoryReleaseCreateFormList.forEach((r, index) => {
            if (r.memo.length < 1 || r.memo.length > 150) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n메모를 정확히 입력해 주세요.\n허용 범위 [1-150]`);
            }
        })
    }

    return {
        generate,
        inventoryReleaseCreateFormList,
        onSetInventoryReleaseCreateFormList,
        onChangeUnit,
        onBulkChangeUnit,
        onChangeMemo,
        onBulkChangeMemo,
        onDelete,
        checkUnitFormatValid,
        checkMemoFormatValid,
    }
}