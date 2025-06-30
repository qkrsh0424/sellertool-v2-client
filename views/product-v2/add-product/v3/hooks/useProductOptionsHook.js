import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getRemovedPrefixZero } from "/utils/numberFormatUtils";

const generateInitOption = () => {
    return {
        id: uuidv4(),
        code: '',
        name: '',
        optionTag: '',
        salesPrice: '0',
        totalPurchasePrice: '0',
        status: '',
        memo: '',
        releaseLocation: '',
        packageYn: 'n',
        safetyStockUnit: '0',
        createdAt: null,
        updatedAt: null,
        deletedFlag: false,
        productId: null,
        workspaceId: null,
        isNew: true,
    };
}

export function useProductOptionsHook() {
    const [productOptions, setProductOptions] = useState([]);

    const onSetProductOptions = (items) => {
        setProductOptions(items);
    }

    const onPushNewProductOption = () => {
        onSetProductOptions([
            ...productOptions,
            generateInitOption()
        ])
    }

    const onPushNewProductOptionsWithNames = (names) => {
        let data = names.map(name => {
            return {
                ...generateInitOption(),
                name: name
            }
        })
        onSetProductOptions([
            ...productOptions,
            ...data
        ]);
    }

    const onConcatNewProductOptions = (items) => {
        onSetProductOptions([
            ...productOptions,
            ...items
        ]);
    }

    const onDeleteProductOption = (id) => {
        let newData = productOptions?.filter(r => r.id !== id);

        onSetProductOptions([
            ...newData
        ])
    }

    const onChangeOptionValueOfName = (name, value, id) => {
        setProductOptions(productOptions?.map(r => {
            if (r.id === id) {
                return {
                    ...r,
                    [name]: value
                }
            } else {
                return { ...r }
            }
        }))
    }

    const onBatchChangeOptionTagsWithOptionName = () => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                optionTag: r.name
            }
        }))
    }

    const onBatchChangeValueOfName = (name, value) => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                [name]: value
            }
        }))
    }

    const checkOptionValuesForamtValid = () => {
        productOptions.forEach((r, index) => {
            let name = r.name.trim();
            // 옵션코드 REGEX
            const optionCodePattern = /^[A-Za-z0-9_-]{1,50}$/;
            if (!optionCodePattern.test(r.code)) {
                throw new Error(`옵션코드(SKU코드)는 영문, 숫자, -, _ 만 허용되며, 1-50자 이내로 입력해주세요. (행: ${index + 1})`);
            }
            if (name.length < 1 || name.length > 50) {
                throw new Error(`옵션명은 1-50자로 필수 입력입니다. (행: ${index + 1})`);
            }

            if (r.optionTag.length > 50) {
                throw new Error(`옵션태그는 50자 이내로 입력해주세요. (행: ${index + 1})`);
            }

            if (r.salesPrice < 0 || r.salesPrice > 999999999) {
                throw new Error(`판매가격은 0-999999999 이내로 입력해주세요. (행: ${index + 1})`);
            }

            if (r.totalPurchasePrice < 0 || r.totalPurchasePrice > 999999999) {
                throw new Error(`매입가격은 0-999999999 이내로 입력해주세요. (행: ${index + 1})`);
            }

            if (r.releaseLocation.length > 50) {
                throw new Error(`출고지는 50자 이내로 입력해주세요. (행: ${index + 1})`);
            }

            if (r.status.length > 50) {
                throw new Error(`상태는 50자 이내로 입력해주세요. (행: ${index + 1})`);
            }

            if (r.memo.length > 200) {
                throw new Error(`메모는 200자 이내로 입력해주세요. (행: ${index + 1})`);
            }
        })
    }

    return {
        productOptions,
        onSetProductOptions,
        onPushNewProductOption,
        onPushNewProductOptionsWithNames,
        onConcatNewProductOptions,
        onDeleteProductOption,
        onChangeOptionValueOfName,
        onBatchChangeOptionTagsWithOptionName,
        onBatchChangeValueOfName,
        checkOptionValuesForamtValid
    }
}