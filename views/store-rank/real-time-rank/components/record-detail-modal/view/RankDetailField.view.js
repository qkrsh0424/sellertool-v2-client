import { dateToYYYYMMDD } from "../../../../../../utils/dateFormatUtils";
import { CustomBoxImage } from "../../../modules/index";
import { DetailInfoWrapper, InfoGroupBox, Wrapper } from "../styles/RankDetail.styled";

const NAVER_SHOPPING_PRODUCT_URL = "https://smartstore.naver.com/main/products/"

export default function RankDetailFieldView({
    recordDetails
}) {
    return (
        <Wrapper>
            {recordDetails?.map(detail => {
                return (
                    <DetailInfoWrapper>
                        <div>
                            <CustomBoxImage
                                src={detail.thumbnailUrl}
                                size='200px'
                            />
                        </div>
                        <div>
                            <div className='info-field'>
                                <InfoGroupBox>
                                    <div className='sub-info'>
                                        {detail.advertisingYn === 'y' &&
                                            <div className='sub-info-box' style={{ "--default-box-color": "#707ca0" }}>광고</div>
                                        }
                                        {detail.priceComparisionYn === 'y' &&
                                            <div className='sub-info-box' style={{ "--default-box-color": "#9da0a9" }}>가격 비교</div>
                                        }
                                    </div>                                    
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div className='hover-effet'>
                                        <a href={NAVER_SHOPPING_PRODUCT_URL + detail.mallProductId} target="_blank" rel="noopener">
                                            <span className='accent-text'>{detail.productTitle}</span>
                                        </a>
                                    </div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>{detail.category1Name}</span>
                                        <span style={{ color: '#b4b4b4'}}>{' > '}</span>
                                        <span>{detail.category2Name}</span>
                                        <span style={{ color: '#b4b4b4'}}>{' > '}</span>
                                        <span>{detail.category3Name}</span>
                                        <span style={{ color: '#b4b4b4'}}>{' > '}</span>                            
                                        <span>{detail.category4Name}</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                            <div className='info-field'>
                                <InfoGroupBox>
                                    <div>
                                        <span className='accent-text'>{detail.price}</span>
                                        <span> 원</span>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <span>
                                            <CustomBoxImage
                                                src='/images/icon/delivery_truck_default_808080.svg'
                                                size='20px'
                                            />
                                        </span>
                                        <span>{detail.deliveryFee === 0 ? '무료' : detail.deliveryFee}</span>
                                    </div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>리뷰 : </span>
                                        <span>{detail.reviewCount}</span>
                                    </div>
                                    <div>
                                        <span>평점 : </span>
                                        <span>{detail.scoreInfo}</span>
                                    </div>
                                    <div>
                                        <span>구매 : </span>
                                        <span>{detail.purchaseCount}</span>
                                    </div>
                                    <div>
                                        <span>찜 : </span>
                                        <span>{detail.keepCount}</span>
                                    </div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>상품게시일 : </span>
                                        <span>{dateToYYYYMMDD(detail.registrationDate)}</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                            <div className='rank-field'>
                                <InfoGroupBox>
                                    {detail.priceComparisionYn === 'y' &&
                                        <div style={{ color: '#000', fontWeight: '700' }}>
                                            <span>가격 비교 </span>
                                            <span style={{ color: 'var(--mainColor)' }}>{detail.comparisionRank}위</span>
                                            <span> / </span>
                                            <span>{detail.lowMallCount}</span>
                                        </div>
                                    }
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div className='accent-text'>
                                        <span>총 </span>
                                        <span style={{ color: 'var(--mainColor)' }}>{detail.rank}위 </span>
                                    </div>
                                    <div>
                                        <span>({detail.page}페이지</span>
                                        <span>-</span>
                                        <span>{detail.rank % 80}위)</span>
                                    </div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>광고 제거 시 </span>
                                        <span>{detail.excludedAdRank}위</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                        </div>
                    </DetailInfoWrapper>
                )
            })}

            {!(recordDetails?.length > 0) &&
                <div>조회 내역이 존재하지 않습니다.</div>
            }
        </Wrapper>
    )
}