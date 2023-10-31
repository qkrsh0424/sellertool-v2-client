import { useSelector } from 'react-redux';
import { St } from './FdCalculator.styled';
import ButtonGroupsView from './ButtonGroups.view';
import { AnalysisUtils } from '../../../../../utils/analysisUtils';
import { useRef, useState } from 'react';
import CustomInput from '../../../../../components/input/default/v1/CustomInput';
import CustomBlockButton from '../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { CustomNumberUtils } from '../../../../../utils/CustomNumberUtils';
import { useMarginRecordFormHook } from '../../hooks';
import CustomSelect from '../../../../../components/select/default/v1/CustomSelect';

const customNumberUtils = CustomNumberUtils();

export const FdCalculator = ({
    mrBaseExchangeRateList
}) => {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const marginRecordFormHook = useMarginRecordFormHook();

    const resultWrapperRef = useRef();
    const [resultDetailModeOpen, setResultDetailModeOpen] = useState(false);

    const toggleResultDetailModeOpen = () => {
        setResultDetailModeOpen(!resultDetailModeOpen);
    }

    const handleSubmitCalculateMargin = async (e) => {
        e.preventDefault();
        marginRecordFormHook.onCalculateAndSetResultForm(mrBaseExchangeRateList);
        resultWrapperRef.current.scrollIntoView({
            behavior: 'smooth'
        });
    }

    const marginRecordForm = marginRecordFormHook?.marginRecordForm;

    return (
        <>
            <St.Container>
                <St.ResultWrapper
                    ref={resultWrapperRef}
                    style={{
                        gridTemplateColumns: resultDetailModeOpen ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'
                    }}
                >
                    <div
                        className='result-box'
                        style={{
                            color: 'var(--mainColor)'
                        }}
                    >
                        <div className='title'>마진율 (세전)</div>
                        <div className='result'>{marginRecordFormHook?.resultForm?.marginRate || 0} (%)</div>
                    </div>
                    <div
                        className='result-box'
                        style={{
                            color: 'var(--mainColor)'
                        }}
                    >
                        <div className='title'>마진액 (세전)</div>
                        <div className='result'>{customNumberUtils.numberWithCommas2(marginRecordFormHook?.resultForm?.marginKRW) || 0} (원)</div>
                    </div>
                    {resultDetailModeOpen &&
                        <>
                            <div
                                className='result-box'
                            >
                                <div className='title'>매출 합계</div>
                                <div className='result'>{customNumberUtils.numberWithCommas2(marginRecordFormHook?.resultForm?.totalIncomeKRW) || 0} (원)</div>
                            </div>
                            <div
                                className='result-box'
                            >
                                <div className='title'>매입 합계</div>
                                <div className='result'>{customNumberUtils.numberWithCommas2(marginRecordFormHook?.resultForm?.totalExpenseKRW) || 0} (원)</div>
                            </div>
                            <div
                                className='result-box'
                            >
                                <div className='title'>VAT</div>
                                <div className='result'>{customNumberUtils.numberWithCommas2(marginRecordFormHook?.resultForm?.vatKRW) || 0} (원)</div>
                            </div>
                            <div
                                className='result-box'
                            >
                                <div className='title'>최종 마진액 (세후)</div>
                                <div className='result'>{customNumberUtils.numberWithCommas2(marginRecordFormHook?.resultForm?.marginAfterVatKRW) || 0} (원)</div>
                            </div>
                        </>
                    }
                </St.ResultWrapper>
                <ButtonGroupsView
                    resultDetailModeOpen={resultDetailModeOpen}
                    onToggleResultDetailModeOpen={() => toggleResultDetailModeOpen()}
                />
                <div style={{height:'1px', background:'#e0e0e0', marginBottom:'40px'}}></div>
                <form onSubmit={(e) => handleSubmitCalculateMargin(e)}>
                    <St.CalculatorWrapper>
                        <div className='button-wrapper'>
                            <CustomBlockButton type='button' className='refreshBtn' onClick={() => marginRecordFormHook.onActionClearForm()}>새로고침</CustomBlockButton>
                        </div>
                        <div className='control-wrapper'>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>판매가격</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'salesPrice'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.salesPrice) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangePriceValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>KRW</div>
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>배송비</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'consumerDeliveryCharge'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.consumerDeliveryCharge) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangePriceValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>KRW</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>매입단가</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'purchaseUnitPrice'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.purchaseUnitPrice) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangePriceValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>KRW</div>
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>매입운임비(개당)</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'purchaseUnitFreightCost'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.purchaseUnitFreightCost) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangePriceValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>KRW</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>판매자 부담 배송비</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'sellerDeliveryCharge'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.sellerDeliveryCharge) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangePriceValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>KRW</div>
                                    </div>
                                </div>
                                <div className='input-box'></div>
                            </div>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>마켓선택</label>
                                    <div className='flexItem'>
                                        <CustomSelect
                                            value={marginRecordFormHook?.selectedMarketCommission?.value}
                                            onChange={(e) => marginRecordFormHook?.onChangeSelectedMarketCommissiomFromEvent(e)}
                                        >
                                            {marginRecordFormHook?.marketCommissionList?.map(marketCommission => {
                                                return (
                                                    <option
                                                        key={marketCommission?.value}
                                                        value={marketCommission?.value}
                                                    >{marketCommission?.name}</option>
                                                );

                                            })}
                                        </CustomSelect>
                                    </div>
                                </div>
                            </div>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>마켓 기본 수수료</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'marketDefaultCommission'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.marketDefaultCommission) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangeRateValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>%</div>
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>마켓 연동 수수료</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'marketLinkedCommission'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.marketLinkedCommission) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangeRateValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>%</div>
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>마켓 배송비 수수료</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'marketDeliveryCommission'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.marketDeliveryCommission) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangeRateValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>%</div>
                                    </div>
                                </div>
                            </div>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>마케팅비용</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'marketingCost'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.marketingCost) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangePriceValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>KRW</div>
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>기타비용</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'extraCost'}
                                            value={customNumberUtils.numberWithCommas2(marginRecordForm?.extraCost) || ''}
                                            onChange={(e) => marginRecordFormHook.onChangePriceValueFromEvent(e)}
                                            placeholder='0'
                                        />
                                        <div className='currency'>KRW</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='control-wrapper'>
                            <div className='button-wrapper'>
                                <CustomBlockButton
                                    type='submit'
                                    className='calculatorBtn'
                                    onClick={(e) => {
                                        AnalysisUtils.gtagClickEventHandler(AnalysisUtils.eventName.MARGIN_CALCULATE_BTN_CLICKED, { wsId: workspaceRedux?.workspaceInfo?.id })
                                    }}
                                >
                                    계산하기
                                </CustomBlockButton>
                            </div>
                        </div>
                    </St.CalculatorWrapper>
                </form>
            </St.Container>
        </>
    );
}