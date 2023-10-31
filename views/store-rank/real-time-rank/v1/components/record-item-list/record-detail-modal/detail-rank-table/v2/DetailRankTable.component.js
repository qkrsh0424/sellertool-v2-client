import { useEffect, useRef, useState } from "react";
import { CustomDialog } from "../../../../../../../../../components/dialog/v1/CustomDialog";
import { Container, Wrapper } from "./styles/DetailRankTable.styled";
import { RankTableFieldView } from "./view/RankTableField.view";
import RecordDetailInfoFieldView from "./view/RecordDetailInfoField.view";
import _ from "lodash";
import ViewControlFieldView from "./view/ViewControlField.view";
import { useApiHook } from "./hooks/useApiHook";
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { useSelector } from "react-redux";
import FieldLoadingV2 from "../../../../../../../../modules/loading/FieldLoadingV2";

export function DetailRankTableComponent({
    open,
    onClose,
    recordInfos
}) {
    const scrollRef = useRef(null);

    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const [recordRankDetails, setRecordRankDetails] = useState(null);
    const [recordAdRankDetails, setRecordAdRankDetails] = useState(null);
    const [isAdRankTrakView, setIsAdRankTrakView] = useState(false);
    const [isInitSearchLoading, setIsInitSearchLoading] = useState(false);

    const {
        onReqSearchNRankRecordDetailsByInfos
    } = useApiHook();

    const {
        recordDetailsBySearchedInfos,
        traceableRecordDetails,
        traceableAdRecordDetails,
        onSetRecordDetailsBySearchedInfos,
        onSetTraceableRecordDetails,
        onSetTraceableAdRecordDetails
    } = useNRankRecordDetailHook();

    let viewRecordDetails = isAdRankTrakView ? traceableAdRecordDetails : traceableRecordDetails;
    let viewRankDetails = isAdRankTrakView ? recordAdRankDetails : recordRankDetails;

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!recordInfos) {
            return;
        }

        async function initialize() {
            setIsInitSearchLoading(true);
            await handleSearchNRankRecordDetailsByInfos();
            setIsInitSearchLoading(false);
        }

        initialize();
    }, [recordInfos, wsId])

    useEffect(() => {
        if(!recordDetailsBySearchedInfos) {
            return;
        }

        handleInitDetailsRankTrend();
    }, [recordDetailsBySearchedInfos])

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [isAdRankTrakView])

    const handleSearchNRankRecordDetailsByInfos = async () => {
        let infoIds = recordInfos?.map(r => r.id);

        let body = {
            record_info_ids: infoIds
        }

        await onReqSearchNRankRecordDetailsByInfos({
            headers: { wsId: wsId },
            body
        }, {
            success: (results) => {
                let itemSet = new Set([]);
                let details = [];
                let adDetails = [];
                
                results.forEach(r => {
                    let detailStr = r.mall_product_id + r.item_id + r.advertising_yn;

                    if (r.mall_product_id && r.item_id && !itemSet.has(detailStr)) {
                        itemSet.add(detailStr);

                        if (r.advertising_yn === 'y') {
                            adDetails.push(r);
                        } else {
                            details.push(r);
                        }
                    }
                })
                onSetRecordDetailsBySearchedInfos(results);
                onSetTraceableRecordDetails(details);
                onSetTraceableAdRecordDetails(adDetails);
            },
            fail: () => {
                onClose();
            }
        })
    }

    const handleInitDetailsRankTrend = () => {
        let rankDetails = [];
        let adRankDetails = [];

        recordDetailsBySearchedInfos.forEach(r => {
            if(!(r.mall_product_id && r.item_id)) {
                return;
            }

            if (r.advertising_yn === 'y') {
                adRankDetails.push(r);
            } else {
                rankDetails.push(r);
            }
        });
        setRecordRankDetails(rankDetails);
        setRecordAdRankDetails(adRankDetails);
    }

    const onChangeAdRankTrakView = () => {
        setIsAdRankTrakView(true);
    }

    const onChangeRankTrakView = () => {
        setIsAdRankTrakView(false);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="md"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>랭킹 추세</CustomDialog.Title>
                <Container>
                    <ViewControlFieldView
                        isAdRankTrakView={isAdRankTrakView}
                        handleChangeRankTrakView={onChangeRankTrakView}
                        handleChangeAdRankTrakView={onChangeAdRankTrakView}
                        recordDetails={traceableRecordDetails}
                        adRecordDetails={traceableAdRecordDetails}
                    />
                    <Wrapper ref={scrollRef}>
                        {/* {!recordDetailsBySearchedInfos && */}
                        {isInitSearchLoading &&
                            <FieldLoadingV2
                                oxStyle={{
                                    borderRadius: '15px'
                                }}
                            />
                        }

                        {viewRankDetails && viewRecordDetails?.map((detail, idx) => {
                            let currentRankDetails = viewRankDetails?.filter(r => r.mall_product_id === detail.mall_product_id);

                            return (
                                <div
                                    key={'record_trend_wrapper_idx' + idx}
                                    className='trend-wrapper'
                                >
                                    <RecordDetailInfoFieldView
                                        recordDetail={detail}
                                    />

                                    <RankTableFieldView
                                        recordInfos={recordInfos}
                                        recordDetail={detail}
                                        recordRankDetails={currentRankDetails}
                                    />
                                </div>
                            )
                        })}
                        {viewRecordDetails?.length === 0 &&
                            <div className='blank-info-text'>
                                <div>데이터가 존재하지 않습니다.</div>
                            </div>
                        }
                    </Wrapper>
                </Container>
            </CustomDialog>
        </>
    )
}