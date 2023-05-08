import Link from 'next/link';
import { numberFormatUtils, numberWithCommas } from '../../../../utils/numberFormatUtils';
import { Container, FixedBottomNotice, FlexBlock, GridWrapper, InputBox, InputWrapper, LeftBox, ResultBox, RightBox, Wrapper } from './styles/ContentField.styled';

const ContentFieldComponent = ({
    marginRecord
}) => {

    return (
        <>
            <Container>
                <Wrapper>
                    {marginRecord &&
                        (
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
                                                        value={numberFormatUtils.numberWithCommas(marginRecord?.salePrice) || ''}
                                                        onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                        disabled
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
                                                        value={numberFormatUtils.numberWithCommas(marginRecord?.purchaseCost) || ''}
                                                        onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                        disabled
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
                                                        value={numberFormatUtils.numberWithCommas(marginRecord?.consumerDeliveryCharge) || ''}
                                                        onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                        disabled
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
                                                        value={numberFormatUtils.numberWithCommas(marginRecord?.sellerDeliveryCharge) || ''}
                                                        onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                        disabled
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
                                                        value={numberFormatUtils.numberWithCommas(marginRecord?.purchaseDeliveryCharge) || ''}
                                                        onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                        disabled
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
                                                        value={numberFormatUtils.numberWithCommas(marginRecord?.extraCost) || ''}
                                                        onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                        disabled
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
                                                        value={marginRecord?.commission}
                                                        onChange={(e) => onChangeMarginRecordCommission(e)}
                                                        disabled
                                                    ></input>
                                                </div>
                                            </div>
                                        </InputBox>
                                        <FlexBlock />
                                        <div style={{ flex: 1 }}></div>
                                    </InputWrapper>
                                </LeftBox>
                                <FlexBlock />
                                <RightBox>
                                    <ResultBox
                                        style={{
                                            border: '1px solid var(--mainColor)'
                                        }}
                                    >
                                        <div className='title'>마진율 (세전)</div>
                                        <div className='result'>{marginRecord?.marginRate || 0} (%)</div>
                                    </ResultBox>
                                    <ResultBox
                                        style={{
                                            border: '1px solid var(--mainColor)'
                                        }}
                                    >
                                        <div className='title'>마진액 (세전)</div>
                                        <div className='result'>{numberWithCommas(marginRecord?.margin) || 0} (원)</div>
                                    </ResultBox>
                                    <ResultBox>
                                        <div className='title'>매출 합계</div>
                                        <div className='result'>{numberWithCommas(marginRecord?.totalIncome || 0)} (원)</div>
                                    </ResultBox>
                                    <ResultBox>
                                        <div className='title'>매입 합계</div>
                                        <div className='result'>{numberWithCommas(marginRecord?.totalExpense) || 0} (원)</div>
                                    </ResultBox>
                                    <ResultBox>
                                        <div className='title'>VAT</div>
                                        <div className='result'>{numberWithCommas(marginRecord?.totalTax || 0)} (원)</div>
                                    </ResultBox>
                                    <ResultBox>
                                        <div className='title'>최종 마진액 (세후)</div>
                                        <div className='result'>{numberWithCommas(marginRecord?.margin - marginRecord?.totalTax) || 0} (원)</div>
                                    </ResultBox>
                                </RightBox>
                            </GridWrapper>
                        )
                    }
                </Wrapper>
            </Container>
            <FixedBottomNotice>
                <div>
                    마진율 계산기 뷰어 모드 입니다.
                </div>
                <Link
                    href='/margin/dashboard'
                    passHref
                >
                    <span style={{ fontSize: '17px', cursor: 'pointer', color: 'var(--mainColor)' }}>
                        마진율 계산기 바로가기
                    </span>
                </Link>
            </FixedBottomNotice>
        </>
    );
}

export default ContentFieldComponent;