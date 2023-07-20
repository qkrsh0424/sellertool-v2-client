import { dateToYYYYMMDD } from "../../../../../../../../utils/dateFormatUtils";
import { CustomBoxImage } from "../../../../modules/index";
import { DetailInfoWrapper, InfoGroupBox, InfoText, Wrapper } from "../styles/RankDetail.styled";

const NAVER_SHOPPING_PRODUCT_URL = "https://smartstore.naver.com/main/products/"

export default function AdRankDetailFieldView({
    adRecordDetails
}) {
    return (
        <Wrapper>
            {adRecordDetails?.map((detail, idx) => {
                return (
                    <DetailInfoWrapper key={'record_detail_list_idx' + idx}>
                        <div>
                            <CustomBoxImage
                                className='image-el'
                                src={detail.thumbnail_url}
                                size='150px'
                            />
                        </div>
                        <div style={{ padding: '0 10px' }}>
                            <div className='info-field'>
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
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
                                    </div>
                                    <div>
                                        <span>구매({detail.purchase_count ?? 0})</span>
                                    </div>
                                    <div>
                                        <span>찜({detail.keep_count ?? 0})</span>
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
                                    <div className='accent-text'>
                                        <span>총 </span>
                                        <span style={{ color: 'var(--mainColor)' }}>{detail.rank} 위</span>
                                    </div>
                                </InfoGroupBox>
                            </div>
                        </div>
                    </DetailInfoWrapper>
                )
            })}
            {!(adRecordDetails?.length > 0) &&
                <InfoText>
                    <div>조회 결과가 존재하지 않습니다.</div>
                </InfoText>
            }
        </Wrapper>
    )
}