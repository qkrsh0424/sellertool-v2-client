import { useEffect, useRef, useState } from "react";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import ResizableTh from "../../../../../../../../../components/table/th/v1/ResizableTh";
import { dateToHHmm, dateToMMDD } from "../../../../../utils/dateFormatUtils";
import { CustomDialog } from "../../../../../../../../../components/dialog/v1/CustomDialog";
import { Wrapper } from "./style/DetailRankTable.styled";

export function DetailRankTableComponent({
    open,
    onClose,
    record,
    recordDetail
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqSearchNRankRecordDetailByInfosAndPid } = useApiHook();
    const [recordDetails, setRecordDetails] = useState(null);
    const [recordViewDetails, setRecordViewDetails] = useState(null);

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!record) {
            return;
        }

        if(!recordDetail) {
            return;
        }

        async function initialze() {
            await handleSearchNRankRecordDetailByInfos()
        }

        initialze();
    }, [record, recordDetail, wsId])

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

    const handleSearchNRankRecordDetailByInfos = async () => {
        let infoIds = record.infos?.map(r => r.id);

        let body = {
            info_ids: infoIds,
            detail_mall_product_id: recordDetail.mall_product_id
        }

        await onReqSearchNRankRecordDetailByInfosAndPid({
            headers: { wsId: wsId },
            body
        }, {
            success: (results) => {
                setRecordDetails(results);
            }
        })
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="sm"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>랭킹 조회</CustomDialog.Title>
                <Wrapper>
                    {recordViewDetails &&
                        <div className='table-box'>
                            <table>
                                <thead>
                                    <tr>
                                        {record.infos?.map(info => {
                                            return (
                                                <ResizableTh width={80} className='fixed-header'>
                                                    <div>
                                                        <div>{dateToMMDD(info.created_at)}</div>
                                                        <div>{dateToHHmm(info.created_at)}</div>
                                                    </div>
                                                </ResizableTh>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {record.infos?.map(info => {
                                            let detail = recordViewDetails?.find(r => r.nrank_record_info_id === info.id);

                                            if (detail) {
                                                return (
                                                    <td>
                                                        <div className='column-box'>
                                                            <div>{detail.advertising_yn === 'y' &&
                                                                <span>광고</span>
                                                            }</div>
                                                            <div>{detail.price_comparision_yn === 'y' &&
                                                                <span>가격비교</span>
                                                            }</div>
                                                            <div>
                                                                <span>{detail.rank}위</span>
                                                            </div>
                                                            <div>
                                                                {detail.price_comparision_yn === 'y' &&
                                                                    <span style={{ fontSize: '10px' }}>(가격비교 내 {detail.comparision_rank} 위)</span>
                                                                }
                                                            </div>
                                                            {/* 순위 진입 및 상승 하락 표시 */}
                                                            <div>
                                                                {detail.rankTrend ?
                                                                    (detail.rankTrend > 0 ?
                                                                        <span>{detail.rankTrend} 상승</span>
                                                                        :
                                                                        <span>{detail.rankTrend * -1} 하락</span>
                                                                    )
                                                                    :
                                                                    <span>-</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                )
                                            } else {
                                                return (
                                                    <td>
                                                        -
                                                    </td>
                                                )
                                            }
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    }
                </Wrapper>
            </CustomDialog>
        </>
    )
}