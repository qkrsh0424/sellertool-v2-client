import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { numberWithCommas } from '../../../../utils/numberFormatUtils';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';
import CommonModalComponent from '../../../modules/modal/CommonModalComponent';
import MouseOverPopover from '../../../modules/popover/MouseOverPopover';
import { ButtonBox, CommonWrapper, Container, FlexBlock, FlexRightBox, GridWrapper, InputBox, InputWrapper, LeftBox, ProductName, ResultBox, RightBox } from './styles/ContentField.styled';
import MarginRecordsModalComponent from './modal/MarginRecordsModal.component';
import useMarginRecordFormHook from '../hooks/useMarginRecordFormHook';
import usePopoverHook from '../../../../hooks/popover/usePopoverHook';
import CreateMarginRecordModalComponent from './modal/CreateMarginRecordModal.component';
import UpdateMarginRecordModalComponent from './modal/UpdateMarginRecordModal.component';

const ContentFieldComponent = (props) => {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const {
        marginRecordForm,
        onSetMarginRecordForm,
        onChangeMarginRecordNumberValueOfName,
        onChangeMarginRecordTextValueOfName,
        onActionCalculateMargin,
        onActionClearForm,
        checkNameValueFormatValid
    } = useMarginRecordFormHook();

    const {
        popoverAnchorEl,
        popoverMessage,
        onActionOpenPopover,
        onActionClosePopover
    } = usePopoverHook();

    const [marginRecordsModalOpen, setMarginRecordsModalOpen] = useState(false);
    const [createMarginRecordModalOpen, setCreateMarginRecordModalOpen] = useState(false);
    const [updateMarginRecordModalOpen, setUpdateMarginRecordModalOpen] = useState(false);

    useEffect(() => {
        if (!props.marginRecord) {
            onActionClearForm();
            return;
        }
        onSetMarginRecordForm(props.marginRecord);

    }, [props.marginRecord]);

    const __handle = {
        action: {
            openMarginRecordsModal: () => {
                setMarginRecordsModalOpen(true);
            },
            closeMarginRecordsModal: () => {
                setMarginRecordsModalOpen(false);
            },
            openCreateMarginRecordModal: () => {
                try {
                    onActionCalculateMargin()
                    setCreateMarginRecordModalOpen(true);
                } catch (err) {
                    alert(err.message);
                    return;
                }
            },
            closeCreateMarginRecordModal: () => {
                setCreateMarginRecordModalOpen(false);
            },
            openUpdateMarginRecordModal: () => {
                try {
                    onActionCalculateMargin()
                    setUpdateMarginRecordModalOpen(true);
                } catch (err) {
                    alert(err.message);
                    return;
                }
            },
            closeUpdateMarginRecordModal: () => {
                setUpdateMarginRecordModalOpen(false);
            },
            calculateMargin: (e) => {
                e.preventDefault();
                try {
                    onActionCalculateMargin()
                } catch (err) {
                    alert(err.message);
                    return;
                }
            },
            refresh: () => {
                router.replace({
                    pathname: '/margin/dashboard'
                });
            },
            copyViewerUrl: async () => {
                let url = `${location.origin}/margin/viewer/?marginRecordId=${props.marginRecord.id}&openKey=${props.marginRecord.openKey}`;
                await navigator.clipboard.writeText(url);
                alert('뷰어 주소가 복사되었습니다.');
            }
        },
        submit: {
            createMarginRecord: () => {
                try {
                    checkNameValueFormatValid(marginRecordForm.name);
                } catch (err) {
                    alert(err.message);
                    return;
                }

                let body = {
                    ...marginRecordForm,
                    workspaceId: workspaceRedux?.workspaceInfo?.id,
                }
                props.onSubmitCreateMarginRecord({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeCreateMarginRecordModal();
                    }
                });
            },
            updateMarginRecord: () => {
                try {
                    checkNameValueFormatValid(marginRecordForm.name);
                } catch (err) {
                    alert(err.message);
                    return;
                }

                let body = {
                    ...marginRecordForm,
                    id: props.marginRecord.id,
                }

                props.onSubmitUpdateMarginRecord({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeUpdateMarginRecordModal();
                    }
                });
            },
            deleteMarginRecord: (marginRecordId) => {
                let body = {
                    marginRecordId: marginRecordId
                }
                props.onSubmitDeleteMarginRecord({
                    body: body,
                    successCallback: () => { }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <ProductName>
                    {props.marginRecord?.name &&
                        <span>{props.marginRecord.name}</span>
                    }
                </ProductName>
                <CommonWrapper>
                    <FlexRightBox>
                        {/* 리프레시 버튼 */}
                        <SingleBlockButton
                            type='button'
                            className='control-btn'
                            onClick={() => __handle.action.refresh()}
                            onMouseEnter={(e) => onActionOpenPopover(e, '새로고침')}
                            onMouseLeave={() => onActionClosePopover()}
                        >
                            <div className='icon'>
                                <Image
                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                    src='images/icon/refresh_default_808080.svg'
                                    layout='fill'
                                    alt=""
                                ></Image>
                            </div>
                        </SingleBlockButton>

                        {/* 북마크 버튼 */}
                        {workspaceRedux.workspaceInfo &&
                            <SingleBlockButton
                                type='button'
                                className='control-btn'
                                onClick={() => __handle.action.openMarginRecordsModal()}
                                onMouseEnter={(e) => onActionOpenPopover(e, '불러오기')}
                                onMouseLeave={() => onActionClosePopover()}
                            >
                                <div className='icon'>
                                    <Image src='/images/icon/folder_default_808080.svg' layout='fill' alt=""></Image>
                                </div>
                            </SingleBlockButton>
                        }

                        {/* 저장 버튼 */}
                        {workspaceRedux.workspaceInfo &&
                            <>
                                {!props.marginRecord &&
                                    <SingleBlockButton
                                        type='button'
                                        className='control-btn'
                                        onClick={() => __handle.action.openCreateMarginRecordModal()}
                                        onMouseEnter={(e) => onActionOpenPopover(e, '저장하기')}
                                        onMouseLeave={() => onActionClosePopover()}
                                    >
                                        <div className='icon'>
                                            <Image src='/images/icon/add_default_808080.svg' layout='fill' alt=""></Image>
                                        </div>
                                    </SingleBlockButton>
                                }
                            </>
                        }

                        {/* 수정 버튼 */}
                        {workspaceRedux.workspaceInfo &&
                            <>
                                {props.marginRecord &&
                                    <SingleBlockButton
                                        type='button'
                                        className='control-btn'
                                        onClick={() => __handle.action.openUpdateMarginRecordModal()}
                                        onMouseEnter={(e) => onActionOpenPopover(e, '수정하기')}
                                        onMouseLeave={() => onActionClosePopover()}
                                    >
                                        <div className='icon'>
                                            <Image src='/images/icon/rename_default_808080.svg' layout='fill' alt=""></Image>
                                        </div>
                                    </SingleBlockButton>
                                }
                            </>
                        }

                        {/* 뷰어 주소 복사 버튼 */}
                        {workspaceRedux.workspaceInfo &&
                            <>
                                {props.marginRecord &&
                                    <SingleBlockButton
                                        type='button'
                                        className='control-btn'
                                        onClick={(e) => __handle.action.copyViewerUrl(e)}
                                        onMouseEnter={(e) => onActionOpenPopover(e, '뷰어 주소 복사')}
                                        onMouseLeave={() => onActionClosePopover()}
                                    >
                                        <div className='icon'>
                                            <Image src='/images/icon/copy_default_808080.svg' layout='fill' alt=""></Image>
                                        </div>
                                    </SingleBlockButton>
                                }
                            </>
                        }
                    </FlexRightBox>
                </CommonWrapper>
                <GridWrapper>
                    <LeftBox onSubmit={(e) => __handle.action.calculateMargin(e)}>
                        <InputWrapper>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>판매가격</div>
                                    <div>{numberWithCommas(marginRecordForm.salePrice)} (원)</div>
                                </div>
                                <div className='input-group'>
                                    <div className='input-flex-box'>
                                        <div className='unit'>‎₩</div>
                                        <input
                                            type='number'
                                            name={'salePrice'}
                                            step={0.01}
                                            value={marginRecordForm.salePrice}
                                            onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            min={0}
                                            max={99999999999.99}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </InputBox>
                            <FlexBlock />
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>매입가격</div>
                                    <div>{numberWithCommas(marginRecordForm.purchaseCost)} (원)</div>
                                </div>
                                <div className='input-group'>
                                    <div className='input-flex-box'>
                                        <div className='unit'>‎₩</div>
                                        <input
                                            type='number'
                                            name={'purchaseCost'}
                                            step={0.01}
                                            value={marginRecordForm.purchaseCost}
                                            onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            min={0}
                                            max={99999999999.99}
                                            required
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
                                    <div>{numberWithCommas(marginRecordForm.consumerDeliveryCharge)} (원)</div>
                                </div>
                                <div className='input-group'>
                                    <div className='input-flex-box'>
                                        <div className='unit'>‎₩</div>
                                        <input
                                            type='number'
                                            name={'consumerDeliveryCharge'}
                                            step={0.01}
                                            value={marginRecordForm.consumerDeliveryCharge}
                                            onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            min={0}
                                            max={99999999999.99}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </InputBox>
                            <FlexBlock />
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>판매자 실질 부담 운임비</div>
                                    <div>{numberWithCommas(marginRecordForm.sellerDeliveryCharge)} (원)</div>
                                </div>
                                <div className='input-group'>
                                    <div className='input-flex-box'>
                                        <div className='unit'>‎₩</div>
                                        <input
                                            type='number'
                                            name={'sellerDeliveryCharge'}
                                            step={0.01}
                                            value={marginRecordForm.sellerDeliveryCharge}
                                            onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            min={0}
                                            max={99999999999.99}
                                            required
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
                                    <div>{numberWithCommas(marginRecordForm.purchaseDeliveryCharge)} (원)</div>
                                </div>
                                <div className='input-group'>
                                    <div className='input-flex-box'>
                                        <div className='unit'>‎₩</div>
                                        <input
                                            type='number'
                                            name={'purchaseDeliveryCharge'}
                                            step={0.01}
                                            value={marginRecordForm.purchaseDeliveryCharge}
                                            onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            min={0}
                                            max={99999999999.99}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </InputBox>
                            <FlexBlock />
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>기타비용</div>
                                    <div>{numberWithCommas(marginRecordForm.extraCost)} (원)</div>
                                </div>
                                <div className='input-group'>
                                    <div className='input-flex-box'>
                                        <div className='unit'>‎₩</div>
                                        <input
                                            type='number'
                                            name={'extraCost'}
                                            step={0.01}
                                            value={marginRecordForm.extraCost}
                                            onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            min={0}
                                            max={99999999999.99}
                                            required
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
                                    <div>{marginRecordForm.commission} (%)</div>
                                </div>
                                <div className='input-group'>
                                    <div className='input-flex-box'>
                                        <div className='unit'>%</div>
                                        <input
                                            type='number'
                                            name='commission'
                                            step={0.01}
                                            value={marginRecordForm.commission}
                                            onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                            min={0}
                                            max={100}
                                            required
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
                            <div className='title'>예상 최종 마진액 (세후)</div>
                            <div className='result'>{numberWithCommas(marginRecordForm.margin - marginRecordForm.totalTax) || 0} (원)</div>
                        </ResultBox>
                        <ResultBox
                            style={{
                                border: '1px solid var(--mainColor)'
                            }}
                        >
                            <div className='title'>마진액 (세전)</div>
                            <div className='result'>{numberWithCommas(marginRecordForm.margin) || 0} (원)</div>
                        </ResultBox>
                        <ResultBox
                            style={{
                                border: '1px solid var(--mainColor)'
                            }}
                        >
                            <div className='title'>마진율 (세전)</div>
                            <div className='result'>{marginRecordForm.marginRate} (%)</div>
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
                            <div className='title'>VAT (매출 VAT - 매입 VAT)</div>
                            <div className='result'>{numberWithCommas(marginRecordForm.totalTax || 0)} (원)</div>
                        </ResultBox>
                    </RightBox>
                </GridWrapper>
            </Container>

            {marginRecordsModalOpen &&
                (
                    <CommonModalComponent
                        open={marginRecordsModalOpen}

                        onClose={__handle.action.closeMarginRecordsModal}
                    >
                        <MarginRecordsModalComponent
                            onClose={__handle.action.closeMarginRecordsModal}
                        />
                    </CommonModalComponent>
                )
            }
            {createMarginRecordModalOpen &&
                (
                    <CommonModalComponent
                        open={createMarginRecordModalOpen}

                        onClose={__handle.action.closeCreateMarginRecordModal}
                    >
                        <CreateMarginRecordModalComponent
                            marginRecordForm={marginRecordForm}

                            onConfirm={__handle.submit.createMarginRecord}
                            onClose={__handle.action.closeCreateMarginRecordModal}
                            onChangeValueOfName={onChangeMarginRecordTextValueOfName}
                        />
                    </CommonModalComponent>
                )
            }
            {updateMarginRecordModalOpen &&
                (
                    <CommonModalComponent
                        open={updateMarginRecordModalOpen}

                        onClose={__handle.action.closeUpdateMarginRecordModal}
                    >
                        <UpdateMarginRecordModalComponent
                            marginRecordForm={marginRecordForm}

                            onClose={__handle.action.closeUpdateMarginRecordModal}
                            onConfirm={__handle.submit.updateMarginRecord}
                            onChangeValueOfName={onChangeMarginRecordTextValueOfName}
                        />
                    </CommonModalComponent>
                )
            }

            {/* Popover */}
            {Boolean(popoverAnchorEl) &&
                <MouseOverPopover
                    open={Boolean(popoverAnchorEl)}
                    anchorEl={popoverAnchorEl}
                    message={popoverMessage}

                    onClose={onActionClosePopover}
                />
            }
        </>
    );
}

export default ContentFieldComponent;