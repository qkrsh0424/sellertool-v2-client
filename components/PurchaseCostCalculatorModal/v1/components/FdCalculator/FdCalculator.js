import { useEffect, useState } from "react";
import { St } from "./FdCalculator.styeld";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import CustomInput from "../../../../input/default/v1/CustomInput";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import { CalculateUtils } from "../../utils/CalculateUtils";
import { InitializerUtils } from "../../utils/InitializerUtils";
import { MrBaseExchangeRateModal } from "../../../../MrBaseExchangeRateModal/v1";

const customNumberUtils = CustomNumberUtils();
const calculateUtils = CalculateUtils();
const initializerUtils = InitializerUtils();

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

export function FdCalculator({
    mrBaseExchangeRateList,
    selectedMrPurchaseModule,
    handleSubmitSavePurchaseUnitPriceForm,
    onRefetchMrBaseExchangeRateList
}) {
    const [formValues, setFormValues] = useState(null);
    const [mrBaseExchangeRateModalOpen, setMrBaseExchangeRateModalOpen] = useState(false);
    const [editMberTargetName, setEditMberTargetName] = useState(null);

    useEffect(() => {
        if (!selectedMrPurchaseModule) {
            return;
        }

        setFormValues(initializerUtils.initFdCalculatorFormValues(selectedMrPurchaseModule));
    }, [selectedMrPurchaseModule]);

    const toggleMrBaseExchangeRateModalOpen = (bool, name) => {
        if (bool && name) {
            setEditMberTargetName(name);
        } else {
            setEditMberTargetName(null);
        }

        setMrBaseExchangeRateModalOpen(bool);
    }

    const handleChangePurchaseType = (purchaseType) => {
        setFormValues({
            ...formValues,
            purchaseType: purchaseType
        })
    }

    const handleChangePriceValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (!value) {
            setFormValues({
                ...formValues,
                [name]: ''
            });
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnPriceValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            setFormValues({
                ...formValues,
                [name]: value || ''
            });
        }
    }

    const handleChangeRateValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            setFormValues({
                ...formValues,
                [name]: value || ''
            });
            return;
        }

        value = value.replaceAll(",", "");

        try {
            returnRateValueElseThrow(value);
        } catch (err) {
            return;
        }

        if (customNumberUtils.isNumberValueWithDecimalPoint(value, 6)) {
            setFormValues({
                ...formValues,
                [name]: value || ''
            });
        }
    }

    const handleChangeQuantityValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            setFormValues({
                ...formValues,
                [name]: value || ''
            });
            return;
        }

        value = value.replaceAll(",", "");
        if (customNumberUtils.hasPrefixZero(value)) {
            return;
        }

        if ((/^[0-9]{0,11}$/).test(value)) {
            setFormValues({
                ...formValues,
                [name]: value || ''
            });
        }
    }

    const handleSelectMber = (mber) => {
        setFormValues({
            ...formValues,
            [editMberTargetName]: mber?.id
        });
        toggleMrBaseExchangeRateModalOpen(false);
    }

    const handleSubmitCalculateAndSave = () => {
        let form = null;
        if (formValues?.purchaseType === 'DOMESTIC') {
            form = {
                purchaseType: formValues?.purchaseType,
                productUnitPrice: customNumberUtils.parseNumberToFloat({ value: formValues?.productUnitPrice, defaultValue: 0 }),
                productUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.productUnitPriceMberId),
                totalProductQty: customNumberUtils.parseNumberToInt({ value: formValues?.totalProductQty, defaultValue: 1, min: 1 }),
                localFreightCost: 0,
                localFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, null),
                extraCost: customNumberUtils.parseNumberToFloat({ value: formValues?.extraCost, defaultValue: 0 }),
                extraCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.extraCostMberId),
                customsDutyRate: 0,
                customsTaxRate: 0,

                totalOceanFreightCharge: customNumberUtils.parseNumberToFloat({ value: formValues?.totalOceanFreightCharge, defaultValue: 0 }),
                totalOceanFreightChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.totalOceanFreightChargeMberId),
                totalCBM: 0,
                productUnitCBM: 0,
                destinationFreightCost: 0,
                destinationFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, null),
                coCharge: 0,
                coChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, null),

                purchaseUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitPriceMberId),
                purchaseUnitFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitFreightCostMberId),
            }
        } else {
            form = {
                purchaseType: formValues?.purchaseType,
                productUnitPrice: customNumberUtils.parseNumberToFloat({ value: formValues?.productUnitPrice, defaultValue: 0 }),
                productUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.productUnitPriceMberId),
                totalProductQty: customNumberUtils.parseNumberToInt({ value: formValues?.totalProductQty, defaultValue: 1, min: 1 }),
                localFreightCost: customNumberUtils.parseNumberToFloat({ value: formValues?.localFreightCost, defaultValue: 0 }),
                localFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.localFreightCostMberId),
                extraCost: customNumberUtils.parseNumberToFloat({ value: formValues?.extraCost, defaultValue: 0 }),
                extraCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.extraCostMberId),
                customsDutyRate: customNumberUtils.parseNumberToFloat({ value: formValues?.customsDutyRate, defaultValue: 0 }),
                customsTaxRate: customNumberUtils.parseNumberToFloat({ value: formValues?.customsTaxRate, defaultValue: 0 }),

                totalOceanFreightCharge: customNumberUtils.parseNumberToFloat({ value: formValues?.totalOceanFreightCharge, defaultValue: 0 }),
                totalOceanFreightChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.totalOceanFreightChargeMberId),
                totalCBM: customNumberUtils.parseNumberToFloat({ value: formValues?.totalCBM, defaultValue: 0 }),
                productUnitCBM: customNumberUtils.parseNumberToFloat({ value: formValues?.productUnitCBM, defaultValue: 0 }),
                destinationFreightCost: customNumberUtils.parseNumberToFloat({ value: formValues?.destinationFreightCost, defaultValue: 0 }),
                destinationFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.destinationFreightCostMberId),
                coCharge: customNumberUtils.parseNumberToFloat({ value: formValues?.coCharge, defaultValue: 0 }),
                coChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.coChargeMberId),

                purchaseUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitPriceMberId),
                purchaseUnitFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitFreightCostMberId),
            };

            if (form?.totalCBM < form?.totalProductQty * form?.productUnitCBM) {
                alert(`총 선적 CBM이 총 제품 CBM 보다 작을 수 없습니다.\n총 선적 CBM : ${form?.totalCBM}CBM\n총 제품 CBM : ${form?.totalProductQty * form?.productUnitCBM}CBM`)
                return;
            }
        }


        handleSubmitSavePurchaseUnitPriceForm(form);
    }

    const purchaseUnitPriceWithExchangeRate = customNumberUtils.roundToDigit(calculateUtils.getPurchaseUnitPriceKRW(selectedMrPurchaseModule, mrBaseExchangeRateList) / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, selectedMrPurchaseModule?.purchaseUnitPriceMberId), 6);
    const purchaseUnitFreightCostWithExchangeRate = customNumberUtils.roundToDigit(calculateUtils.getPurchaseUnitFreightCostKRW(selectedMrPurchaseModule, mrBaseExchangeRateList) / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, selectedMrPurchaseModule?.purchaseUnitFreightCostMberId), 6);

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.ResultWrapper>
                        <St.NumberInputWrapper>
                            <label>매입단가</label>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    className='result-input'
                                    name={'purchaseUnitPrice'}
                                    value={customNumberUtils.numberWithCommas2(purchaseUnitPriceWithExchangeRate) || '0'}
                                    placeholder={'결과값이 표시됩니다.'}
                                    readOnly
                                ></CustomInput>
                                <BaseExchangeRateButton
                                    mrBaseExchangeRateList={mrBaseExchangeRateList}
                                    currentMberId={formValues?.purchaseUnitPriceMberId}
                                    onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'purchaseUnitPriceMberId')}
                                />
                            </div>
                        </St.NumberInputWrapper>
                        <St.NumberInputWrapper>
                            <label>매입운임비(개당)</label>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    className='result-input'
                                    name={'purchaseUnitFreightCost'}
                                    value={customNumberUtils.numberWithCommas2(purchaseUnitFreightCostWithExchangeRate) || '0'}
                                    placeholder={'결과값이 표시됩니다.'}
                                    readOnly
                                ></CustomInput>
                                <BaseExchangeRateButton
                                    mrBaseExchangeRateList={mrBaseExchangeRateList}
                                    currentMberId={formValues?.purchaseUnitFreightCostMberId}
                                    onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'purchaseUnitFreightCostMberId')}
                                />
                            </div>
                        </St.NumberInputWrapper>
                        <CustomBlockButton
                            type='button'
                            className='export-button'
                            onClick={() => handleSubmitCalculateAndSave()}
                        >
                            결과 내보내기
                        </CustomBlockButton>
                    </St.ResultWrapper>
                    <St.FormWrapper>
                        <div className='purchaseType-wrapper'>
                            <CustomBlockButton
                                type='button'
                                className={`buttonEl ${formValues?.purchaseType === 'DOMESTIC' ? 'buttonEl-isActive' : ''}`}
                                onClick={() => handleChangePurchaseType('DOMESTIC')}
                            >
                                국내매입
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className={`buttonEl ${formValues?.purchaseType === 'OVERSEAS' ? 'buttonEl-isActive' : ''}`}
                                onClick={() => handleChangePurchaseType('OVERSEAS')}
                            >
                                해외매입
                            </CustomBlockButton>
                        </div>
                        <div className='partition-group'>
                            <div className='partition'>
                                <St.NumberInputWrapper>
                                    <label>제품 구매 단가 (필수)</label>
                                    <div className='flexible'>
                                        <CustomInput
                                            type='text'
                                            name={'productUnitPrice'}
                                            value={customNumberUtils.numberWithCommas2(formValues?.productUnitPrice) || ''}
                                            onChange={(e) => handleChangePriceValue(e)}
                                            inputmode='decimal'
                                            placeholder={0}
                                        ></CustomInput>
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={formValues?.productUnitPriceMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'productUnitPriceMberId')}
                                        />
                                    </div>
                                </St.NumberInputWrapper>
                                <St.NumberInputWrapper>
                                    <label>제품 총 구매 수량</label>
                                    <div className='flexible'>
                                        <CustomInput
                                            type='text'
                                            name={'totalProductQty'}
                                            value={customNumberUtils.numberWithCommas2(formValues?.totalProductQty) || ''}
                                            onChange={(e) => handleChangeQuantityValue(e)}
                                            inputmode='decimal'
                                            placeholder={1}
                                        ></CustomInput>
                                        <QuantityButton />
                                    </div>
                                </St.NumberInputWrapper>
                                {formValues?.purchaseType === 'OVERSEAS' &&
                                    <St.NumberInputWrapper>
                                        <label>출발지 운임비</label>
                                        <div className='flexible'>
                                            <CustomInput
                                                type='text'
                                                name={'localFreightCost'}
                                                value={customNumberUtils.numberWithCommas2(formValues?.localFreightCost) || ''}
                                                onChange={(e) => handleChangePriceValue(e)}
                                                inputmode='decimal'
                                                placeholder={0}
                                            ></CustomInput>
                                            <BaseExchangeRateButton
                                                mrBaseExchangeRateList={mrBaseExchangeRateList}
                                                currentMberId={formValues?.localFreightCostMberId}
                                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'localFreightCostMberId')}
                                            />
                                        </div>
                                    </St.NumberInputWrapper>
                                }
                                <St.NumberInputWrapper>
                                    <label>총 기타비용</label>
                                    <div className='flexible'>
                                        <CustomInput
                                            type='text'
                                            name={'extraCost'}
                                            value={customNumberUtils.numberWithCommas2(formValues?.extraCost) || ''}
                                            onChange={(e) => handleChangePriceValue(e)}
                                            inputmode='decimal'
                                            placeholder={0}
                                        ></CustomInput>
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={formValues?.extraCostMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'extraCostMberId')}
                                        />
                                    </div>
                                </St.NumberInputWrapper>
                                {formValues?.purchaseType === 'OVERSEAS' &&
                                    <St.NumberInputWrapper>
                                        <label>관세</label>
                                        <div className='flexible'>
                                            <CustomInput
                                                type='text'
                                                name={'customsDutyRate'}
                                                value={customNumberUtils.numberWithCommas2(formValues?.customsDutyRate) || ''}
                                                onChange={(e) => handleChangeRateValue(e)}
                                                inputmode='decimal'
                                                placeholder={0}
                                            ></CustomInput>
                                            <RateButton />
                                        </div>
                                    </St.NumberInputWrapper>
                                }
                                {formValues?.purchaseType === 'OVERSEAS' &&
                                    <St.NumberInputWrapper>
                                        <label>관부가세</label>
                                        <div className='flexible'>
                                            <CustomInput
                                                type='text'
                                                name={'customsTaxRate'}
                                                value={customNumberUtils.numberWithCommas2(formValues?.customsTaxRate) || ''}
                                                onChange={(e) => handleChangeRateValue(e)}
                                                inputmode='decimal'
                                                placeholder={0}
                                            ></CustomInput>
                                            <RateButton />
                                        </div>
                                    </St.NumberInputWrapper>
                                }
                            </div>
                            <div className='partition'>
                                <St.NumberInputWrapper>
                                    {formValues?.purchaseType === 'OVERSEAS' &&
                                        <label>총 선적 비용</label>
                                    }
                                    {formValues?.purchaseType === 'DOMESTIC' &&
                                        <label>제품 개당 운임비용</label>
                                    }
                                    <div className='flexible'>
                                        <CustomInput
                                            type='text'
                                            name={'totalOceanFreightCharge'}
                                            value={customNumberUtils.numberWithCommas2(formValues?.totalOceanFreightCharge) || ''}
                                            onChange={(e) => handleChangePriceValue(e)}
                                            inputmode='decimal'
                                            placeholder={0}
                                        ></CustomInput>
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={formValues?.totalOceanFreightChargeMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'totalOceanFreightChargeMberId')}
                                        />
                                    </div>
                                </St.NumberInputWrapper>
                                {formValues?.purchaseType === 'OVERSEAS' &&
                                    <St.NumberInputWrapper>
                                        <label>총 선적 CBM (필수)</label>
                                        <div className='flexible'>
                                            <CustomInput
                                                type='text'
                                                name={'totalCBM'}
                                                value={customNumberUtils.numberWithCommas2(formValues?.totalCBM) || ''}
                                                onChange={(e) => handleChangePriceValue(e)}
                                                inputmode='decimal'
                                                placeholder={0}
                                            ></CustomInput>
                                            <CBMButton />
                                        </div>
                                    </St.NumberInputWrapper>
                                }
                                {formValues?.purchaseType === 'OVERSEAS' &&
                                    <St.NumberInputWrapper>
                                        <label>제품 개당 CBM (필수)</label>
                                        <div className='flexible'>
                                            <CustomInput
                                                type='text'
                                                name={'productUnitCBM'}
                                                value={customNumberUtils.numberWithCommas2(formValues?.productUnitCBM) || ''}
                                                onChange={(e) => handleChangePriceValue(e)}
                                                inputmode='decimal'
                                                placeholder={0}
                                            ></CustomInput>
                                            <CBMButton />
                                        </div>
                                    </St.NumberInputWrapper>
                                }
                                {formValues?.purchaseType === 'OVERSEAS' &&
                                    <St.NumberInputWrapper>
                                        <label>Certificate of Origin (CO) 비용</label>
                                        <div className='flexible'>
                                            <CustomInput
                                                type='text'
                                                name={'coCharge'}
                                                value={customNumberUtils.numberWithCommas2(formValues?.coCharge) || ''}
                                                onChange={(e) => handleChangePriceValue(e)}
                                                inputmode='decimal'
                                                placeholder={0}
                                            ></CustomInput>
                                            <BaseExchangeRateButton
                                                mrBaseExchangeRateList={mrBaseExchangeRateList}
                                                currentMberId={formValues?.coChargeMberId}
                                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'coChargeMberId')}
                                            />
                                        </div>
                                    </St.NumberInputWrapper>
                                }
                                {formValues?.purchaseType === 'OVERSEAS' &&
                                    <St.NumberInputWrapper>
                                        <label>도착지 운임비</label>
                                        <div className='flexible'>
                                            <CustomInput
                                                type='text'
                                                name={'destinationFreightCost'}
                                                value={customNumberUtils.numberWithCommas2(formValues?.destinationFreightCost) || ''}
                                                onChange={(e) => handleChangePriceValue(e)}
                                                inputmode='decimal'
                                                placeholder={0}
                                            ></CustomInput>
                                            <BaseExchangeRateButton
                                                mrBaseExchangeRateList={mrBaseExchangeRateList}
                                                currentMberId={formValues?.destinationFreightCostMberId}
                                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'destinationFreightCostMberId')}
                                            />
                                        </div>
                                    </St.NumberInputWrapper>
                                }
                                <CustomBlockButton
                                    type='button'
                                    className='calculate-button'
                                    onClick={() => handleSubmitCalculateAndSave()}
                                >
                                    계산 및 저장
                                </CustomBlockButton>
                            </div>
                        </div>
                    </St.FormWrapper>
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

function BaseExchangeRateButton({
    mrBaseExchangeRateList,
    currentMberId,
    onClick
}) {
    const baseExchangeRate = mrBaseExchangeRateList?.find(r => r.id === currentMberId);
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

function CBMButton() {
    return (
        <button className='readOnly-button'>CBM</button>
    );
}

function RateButton() {
    return <button className='readOnly-button'>%</button>;
}