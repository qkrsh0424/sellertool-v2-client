import { useEffect, useState } from "react";
import FieldLoadingV2 from "../../../../../../../../../modules/loading/FieldLoadingV2";
import { CustomBoxImage } from "../../../../../../modules";
import { dateToHHmm, dateToMMDD } from "../../../../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/RankTable.styled";

export function RankTableFieldView({
    recordInfos,
    recordDetail,
    recordRankDetails
}) {
    const [recordViewDetails, setRecordViewDetails] = useState(null);

    let viewRecordInfos = recordInfos && [...recordInfos].reverse();

    useEffect(() => {
        if(!recordDetail) {
            return;
        }

        if(!recordRankDetails) {
            return;
        }

        handleInitRecordDetailView();
    }, [recordDetail, recordRankDetails])

    const handleInitRecordDetailView = () => {
        let prevRank = null;
        let prevPriceComparisionRank = null;
        
        let currentDetails = recordRankDetails.filter(r => 
            (r.mall_product_id === recordDetail.mall_product_id) &&
            (r.item_id === recordDetail.item_id) &&
            (r.advertising_yn === recordDetail.advertising_yn) &&
            (r.price_comparision_yn === recordDetail.price_comparision_yn)
        );

        let results = recordInfos.map(info => {
            let result = currentDetails.find(detail => detail.nrank_record_info_id === info.id) || {};

            return result;
        })

        let results2 = results.map(r => {
            let rankTrend = 0;
            let priceComparisionRankTrend = 0;

            if(!prevRank) {
                rankTrend = null
            }else {
                rankTrend = prevRank - r.rank;
            }

            if(!prevPriceComparisionRank) {
                priceComparisionRankTrend = null;
            }else {
                priceComparisionRankTrend = prevPriceComparisionRank - r.priceComparisionRank;
            }

            prevRank = r.rank;
            prevPriceComparisionRank = r.comparision_rank;

            return {
                ...r,
                rankTrend,
                priceComparisionRankTrend
            }
        })

        setRecordViewDetails(results2)
    }

    return (
        <Wrapper>
            <div className='table-box'>
                {!(recordViewDetails) &&
                    <FieldLoadingV2
                        oxStyle={{
                            borderRadius: '15px'
                        }}
                    />
                }

                <table>
                    <thead>
                        <tr>
                            {viewRecordInfos?.map(info => {
                                return (
                                    <th style={{ minWidth: '110px' }} className='fixed-header' key={info.id}>
                                        <div>
                                            <div>{dateToMMDD(info.created_at)} </div>
                                            <div style={{ fontSize: '10px', fontWeight: '500' }}>({dateToHHmm(info.created_at)})</div>
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ height: '130px' }}>
                            {recordViewDetails && viewRecordInfos?.map((info, idx) => {
                                let detail = recordViewDetails.find(r => r.nrank_record_info_id === info.id);

                                if (detail) {
                                    return (
                                        <td key={detail.id}>
                                            <div className='column-box'>
                                                <div>
                                                    <span className='rank-box'>{detail.rank}위</span>
                                                </div>
                                                <div>
                                                    {detail.price_comparision_yn === 'y' &&
                                                        <span style={{ fontSize: '11px', color: '#636b82' }}>(가격비교 내 {detail.comparision_rank} 위)</span>
                                                    }
                                                </div>
                                                <div>
                                                    {(detail.rankTrend !== 0 && detail.rankTrend) ?
                                                        (detail.rankTrend > 0 ?
                                                            <div className='trend-box'>
                                                                <div style={{ color: '#e56767' }}>{detail.rankTrend}</div>
                                                                <div>
                                                                    <CustomBoxImage
                                                                        src='/images/icon/trending_up_default_e56767.svg'
                                                                        size='15px'
                                                                    />
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className='trend-box'>
                                                                <div style={{ color: '#418cff' }}>{detail.rankTrend * -1}</div>
                                                                <div>
                                                                    <CustomBoxImage
                                                                        src='/images/icon/trending_down_default_418cff.svg'
                                                                        size='15px'
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                        :
                                                        (detail.rankTrend === 0 ?
                                                            <div className='trend-box'>
                                                                <div>
                                                                    <CustomBoxImage
                                                                        src='/images/icon/trending_flat_default_808080.svg'
                                                                        size='15px'
                                                                    />
                                                                </div>
                                                            </div>
                                                            :
                                                            <span>-</span>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td key={idx}>
                                            <div>
                                                <span style={{ fontSize: '10px', color: '#959595' }}>1200위 밖</span>
                                            </div>
                                        </td>
                                    )
                                }
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}