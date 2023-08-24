import { CustomBoxImage } from "../../../../modules/index";
import { strToYYYYMMDD } from "../../../../utils/dateFormatUtils";
import { DetailInfoBox, DetailInfoWrapper, InfoGroupBox, InfoText, Wrapper } from "../styles/RankDetail.styled";

const NAVER_SHOPPING_PRODUCT_URL = "https://smartstore.naver.com/main/products/"

export default function AdRankDetailFieldView({
    adRecordDetails
}) {
    return (
        <Wrapper>
            {adRecordDetails?.map((detail, idx) => {
                return (
                    <DetailInfoWrapper key={'record_detail_list_idx' + idx}>
                        <div style={{ paddingRight: '10px' }}>
                            <CustomBoxImage
                                className='image-el'
                                src={detail.thumbnail_url}
                                size='160px'
                            />
                        </div>
                        <div>
                            <div className='info-field'>
                                <InfoGroupBox>
                                    <div className='sub-info'>
                                        {detail.advertising_yn === 'y' &&
                                            <div className='sub-info-box' style={{ "--thisBoxColor": "#919dbd" }}>광고</div>
                                        }
                                    </div>
                                    <div className='highlight'>
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
                                        <span className='accent-text'>{detail.price?.toLocaleString()}원</span>
                                    </div>
                                    <DetailInfoBox style={{ marginLeft: '5px' }}>
                                        <span>
                                            <CustomBoxImage
                                                src='/images/icon/delivery_truck_default_808080.svg'
                                                size='20px'
                                            />
                                        </span>
                                        <span>{detail.delivery_fee === 0 ? '무료' : detail.delivery_fee}</span>
                                    </DetailInfoBox>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <DetailInfoBox>
                                        <div>
                                            <CustomBoxImage
                                                src="/images/icon/star_default_ffdf00.svg"
                                                size='20px'
                                            />
                                        </div>
                                        <div>
                                            <span>{detail.score_info ?? 0}</span>
                                            <span>({detail.review_count ?? 0})</span>
                                        </div>
                                    </DetailInfoBox>
                                    <DetailInfoBox>
                                        <div>
                                            <CustomBoxImage
                                                src="/images/icon/shopping_bag_fill_808080.svg"
                                                size='20px'
                                            />
                                        </div>
                                        <div>
                                            <span>({detail.purchase_count ?? 0})</span>
                                        </div>
                                    </DetailInfoBox>
                                    <DetailInfoBox>
                                        <div>
                                            <CustomBoxImage
                                                src="/images/icon/heart_check_fill_e56780.svg"
                                                size='20px'
                                            />
                                        </div>
                                        <div>
                                            <span>({detail.keep_count ?? 0})</span>
                                        </div>
                                    </DetailInfoBox>
                                </InfoGroupBox>
                                <InfoGroupBox>
                                    <div>
                                        <span>상품 게시일 : </span>
                                        <span>{detail.registration_date ? strToYYYYMMDD(detail.registration_date) : '-'}</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                            <div className='rank-field'>
                                <InfoGroupBox>
                                    <div className='accent-text'>
                                        <span>광고 </span>
                                        <span style={{ color: 'var(--defaultBlueColor)' }}>{detail.rank} 위</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                        </div>
                    </DetailInfoWrapper>
                )
            })}
            {!(adRecordDetails?.length > 0) &&
                <InfoText>
                    <div>조회 결과가 존재하지 않습니다</div>
                </InfoText>
            }
        </Wrapper>
    )
}