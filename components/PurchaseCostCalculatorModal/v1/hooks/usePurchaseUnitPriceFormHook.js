import { useState } from "react";
import { CustomNumberUtils } from "../../../../utils/CustomNumberUtils";

const customNumberUtils = CustomNumberUtils();

export function usePurchaseUnitPriceFormHook({
    baseExchangeRateList
}) {
    const [purchaseUnitPriceForm, setPurchaseUnitPriceForm] = useState({
        productUnitPrice: '',
        productUnitPriceBaseExchangeRateId: "9e53a616-37f9-11ee-8d3c-06fe28321f8c",
        totalProductQty: '',
        localFreightCost: '',
        localFreightCostBaseExchangeRateId: "9e53a616-37f9-11ee-8d3c-06fe28321f8c",
        extraCost: '',
        extraCostBaseExchangeRateId: 2,
        customsDutyRate: '',
        customsTaxRate: '',
        purchaseUnitPrice: '',
        purchaseUnitPriceBaseExchangeRateId: 1
    });

    const onSetPurchaseCostForm = (value) => {
        setPurchaseUnitPriceForm(value)
    }

    const onChangeValueOfName = (name, value) => {
        setPurchaseUnitPriceForm({
            ...purchaseUnitPriceForm,
            [name]: value
        })
    }

    const returnProductUnitPriceWithBaseExchangeRate = () => {
        console.log(baseExchangeRateList);
        let value = Number.parseFloat(purchaseUnitPriceForm?.productUnitPrice || 0);
        let baseExchangeRateValue = customNumberUtils.returnExchangeRateValue(baseExchangeRateList, purchaseUnitPriceForm?.productUnitPriceBaseExchangeRateId);
        value = value * baseExchangeRateValue;
        return value;
    }

    const returnTotalProductQty = () => {
        let value = Number.parseInt(purchaseUnitPriceForm?.totalProductQty || 1);
        value = value <= 0 ? 1 : value;
        return value;
    }

    const returnLocalFreightCostWithBaseExchangeRate = () => {
        let value = Number.parseFloat(purchaseUnitPriceForm?.localFreightCost || 0);
        let baseExchangeRateValue = customNumberUtils.returnExchangeRateValue(baseExchangeRateList, purchaseUnitPriceForm?.localFreightCostBaseExchangeRateId);
        value = value * baseExchangeRateValue;
        return value;
    }

    const returnExtraCostWithBaseExchangeRate = () => {
        let value = Number.parseFloat(purchaseUnitPriceForm?.extraCost || 0);
        let baseExchangeRateValue = customNumberUtils.returnExchangeRateValue(baseExchangeRateList, purchaseUnitPriceForm?.extraCostBaseExchangeRateId);
        value = value * baseExchangeRateValue;
        return value;
    }

    const returnCustomsDutyRate = () => {
        let value = Number.parseFloat(purchaseUnitPriceForm?.customsDutyRate || 0);
        return value;
    }

    const returnCustomsTaxRate = () => {
        let value = Number.parseFloat(purchaseUnitPriceForm?.customsTaxRate || 0);
        return value;
    }
    return {
        purchaseUnitPriceForm,
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