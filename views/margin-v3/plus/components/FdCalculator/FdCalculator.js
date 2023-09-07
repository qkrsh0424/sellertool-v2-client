import { useSelector } from 'react-redux';
import { St } from './FdCalculator.styled';
import ButtonGroupsView from './ButtonGroups.view';
import { AnalysisUtils } from '../../../../../utils/analysisUtils';
import { useEffect, useRef, useState } from 'react';
import CustomInput from '../../../../../components/input/default/v1/CustomInput';
import CustomBlockButton from '../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { CustomNumberUtils } from '../../../../../utils/CustomNumberUtils';
import { useDataSourceHook, useMarginRecordFormHook } from '../../hooks';
import CustomSelect from '../../../../../components/select/default/v1/CustomSelect';
import { MrBaseExchangeRateModal } from '../../../../../components/MrBaseExchangeRateModal/v1';
import CustomCheckboxV2 from '../../../../../components/checkbox/CustomCheckboxV2';
import { PurchaseCostCalculatorModal } from '../../../../../components/PurchaseCostCalculatorModal/v2';
import { CalculateUtils } from '../../utils/CalculateUtils';
import { customToast } from '../../../../../components/toast/custom-react-toastify/v1';

const customNumberUtils = CustomNumberUtils();
const calculcateUtils = CalculateUtils();

export const FdCalculator = ({
    mrBaseExchangeRateList,
    mrPurchaseModuleList,
    selectedMarginRecord,
    selectResultMber,
    selectResultMberValue,
    onReqSave
}) => {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const marginRecordFormHook = useMarginRecordFormHook();

    const resultWrapperRef = useRef();
    const [resultDetailModeOpen, setResultDetailModeOpen] = useState(false);
    const [mrBaseExchangeRateModalOpen, setMrBaseExchangeRateModalOpen] = useState(false);
    const [mrPurchaseModuleModalOpen, setMrPurchaseModuleModalOpen] = useState(false);
    const [editMberTargetName, setEditMberTargetName] = useState(null);

    useEffect(() => {
        if (!selectedMarginRecord?.id) {
            return;
        }

        marginRecordFormHook.onSetBySelectedMarginRecord(selectedMarginRecord);

    }, [selectedMarginRecord?.id]);

    useEffect(() => {
        if (!marginRecordFormHook?.marginRecordForm?.id || !mrBaseExchangeRateList || !mrPurchaseModuleList) {
            return;
        }
        let marginResultForm = null;

        if (marginRecordFormHook?.marginRecordForm?.mrPurchaseModuleYn === 'y') {
            const mrPurchaseModule = mrPurchaseModuleList?.find(r => r?.id === marginRecordFormHook?.marginRecordForm?.mrPurchaseModuleId);

            if (!mrPurchaseModule) {
                customToast.warn('매입모듈이 미지정 상태 입니다.');
            }
            marginResultForm = calculcateUtils.getMarginResultForm({
                marginRecordForm: marginRecordFormHook?.marginRecordForm,
                mrPurchaseModuleForm: mrPurchaseModule,
                mrBaseExchangeRateList: mrBaseExchangeRateList
            });

        } else {
            marginResultForm = calculcateUtils.getMarginResultForm({
                marginRecordForm: marginRecordFormHook?.marginRecordForm,
                mrBaseExchangeRateList: mrBaseExchangeRateList
            });
        }

        marginRecordFormHook.onSetResultForm(marginResultForm);
    }, [marginRecordFormHook?.marginRecordForm?.id]);

    const toggleResultDetailModeOpen = () => {
        setResultDetailModeOpen(!resultDetailModeOpen);
    }

    const toggleMrBaseExchangeRateModalOpen = (bool, name) => {
        if (bool && name) {
            setEditMberTargetName(name);
        } else {
            setEditMberTargetName(null);
        }

        setMrBaseExchangeRateModalOpen(bool);
    }

    const toggleMrPurchaseModuleModalOpen = (bool) => {
        setMrPurchaseModuleModalOpen(bool);
    }

    const handleSelectMber = (mber) => {
        marginRecordFormHook.onSetMarginRecordForm({
            ...marginRecordFormHook?.marginRecordForm,
            [editMberTargetName]: mber?.id
        });
        toggleMrBaseExchangeRateModalOpen(false);
    }

    const handleSubmitCalculateMargin = async (e) => {
        e.preventDefault();

        let marginResultForm = null;

        if (marginRecordFormHook?.marginRecordForm?.mrPurchaseModuleYn === 'y') {
            if (!selectedMrPurchaseModule) {
                alert('매입모듈을 선택해 주세요.');
                return;
            }
            marginResultForm = calculcateUtils.getMarginResultForm({
                marginRecordForm: marginRecordFormHook?.marginRecordForm,
                mrPurchaseModuleForm: selectedMrPurchaseModule,
                mrBaseExchangeRateList: mrBaseExchangeRateList
            })
        } else {
            marginResultForm = calculcateUtils.getMarginResultForm({
                marginRecordForm: marginRecordFormHook?.marginRecordForm,
                mrBaseExchangeRateList: mrBaseExchangeRateList
            })
        }

        resultWrapperRef.current.scrollIntoView({
            behavior: 'smooth'
        });

        marginRecordFormHook.onSetResultForm(marginResultForm);
    }

    const handleSubmitSave = async () => {
        if (!marginRecordFormHook?.marginRecordForm?.name) {
            alert('상품명은 필수 입력입니다.');
            return;
        }

        if (marginRecordFormHook?.marginRecordForm?.mrPurchaseModuleYn === 'y' && !selectedMrPurchaseModule) {
            alert('매입모듈을 선택해 주세요.');
            return;
        }

        let body = marginRecordFormHook.returnBodyFormForSave({
            marginRecordForm: marginRecordFormHook.marginRecordForm,
            mrBaseExchangeRateList: mrBaseExchangeRateList
        })
        onReqSave(body);
    }

    const handleSelectMrPurchaseModule = (module) => {
        toggleMrPurchaseModuleModalOpen(false);
        marginRecordFormHook?.onChangeMrPurchaseModuleId(module);
    }

    const marginRecordForm = marginRecordFormHook?.marginRecordForm;
    const selectedMrPurchaseModule = mrPurchaseModuleList?.find(r => r?.id === marginRecordFormHook?.marginRecordForm?.mrPurchaseModuleId);

    return (
        <>
            <St.Container>
                <form onSubmit={(e) => handleSubmitCalculateMargin(e)}>
                    <St.CalculatorWrapper>
                        <ButtonGroupsView
                            resultDetailModeOpen={resultDetailModeOpen}
                            onToggleResultDetailModeOpen={() => toggleResultDetailModeOpen()}
                        />
                        <ResultField
                            resultWrapperRef={resultWrapperRef}
                            resultDetailModeOpen={resultDetailModeOpen}
                            marginRecordFormHook={marginRecordFormHook}
                            selectResultMber={selectResultMber}
                            selectResultMberValue={selectResultMberValue}
                        />
                        <div style={{ background: '#f0f0f0', height: '0.5px' }}></div>
                        <div className='control-wrapper'>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>상품명</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'name'}
                                            className='text-input'
                                            value={marginRecordForm?.name || ''}
                                            onChange={(e) => marginRecordFormHook.onChangeTextValueFromEvent(e)}
                                            placeholder='상품명 1-50자'
                                            maxLength={50}
                                        />
                                    </div>
                                </div>
                                <div className='input-box'>
                                    <label>태그</label>
                                    <div className='flexItem'>
                                        <CustomInput
                                            type='text'
                                            name={'tag'}
                                            className='text-input'
                                            value={marginRecordForm?.tag || ''}
                                            onChange={(e) => marginRecordFormHook.onChangeTextValueFromEvent(e)}
                                            placeholder='태그 미지정 0-50자'
                                            maxLength={50}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ background: '#f0f0f0', height: '0.5px' }}></div>
                        <div
                            className='button-wrapper'

                        >
                            <CustomBlockButton
                                type='button'
                                className='saveBtn'
                                onClick={(e) => {
                                    handleSubmitSave();
                                }}
                            >
                                저장
                            </CustomBlockButton>
                            <CustomBlockButton type='button' className='refreshBtn' onClick={() => marginRecordFormHook.onActionClearForm()}>새로고침</CustomBlockButton>
                        </div>
                        <div className='control-wrapper'>
                            <div className='title'>판매정보</div>
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
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={marginRecordForm?.salesPriceMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'salesPriceMberId')}
                                        />
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
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={marginRecordForm?.consumerDeliveryChargeMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'consumerDeliveryChargeMberId')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='control-wrapper'>
                            <div className='title' style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
                                매입정보
                                <CustomCheckboxV2
                                    label='매입모듈 사용'
                                    size='22px'
                                    labelSize='14px'
                                    labelStyle={{ fontWeight: '700', letterSpacing: '1.5px', marginLeft: '7px', color: 'var(--mainColor)' }}
                                    checked={marginRecordForm?.mrPurchaseModuleYn === 'y' ? true : false}
                                    name={'mrPurchaseModuleYn'}
                                    onChange={(e) => marginRecordFormHook.onChangeYnValueFromEvent(e)}
                                />
                            </div>
                            {marginRecordForm?.mrPurchaseModuleYn === 'y' ?
                                <>
                                    <div className='input-box'>
                                        <label>매입모듈 선택</label>
                                        <div className='flexItem'>
                                            <CustomBlockButton
                                                type='button'
                                                className='handlerBtn'
                                                onClick={() => toggleMrPurchaseModuleModalOpen(true)}
                                            >
                                                {selectedMrPurchaseModule ? selectedMrPurchaseModule?.name : '매입모듈 선택'}
                                            </CustomBlockButton>
                                        </div>
                                    </div>
                                    <PurchasePriceFieldWithModule
                                        mrPurchaseModule={selectedMrPurchaseModule}
                                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                                    />
                                </>
                                :
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
                                            <BaseExchangeRateButton
                                                mrBaseExchangeRateList={mrBaseExchangeRateList}
                                                currentMberId={marginRecordForm?.purchaseUnitPriceMberId}
                                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'purchaseUnitPriceMberId')}
                                            />
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
                                            <BaseExchangeRateButton
                                                mrBaseExchangeRateList={mrBaseExchangeRateList}
                                                currentMberId={marginRecordForm?.purchaseUnitFreightCostMberId}
                                                onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'purchaseUnitFreightCostMberId')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
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
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={marginRecordForm?.sellerDeliveryChargeMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'sellerDeliveryChargeMberId')}
                                        />
                                    </div>
                                </div>
                                <div className='input-box'></div>
                            </div>
                        </div>
                        <div className='control-wrapper'>
                            <div className='title'>마켓 수수료</div>
                            <div className='flexible'>
                                <div className='input-box'>
                                    <label>마켓선택</label>
                                    <div className='flexItem'>
                                        <CustomSelect
                                            value={marginRecordFormHook?.marginRecordForm?.marketCommissionType}
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
                                        <div className='rate'>%</div>
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
                                        <div className='rate'>%</div>
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
                                        <div className='rate'>%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='control-wrapper'>
                            <div className='title'>기타비용</div>
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
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={marginRecordForm?.marketingCostMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'marketingCostMberId')}
                                        />
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
                                        <BaseExchangeRateButton
                                            mrBaseExchangeRateList={mrBaseExchangeRateList}
                                            currentMberId={marginRecordForm?.extraCostMberId}
                                            onClick={() => toggleMrBaseExchangeRateModalOpen(true, 'extraCostMberId')}
                                        />
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

            {mrBaseExchangeRateModalOpen &&
                <MrBaseExchangeRateModal
                    open={mrBaseExchangeRateModalOpen}
                    onClose={() => toggleMrBaseExchangeRateModalOpen(false)}
                    onSelect={handleSelectMber}
                />
            }

            {mrPurchaseModuleModalOpen &&
                <PurchaseCostCalculatorModal
                    open={mrPurchaseModuleModalOpen}
                    selectedMrPurchaseModuleId={marginRecordFormHook?.marginRecordForm?.mrPurchaseModuleId}
                    onClose={() => toggleMrPurchaseModuleModalOpen(false)}
                    onExport={(mrPurchaseModule) => handleSelectMrPurchaseModule(mrPurchaseModule)}
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

function ResultField({
    resultWrapperRef,
    resultDetailModeOpen,
    marginRecordFormHook,
    selectResultMber,
    selectResultMberValue
}) {
    let resultMarginPriceWithMrBaseExchangeRate = customNumberUtils.roundToDigit(marginRecordFormHook?.resultForm?.marginKRW / selectResultMberValue, 2);
    let resultTotalIncomePriceWithMrBaseExchangeRate = customNumberUtils.roundToDigit(marginRecordFormHook?.resultForm?.totalIncomeKRW / selectResultMberValue, 2);
    let resultTotalExpensePriceWithMrBaseExchangeRate = customNumberUtils.roundToDigit(marginRecordFormHook?.resultForm?.totalExpenseKRW / selectResultMberValue, 2);
    let resultVatPriceWithMrBaseExchangeRate = customNumberUtils.roundToDigit(marginRecordFormHook?.resultForm?.vatKRW / selectResultMberValue, 2);
    let resultMarginAfterVatKRWWithMrBaseExchangeRate = customNumberUtils.roundToDigit(marginRecordFormHook?.resultForm?.marginAfterVatKRW / selectResultMberValue, 2);

    return (
        <St.ResultWrapper
            ref={resultWrapperRef}
            style={{
                gridTemplateColumns: resultDetailModeOpen ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'
            }}
        >
            <div
                className='result-box'
                style={{
                    border: '1px solid var(--mainColor)'
                }}
            >
                <div className='title'>마진율 (세전)</div>
                <div className='result'>{marginRecordFormHook?.resultForm?.marginRate || 0} (%)</div>
            </div>
            <div
                className='result-box'
                style={{
                    border: '1px solid var(--mainColor)'
                }}
            >
                <div className='title'>마진액 (세전)</div>
                <div className='result'>{customNumberUtils.numberWithCommas2(resultMarginPriceWithMrBaseExchangeRate) || 0} ({selectResultMber?.name})</div>
            </div>
            {resultDetailModeOpen &&
                <>
                    <div
                        className='result-box'
                    >
                        <div className='title'>매출 합계</div>
                        <div className='result'>{customNumberUtils.numberWithCommas2(resultTotalIncomePriceWithMrBaseExchangeRate) || 0} ({selectResultMber?.name})</div>
                    </div>
                    <div
                        className='result-box'
                    >
                        <div className='title'>매입 합계</div>
                        <div className='result'>{customNumberUtils.numberWithCommas2(resultTotalExpensePriceWithMrBaseExchangeRate) || 0} ({selectResultMber?.name})</div>
                    </div>
                    <div
                        className='result-box'
                    >
                        <div className='title'>VAT</div>
                        <div className='result'>{customNumberUtils.numberWithCommas2(resultVatPriceWithMrBaseExchangeRate) || 0} ({selectResultMber?.name})</div>
                    </div>
                    <div
                        className='result-box'
                    >
                        <div className='title'>최종 마진액 (세후)</div>
                        <div className='result'>{customNumberUtils.numberWithCommas2(resultMarginAfterVatKRWWithMrBaseExchangeRate) || 0} ({selectResultMber?.name})</div>
                    </div>
                </>
            }
        </St.ResultWrapper>
    );
}

function PurchasePriceFieldWithModule({
    mrPurchaseModule,
    mrBaseExchangeRateList

}) {
    const purchaseUnitPriceWithExchangeRate = customNumberUtils.roundToDigit(calculcateUtils.getPurchaseUnitPriceKRW(mrPurchaseModule, mrBaseExchangeRateList) / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, mrPurchaseModule?.purchaseUnitPriceMberId), 6);
    const purchaseUnitFreightCostWithExchangeRate = customNumberUtils.roundToDigit(calculcateUtils.getPurchaseUnitFreightCostKRW(mrPurchaseModule, mrBaseExchangeRateList) / customNumberUtils.returnExchangeRateValue(mrBaseExchangeRateList, mrPurchaseModule?.purchaseUnitFreightCostMberId), 6);
    return (
        <div className='flexible'>
            <div className='input-box'>
                <label>매입단가</label>
                <div className='flexItem'>
                    <CustomInput
                        type='text'
                        name={'purchaseUnitPrice'}
                        value={customNumberUtils.numberWithCommas2(purchaseUnitPriceWithExchangeRate) || ''}
                        readOnly
                        placeholder='0'
                    />
                    <BaseExchangeRateButton
                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                        currentMberId={mrPurchaseModule?.purchaseUnitPriceMberId}
                        readOnly={true}
                    />
                </div>
            </div>
            <div className='input-box'>
                <label>매입운임비(개당)</label>
                <div className='flexItem'>
                    <CustomInput
                        type='text'
                        name={'purchaseUnitFreightCost'}
                        value={customNumberUtils.numberWithCommas2(purchaseUnitFreightCostWithExchangeRate) || ''}
                        readOnly
                        placeholder='0'
                    />
                    <BaseExchangeRateButton
                        mrBaseExchangeRateList={mrBaseExchangeRateList}
                        currentMberId={mrPurchaseModule?.purchaseUnitFreightCostMberId}
                        readOnly={true}
                    />
                </div>
            </div>
        </div>
    );
}