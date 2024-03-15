import { useState } from "react";

export function usePurchasingApplicationHook(props) {
    const [createPurchasingApplicationForm, setCreatePurchasingApplicationForm] = useState({
        name: '',
        contact: '',
        businessName: '',
        salesMethod: '',
        purchasingApplicationOptionList: [
            {
                name: '옵션옵션1',
                purchaseQuantity: '0'
            }
        ]
    })

    const onSetCreatePurchasingApplicationForm = (value) => {
        setCreatePurchasingApplicationForm(value);
    }

    return {
        createPurchasingApplicationForm,
        onSetCreatePurchasingApplicationForm
    }
}