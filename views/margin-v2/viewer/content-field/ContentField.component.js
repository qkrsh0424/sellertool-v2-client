import Link from 'next/link';
import { numberWithCommas } from '../../../../utils/numberFormatUtils';
import { Container, FixedBottomNotice, FlexBlock, GridWrapper, InputBox, InputWrapper, LeftBox, ProductName, ResultBox, RightBox } from './styles/ContentField.styled';

const ContentFieldComponent = ({
    marginRecord
}) => {

    return (
        <>
            <Container>
                <ProductName>
                    {marginRecord?.name &&
                        <span>{marginRecord.name}</span>
                    }
                </ProductName>
                {marginRecord &&
                    (
                        <GridWrapper>
                            <LeftBox>
                                <InputWrapper>
                                    <InputBox>
                                        <div className='label-flex-box'>
                                            <div>판매가격</div>
                                            <div>{numberWithCommas(marginRecord.salePrice)} (원)</div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='input-flex-box'>
                                                <div className='unit'>‎₩</div>
                                                <input
                                                    type='number'
                                                    name={'salePrice'}
                                                    step={0.01}
                                                    value={marginRecord.salePrice}
                                                    onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                    min={0}
                                                    max={99999999999.99}
                                                    disabled
                                                ></input>
                                            </div>
                                        </div>
                                    </InputBox>
                                    <FlexBlock />
                                    <InputBox>
                                        <div className='label-flex-box'>
                                            <div>매입가격</div>
                                            <div>{numberWithCommas(marginRecord.purchaseCost)} (원)</div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='input-flex-box'>
                                                <div className='unit'>‎₩</div>
                                                <input
                                                    type='number'
                                                    name={'purchaseCost'}
                                                    step={0.01}
                                                    value={marginRecord.purchaseCost}
                                                    onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                    min={0}
                                                    max={99999999999.99}
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
                                            <div>{numberWithCommas(marginRecord.consumerDeliveryCharge)} (원)</div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='input-flex-box'>
                                                <div className='unit'>‎₩</div>
                                                <input
                                                    type='number'
                                                    name={'consumerDeliveryCharge'}
                                                    step={0.01}
                                                    value={marginRecord.consumerDeliveryCharge}
                                                    onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                    min={0}
                                                    max={99999999999.99}
                                                    disabled
                                                ></input>
                                            </div>
                                        </div>
                                    </InputBox>
                                    <FlexBlock />
                                    <InputBox>
                                        <div className='label-flex-box'>
                                            <div>판매자 실질 부담 운임비</div>
                                            <div>{numberWithCommas(marginRecord.sellerDeliveryCharge)} (원)</div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='input-flex-box'>
                                                <div className='unit'>‎₩</div>
                                                <input
                                                    type='number'
                                                    name={'sellerDeliveryCharge'}
                                                    step={0.01}
                                                    value={marginRecord.sellerDeliveryCharge}
                                                    onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                    min={0}
                                                    max={99999999999.99}
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
                                            <div>{numberWithCommas(marginRecord.purchaseDeliveryCharge)} (원)</div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='input-flex-box'>
                                                <div className='unit'>‎₩</div>
                                                <input
                                                    type='number'
                                                    name={'purchaseDeliveryCharge'}
                                                    step={0.01}
                                                    value={marginRecord.purchaseDeliveryCharge}
                                                    onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                    min={0}
                                                    max={99999999999.99}
                                                    disabled
                                                ></input>
                                            </div>
                                        </div>
                                    </InputBox>
                                    <FlexBlock />
                                    <InputBox>
                                        <div className='label-flex-box'>
                                            <div>기타비용</div>
                                            <div>{numberWithCommas(marginRecord.extraCost)} (원)</div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='input-flex-box'>
                                                <div className='unit'>‎₩</div>
                                                <input
                                                    type='number'
                                                    name={'extraCost'}
                                                    step={0.01}
                                                    value={marginRecord.extraCost}
                                                    onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                    min={0}
                                                    max={99999999999.99}
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
                                            <div>{marginRecord.commission} (%)</div>
                                        </div>
                                        <div className='input-group'>
                                            <div className='input-flex-box'>
                                                <div className='unit'>%</div>
                                                <input
                                                    type='number'
                                                    name='commission'
                                                    step={0.01}
                                                    value={marginRecord.commission}
                                                    onChange={(e) => onChangeMarginRecordNumberValueOfName(e)}
                                                    min={0}
                                                    max={100}
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
                                    <div className='title'>예상 최종 마진액 (세후)</div>
                                    <div className='result'>{numberWithCommas(marginRecord.margin - marginRecord.totalTax) || 0} (원)</div>
                                </ResultBox>
                                <ResultBox
                                    style={{
                                        border: '1px solid var(--mainColor)'
                                    }}
                                >
                                    <div className='title'>마진액 (세전)</div>
                                    <div className='result'>{numberWithCommas(marginRecord.margin) || 0} (원)</div>
                                </ResultBox>
                                <ResultBox
                                    style={{
                                        border: '1px solid var(--mainColor)'
                                    }}
                                >
                                    <div className='title'>마진율 (세전)</div>
                                    <div className='result'>{marginRecord.marginRate} (%)</div>
                                </ResultBox>
                                <ResultBox>
                                    <div className='title'>매출 합계</div>
                                    <div className='result'>{numberWithCommas(marginRecord.totalIncome || 0)} (원)</div>
                                </ResultBox>
                                <ResultBox>
                                    <div className='title'>매입 합계</div>
                                    <div className='result'>{numberWithCommas(marginRecord.totalExpense) || 0} (원)</div>
                                </ResultBox>
                                <ResultBox>
                                    <div className='title'>VAT (매출 VAT - 매입 VAT)</div>
                                    <div className='result'>{numberWithCommas(marginRecord.totalTax || 0)} (원)</div>
                                </ResultBox>
                            </RightBox>
                        </GridWrapper>
                    )
                }
            </Container>
            <FixedBottomNotice>
                <div>
                    마진율 계산기 뷰어 모드 입니다.
                </div>
                <Link
                    href='/margin/dashboard'
                    passHref
                >
                    <span style={{ fontSize: '17px', cursor: 'pointer', color:'var(--mainColor)' }}>
                        마진율 계산기 바로가기
                    </span>
                </Link>
            </FixedBottomNotice>
        </>
    );
}

export default ContentFieldComponent;