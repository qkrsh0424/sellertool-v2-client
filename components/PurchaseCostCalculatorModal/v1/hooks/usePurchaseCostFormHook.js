import { useState } from "react";
import { CustomNumberUtils } from "../../../../utils/CustomNumberUtils";

const customNumberUtils = CustomNumberUtils();

export function usePurchaseCostFormHook({
    BASE_EXCHANGE_RATE_LIST
}) {
    const [purchaseCostForm, setPurchaseCostForm] = useState({
        productUnitPrice: '',
        productUnitPriceBaseExchangeRateId: 2,
        totalProductQty: '',
        localFreightCost: '',
        localFreightCostBaseExchangeRateId: 2,
        extraCost: '',
        extraCostBaseExchangeRateId: 2,
        customsDutyRate: '',
        customsTaxRate: '',
        purchaseUnitPrice: '',
        purchaseUnitPriceBaseExchangeRateId: 1
    });

    const onSetPurchaseCostForm = (value) => {
        setPurchaseCostForm(value)
    }

    const onChangeValueOfName = (name, value) => {
        setPurchaseCostForm({
            ...purchaseCostForm,
            [name]: value
        })
    }

    const returnProductUnitPriceWithBaseExchangeRate = () => {
        let value = Number.parseFloat(purchaseCostForm?.productUnitPrice || 0);
        let baseExchangeRateValue = BASE_EXCHANGE_RATE_LIST?.find(r => r.id === purchaseCostForm?.productUnitPriceBaseExchangeRateId)?.value;
        value = value * baseExchangeRateValue;
        return value;
    }

    const returnTotalProductQty = () => {
        let value = Number.parseInt(purchaseCostForm?.totalProductQty || 1);
        value = value <= 0 ? 1 : value;
        return value;
    }

    const returnLocalFreightCostWithBaseExchangeRate = () => {
        let value = Number.parseFloat(purchaseCostForm?.localFreightCost || 0);
        let baseExchangeRateValue = BASE_EXCHANGE_RATE_LIST?.find(r => r.id === purchaseCostForm?.localFreightCostBaseExchangeRateId)?.value;
        value = value * baseExchangeRateValue;
        return value;
    }

    const returnExtraCostWithBaseExchangeRate = () => {
        let value = Number.parseFloat(purchaseCostForm?.extraCost || 0);
        let baseExchangeRateValue = BASE_EXCHANGE_RATE_LIST?.find(r => r.id === purchaseCostForm?.extraCostBaseExchangeRateId)?.value;
        value = value * baseExchangeRateValue;
        return value;
    }

    const returnCustomsDutyRate = () => {
        let value = Number.parseFloat(purchaseCostForm?.customsDutyRate || 0);
        return value;
    }

    const returnCustomsTaxRate = () => {
        let value = Number.parseFloat(purchaseCostForm?.customsTaxRate || 0);
        return value;
    }
    return {
        purchaseCostForm,
        onSetPurchaseCostForm,
        onChangeValueOfName,
        returnProductUnitPriceWithBaseExchangeRate,
        returnTotalProductQty,
        returnLocalFreightCostWithBaseExchangeRate,
        returnExtraCostWithBaseExchangeRate,
        returnCustomsDutyRate,
        returnCustomsTaxRate
    }
}