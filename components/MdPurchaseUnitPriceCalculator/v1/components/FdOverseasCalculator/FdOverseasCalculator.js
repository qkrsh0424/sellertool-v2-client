import { useRef, useState } from "react";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import CustomInput from "../../../../input/default/v1/CustomInput";
import { St } from "./FdOverseasCalculator.styled";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
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

export function FdOverseasCalculator({
    mrBaseExchangeRateList,
    onExport
}) {
    const resultFieldRef = useRef();
    const [formValues, setFormValues] = useState({
        purchasePrice: '',
        purchasePriceMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        purchaseQuantity: '',
        totalExtraCost: '',
        totalExtraCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        departureDeliveryCharge: '',
        departureDeliveryChargeMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        customsDutyRate: '',
        customsTaxRate: '',

        totalFreightCost: '',
        totalFreightCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        totalCBM: '',
        productUnitCBM: '',
        coCharge: '',
        coChargeMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        destinationDeliveryCharge: '',
        destinationDeliveryChargeMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',

        purchaseUnitPriceKRW: '',
        purchaseUnitPriceMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        purchaseUnitFreightCostKRW: '',
        purchaseUnitFreightCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c'
    })

    const [editMberTargetName, setEditMberTargetName] = useState(null);

    const handleChangeEditMberTargetName = (name) => {
        setEditMberTargetName(name);
    }

    const handleSelectMber = (mber) => {
        setFormValues(prev => {
            return {
                ...prev,
                [editMberTargetName]: mber?.id
            }
        });
        handleChangeEditMberTargetName(null);
    }

    const handleChangePriceOfFormValueFromEvent = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (!value) {
            setFormValues((prev) => {
                return {
                    ...prev,
                    [name]: value || ''
                }
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
            setFormValues((prev) => {
                return {
                    ...prev,
                    [name]: value || ''
                }
            });
        }
    }

    const handleChangeQuantityOfFormValueFromEvent = (e) => {
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

    const handleChangeRateOfFormValueFromEvent = (e) => {
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

    const handleSubmitCalculate = (e) => {
        e.preventDefault();
        const purchasePriceKRW = formValues?.purchasePrice * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.purchasePriceMberId);
        const totalExtraCostKRW = formValues?.totalExtraCost * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.totalExtraCostMberId);
        const purchaseQuantity = customNumberUtils.parseNumberToInt({ value: formValues?.purchaseQuantity, defaultValue: 1, min: 1 });
        const departureDeliveryChargeKRW = formValues?.departureDeliveryCharge * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.departureDeliveryChargeMberId);
        const customsDutyRate = customNumberUtils.parseNumberToFloat({ value: formValues?.customsDutyRate, defaultValue: 0, min: 0 });
        const customsTaxRate = customNumberUtils.parseNumberToFloat({ value: formValues?.customsTaxRate, defaultValue: 0, min: 0 });

        const totalPurchaseCost = purchasePriceKRW + totalExtraCostKRW + departureDeliveryChargeKRW;
        const customDutyKRW = totalPurchaseCost * customsDutyRate / 100;
        const customTaxKRW = (totalPurchaseCost + customDutyKRW) * customsTaxRate / 100;

        const totalFreightCostKRW = formValues?.totalFreightCost * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.totalFreightCostMberId);
        const coChargeKRW = formValues?.coCharge * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.coChargeMberId);
        const destinationDeliveryChargeKRW = formValues?.destinationDeliveryCharge * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.destinationDeliveryChargeMberId);
        const totalCBM = customNumberUtils.parseNumberToFloat({ value: formValues?.totalCBM, defaultValue: 0, min: 0 });
        const productUnitCBM = customNumberUtils.parseNumberToFloat({ value: formValues?.productUnitCBM, defaultValue: 0, min: 0 });

        const purchaseFreightCostSumKRW = totalFreightCostKRW + coChargeKRW + destinationDeliveryChargeKRW;

        if(totalFreightCostKRW && (totalCBM <= 0 || productUnitCBM <= 0)){
            alert('"총 선적 CBM" 또는 "제품 개당 CBM" 은 0 커야 됩니다. ');
            return;
        }

        const purchaseUnitPriceKRW = (totalPurchaseCost + customDutyKRW + customTaxKRW) / purchaseQuantity;
        const purchaseUnitFreightCostKRW = purchaseFreightCostSumKRW * (productUnitCBM / totalCBM);

        setFormValues(prev => {
            return {
                ...prev,
                purchaseUnitPriceKRW: customNumberUtils.roundToDigit(purchaseUnitPriceKRW, 6),
                purchaseUnitFreightCostKRW: customNumberUtils.roundToDigit(purchaseUnitFreightCostKRW, 6),
            }
        });

        resultFieldRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    }

    const handleSubmitExport = () => {
        const purchaseUnitPrice = customNumberUtils.roundToDigit(formValues?.purchaseUnitPriceKRW / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.purchaseUnitPriceMberId), 6);
        const purchaseUnitFreightCost = customNumberUtils.roundToDigit(formValues?.purchaseUnitFreightCostKRW / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.purchaseUnitFreightCostMberId), 6);

        let body = {
            purchaseUnitPrice: purchaseUnitPrice,
            purchaseUnitPriceMberId: customNumberUtils?.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitPriceMberId),
            purchaseUnitFreightCost: purchaseUnitFreightCost,
            purchaseUnitFreightCostMberId: customNumberUtils?.returnBaseExchangeRateId(mrBaseExchangeRateList, formValues?.purchaseUnitFreightCostMberId)
        }

        onExport(body);
    }

    const mrBaseExchangeRateModalOpen = editMberTargetName ? true : false;
    const purchaseUnitPrice = customNumberUtils.roundToDigit(formValues?.purchaseUnitPriceKRW / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.purchaseUnitPriceMberId), 6);
    const purchaseUnitFreightCost = customNumberUtils.roundToDigit(formValues?.purchaseUnitFreightCostKRW / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.purchaseUnitFreightCostMberId), 6);

    return (
        <>
            <St.Container>
                <form onSubmit={(e) => handleSubmitCalculate(e)}>
                    <St.FlexibleWrapper>
                        <St.BodyWrapper>
                            <div className='title'>매입단가 계산</div>
                            <div className='input-box'>
                                <label>총 구매 가격</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'purchasePrice'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.purchasePrice) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.purchasePriceMberId}
                                        onClick={() => handleChangeEditMberTargetName('purchasePriceMberId')}
                                    />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>구매 수량</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'purchaseQuantity'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.purchaseQuantity) || ''}
                                        onChange={(e) => handleChangeQuantityOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <div className='pcs'>PCS</div>
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>기타비용</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'totalExtraCost'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.totalExtraCost) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.totalExtraCostMberId}
                                        onClick={() => handleChangeEditMberTargetName('totalExtraCostMberId')}
                                    />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>출발지 운임비</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'departureDeliveryCharge'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.departureDeliveryCharge) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.departureDeliveryChargeMberId}
                                        onClick={() => handleChangeEditMberTargetName('departureDeliveryChargeMberId')}
                                    />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>관세</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'customsDutyRate'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.customsDutyRate) || ''}
                                        onChange={(e) => handleChangeRateOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <div className='pcs'>%</div>
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>부가세</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'customsTaxRate'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.customsTaxRate) || ''}
                                        onChange={(e) => handleChangeRateOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <div className='pcs'>%</div>
                                </div>
                            </div>
                        </St.BodyWrapper>
                        <St.BodyWrapper>
                            <div className='title'>매입운임비(개당) 계산</div>
                            <div className='input-box'>
                                <label>총 선적 비용</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'totalFreightCost'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.totalFreightCost) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.totalFreightCostMberId}
                                        onClick={() => handleChangeEditMberTargetName('totalFreightCostMberId')}
                                    />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>총 선적 CBM</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'totalCBM'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.totalCBM) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <div className='pcs'>CBM</div>
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>제품 개당 CBM</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'productUnitCBM'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.productUnitCBM) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <div className='pcs'>CBM</div>
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>Certificate of Origin(CO) 비용</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'coCharge'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.coCharge) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.coChargeMberId}
                                        onClick={() => handleChangeEditMberTargetName('coChargeMberId')}
                                    />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>도착지 운임비</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'destinationDeliveryCharge'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.destinationDeliveryCharge) || ''}
                                        onChange={(e) => handleChangePriceOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.destinationDeliveryChargeMberId}
                                        onClick={() => handleChangeEditMberTargetName('destinationDeliveryChargeMberId')}
                                    />
                                </div>
                            </div>
                        </St.BodyWrapper>
                        <St.BodyWrapper ref={resultFieldRef}>
                            <div className='result-button-group'>
                                <CustomBlockButton
                                    type='button'
                                    className='buttonEl'
                                    onClick={() => handleSubmitExport()}
                                >내보내기</CustomBlockButton>
                                <CustomBlockButton
                                    type='submit'
                                    className='buttonEl buttonEl-calculate'
                                >계산하기</CustomBlockButton>
                            </div>
                            <div className='result-data-box'>
                                <label>매입단가</label>
                                <div className='flexible'>
                                    <div className='price-text'>{customNumberUtils.numberWithCommas2(purchaseUnitPrice) || ''}</div>
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.purchaseUnitPriceMberId}
                                        onClick={() => handleChangeEditMberTargetName('purchaseUnitPriceMberId')}
                                    />
                                </div>
                            </div>
                            <div className='result-data-box'>
                                <label>매입운임비(개당)</label>
                                <div className='flexible'>
                                    <div className='price-text'>{customNumberUtils.numberWithCommas2(purchaseUnitFreightCost) || ''}</div>
                                    <BaseExchangeRateButton
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                        currentMberId={formValues?.purchaseUnitFreightCostMberId}
                                        onClick={() => handleChangeEditMberTargetName('purchaseUnitFreightCostMberId')}
                                    />
                                </div>
                            </div>
                        </St.BodyWrapper>
                    </St.FlexibleWrapper>
                </form>
                <ExampleField />
            </St.Container >

            {mrBaseExchangeRateModalOpen &&
                <MrBaseExchangeRateModal
                    open={mrBaseExchangeRateModalOpen}
                    onClose={() => handleChangeEditMberTargetName(null)}
                    onSelect={handleSelectMber}
                />
            }
        </>
    );
}

function BaseExchangeRateButton({
    mrBaseExchangeRateList,
    currentMberId,
    onClick = () => { },
    readOnly
}) {
    const baseExchangeRate = mrBaseExchangeRateList?.find(r => r.id === currentMberId);
    if (baseExchangeRate) {
        return (
            <div className={`${readOnly ? 'currency-readOnly' : 'currency'}`} onClick={onClick} style={{ background: readOnly ? '#f0f0f0' : '' }}>{baseExchangeRate?.name}</div>
        );
    } else {
        return (
            <div className={`${readOnly ? 'currency-readOnly' : 'currency'} currency-notset`} onClick={onClick} style={{ background: readOnly ? '#f0f0f0' : '' }}>미지정</div>
        );
    }
}

function ExampleField() {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    }
    return (
        <St.ExampleWrapper>
            <div className='title-box'>
                <div className='title'>해외 수입형 입력 예시</div>
                <CustomBlockButton
                    type='button'
                    className='spreadBtn'
                    onClick={() => toggleOpen()}
                >
                    {open ? '접기' : '보기'}
                </CustomBlockButton>
            </div>
            {open &&
                <>
                    <div className='scenario-wrapper'>
                        <div className='scenario-title'>예시상황(1) - 중국에서 구매한 <span style={{ color: 'var(--mainColor)' }}>A 제품</span>의 매입단가와 매입운임비(개당) 구하기</div>
                        <div className='scenario-table-box'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>제품명</th>
                                        <th>구매 개수</th>
                                        <th>구매 가격</th>
                                        <th>기타 잡비</th>
                                        <th>제품 개당 CBM</th>
                                        <th>관세</th>
                                        <th>제조사 -&gt; 선적지 운임</th>
                                        <th>선적지 -&gt; 인천항 운임</th>
                                        <th>선적 총 CBM</th>
                                        <th>CO 비용</th>
                                        <th>인천항 -&gt; 창고 운임</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ background: 'var(--mainColorOpacity100)' }}>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>A 제품</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>100개</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>50,000元</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>5,000元</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>0.2CBM</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>3%</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>500元</td>
                                        <td>$2,000</td>
                                        <td>20CBM</td>
                                        <td>$25</td>
                                        <td>200,000원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='flexible'>
                            <div>
                                <div className='input-example'>
                                    <div>총 구매 가격</div>
                                    <div>50,000 CNY</div>
                                </div>
                                <div className='input-example'>
                                    <div>구매 수량</div>
                                    <div>100 PCS</div>
                                </div>
                                <div className='input-example'>
                                    <div>기타비용</div>
                                    <div>5,000 CNY</div>
                                </div>
                                <div className='input-example'>
                                    <div>출발지 운임비</div>
                                    <div>500 CNY</div>
                                </div>
                                <div className='input-example'>
                                    <div>관세</div>
                                    <div>3 %</div>
                                </div>
                                <div className='input-example'>
                                    <div>부가세</div>
                                    <div>10 %</div>
                                </div>
                            </div>
                            <div>
                                <div className='input-example'>
                                    <div>총 선적 비용</div>
                                    <div>2,000 USD</div>
                                </div>
                                <div className='input-example'>
                                    <div>총 선적 CBM</div>
                                    <div>20 CBM</div>
                                </div>
                                <div className='input-example'>
                                    <div>제품 개당 CBM</div>
                                    <div>0.2 CBM</div>
                                </div>
                                <div className='input-example'>
                                    <div>Certificate of Origin(CO) 비용</div>
                                    <div>25 USD</div>
                                </div>
                                <div className='input-example'>
                                    <div>도착지 운임비</div>
                                    <div>200,000 KRW</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='scenario-wrapper'>
                        <div className='scenario-title'>예시상황(2) - 중국에서 구매한 <span style={{ color: 'var(--mainColor)' }}>B 제품</span>의 매입단가와 매입운임비(개당) 구하기</div>
                        <div className='scenario-table-box'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>제품명</th>
                                        <th>구매 개수</th>
                                        <th>구매 가격</th>
                                        <th>기타 잡비</th>
                                        <th>제품 개당 CBM</th>
                                        <th>관세</th>
                                        <th>제조사 -&gt; 선적지 운임</th>
                                        <th>선적지 -&gt; 인천항 운임</th>
                                        <th>선적 총 CBM</th>
                                        <th>CO 비용</th>
                                        <th>인천항 -&gt; 창고 운임</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A 제품</td>
                                        <td>100개</td>
                                        <td>50,000元</td>
                                        <td>5,000元</td>
                                        <td>0.2CBM</td>
                                        <td>3%</td>
                                        <td>500元</td>
                                        <td rowSpan={3}>$4,153.8</td>
                                        <td rowSpan={3}>60CBM</td>
                                        <td rowSpan={3}>$25</td>
                                        <td rowSpan={3}>400,000원</td>
                                    </tr>
                                    <tr style={{ background: 'var(--mainColorOpacity100)' }}>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>B 제품</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>500개</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>5,000元</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>50元</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>0.04CBM</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>0%</td>
                                        <td style={{ fontWeight: '700', color: 'var(--mainColor)' }}>50元</td>
                                    </tr>
                                    <tr>
                                        <td>C 제품</td>
                                        <td>200개</td>
                                        <td>10,000元</td>
                                        <td>0</td>
                                        <td>0.1CBM</td>
                                        <td>8%</td>
                                        <td>500元</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='flexible'>
                            <div>
                                <div className='input-example'>
                                    <div>총 구매 가격</div>
                                    <div>5,000 CNY</div>
                                </div>
                                <div className='input-example'>
                                    <div>구매 수량</div>
                                    <div>500 PCS</div>
                                </div>
                                <div className='input-example'>
                                    <div>기타비용</div>
                                    <div>50 CNY</div>
                                </div>
                                <div className='input-example'>
                                    <div>출발지 운임비</div>
                                    <div>50 CNY</div>
                                </div>
                                <div className='input-example'>
                                    <div>관세</div>
                                    <div>0 %</div>
                                </div>
                                <div className='input-example'>
                                    <div>부가세</div>
                                    <div>10 %</div>
                                </div>
                            </div>
                            <div>
                                <div className='input-example'>
                                    <div>총 선적 비용</div>
                                    <div>4,153.8 USD</div>
                                </div>
                                <div className='input-example'>
                                    <div>총 선적 CBM</div>
                                    <div>60 CBM</div>
                                </div>
                                <div className='input-example'>
                                    <div>제품 개당 CBM</div>
                                    <div>0.04 CBM</div>
                                </div>
                                <div className='input-example'>
                                    <div>Certificate of Origin(CO) 비용</div>
                                    <div>25 USD</div>
                                </div>
                                <div className='input-example'>
                                    <div>도착지 운임비</div>
                                    <div>400,000 KRW</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </St.ExampleWrapper>
    );
}