import { useEffect, useState } from "react";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import CustomInput from "../../../../input/default/v1/CustomInput";
import { usePurchaseUnitPriceFormHook } from "../../hooks";
import { St } from "./FdPurchaseUnitPriceCalculator.styled";
import { MrBaseExchangeRateModal } from "../../../../MrBaseExchangeRateModal/v1";

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

const returnPriceValueWithExchangeRate = (value, mrBaseExchangeRateId, mrBaseExchangeRateList) => {
    let rValue = value / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, mrBaseExchangeRateId);
    return rValue;
}

export function FdPurchaseUnitPriceCalculator({
    selectedMrPurchaseModule,
    baseExchangeRateList,
    handleSubmitSavePurchaseUnitPriceForm,
    onRefetchMrBaseExchangeRateList
}) {
    const purchaseUnitPriceFormHook = usePurchaseUnitPriceFormHook();
    const [mrBaseExchangeRateModalOpen, setMrBaseExchangeRateModalOpen] = useState(false);
    const [editMberTargetName, setEditMberTargetName] = useState(null);

    useEffect(() => {
        if (!selectedMrPurchaseModule) {
            return;
        }
        purchaseUnitPriceFormHook.onInitializedSet(selectedMrPurchaseModule)
    }, [selectedMrPurchaseModule]);

    const toggleMrBaseExchangeRateModalOpen = (bool, name) => {
        if (bool && name) {
            setEditMberTargetName(name);
        } else {
            setEditMberTargetName(null);
        }

        setMrBaseExchangeRateModalOpen(bool);
    }

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
        const purchaseUnitPriceForm = purchaseUnitPriceFormHook?.purchaseUnitPriceForm;
        let form = {
            productUnitPrice: customNumberUtils.parseNumberToFloat({ value: purchaseUnitPriceForm?.productUnitPrice, defaultValue: 0 }),
            productUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(baseExchangeRateList, purchaseUnitPriceForm?.productUnitPriceMberId),
            totalProductQty: customNumberUtils.parseNumberToInt({ value: purchaseUnitPriceForm?.totalProductQty, defaultValue: 1, min: 1 }),
            localFreightCost: customNumberUtils.parseNumberToFloat({ value: purchaseUnitPriceForm?.localFreightCost, defaultValue: 0 }),
            localFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(baseExchangeRateList, purchaseUnitPriceForm?.localFreightCostMberId),
            extraCost: customNumberUtils.parseNumberToFloat({ value: purchaseUnitPriceForm?.extraCost, defaultValue: 0 }),
            extraCostMberId: customNumberUtils.returnBaseExchangeRateId(baseExchangeRateList, purchaseUnitPriceForm?.extraCostMberId),
            customsDutyRate: customNumberUtils.parseNumberToFloat({ value: purchaseUnitPriceForm?.customsDutyRate, defaultValue: 0 }),
            customsTaxRate: customNumberUtils.parseNumberToFloat({ value: purchaseUnitPriceForm?.customsTaxRate, defaultValue: 0 }),
            purchaseUnitPriceKRW: 0,
            purchaseUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(baseExchangeRateList, purchaseUnitPriceForm?.purchaseUnitPriceMberId)
        };

        function calculatePurchaseUnitPrice() {
            let productUnitPriceWithBaseExchangeRate = purchaseUnitPriceFormHook.returnValueWithBaseExchangeRate(form.productUnitPrice, form.productUnitPriceMberId, baseExchangeRateList);
            let totalProductQty = form.totalProductQty;
            let localFreightCostWithBaseExchangeRate = purchaseUnitPriceFormHook.returnValueWithBaseExchangeRate(form.localFreightCost, form.localFreightCostMberId, baseExchangeRateList);
            let extraCostWithBaseExchangeRate = purchaseUnitPriceFormHook.returnValueWithBaseExchangeRate(form.extraCost, form.extraCostMberId, baseExchangeRateList);
            let customsDutyRate = form.customsDutyRate;
            let customsTaxRate = form.customsTaxRate;

            let beforeCustomsSum = productUnitPriceWithBaseExchangeRate * totalProductQty + localFreightCostWithBaseExchangeRate + extraCostWithBaseExchangeRate;
            let afterCustomsSum = beforeCustomsSum + (beforeCustomsSum * customsDutyRate / 100) + (beforeCustomsSum * customsTaxRate / 100);
            let purchaseUnitPriceKRW = afterCustomsSum / (totalProductQty);

            return customNumberUtils.roundToDigit(purchaseUnitPriceKRW, 6);
        }

        form.purchaseUnitPriceKRW = calculatePurchaseUnitPrice();

        handleSubmitSavePurchaseUnitPriceForm(form);
    }

    const handleSelectMber = (mber) => {
        purchaseUnitPriceFormHook.onChangeValueOfName(editMberTargetName, mber?.id);
        toggleMrBaseExchangeRateModalOpen(false);
    }

    if (!selectedMrPurchaseModule) {
        return <div>매입정보 모듈을 먼저 선택해 주세요.</div>
    }

    const purchaseUnitPriceWithExchangeRate = customNumberUtils.roundToDigit(returnPriceValueWithExchangeRate(selectedMrPurchaseModule?.purchaseUnitPriceKRW, selectedMrPurchaseModule?.purchaseUnitPriceMberId, baseExchangeRateList), 6);

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.NumberInputWrapper>
                        <label>매입단가</label>
                        <div className='flexible'>
                            <CustomInput
                                type='text'
                                className='result-input'
                                name={'purchaseUnitPrice'}
                                value={customNumberUtils.numberWithCommas2(purchaseUnitPriceWithExchangeRate) || ''}
                                placeholder={'결과값이 표시됩니다.'}
                                readOnly
                            ></CustomInput>
                            <BaseExchangeRateButton
                                baseExchangeRateList={baseExchangeRateList}
                                currentMberId={purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.purchaseUnitPriceMberId}
                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'purchaseUnitPriceMberId')}
                            />
                        </div>
                    </St.NumberInputWrapper>
                    <CustomBlockButton
                        type='button'
                        className='calculate-button'
                        onClick={() => handleSubmitCalculateAndSave()}
                    >
                        계산 및 저장
                    </CustomBlockButton>
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
                                currentMberId={purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.productUnitPriceMberId}
                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'productUnitPriceMberId')}
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
                                currentMberId={purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.localFreightCostMberId}
                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'localFreightCostMberId')}
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
                                currentMberId={purchaseUnitPriceFormHook?.purchaseUnitPriceForm?.extraCostMberId}
                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'extraCostMberId')}
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
                </St.Wrapper>
            </St.Container>

            {mrBaseExchangeRateModalOpen &&
                <MrBaseExchangeRateModal
                    open={mrBaseExchangeRateModalOpen}
                    onClose={() => toggleMrBaseExchangeRateModalOpen(false)}
                    onSelect={handleSelectMber}
                    onCreateCompleted={onRefetchMrBaseExchangeRateList}
                    onDeleteCompleted={onRefetchMrBaseExchangeRateList}
                    onUpdateCompleted={onRefetchMrBaseExchangeRateList}
                />
            }
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
    currentMberId,
    onClick
}) {
    const baseExchangeRate = baseExchangeRateList?.find(r => r.id === currentMberId);
    if (baseExchangeRate) {
        return (
            <CustomBlockButton className='active-button' onClick={onClick}>{baseExchangeRate?.name}</CustomBlockButton>
        );
    } else {
        return (
            <CustomBlockButton className='notset-button' onClick={onClick}>미지정</CustomBlockButton>
        );
    }
}

function QuantityButton() {
    return (
        <button className='readOnly-button'>PCS</button>
    );
}

function RateButton() {
    return <button className='readOnly-button'>%</button>;
}