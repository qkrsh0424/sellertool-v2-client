import { useEffect, useState } from "react";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { dateToMMDD, dateToHHmm } from "../../../../../utils/dateFormatUtils";
import { CustomDialog } from "../../../../../../../../../components/dialog/v1/CustomDialog";
import { Container, Wrapper } from "./style/DetailRankTable.styled";
import { CustomBoxImage } from "../../../../../modules";
import FieldLoadingV2 from "../../../../../../../../modules/loading/FieldLoadingV2";

export function DetailRankTableComponent({
    open,
    onClose,
    record,
    recordInfos,
    selectedRecordDetail
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqSearchNRankRecordDetailByFilter } = useApiHook();
    const [recordDetails, setRecordDetails] = useState(null);
    const [recordViewDetails, setRecordViewDetails] = useState(null);

    let viewRecordInfos = recordInfos && [...recordInfos].reverse();

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!record) {
            return;
        }

        if(!selectedRecordDetail) {
            return;
        }

        async function fetchInit() {
            await handleSearchNRankRecordDetailByFilter()
        }

        fetchInit();
    }, [record, selectedRecordDetail, wsId])

    useEffect(() => {
        if(!recordDetails) {
            return;
        }

        handleInitRecordDetailView();
    }, [recordDetails])

    const handleInitRecordDetailView = () => {
        let prevRank = null;
        let prevPriceComparisionRank = null;

        let results = recordDetails.map(r => {
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

        setRecordViewDetails(results)
    }

    const handleSearchNRankRecordDetailByFilter = async () => {
        let infoIds = recordInfos?.map(r => r.id);

        let body = {
            info_ids: infoIds,
            detail_item_id: selectedRecordDetail.item_id,
            detail_mall_product_id: selectedRecordDetail.mall_product_id
        }

        await onReqSearchNRankRecordDetailByFilter({
            headers: { wsId: wsId },
            body
        }, {
            success: (results) => {
                setRecordDetails(results);
            },
            fail: () => {
                handleClose();
            }
        })
    }

    const handleClose = () => {
        setRecordViewDetails(null);
        onClose();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => handleClose()}
                maxWidth="sm"
            >
                <CustomDialog.CloseButton onClose={() => handleClose()} />
                <CustomDialog.Title>랭킹 조회</CustomDialog.Title>
                <Container>
                    <Wrapper>
                        <div className='record-info-box'>
                            <div className='image-box'>
                                <CustomBoxImage
                                    className='image-el'
                                    src={selectedRecordDetail?.thumbnail_url}
                                />
                            </div>
                            <div>
                                <span style={{ color: 'var(--mainColor)' }}>{record.mall_name}</span>
                                <span> | </span>
                                <span>{record.keyword}</span>
                            </div>
                        </div>
                        <div className='main-box'>
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
                                                    <th width={100} className='fixed-header' key={info.id}>
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
                        </div>
                    </Wrapper>
                </Container>
            </CustomDialog>
        </>
    )
}