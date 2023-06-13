import _ from "lodash";
import { useState } from "react";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useSelectedProductOptionsAndInventoryHook() {
    const [selectedProductOptionsAndInventory, setSelectedProductOptionsAndInventory] = useState([]);

    const onSelectProductOptionAndUpdateInventory = (option, inventory) => {
        let data = selectedProductOptionsAndInventory?.find(r => r.id === option.id);

        if (data) {
            setSelectedProductOptionsAndInventory(selectedProductOptionsAndInventory?.filter(r => r.id !== data.id));
        } else {
            try {
                if (selectedProductOptionsAndInventory?.length >= 400) {
                    throw new Error('한번에 선택 가능한 최대 옵션의 개수는 400개 입니다.');
                }
            } catch (err) {
                customToast.error(err.message, {
                    ...defaultOptions,
                    toastId: err.message
                });
                return;
            }

            let optionAndInventory = {
                ...option,
                inventory: {...inventory}
            }
            setSelectedProductOptionsAndInventory([...selectedProductOptionsAndInventory, optionAndInventory]);
        }
    }

    const onSelectAllProductOptionsAndUpdateInventory = (productOptions, inventories) => {
        let originIds = selectedProductOptionsAndInventory?.map(r => r.id);
        let newProductOptions = _.cloneDeep(selectedProductOptionsAndInventory);

        try {
            productOptions?.forEach(option => {
                if (originIds?.includes(option.id)) {
                    return;
                }
                if (newProductOptions?.length >= 400) {
                    throw new Error('한번에 선택 가능한 최대 옵션의 개수는 400개 입니다.');
                }

                let inventory = inventories.filter(r => r.productOptionId === option.id)[0];
                let data = {
                    ...option,
                    inventory: {...inventory}
                }
                newProductOptions.push(data);
            });
        } catch (err) {
            customToast.error(err.message, {
                ...defaultOptions,
                toastId: err.message
            });
            return;
        } finally {
            setSelectedProductOptionsAndInventory(newProductOptions);
        }
    }

    const onSelectClearAllProductOptionsAndUpdateInventoryInPage = (productOptions) => {
        setSelectedProductOptionsAndInventory(
            selectedProductOptionsAndInventory?.filter(selected => !productOptions?.some(po => po.id === selected.id))
        );
    }

    const onSelectClearAllProductOptionsAndUpdateInventory = () => {
        setSelectedProductOptionsAndInventory([]);
    }

    return {
        selectedProductOptionsAndInventory,
        onSelectProductOptionAndUpdateInventory,
        onSelectAllProductOptionsAndUpdateInventory,
        onSelectClearAllProductOptionsAndUpdateInventoryInPage,
        onSelectClearAllProductOptionsAndUpdateInventory
    }
}