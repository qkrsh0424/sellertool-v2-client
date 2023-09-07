import { useEffect, useState } from "react";
import { St } from "./FdCalculator.styeld";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import CustomInput from "../../../../input/default/v1/CustomInput";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import { CalculateUtils } from "../../utils/CalculateUtils";
import { InitializerUtils } from "../../utils/InitializerUtils";
import { MrBaseExchangeRateModal } from "../../../../MrBaseExchangeRateModal/v1";
import { customToast } from "../../../../toast/custom-react-toastify/v1";

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

export function FdCalculator({
    mrBaseExchangeRateList,
    selectedMrPurchaseModule,
    handleSubmitSavePurchaseUnitPriceForm,
    onSubmitExport,
}) {
    const [formValues, setFormValues] = useState(null);
    const [mrBaseExchangeRateModalOpen, setMrBaseExchangeRateModalOpen] = useState(false);
    const [editMberTargetName, setEditMberTargetName] = useState(null);

    useEffect(() => {
        if (!selectedMrPurchaseModule) {
            return;
        }

        setFormValues({
            purchaseUnitPrice: selectedMrPurchaseModule?.purchaseUnitPrice,
            purchaseUnitPriceMberId: selectedMrPurchaseModule?.purchaseUnitPriceMberId,
            purchaseUnitFreightCost: selectedMrPurchaseModule?.purchaseUnitFreightCost,
            purchaseUnitFreightCostMberId: selectedMrPurchaseModule?.purchaseUnitFreightCostMberId,
            sellerDeliveryCharge: selectedMrPurchaseModule?.sellerDeliveryCharge,
            sellerDeliveryChargeMberId: selectedMrPurchaseModule?.sellerDeliveryChargeMberId,
        })
        console.log(selectedMrPurchaseModule);
    }, [selectedMrPurchaseModule]);

    const toggleMrBaseExchangeRateModalOpen = (bool, name) => {
        if (bool && name) {
            setEditMberTargetName(name);
        } else {
            setEditMberTargetName(null);
        }

        setMrBaseExchangeRateModalOpen(bool);
    }

    const handleChangePriceValueFromEvent = (e) => {
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

    const handleSelectMber = (mber) => {
        setFormValues({
            ...formValues,
            [editMberTargetName]: mber?.id
        });
        toggleMrBaseExchangeRateModalOpen(false);
    }

    const handleSubmitSave = () => {
        try {
            returnPriceValueElseThrow(formValues?.purchaseUnitPrice, '매입단가는 0-99,999,999,999 내외로 입력해 주세요.')
            returnPriceValueElseThrow(formValues?.purchaseUnitFreightCost, '매입운임비는 0-99,999,999,999 내외로 입력해 주세요.')
            returnPriceValueElseThrow(formValues?.sellerDeliveryCharge, '판매자 부담 배송비는 0-99,999,999,999 내외로 입력해 주세요.')
        } catch (err) {
            customToast.error(err.message);
            return;
        }

        let body = {
            purchaseUnitPrice: customNumberUtils.parseNumberToFloat({ value: formValues?.purchaseUnitPrice, defaultValue: 0, min: 0 }),
            purchaseUnitPriceMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitPriceMberId),
            purchaseUnitFreightCost: customNumberUtils.parseNumberToFloat({ value: formValues?.purchaseUnitFreightCost, defaultValue: 0, min: 0 }),
            purchaseUnitFreightCostMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitFreightCostMberId),
            sellerDeliveryCharge: customNumberUtils.parseNumberToFloat({ value: formValues?.sellerDeliveryCharge, defaultValue: 0, min: 0 }),
            sellerDeliveryChargeMberId: customNumberUtils.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.sellerDeliveryChargeMberId),
        }

        handleSubmitSavePurchaseUnitPriceForm(body);
    }
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.BodyWrapper>
                        <div className='input-box'>
                            <label>매입단가</label>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    value={customNumberUtils.numberWithCommas2(formValues?.purchaseUnitPrice) || ''}
                                    name='purchaseUnitPrice'
                                    onChange={(e) => handleChangePriceValueFromEvent(e)}
                                    placeholder={'0'}
                                />
                                <BaseExchangeRateButton
                                    mrBaseExchangeRateList={mrBaseExchangeRateList}
                                    currentMberId={formValues?.purchaseUnitPriceMberId}
                                    onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'purchaseUnitPriceMberId')}
                                />
                            </div>
                            {/* <div className='flexible' style={{ marginTop: '10px', gap: '10px' }}>
                                <div className='calculatorBtn'>합계계산</div>
                                <div className='calculatorBtn'>수입계산</div>
                            </div> */}
                        </div>
                        <div className='input-box'>
                            <label>매입운임비(개당)</label>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    value={customNumberUtils.numberWithCommas2(formValues?.purchaseUnitFreightCost) || ''}
                                    name='purchaseUnitFreightCost'
                                    onChange={(e) => handleChangePriceValueFromEvent(e)}
                                    placeholder={'0'}
                                />
                                <BaseExchangeRateButton
                                    mrBaseExchangeRateList={mrBaseExchangeRateList}
                                    currentMberId={formValues?.purchaseUnitFreightCostMberId}
                                    onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'purchaseUnitFreightCostMberId')}
                                />
                            </div>
                            {/* <div className='flexible' style={{ marginTop: '10px', gap: '10px' }}>
                                <div className='calculatorBtn'>합계계산</div>
                                <div className='calculatorBtn'>수입계산</div>
                            </div> */}
                        </div>
                        <div className='input-box'>
                            <label>판매자 부담 배송비</label>
                            <div className='flexible'>
                                <CustomInput
                                    type='text'
                                    value={customNumberUtils.numberWithCommas2(formValues?.sellerDeliveryCharge) || ''}
                                    name='sellerDeliveryCharge'
                                    onChange={(e) => handleChangePriceValueFromEvent(e)}
                                    placeholder={'0'}
                                />
                                <BaseExchangeRateButton
                                    mrBaseExchangeRateList={mrBaseExchangeRateList}
                                    currentMberId={formValues?.sellerDeliveryChargeMberId}
                                    onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'sellerDeliveryChargeMberId')}
                                />
                            </div>
                            {/* <div className='flexible' style={{ marginTop: '10px', gap: '10px' }}>
                                <div className='calculatorBtn'>합계계산</div>
                                <div className='calculatorBtn'>수입계산</div>
                            </div> */}
                        </div>
                    </St.BodyWrapper>
                    <St.FooterWrapper>
                        <CustomBlockButton
                            type='button'
                            className='buttonEl saveBtn'
                            onClick={() => handleSubmitSave()}
                        >
                            저장
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='buttonEl selectBtn'
                        >
                            선택
                        </CustomBlockButton>
                    </St.FooterWrapper>
                </St.Wrapper>
            </St.Container>
            {mrBaseExchangeRateModalOpen &&
                <MrBaseExchangeRateModal
                    open={mrBaseExchangeRateModalOpen}
                    onClose={() => toggleMrBaseExchangeRateModalOpen(false)}
                    onSelect={handleSelectMber}
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
            <div className='baseExchangeRateBtn' onClick={onClick}>{baseExchangeRate?.name}</div>
        );
    } else {
        return (
            <div className='baseExchangeRateBtn baseExchangeRateBtn-Notset' onClick={onClick}>미지정</div>
        );
    }
}