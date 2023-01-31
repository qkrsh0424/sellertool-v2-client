import _ from "lodash";
import { useEffect, useState } from "react";

export default function useSelectedProductOptions() {
    const [selectedProductOptions, setSelectedProductOptions] = useState([]);

    const onSelectProductOption = (option) => {
        let data = selectedProductOptions?.find(r => r.id === option.id);

        if (data) {
            setSelectedProductOptions(selectedProductOptions?.filter(r => r.id !== data.id));
        } else {
            try {
                if (selectedProductOptions?.length >= 400) {
                    throw new Error('한번에 선택 가능한 최대 옵션의 개수는 400개 입니다.');
                }
            } catch (err) {
                alert(err.message);
                return;
            }

            setSelectedProductOptions([...selectedProductOptions, option]);
        }
    }

    const onSelectAllProductOptions = (productOptions) => {
        let originIds = selectedProductOptions?.map(r => r.id);
        let newProductOptions = _.cloneDeep(selectedProductOptions);

        try {

            productOptions?.forEach(option => {
                if (originIds?.includes(option.id)) {
                    return;
                }
                if (newProductOptions?.length >= 400) {
                    throw new Error('한번에 선택 가능한 최대 옵션의 개수는 400개 입니다.');
                }
                newProductOptions.push(option);
            });
        } catch (err) {
            alert(err.message);
            return;
        } finally {
            setSelectedProductOptions(newProductOptions);
        }

    }

    const onSelectClearAllProductOptionsInPage = (productOptions) => {
        setSelectedProductOptions(
            selectedProductOptions?.filter(selected => !productOptions?.some(po => po.id === selected.id))
        );
    }

    const onSelectClearAllProductOptions = () => {
        setSelectedProductOptions([]);
    }

    return {
        selectedProductOptions,
        onSelectProductOption,
        onSelectAllProductOptions,
        onSelectClearAllProductOptionsInPage,
        onSelectClearAllProductOptions
    }
}