import { TextField } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { numberWithCommas, getRemovedPrefixZero, roundToTwo } from '../../../utils/numberFormatUtils';
import CommonModalComponent from '../../modules/modal/CommonModalComponent';
import MouseOverPopover from '../../modules/popover/MouseOverPopover';
import SnackbarCenter from '../../modules/snackbar/SnackbarCenter';
import RecordCreateModalComponent from './RecordCreateModalComponent';
import RecordLoadModalComponent from './RecordLoadModalComponent';
import RecordUpdateModalComponent from './RecordUpdateModalComponent';

const Container = styled.div`
    overflow: hidden;
    padding: 0 30px;

    @media all and (max-width:992px){
        padding: 10px;
    }
`;

const ProductName = styled.div`
    padding:10px 20px;
    
    span{
        display: inline-block;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 700;
        border-left: 4px solid #2C73D2;
    }
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    border-radius: 5px;
    transition: all .5s;

    @media all and (max-width:992px){
        grid-template-columns: 100%;
    }
`;

const LeftBox = styled.form`
    padding: 10px;
    border-right: 2px solid #e1e1e1;

    @media all and (max-width:992px){
        border-right: none;
        border-bottom: 2px solid #e1e1e1;
    }
`;

const RightBox = styled.div`
    padding: 20px;
`;

const InputGridBox = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;

    @media all and (max-width:992px){
        grid-template-columns: 100%;
    }
`;

const InputBox = styled.div`
    padding: 10px;

    .label-flex-box{
        /* display: inline-block; */
        display: flex;
        justify-content: space-between;
        color:#444;
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 10px;
    }
    
    .input-flex-box{
        display: flex;
        align-items: center;
        border: 2px solid #2C73D2;
        border-radius: 5px;
    }
    
    .unit{
        /* padding:0 10px; */
        width: 50px;
        text-align: center;
        color:#2C73D2;
        font-weight: 600;
    }

    input{
        width: 100%;
        padding: 10px;
        outline: none;
        
        /* border: 2px solid #e1e1e1; */
        border: none;
        border-left: none;
        border-radius: 5px;
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;

        transition: all .5s;

        font-size: 16px;
        color: #444;
    }

    input:focus{
        outline: none;

        /* border: 2px solid #2C73D2; */
        border-left: none;
    }

`;

const CommonWrapper = styled.div`
    overflow: hidden;
    padding:0 10px;
`;

const ButtonBox = styled.div`
    padding: 10px;
    overflow: hidden;

    .calc-button{
        width: calc(50% - 10px);
        float: right;
        padding: 10px;
        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        transition: all .5s;
        &:hover{
            background: #309FFF;
            border: 1px solid #309FFF;
        }
    }

    @media all and (max-width:992px){
        .calc-button{
            float: none;
            width: 100%;
        }
    }
`;

const FlexRightBox = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 10px;

    .control-btn{
        position: relative;
        margin-left: 7px;
        width: 50px;
        height: 50px;
        /* padding: 8px 25px; */
        
        background: white;
        /* border: 1px solid #d1d1d1; */
        border-radius: 50%;

        color: #444;
        font-weight: 600;

        cursor: pointer;

        transition: all .3s;

        &:hover{
            background: #e1e1e140;
            color: white;
        }

        &:active{
            transition: all 0s;
            background: #e1e1e180;
        }
    }

    .control-btn .icon{
        position: relative;
        width: 30px;
        height: 30px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const ResultBox = styled.div`
    overflow: hidden;
    padding: 10px;
    margin-bottom: 20px;
    background: linear-gradient(40deg, #2C73D2, #309FFF);
    border-radius: 5px;
    color: white;
    .title{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
        /* padding-left: 10px; */
    }

    .result{
        float: right;
        font-size: 18px;
        font-weight: 700;
    }
`;

const initialMarginDataControlState = {
    salePrice: '0',
    purchaseCost: '0',
    consumerDeliveryCharge: '0',
    sellerDeliveryCharge: '0',
    purchaseDeliveryCharge: '0',
    extraCost: '0',
    commission: '0',
    totalIncome: '0',
    totalIncomeInterestExpense: '0',
    totalExpense: '0',
    margin: '0',
    marginRate: '0',
    incomeTax: '0',
    expenseTax: '0',
    totalTax: '0'
};

const marginDataControlStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        case 'SET_MARGIN_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'REFRESH': {
            return initialMarginDataControlState
        }
        default: return { ...state };
    }
}

const DashboardComponent = (props) => {
    const router = useRouter();
    const workspaceRdx = useSelector(state => state.workspaceState);

    const [marginDataControlState, dispatchMarginDataControlState] = useReducer(marginDataControlStateReducer, initialMarginDataControlState);
    const [recordCreateModalOpen, setRecordCreateModalOpen] = useState(false);
    const [recordLoadModalOpen, setRecordLoadModalOpen] = useState(false);
    const [recordUpdateModalOpen, setRecordUpdateModalOpen] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverMessage, setPopoverMessage] = useState('');

    useEffect(() => {
        if (!props.marginRecordState) {
            dispatchMarginDataControlState({
                type: 'REFRESH'
            })
            return;
        }
        dispatchMarginDataControlState({
            type: 'INIT_DATA',
            payload: props.marginRecordState
        })

    }, [props.marginRecordState, router])
    const onChangeMarginDataControlValue = (e) => {
        let value = e.target.value;
        value = getRemovedPrefixZero(value);

        dispatchMarginDataControlState({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: value || '0'
            }
        })
    }

    const onCalculateMargin = (e) => {
        e.preventDefault();

        // 매출 총액
        let totalIncome = parseFloat(marginDataControlState.salePrice) + parseFloat(marginDataControlState.consumerDeliveryCharge);

        // 수수료 비용
        let totalIncomeInterestExpense = totalIncome * parseFloat(marginDataControlState.commission * 0.01);

        // 매입 총 비용
        let totalExpense = parseFloat(marginDataControlState.purchaseCost) + parseFloat(marginDataControlState.purchaseDeliveryCharge) + parseFloat(marginDataControlState.sellerDeliveryCharge) + parseFloat(marginDataControlState.extraCost) + totalIncomeInterestExpense;

        // 마진액
        let margin = totalIncome - totalExpense;

        // 마진율
        let marginRate = margin / totalIncome * 100;

        // 매출 부가세
        let incomeTax = totalIncome - (totalIncome / 1.1);

        // 매입 부가세
        let expenseTax = totalExpense - (totalExpense / 1.1);

        // 총 부가세
        let totalTax = incomeTax - expenseTax;

        let payload = {
            totalIncome: roundToTwo(totalIncome),
            totalIncomeInterestExpense: roundToTwo(totalIncomeInterestExpense),
            totalExpense: roundToTwo(totalExpense),
            margin: roundToTwo(margin),
            marginRate: roundToTwo(marginRate),
            incomeTax: roundToTwo(incomeTax),
            expenseTax: roundToTwo(expenseTax),
            totalTax: roundToTwo(totalTax)
        }

        dispatchMarginDataControlState({
            type: 'SET_MARGIN_DATA',
            payload: payload
        })
    }

    const _onSnackbarOpen = (message, severity) => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
        setSnackbarSeverity(severity)
    }

    const _onSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    const _onSaveMarginRecord = (nameState) => {
        props.saveMarginRecord(marginDataControlState, nameState);
    }

    const _onUpdateMarginRecord = (e, nameState) => {
        let params = {
            ...marginDataControlState,
            'name': nameState
        }
        props.updateMarginRecord(params);
    }

    const _onRecordCreateModalOpen = (e) => {
        onCalculateMargin(e);
        setRecordCreateModalOpen(true);
    }

    const _onRecordCreateModalClose = () => {
        setRecordCreateModalOpen(false);
    }

    const _onRecordLoadModalOpen = () => {
        props.getMarginRecordList();
        setRecordLoadModalOpen(true);
    }

    const _onRecordLoadModalClose = () => {
        setRecordLoadModalOpen(false);
        props.clearMarginRecordList();
    }

    const _onRecordUpdateModalOpen = (e) => {
        onCalculateMargin(e);
        setRecordUpdateModalOpen(true);
    }

    const _onRecordUpdateModalClose = () => {
        setRecordUpdateModalOpen(false);
    }

    const _onRefreshDashboard = () => {
        router.replace({
            pathname: router.pathname
        });
        _onSnackbarOpen('새로고침 되었습니다.', 'success');
    }

    const _onCopyViewerUrl = () => {
        let url = `${location.origin}/margin/viewer/?marginRecordId=${props.marginRecordState.id}&openKey=${props.marginRecordState.openKey}`;
        navigator.clipboard.writeText(url);
        _onSnackbarOpen('뷰어 주소가 복사되었습니다.', 'success');
    }

    const _onPopoverOpen = (e, message) => {
        setPopoverMessage(message)
        setAnchorEl(e.currentTarget);
    }

    const _onPopoverClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Container>
                <CommonWrapper>
                    <FlexRightBox>
                        {/* 리프레시 버튼 */}
                        <div
                            className='control-btn'
                            onClick={() => _onRefreshDashboard()}
                            onMouseEnter={(e) => _onPopoverOpen(e, '새로고침')}
                            onMouseLeave={() => _onPopoverClose()}
                        >
                            <div className='icon'>
                                <Image
                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                    src='images/icon/refresh_icon.png'
                                    layout='fill'
                                    alt=""
                                ></Image>
                            </div>
                        </div>

                        {/* 북마크 버튼 */}
                        {workspaceRdx.info &&
                            <div
                                className='control-btn'
                                onClick={() => _onRecordLoadModalOpen()}
                                onMouseEnter={(e) => _onPopoverOpen(e, '불러오기')}
                                onMouseLeave={() => _onPopoverClose()}
                            >
                                <div className='icon'>
                                    <Image src='/images/icon/bookmark_icon.png' layout='fill' alt=""></Image>
                                </div>
                            </div>
                        }

                        {/* 저장 버튼 */}
                        {workspaceRdx.info &&
                            <>
                                {!props.marginRecordState &&
                                    <div
                                        className='control-btn'
                                        onClick={(e) => _onRecordCreateModalOpen(e)}
                                        onMouseEnter={(e) => _onPopoverOpen(e, '저장하기')}
                                        onMouseLeave={() => _onPopoverClose()}
                                    >
                                        <div className='icon'>
                                            <Image src='/images/icon/add_icon.png' layout='fill' alt=""></Image>
                                        </div>
                                    </div>
                                }
                            </>
                        }

                        {/* 수정 버튼 */}
                        {workspaceRdx.info &&
                            <>
                                {props.marginRecordState &&
                                    <div
                                        className='control-btn'
                                        onClick={(e) => _onRecordUpdateModalOpen(e)}
                                        onMouseEnter={(e) => _onPopoverOpen(e, '수정하기')}
                                        onMouseLeave={() => _onPopoverClose()}
                                    >
                                        <div className='icon'>
                                            <Image src='/images/icon/pen_icon.png' layout='fill' alt=""></Image>
                                        </div>
                                    </div>
                                }
                            </>
                        }

                        {/* 뷰어 주소 복사 버튼 */}
                        {workspaceRdx.info &&
                            <>
                                {props.marginRecordState &&
                                    <div
                                        className='control-btn'
                                        onClick={(e) => _onCopyViewerUrl(e)}
                                        onMouseEnter={(e) => _onPopoverOpen(e, '뷰어 주소 복사')}
                                        onMouseLeave={() => _onPopoverClose()}
                                    >
                                        <div className='icon'>
                                            <Image src='/images/icon/copy_icon.png' layout='fill' alt=""></Image>
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </FlexRightBox>
                </CommonWrapper>
                {marginDataControlState?.name &&
                    <ProductName>
                        <span>{marginDataControlState.name}</span>
                    </ProductName>
                }

                <GridWrapper>
                    <LeftBox onSubmit={(e) => onCalculateMargin(e)}>
                        <InputGridBox>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>판매가격</div>
                                    <div>{numberWithCommas(marginDataControlState.salePrice)} (원)</div>
                                </div>
                                <div className='input-flex-box'>
                                    <div className='unit'>‎₩</div>
                                    <input type='number' name={'salePrice'} step={0.01} value={marginDataControlState.salePrice} onChange={(e) => onChangeMarginDataControlValue(e)} min={0} max={99999999999}></input>
                                </div>
                            </InputBox>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>매입가격</div>
                                    <div>{numberWithCommas(marginDataControlState.purchaseCost)} (원)</div>
                                </div>
                                <div className='input-flex-box'>
                                    <div className='unit'>‎₩</div>
                                    <input type='number' name={'purchaseCost'} step={0.01} value={marginDataControlState.purchaseCost} onChange={(e) => onChangeMarginDataControlValue(e)} min={0} max={99999999999}></input>
                                </div>
                            </InputBox>
                        </InputGridBox>
                        <InputGridBox>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>소비자 부담 운임비</div>
                                    <div>{numberWithCommas(marginDataControlState.consumerDeliveryCharge)} (원)</div>
                                </div>
                                <div className='input-flex-box'>
                                    <div className='unit'>‎₩</div>
                                    <input type='number' name={'consumerDeliveryCharge'} step={0.01} value={marginDataControlState.consumerDeliveryCharge} onChange={(e) => onChangeMarginDataControlValue(e)} min={0} max={99999999999}></input>
                                </div>
                            </InputBox>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>판매자 실질 부담 운임비</div>
                                    <div>{numberWithCommas(marginDataControlState.sellerDeliveryCharge)} (원)</div>
                                </div>
                                <div className='input-flex-box'>
                                    <div className='unit'>‎₩</div>
                                    <input type='number' name={'sellerDeliveryCharge'} step={0.01} value={marginDataControlState.sellerDeliveryCharge} onChange={(e) => onChangeMarginDataControlValue(e)} min={0} max={99999999999}></input>
                                </div>
                            </InputBox>
                        </InputGridBox>
                        <InputGridBox>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>매입 운임비</div>
                                    <div>{numberWithCommas(marginDataControlState.purchaseDeliveryCharge)} (원)</div>
                                </div>
                                <div className='input-flex-box'>
                                    <div className='unit'>‎₩</div>
                                    <input type='number' name={'purchaseDeliveryCharge'} step={0.01} value={marginDataControlState.purchaseDeliveryCharge} onChange={(e) => onChangeMarginDataControlValue(e)} min={0} max={99999999999}></input>
                                </div>
                            </InputBox>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>기타비용</div>
                                    <div>{numberWithCommas(marginDataControlState.extraCost)} (원)</div>
                                </div>
                                <div className='input-flex-box'>
                                    <div className='unit'>‎₩</div>
                                    <input type='number' name={'extraCost'} step={0.01} value={marginDataControlState.extraCost} onChange={(e) => onChangeMarginDataControlValue(e)} min={0} max={99999999999}></input>
                                </div>
                            </InputBox>
                        </InputGridBox>
                        <InputGridBox>
                            <InputBox>
                                <div className='label-flex-box'>
                                    <div>마켓 수수료</div>
                                    <div>{marginDataControlState.commission} (%)</div>
                                </div>
                                <div className='input-flex-box'>
                                    <div className='unit'>%</div>
                                    <input type='number' name='commission' step={0.01} value={marginDataControlState.commission} onChange={(e) => onChangeMarginDataControlValue(e)} min={0} max={100}></input>
                                </div>
                            </InputBox>
                        </InputGridBox>
                        <ButtonBox>
                            <button type='submit' className='calc-button'>계산하기</button>
                        </ButtonBox>
                    </LeftBox>
                    <RightBox>
                        <ResultBox>
                            <div className='title'>예상 최종 마진액 (세후)</div>
                            <div className='result'>{numberWithCommas(marginDataControlState.margin - marginDataControlState.totalTax) || 0} (원)</div>
                        </ResultBox>
                        <ResultBox>
                            <div className='title'>마진액 (세전)</div>
                            <div className='result'>{numberWithCommas(marginDataControlState.margin) || 0} (원)</div>
                        </ResultBox>
                        <ResultBox>
                            <div className='title'>마진율 (세전)</div>
                            <div className='result'>{marginDataControlState.marginRate} (%)</div>
                        </ResultBox>
                        <ResultBox>
                            <div className='title'>매출 합계</div>
                            <div className='result'>{numberWithCommas(marginDataControlState.totalIncome || 0)} (원)</div>
                        </ResultBox>
                        <ResultBox>
                            <div className='title'>매입 합계</div>
                            <div className='result'>{numberWithCommas(marginDataControlState.totalExpense) || 0} (원)</div>
                        </ResultBox>
                        <ResultBox>
                            <div className='title'>VAT (매출 VAT - 매입 VAT)</div>
                            <div className='result'>{numberWithCommas(marginDataControlState.totalTax || 0)} (원)</div>
                        </ResultBox>
                    </RightBox>
                </GridWrapper>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={recordCreateModalOpen}

                onClose={() => _onRecordCreateModalClose()}
            >
                <RecordCreateModalComponent
                    onConfirm={(nameState) => _onSaveMarginRecord(nameState)}
                    onClose={() => _onRecordCreateModalClose()}
                ></RecordCreateModalComponent>
            </CommonModalComponent>
            <CommonModalComponent
                open={recordLoadModalOpen}

                onClose={() => _onRecordLoadModalClose()}
            >
                <RecordLoadModalComponent
                    marginRecordListState={props.marginRecordListState}

                    onDelete={(marginRecordId) => props.deleteMarginRecord(marginRecordId)}
                    onClose={() => _onRecordLoadModalClose()}
                ></RecordLoadModalComponent>
            </CommonModalComponent>
            <CommonModalComponent
                open={recordUpdateModalOpen}

                onClose={() => _onRecordUpdateModalClose()}
            >
                <RecordUpdateModalComponent
                    marginDataControlState={marginDataControlState}

                    onClose={() => _onRecordUpdateModalClose()}
                    onConfirm={(e, nameState) => _onUpdateMarginRecord(e, nameState)}
                ></RecordUpdateModalComponent>
            </CommonModalComponent>

            {/* Snackbar */}
            <SnackbarCenter
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}

                onClose={() => _onSnackbarClose()}
            ></SnackbarCenter>

            {/* Popover */}
            <MouseOverPopover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                message={popoverMessage}

                onClose={() => _onPopoverClose()}
            ></MouseOverPopover>
        </>
    );
}

export default DashboardComponent;