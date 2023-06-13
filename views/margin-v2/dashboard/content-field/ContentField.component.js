import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { numberFormatUtils, numberWithCommas } from '../../../../utils/numberFormatUtils';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';
import { ButtonBox, CommonWrapper, Container, FlexBlock, FlexRightBox, GridWrapper, InputBox, InputWrapper, LeftBox, ProductName, ResultBox, RightBox, Wrapper } from './styles/ContentField.styled';
import useMarginRecordFormHook from '../hooks/useMarginRecordFormHook';
import CreateMarginRecordModalComponent from './modal/CreateMarginRecordModal.component';
import UpdateMarginRecordModalComponent from './modal/UpdateMarginRecordModal.component';
import ButtonGroupsView from './ButtonGroups.view';
import { toast } from 'react-toastify';
import { customToast, defaultOptions } from '../../../../components/toast/custom-react-toastify/v1';

const ContentFieldComponent = ({
    marginRecord,
    onSubmitCreateMarginRecord,
    onSubmitUpdateMarginRecord,
}) => {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const {
        marginRecordForm,
        onChangeMarginRecordNumberValueOfName,
        onChangeMarginRecordCommission,
        onChangeMarginRecordTextValueOfName,
        onActionCalculateMargin,
        onActionClearForm,
        checkNameValueFormatValid,
        checkTagValueFormatValid
    } = useMarginRecordFormHook(marginRecord);

    const [createMarginRecordModalOpen, setCreateMarginRecordModalOpen] = useState(false);
    const [updateMarginRecordModalOpen, setUpdateMarginRecordModalOpen] = useState(false);

    const handleRefresh = () => {
        router.replace({
            pathname: '/margin/dashboard'
        }, undefined, { scroll: false });
        onActionClearForm();
    }

    const toggleCreateMarginRecordModalOpen = (setOpen) => {
        if (setOpen) {
            try {
                onActionCalculateMargin()
            } catch (err) {
                alert(err.message);
                return;
            }
        }

        setCreateMarginRecordModalOpen(setOpen);
    }

    const toggleUpdateMarginRecordModalOpen = (setOpen) => {
        if (setOpen) {
            try {
                onActionCalculateMargin()

            } catch (err) {
                alert(err.message);
                return;
            }
        }

        setUpdateMarginRecordModalOpen(setOpen);
    }

    const handleCopyViewerUrl = async () => {
        let url = `${location.origin}/margin/viewer/?marginRecordId=${marginRecord?.id}&openKey=${marginRecord?.openKey}`;
        await navigator.clipboard.writeText(url);

        const content = '뷰어 주소가 복사되었습니다.'
        customToast.info(content, {
            ...defaultOptions,
            toastId: content
        });
    }

    const handleSubmitCalculateMargin = async (e) => {
        e.preventDefault();
        try {
            onActionCalculateMargin()
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    const handleSubmitCreateMarginRecord = async () => {
        try {
            checkNameValueFormatValid();
            checkTagValueFormatValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        let body = {
            ...marginRecordForm,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        onSubmitCreateMarginRecord(body, () => {
            toggleCreateMarginRecordModalOpen(false);
        });
    }

    const handleSubmitUpdateMarginRecord = async () => {
        try {
            checkNameValueFormatValid();
            checkTagValueFormatValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        let body = {
            ...marginRecordForm,
            id: marginRecord?.id,
        }

        onSubmitUpdateMarginRecord(body, () => {
            toggleUpdateMarginRecordModalOpen(false);
        });
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <ButtonGroupsView
                        marginRecord={marginRecord}
                        onActionRefresh={() => handleRefresh()}
                        onActionCreateModalOpen={() => toggleCreateMarginRecordModalOpen(true)}
                        onActionEditModalOpen={() => toggleUpdateMarginRecordModalOpen(true)}
                        onActionCopyViewerUrl={() => handleCopyViewerUrl()}
                    />
                    <GridWrapper>
                        <LeftBox onSubmit={(e) => handleSubmitCalculateMargin(e)}>
                            <InputWrapper>
                                <InputBox>
                                    <div className='label-flex-box'>
                                        <div>판매가격</div>
                                    </div>
                                    <div className='input-group'>
                                        <div className='input-flex-box'>
                                            <div className='unit'>‎₩</div>
                                            <input
                                                type='text'
                                                name={'salePrice'}
                                                value={numberFormatUtils.numberWithCommas(marginRecordForm?.salePrice) || ''}
                                                onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            ></input>
                                        </div>
                                    </div>
                                </InputBox>
                                <FlexBlock />
                                <InputBox>
                                    <div className='label-flex-box'>
                                        <div>매입가격</div>
                                    </div>
                                    <div className='input-group'>
                                        <div className='input-flex-box'>
                                            <div className='unit'>‎₩</div>
                                            <input
                                                type='text'
                                                name={'purchaseCost'}
                                                value={numberFormatUtils.numberWithCommas(marginRecordForm?.purchaseCost) || ''}
                                                onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            ></input>
                                        </div>
                                    </div>
                                </InputBox>
                            </InputWrapper>
                            <FlexBlock />
                            <InputWrapper>
                                <InputBox>
                                    <div className='label-flex-box'>
                                        <div>소비자 부담 운임비</div>
                                    </div>
                                    <div className='input-group'>
                                        <div className='input-flex-box'>
                                            <div className='unit'>‎₩</div>
                                            <input
                                                type='text'
                                                name={'consumerDeliveryCharge'}
                                                value={numberFormatUtils.numberWithCommas(marginRecordForm?.consumerDeliveryCharge) || ''}
                                                onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            ></input>
                                        </div>
                                    </div>
                                </InputBox>
                                <FlexBlock />
                                <InputBox>
                                    <div className='label-flex-box'>
                                        <div>판매자 부담 운임비</div>
                                    </div>
                                    <div className='input-group'>
                                        <div className='input-flex-box'>
                                            <div className='unit'>‎₩</div>
                                            <input
                                                type='text'
                                                name={'sellerDeliveryCharge'}
                                                value={numberFormatUtils.numberWithCommas(marginRecordForm?.sellerDeliveryCharge) || ''}
                                                onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            ></input>
                                        </div>
                                    </div>
                                </InputBox>
                            </InputWrapper>
                            <FlexBlock />
                            <InputWrapper>
                                <InputBox>
                                    <div className='label-flex-box'>
                                        <div>매입 운임비</div>
                                    </div>
                                    <div className='input-group'>
                                        <div className='input-flex-box'>
                                            <div className='unit'>‎₩</div>
                                            <input
                                                type='text'
                                                name={'purchaseDeliveryCharge'}
                                                value={numberFormatUtils.numberWithCommas(marginRecordForm?.purchaseDeliveryCharge) || ''}
                                                onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            ></input>
                                        </div>
                                    </div>
                                </InputBox>
                                <FlexBlock />
                                <InputBox>
                                    <div className='label-flex-box'>
                                        <div>기타비용</div>
                                    </div>
                                    <div className='input-group'>
                                        <div className='input-flex-box'>
                                            <div className='unit'>‎₩</div>
                                            <input
                                                type='text'
                                                name={'extraCost'}
                                                value={numberFormatUtils.numberWithCommas(marginRecordForm?.extraCost) || ''}
                                                onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            ></input>
                                        </div>
                                    </div>
                                </InputBox>
                            </InputWrapper>
                            <FlexBlock />
                            <InputWrapper>
                                <InputBox>
                                    <div className='label-flex-box'>
                                        <div>마켓 수수료</div>
                                    </div>
                                    <div className='input-group'>
                                        <div className='input-flex-box'>
                                            <div className='unit'>%</div>
                                            <input
                                                type='text'
                                                name='commission'
                                                value={marginRecordForm.commission}
                                                onChange={(e) => onChangeMarginRecordCommission(e)}
                                            ></input>
                                        </div>
                                    </div>
                                </InputBox>
                                <FlexBlock />
                                <div style={{ flex: 1 }}></div>
                            </InputWrapper>
                            <ButtonBox>
                                <SingleBlockButton
                                    type='submit'
                                    className='calc-button'
                                >
                                    계산하기
                                </SingleBlockButton>
                            </ButtonBox>
                        </LeftBox>
                        <FlexBlock />
                        <RightBox>
                            <ResultBox
                                style={{
                                    border: '1px solid var(--mainColor)'
                                }}
                            >
                                <div className='title'>마진율 (세전)</div>
                                <div className='result'>{marginRecordForm.marginRate || 0} (%)</div>
                            </ResultBox>
                            <ResultBox
                                style={{
                                    border: '1px solid var(--mainColor)'
                                }}
                            >
                                <div className='title'>마진액 (세전)</div>
                                <div className='result'>{numberWithCommas(marginRecordForm.margin) || 0} (원)</div>
                            </ResultBox>
                            <ResultBox>
                                <div className='title'>매출 합계</div>
                                <div className='result'>{numberWithCommas(marginRecordForm.totalIncome || 0)} (원)</div>
                            </ResultBox>
                            <ResultBox>
                                <div className='title'>매입 합계</div>
                                <div className='result'>{numberWithCommas(marginRecordForm.totalExpense) || 0} (원)</div>
                            </ResultBox>
                            <ResultBox>
                                <div className='title'>VAT</div>
                                <div className='result'>{numberWithCommas(marginRecordForm.totalTax || 0)} (원)</div>
                            </ResultBox>
                            <ResultBox>
                                <div className='title'>최종 마진액 (세후)</div>
                                <div className='result'>{numberWithCommas(marginRecordForm.margin - marginRecordForm.totalTax) || 0} (원)</div>
                            </ResultBox>
                        </RightBox>
                    </GridWrapper>
                </Wrapper>
            </Container>
            {createMarginRecordModalOpen &&
                (
                    <CreateMarginRecordModalComponent
                        open={createMarginRecordModalOpen}
                        onClose={() => toggleCreateMarginRecordModalOpen(false)}
                        onConfirm={handleSubmitCreateMarginRecord}

                        marginRecordForm={marginRecordForm}
                        onChangeValueOfName={onChangeMarginRecordTextValueOfName}
                    />
                )
            }
            {updateMarginRecordModalOpen &&
                (
                    <UpdateMarginRecordModalComponent
                        open={updateMarginRecordModalOpen}
                        onClose={() => toggleUpdateMarginRecordModalOpen(false)}
                        onConfirm={handleSubmitUpdateMarginRecord}

                        marginRecordForm={marginRecordForm}
                        onChangeValueOfName={onChangeMarginRecordTextValueOfName}
                    />
                )
            }
        </>
    );
}

export default ContentFieldComponent;