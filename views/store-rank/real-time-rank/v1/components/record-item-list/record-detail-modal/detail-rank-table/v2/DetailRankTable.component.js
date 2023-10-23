import { useEffect, useRef, useState } from "react";
import { CustomDialog } from "../../../../../../../../../components/dialog/v1/CustomDialog";
import { Container, Wrapper } from "./styles/DetailRankTable.styled";
import { RankTableFieldView } from "./view/RankTableField.view";
import RecordDetailInfoFieldView from "./view/RecordDetailInfoField.view";
import _ from "lodash";
import ViewControlFieldView from "./view/ViewControlField.view";

export function DetailRankTableComponent({
    open,
    onClose,
    recordInfos,
    recordDetailsBySearchedInfos,
    traceableRecordDetails,
    traceableAdRecordDetails
}) {
    const scrollRef = useRef(null);

    const [recordRankDetails, setRecordRankDetails] = useState(null);
    const [recordAdRankDetails, setRecordAdRankDetails] = useState(null);
    const [isAdRankTrakView, setIsAdRankTrakView] = useState(false);

    let viewRecordDetails = isAdRankTrakView ? traceableAdRecordDetails : traceableRecordDetails;
    let viewRankDetails = isAdRankTrakView ? recordAdRankDetails : recordRankDetails;

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

    const handleInitDetailsRankTrend = () => {
        let rankDetails = [];
        let adRankDetails = [];

        recordDetailsBySearchedInfos.forEach(r => {
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