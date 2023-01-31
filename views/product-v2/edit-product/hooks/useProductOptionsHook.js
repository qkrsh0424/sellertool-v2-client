import _ from "lodash";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { getRemovedPrefixZero } from "../../../../utils/numberFormatUtils";

export default function useProductOptionsHook({
    originProduct
}) {
    const [productOptions, setProductOptions] = useState([]);

    useEffect(() => {
        if (!originProduct?.productOptions) {
            return;
        }
        setProductOptions(_.cloneDeep(originProduct?.productOptions));
    }, [originProduct?.productOptions]);

    const onActionPushProductOption = () => {
        let data = {
            id: uuidv4(),
            code: '',
            name: '',
            optionTag: '',
            salesPrice: '0',
            totalPurchasePrice: '0',
            status: '',
            memo: '',
            releaseLocation: ''
        }

        setProductOptions([
            ...productOptions,
            data
        ])
    }

    const onActionPushProductOptionsWithNames = (names) => {
        let data = names.map(name => {
            return {
                id: uuidv4(),
                code:'',
                name: name,
                optionTag: '',
                salesPrice: '0',
                totalPurchasePrice: '0',
                status: '',
                memo: '',
                releaseLocation: '',
            }
        })
        setProductOptions([...data]);
    }

    const onActionDeleteProductOption = (id) => {
        let newData = productOptions?.filter(r => r.id !== id);

        setProductOptions([
            ...newData
        ])
    }

    const onChangeOptionValueOfName = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;

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

    const onChangeOptionNumberValueOfName = (e, id) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            setProductOptions(productOptions?.map(r => {
                if (r.id === id) {
                    return {
                        ...r,
                        [name]: ''
                    }
                } else {
                    return { ...r }
                }
            }))
            return;
        }

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,9}$/)) {
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

    }

    const onSetOptionTagsWitchOptionNames = () => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                optionTag: r.name
            }
        }))
    }

    const onSetOptionTagsWithInput = (input) => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                optionTag: input
            }
        }))
    }

    const onSetSalesPricesWithInput = (input) => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                salesPrice: input
            }
        }))
    }

    const onSetTotalPurchasePricesWithInput = (input) => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                totalPurchasePrice: input
            }
        }))
    }

    const onSetReleaseLocationsWithInput = (input) => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                releaseLocation: input
            }
        }))
    }

    const onSetStatusesWithInput = (input) => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                status: input
            }
        }))
    }

    const onSetMemosWithInput = (input) => {
        setProductOptions(productOptions?.map(r => {
            return {
                ...r,
                memo: input
            }
        }))
    }

    const getSubmitValue = () => {
        let data = productOptions.map(r => {
            return {
                ...r,
                name: r.name.trim(),
                optionTag: r.optionTag.trim(),
                salesPrice: !r.salesPrice ? '0' : new String(r.salesPrice).trim(),
                totalPurchasePrice: !r.totalPurchasePrice ? '0' : new String(r.totalPurchasePrice).trim(),
                status: r.status.trim(),
                memo: r.memo.trim(),
                releaseLocation: r.releaseLocation.trim(),
            }
        })
        return data;
    }

    const checkProductOptionsFormatValid = () => {
        try {
            checkCnt();
            checkOptionValuesForamtValid();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    const checkCnt = () => {
        if (productOptions.length <= 0) {
            throw new Error('옵션은 최소 1개 이상 등록해야 합니다.');
        }

        if (productOptions.length > 500) {
            throw new Error('옵션은 최대 500개 까지만 등록 가능합니다.');
        }
    }

    const checkOptionValuesForamtValid = () => {
        productOptions.forEach((r, index) => {
            let name = r.name.trim();
            if (name.length < 1 || name.length > 50) {
                throw new Error(`옵션명은 1-50자로 필수 입력입니다. (행: ${index + 1})`);
            }

            if (r.optionTag.length > 50) {
                throw new Error(`옵션태그는 50자 이내로 입력해주세요. (행: ${index + 1})`);
            }

            if (r.salesPrice < 0 || r.salesPrice > 999999998) {
                throw new Error(`판매가격은 0-999999999 이내로 입력해주세요. (행: ${index + 1})`);
            }

            if (r.totalPurchasePrice < 0 || r.totalPurchasePrice > 999999999) {
                throw new Error(`총 구매가격은 0-999999999 이내로 입력해주세요. (행: ${index + 1})`);
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
        onActionPushProductOption,
        onActionPushProductOptionsWithNames,
        onActionDeleteProductOption,
        onChangeOptionValueOfName,
        onChangeOptionNumberValueOfName,
        onSetOptionTagsWitchOptionNames,
        onSetOptionTagsWithInput,
        onSetSalesPricesWithInput,
        onSetTotalPurchasePricesWithInput,
        onSetReleaseLocationsWithInput,
        onSetStatusesWithInput,
        onSetMemosWithInput,
        getSubmitValue,
        checkProductOptionsFormatValid
    }
}