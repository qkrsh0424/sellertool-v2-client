import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import CustomInput from "../../../../input/default/v1/CustomInput";
import { usePurchaseUnitPriceFormHook } from "../../hooks/usePurchaseUnitPriceFormHook";
import { St } from "./FdPurchaseUnitPriceCalculator.styled";

const customNumberUtils = CustomNumberUtils();

const returnPriceValueElseThrow = (price, errorMessage) => {
    if (!price) {
        return 0;
    }

    if (price < 0 || price > 99999999999) { // 0.9e11
        throw new Error(errorMessage);
    }

    return price;
}

const returnRateValueElseThrow = (value, errorMessage) => {
    if (!value) {
        return 0;
    }

    if (value < 0 || value > 100) {
        throw new Error(errorMessage);
    }

    return value;
}

export function FdPurchaseUnitPriceCalculator({
    baseExchangeRateList
}) {
    const purchaseUnitPriceFormHook = usePurchaseUnitPriceFormHook({
        baseExchangeRateList: baseExchangeRateList
    });

    const handleChangePriceValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (!value) {
            purchaseUnitPriceFormHook.onChangeValueOfName(name, '');
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnPriceValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            purchaseUnitPriceFormHook.onChangeValueOfName(name, value || '');
        }
    }

    const handleChangeRateValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            purchaseUnitPriceFormHook.onChangeValueOfName(name, value || '');
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnRateValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            purchaseUnitPriceFormHook.onChangeValueOfName(name, value || '');
        }
    }

    const handleChangeQuantityValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            purchaseUnitPriceFormHook.onChangeValueOfName(name, value || '');
            return;
        }

        value = value.replaceAll(",", "");
        if (customNumberUtils.hasPrefixZero(value)) {
            return;
        }

        if ((/^[0-9]{0,11}$/).test(value)) {
            purchaseUnitPriceFormHook.onChangeValueOfName(name, value || '');
        }
    }

    const handleSubmitCalculateAndSave = () => {
        let productUnitPriceWithBaseExchangeRate = purchaseUnitPriceFormHook.returnProductUnitPriceWithBaseExchangeRate();
        let totalProductQty = purchaseUnitPriceFormHook.returnTotalProductQty();
        let localFreightCostWithBaseExchangeRate = purchaseUnitPriceFormHook.returnLocalFreightCostWithBaseExchangeRate();
        let extraCostWithBaseExchangeRate = purchaseUnitPriceFormHook.returnExtraCostWithBaseExchangeRate();
        let customsDutyRate = purchaseUnitPriceFormHook.returnCustomsDutyRate();
        let customsTaxRate = purchaseUnitPriceFormHook.returnCustomsTaxRate();

        let beforeCustomsSum = productUnitPriceWithBaseExchangeRate * totalProductQty + localFreightCostWithBaseExchangeRate + extraCostWithBaseExchangeRate;
        let afterCustomsSum = beforeCustomsSum + beforeCustomsSum * customsDutyRate + beforeCustomsSum * customsTaxRate;
        let purchaseUnitPrice = afterCustomsSum / totalProductQty;

        console.log(
            productUnitPriceWithBaseExchangeRate,
            totalProductQty,
            localFreightCostWithBaseExchangeRate,
            extraCostWithBaseExchangeRate,
            customsDutyRate,
            customsTaxRate,
            purchaseUnitPrice
        );
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.NumberInputWrapper>
                        <label>제품단가</label>
                        <div className='flexible'>
                            <CustomInput
                                type='text'
                                name={'productUnitPrice'}
                                value={customNumberUtils.numberWithCommas2(purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.productUnitPrice) || ''}
                                onChange={(e) => handleChangePriceValue(e)}
                                inputmode='decimal'
                                placeholder={0}
                            ></CustomInput>
                            <BaseExchangeRateButton
                                baseExchangeRateList={baseExchangeRateList}
                                currentBaseExchangeRateId={purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.productUnitPriceBaseExchangeRateId}
                            />
                        </div>
                    </St.NumberInputWrapper>
                    <St.NumberInputWrapper>
                        <label>제품 총 수량</label>
                        <div className='flexible'>
                            <CustomInput
                                type='text'
                                name={'totalProductQty'}
                                value={customNumberUtils.numberWithCommas2(purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.totalProductQty) || ''}
                                onChange={(e) => handleChangeQuantityValue(e)}
                                inputmode='decimal'
                                placeholder={1}
                            ></CustomInput>
                            <QuantityButton />
                        </div>
                    </St.NumberInputWrapper>
                    <St.NumberInputWrapper>
                        <label>현지 운임비</label>
                        <div className='flexible'>
                            <CustomInput
                                type='text'
                                name={'localFreightCost'}
                                value={customNumberUtils.numberWithCommas2(purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.localFreightCost) || ''}
                                onChange={(e) => handleChangePriceValue(e)}
                                inputmode='decimal'
                                placeholder={0}
                            ></CustomInput>
                            <BaseExchangeRateButton
                                baseExchangeRateList={baseExchangeRateList}
                                currentBaseExchangeRateId={purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.localFreightCostBaseExchangeRateId}
                            />
                        </div>
                    </St.NumberInputWrapper>
                    <St.NumberInputWrapper>
                        <label>기타비용</label>
                        <div className='flexible'>
                            <CustomInput
                                type='text'
                                name={'extraCost'}
                                value={customNumberUtils.numberWithCommas2(purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.extraCost) || ''}
                                onChange={(e) => handleChangePriceValue(e)}
                                inputmode='decimal'
                                placeholder={0}
                            ></CustomInput>
                            <BaseExchangeRateButton
                                baseExchangeRateList={baseExchangeRateList}
                                currentBaseExchangeRateId={purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.extraCostBaseExchangeRateId}
                            />
                        </div>
                    </St.NumberInputWrapper>
                    <St.NumberInputWrapper>
                        <label>관세</label>
                        <div className='flexible'>
                            <CustomInput
                                type='text'
                                name={'customsDutyRate'}
                                value={customNumberUtils.numberWithCommas2(purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.customsDutyRate) || ''}
                                onChange={(e) => handleChangeRateValue(e)}
                                inputmode='decimal'
                                placeholder={0}
                            ></CustomInput>
                            <RateButton />
                        </div>
                    </St.NumberInputWrapper>
                    <St.NumberInputWrapper>
                        <label>관부가세</label>
                        <div className='flexible'>
                            <CustomInput
                                type='text'
                                name={'customsTaxRate'}
                                value={customNumberUtils.numberWithCommas2(purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.customsTaxRate) || ''}
                                onChange={(e) => handleChangeRateValue(e)}
                                inputmode='decimal'
                                placeholder={0}
                            ></CustomInput>
                            <RateButton />
                        </div>
                    </St.NumberInputWrapper>
                    <CustomBlockButton
                        type='button'
                        className='calculate-button'
                        onClick={() => handleSubmitCalculateAndSave()}
                    >
                        계산 및 저장
                    </CustomBlockButton>
                </St.Wrapper>
            </St.Container>
        </>
    );
}

/**
 * KRW : "75a58be7-37f9-11ee-8d3c-06fe28321f8c"
 * USD : "9e53a616-37f9-11ee-8d3c-06fe28321f8c"
 * CNY : "9e58ac03-37f9-11ee-8d3c-06fe28321f8c"
 * @returns 
 */
function BaseExchangeRateButton({
    baseExchangeRateList,
    currentBaseExchangeRateId
}) {
    const baseExchangeRate = baseExchangeRateList?.find(r => r.id === currentBaseExchangeRateId);
    return (
        <CustomBlockButton className='active-button'>{baseExchangeRate?.name || 'NN'}</CustomBlockButton>
    );
}

function QuantityButton() {
    return (
        <button className='readOnly-button'>PCS</button>
    );
}

function RateButton() {
    return <button className='readOnly-button'>%</button>;
}