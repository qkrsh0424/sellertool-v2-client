import FieldLoadingV2 from "../../../../../../../../../modules/loading/FieldLoadingV2";
import { CustomBoxImage } from "../../../../../../modules";
import { dateToHHmm, dateToMMDD } from "../../../../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/RankTable.styled";

export function RankTableFieldView({
    recordViewDetails,
    viewRecordInfos
}) {
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
                            {viewRecordInfos?.map((info, idx) => {
                                let detail = recordViewDetails?.find(r => r.nrank_record_info_id === info.id);

                                if (detail) {
                                    return (
                                        <td key={detail.id}>
                                            <div className='column-box'>
                                                <div>
                                                    {detail.advertising_yn === 'y' &&
                                                        <span className='sub-info-box' style={{ "--thisBoxColor": "#456cba" }}>
                                                            <span>광고</span>
                                                        </span>
                                                    }
                                                    {detail.price_comparision_yn === 'y' &&
                                                        <span className='sub-info-box' style={{ "--thisBoxColor": "#636b82" }}>
                                                            <span>가격비교</span>
                                                        </span>
                                                    }
                                                </div>
                                                <div>
                                                    <span className='rank-box'>{detail.rank}위</span>
                                                </div>
                                                <div>
                                                    {detail.price_comparision_yn === 'y' &&
                                                        <span style={{ fontSize: '11px', color: '#636b82' }}>(가격비교 내 {detail.comparision_rank} 위)</span>
                                                    }
                                                </div>
                                                <div>
                                                    {detail.rankTrend ?
                                                        (detail.rankTrend > 0 ?
                                                            <div className='trend-box'>
                                                                <div style={{ color: '#e56767' }}>{detail.rankTrend}</div>
                                                                <div>
                                                                    <CustomBoxImage
                                                                        src='/images/icon/trending_up_fill_e56767.svg'
                                                                        size='15px'
                                                                    />
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className='trend-box'>
                                                                <div style={{ color: '#418cff' }}>{detail.rankTrend * -1}</div>
                                                                <div>
                                                                    <CustomBoxImage
                                                                        src='/images/icon/trending_down_fill_418cff.svg'
                                                                        size='15px'
                                                                    />
                                                                </div>
                                                            </div>
                                                        )
                                                        :
                                                        <div>-</div>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                    )
                                } else {
                                    return (
                                        <td key={idx}>
                                            <div>
                                                -
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