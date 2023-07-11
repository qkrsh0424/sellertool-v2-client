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
                                src={detail.thumbnail_url}
                                size='200px'
                            />
                        </div>
                        <div>
                            <div className='info-field'>
                                <InfoGroupBox>
                                    <div className='sub-info'>
                                        {detail.advertising_yn === 'y' &&
                                            <div className='sub-info-box' style={{ "--default-box-color": "#707ca0" }}>광고</div>
                                        }
                                        {detail.priceComparision_yn === 'y' &&
                                            <div className='sub-info-box' style={{ "--default-box-color": "#9da0a9" }}>가격 비교</div>
                                        }
                                    </div>                                    
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div className='hover-effet'>
                                        <a href={NAVER_SHOPPING_PRODUCT_URL + detail.mall_product_id} target="_blank" rel="noopener">
                                            <span className='accent-text'>{detail.product_title}</span>
                                        </a>
                                    </div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>{detail.category1_name}</span>
                                        <span style={{ color: '#b4b4b4'}}>{' > '}</span>
                                        <span>{detail.category2_name}</span>
                                        <span style={{ color: '#b4b4b4'}}>{' > '}</span>
                                        <span>{detail.category3_name}</span>
                                        <span style={{ color: '#b4b4b4'}}>{' > '}</span>                            
                                        <span>{detail.category4_name}</span>
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
                                        <span>{detail.delivery_fee === 0 ? '무료' : detail.delivery_fee}</span>
                                    </div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>리뷰 : </span>
                                        <span>{detail.review_count}</span>
                                    </div>
                                    <div>
                                        <span>평점 : </span>
                                        <span>{detail.score_info}</span>
                                    </div>
                                    <div>
                                        <span>구매 : </span>
                                        <span>{detail.purchase_count}</span>
                                    </div>
                                    <div>
                                        <span>찜 : </span>
                                        <span>{detail.keep_count}</span>
                                    </div>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>상품 게시일 : </span>
                                        <span>{detail.registration_date ? dateToYYYYMMDD(detail.registration_date) : '-'}</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                            <div className='rank-field'>
                                <InfoGroupBox>
                                    {detail.priceComparision_yn === 'y' &&
                                        <div>
                                            <span style={{ color: '#000', fontWeight: '700' }}>가격 비교 </span>
                                            <span style={{ color: '#000', fontWeight: '700' }}>{detail.comparision_rank}위 </span>
                                            <span>(총 {detail.low_mall_count}개 중)</span>
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
                                        <span>{detail.excluded_ad_rank}위</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                        </div>
                    </DetailInfoWrapper>
                )
            })}

            {!(recordDetails?.length > 0) &&
                <div>조회 데이터가 존재하지 않습니다.</div>
            }
        </Wrapper>
    )
}