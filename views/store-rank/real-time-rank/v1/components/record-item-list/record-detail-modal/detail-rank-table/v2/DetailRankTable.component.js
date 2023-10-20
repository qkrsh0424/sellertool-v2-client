import { useEffect, useRef, useState } from "react";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../../../../../../../components/dialog/v1/CustomDialog";
import { Container, Wrapper } from "./styles/DetailRankTable.styled";
import { RankTableFieldView } from "./view/RankTableField.view";
import RecordDetailInfoFieldView from "./view/RecordDetailInfoField.view";
import _ from "lodash";
import ViewControlFieldView from "./view/ViewControlField.view";

export function DetailRankTableComponent({
    open,
    onClose,
    record,
    recordInfos,
    recordDetails,
    adRecordDetails,
    isAdRankView
}) {
    const scrollRef = useRef(null);

    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqSearchNRankRecordDetailByFilter } = useApiHook();
    const [recordRankDetails, setRecordRankDetails] = useState(null);
    const [isAdRankTrakView, setIsAdRankTrakView] = useState(null);

    let viewRecordDetails = isAdRankTrakView ? adRecordDetails : recordDetails;

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!record) {
            return;
        }

        if(!(recordDetails && adRecordDetails)) {
            return;
        }

        async function fetchInit() {
            await handleSearchNRankRecordDetailByFilter()
        }

        fetchInit();
    }, [record, recordDetails, adRecordDetails, wsId])

    useEffect(() => {
        if(isAdRankView) {
            onChangeAdRankTrakView();
        }else {
            onChangeRankTrakView();
        }
    }, [isAdRankView])

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [isAdRankTrakView])

    const handleSearchNRankRecordDetailByFilter = async () => {
        let totalDetails = [...recordDetails, ...adRecordDetails];
        let infoIds = recordInfos?.map(r => r.id);
        let itemIds = totalDetails?.map(r => r.item_id);
        let mallProductIds = totalDetails?.map(r => r.mall_product_id);

        let body = {
            info_ids: infoIds,
            detail_item_ids: itemIds,
            detail_mall_product_ids: mallProductIds
        }

        await onReqSearchNRankRecordDetailByFilter({
            headers: { wsId: wsId },
            body
        }, {
            success: (results) => {
                setRecordRankDetails(results);
            },
            fail: () => {
                onClose();
            }
        })
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
                        recordDetails={recordDetails}
                        adRecordDetails={adRecordDetails}
                    />
                    <Wrapper ref={scrollRef}>
                        {recordRankDetails && viewRecordDetails?.map((detail, idx) => {
                            let currentRankDetails = recordRankDetails.filter(r => 
                                (r.mall_product_id === detail.mall_product_id) &&
                                (r.item_id === detail.item_id) &&
                                (r.advertising_yn === detail.advertising_yn) &&
                                (r.price_comparision_yn === detail.price_comparision_yn)
                            );

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