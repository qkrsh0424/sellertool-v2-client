import { useRef, useState } from "react";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import CustomInput from "../../../../input/default/v1/CustomInput";
import { St } from "./FdCommonCalculator.styled";
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

export function FdCommonCalculator({
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
        totalFreightCost: '',
        totalFreightCostMberId: '75a58be7-37f9-11ee-8d3c-06fe28321f8c',
        totalProductQuantityInFreight: '',
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

    const handleSubmitCalculate = (e) => {
        e.preventDefault();
        const purchasePriceKRW = formValues?.purchasePrice * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.purchasePriceMberId);
        const totalExtraCostKRW = formValues?.totalExtraCost * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.totalExtraCostMberId);
        const purchaseQuantity = customNumberUtils.parseNumberToInt({ value: formValues?.purchaseQuantity, defaultValue: 1, min: 1 });
        const totalFreightCostKRW = formValues?.totalFreightCost * customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, formValues?.totalFreightCostMberId);
        const totalProductQuantityInFreight = customNumberUtils.parseNumberToInt({ value: formValues?.totalProductQuantityInFreight, defaultValue: 1, min: 1 });


        const purchaseUnitPriceKRW = (purchasePriceKRW + totalExtraCostKRW) / purchaseQuantity;
        const purchaseUnitFreightCostKRW = totalFreightCostKRW / totalProductQuantityInFreight;

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
                                <label>총 구매 수량</label>
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
                                <label>총 기타비용</label>
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
                        </St.BodyWrapper>
                        <St.BodyWrapper>
                            <div className='title'>매입운임비(개당) 계산</div>
                            <div className='input-box'>
                                <label>총 화물 비용</label>
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
                                <label>화물내 총 제품 수량</label>
                                <div className='flexible'>
                                    <CustomInput
                                        type='text'
                                        name={'totalProductQuantityInFreight'}
                                        value={customNumberUtils.numberWithCommas2(formValues?.totalProductQuantityInFreight) || ''}
                                        onChange={(e) => handleChangeQuantityOfFormValueFromEvent(e)}
                                        placeholder='0'
                                    />
                                    <div className='pcs'>PCS</div>
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
                <div className='title'>일반형 입력 예시</div>
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
                        <div className='scenario-title'>예시상황(1) - <span style={{ color: 'var(--mainColor)' }}>A 제품</span>의 매입단가와 매입운임비(개당) 구하기</div>
                        <div className='scenario-table-box'>
                            <table>
                                <thead>
                                    <th>제품명</th>
                                    <th>구매 개수</th>
                                    <th>구매 가격</th>
                                    <th>기타 잡비</th>
                                    <th>화물비용</th>
                                    <th>총 제품 수량</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A 제품</td>
                                        <td>100개</td>
                                        <td>1,000,000원</td>
                                        <td>100,000원</td>
                                        <td>200,000원</td>
                                        <td>100개</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='input-example'>총 구매 가격 = 1,000,000 KRW</div>
                        <div className='input-example'>총 구매 수량 = 100 PCS</div>
                        <div className='input-example'>총 기타비용 = 100,000 KRW</div>
                        <div className='input-example'>총 화물 비용 = 200,000 KRW</div>
                        <div className='input-example'>화물내 총 제품 수량 = 100 PCS</div>
                    </div>
                    <div className='scenario-wrapper'>
                        <div className='scenario-title'>예시상황(2) - <span style={{ color: 'var(--mainColor)' }}>B 제품</span>의 매입단가와 매입운임비(개당) 구하기</div>
                        <div className='scenario-table-box'>
                            <table>
                                <thead>
                                    <th>제품명</th>
                                    <th>구매 개수</th>
                                    <th>구매 가격</th>
                                    <th>기타 잡비</th>
                                    <th>화물비용</th>
                                    <th>총 제품 수량</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>A 제품</td>
                                        <td>100개</td>
                                        <td>1,000,000원</td>
                                        <td rowSpan={3}>300,000원</td>
                                        <td rowSpan={3}>400,000원</td>
                                        <td rowSpan={3}>350개</td>
                                    </tr>
                                    <tr>
                                        <td>B 제품</td>
                                        <td>50개</td>
                                        <td>2,000,000원</td>
                                    </tr>
                                    <tr>
                                        <td>C 제품</td>
                                        <td>200개</td>
                                        <td>200,000원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='input-example'>총 구매 가격 = 2,000,000 KRW</div>
                        <div className='input-example'>총 구매 수량 = 50 PCS</div>
                        <div className='input-example'>총 기타비용 = 300,000 KRW</div>
                        <div className='input-example'>총 화물 비용 = 400,000 KRW</div>
                        <div className='input-example'>화물내 총 제품 수량 = 350 PCS</div>
                    </div>
                </>
            }
        </St.ExampleWrapper>
    );
}