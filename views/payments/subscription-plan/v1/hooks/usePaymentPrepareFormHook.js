import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const getInitPaymentPrepareForm = () => {
    return {
        id: uuidv4(),
        payServiceType: 'SUBSCRIPTION_PLAN',
        pg: 'html5_inicis',
        payMethod: 'card',
        buyerName: '',
        buyerPhoneNumber: '',
        buyerEmail: '',
        buyerAddress: '',
        buyerPostcode: '',
        serviceTermsYn: 'n',
        appliedWorkspaceId: '',
        refSubscriptionPlanId: ''
    }
}
export function usePaymentPrepareFormHook(props) {
    const [paymentPrepareForm, setPaymentPrepareForm] = useState(getInitPaymentPrepareForm());

    const onSetPaymentPrepareForm = (value) => {
        setPaymentPrepareForm(value);
    }

    const onChangeValueOfName = (name, value) => {
        onSetPaymentPrepareForm({
            ...paymentPrepareForm,
            [name]: value
        })
    }

    return {
        paymentPrepareForm,
        onSetPaymentPrepareForm,
        onChangeValueOfName
    }
}