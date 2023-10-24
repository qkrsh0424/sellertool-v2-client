import SingleBlockButton from "../../../../../../../../modules/button/SingleBlockButton";
import { CustomBoxImage } from "../../../../../modules/index";
import { strToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import { DetailInfoBox, DetailInfoWrapper, InfoGroupBox, InfoText, MainInfoWrapper, SubInfoGroupBox, SubInfoWrapper, Wrapper } from "../styles/RankDetail.styled";

const NAVER_SHOPPING_PRODUCT_URL = "https://smartstore.naver.com/main/products/"

export default function AdRankDetailFieldView({
    adRecordDetails,
    targetRecordInfo,
    openedSubInfoRecordDetailIds,
    onAddOpenedSubInfoRecordDetailId,
    onRemoveOpenedSubInfoRecordDetailId
}) {
    return (
        <Wrapper>
            {adRecordDetails?.map((detail, idx) => {
                let isOpenedSubInfo = openedSubInfoRecordDetailIds?.includes(detail.id);

                return (
                    <DetailInfoWrapper key={'record_detail_list_idx' + idx}>
                        <MainInfoWrapper>
                            <div className='image-box'>
                                <CustomBoxImage
                                    className='image-el'
                                    src={detail.thumbnail_url}
                                />
                            </div>
                            <div style={{ overflow: 'hidden', flex: '1' }}>
                                <div className='info-field'>
                                    <InfoGroupBox style={{ flexWrap: 'nowrap' }}>
                                        <div>
                                            {detail.advertising_yn === 'y' &&
                                                <div className='sub-info-box' style={{ minWidth: '40px', "--thisBoxColor": "#919dbd" }}>광고</div>
                                            }
                                        </div>
                                        <div className='highlight' style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {detail.price_comparision_yn === 'y' ?
                                                <a href={NAVER_SHOPPING_PRICE_COMPARISION_URL + detail.item_id} target="_blank" rel="noopener">
                                                    <span className='accent-text'>{detail.product_title}</span>
                                                </a>
                                                :
                                                <a href={NAVER_SHOPPING_PRODUCT_URL + detail.mall_product_id} target="_blank" rel="noopener">
                                                    <span className='accent-text'>{detail.product_title}</span>
                                                </a>
                                            }
                                        </div>
                                    </InfoGroupBox>
                                </div>
                                <div>
                                    <InfoGroupBox>
                                        <div className='mgl-flex mgl-flex-alignItems-center' style={{ marginRight: '5px' }}>
                                            <div className='ad-rank-box accent-text' style={{ marginRight: '5px' }}>
                                                <span>광고 {detail.rank}위</span>
                                            </div>
                                        </div>
                                </InfoGroupBox>
                                </div>
                            </div>
                            <div>
                                {isOpenedSubInfo ?
                                    <SingleBlockButton
                                        type='button'
                                        className='dropdown-button-item'
                                        onClick={() => onRemoveOpenedSubInfoRecordDetailId(detail.id)}
                                    >
                                        <div>
                                            <CustomBoxImage
                                                src={'/images/icon/arrowDropUp_default_808080.svg'}
                                            />
                                        </div>
                                    </SingleBlockButton>
                                    :
                                    <SingleBlockButton
                                        type='button'
                                        className='dropdown-button-item'
                                        onClick={() => onAddOpenedSubInfoRecordDetailId(detail.id)}
                                    >
                                        <div>
                                            <CustomBoxImage
                                                src={'/images/icon/arrowDropDown_default_808080.svg'}
                                            />
                                        </div>
                                    </SingleBlockButton>
                                }
                            </div>
                        </MainInfoWrapper>
                        {isOpenedSubInfo &&
                            <SubInfoWrapper>
                                <div>
                                    <SubInfoGroupBox>
                                        <div className='info-title'>카테고리 : </div>
                                        <div>
                                            <span>{detail.category1_name}</span>
                                            <span style={{ color: '#b4b4b4' }}>{' > '}</span>
                                            <span>{detail.category2_name}</span>
                                            <span style={{ color: '#b4b4b4' }}>{' > '}</span>
                                            <span>{detail.category3_name}</span>
                                            <span style={{ color: '#b4b4b4' }}>{' > '}</span>
                                            <span>{detail.category4_name}</span>
                                        </div>
                                    </SubInfoGroupBox>
                                    <SubInfoGroupBox>
                                        <div className='info-title'>가격 : </div>
                                        <div>
                                            <span>{detail.price?.toLocaleString()}원</span>
                                        </div>
                                        <div style={{ marginLeft: '5px', display: 'flex' }}>
                                            <div>
                                                <CustomBoxImage
                                                    src='/images/icon/delivery_truck_default_808080.svg'
                                                    size='15px'
                                                />
                                            </div>
                                            <div>
                                                {detail.delivery_fee === 0 &&
                                                    <span>무료</span>
                                                }
                                                {detail.delivery_fee === -1 &&
                                                    <span>착불</span>
                                                }
                                                {detail.delivery_fee > 0 &&
                                                    <span>{detail.delivery_fee?.toLocaleString()}</span>
                                                }
                                            </div>
                                        </div>
                                    </SubInfoGroupBox>
                                    <SubInfoGroupBox>
                                        <div className='info-title'>게시일 : </div>
                                        <div>
                                            <span>{detail.registration_date ? strToYYYYMMDD(detail.registration_date) : '-'}</span>
                                        </div>
                                    </SubInfoGroupBox>
                                    <SubInfoGroupBox>
                                        <DetailInfoBox>
                                            <div>
                                                <CustomBoxImage
                                                    src="/images/icon/star_default_ffdf00.svg"
                                                    size='15px'
                                                />
                                            </div>
                                            <div>
                                                <span>{detail.score_info ?? '-'}</span>
                                                <span>({detail.review_count ?? '-'})</span>
                                            </div>
                                        </DetailInfoBox>
                                        <DetailInfoBox>
                                            <div>
                                                <CustomBoxImage
                                                    src="/images/icon/shopping_bag_fill_808080.svg"
                                                    size='15px'
                                                />
                                            </div>
                                            <div>
                                                <span>({detail.purchase_count ?? '-'})</span>
                                            </div>
                                        </DetailInfoBox>
                                        <DetailInfoBox>
                                            <div>
                                                <CustomBoxImage
                                                    src="/images/icon/heart_check_fill_e56780.svg"
                                                    size='15px'
                                                />
                                            </div>
                                            <div>
                                                <span>({detail.keep_count ?? '-'})</span>
                                            </div>
                                        </DetailInfoBox>
                                    </SubInfoGroupBox>
                                </div>
                            </SubInfoWrapper>
                        }
                    </DetailInfoWrapper>
                )
            })}
            {!(adRecordDetails?.length > 0) &&
                <InfoText>
                    {targetRecordInfo?.created_at ?
                        <div>조회 결과가 존재하지 않습니다</div>
                        :
                        <div style={{ color: '#606060' }}>조회 버튼을 눌러 순위를 검색해보세요 !</div>
                    }
                </InfoText>
            }
        </Wrapper>
    )
}