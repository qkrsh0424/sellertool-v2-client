import { useEffect, useState } from "react";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { CustomDialog } from "../../../../../../../../../components/dialog/v1/CustomDialog";
import { Container, Wrapper } from "./styles/DetailRankTable.styled";
import { RankTableFieldView } from "./view/RankTableField.view";
import RecordDetailInfoFieldView from "./view/RecordDetailInfoField.view";

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
                        <RecordDetailInfoFieldView
                            selectedRecordDetail={selectedRecordDetail}
                            record={record}
                        />
                        <RankTableFieldView
                            recordViewDetails={recordViewDetails}
                            viewRecordInfos={viewRecordInfos}
                        />
                    </Wrapper>
                </Container>
            </CustomDialog>
        </>
    )
}