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
    recordDetails
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqSearchNRankRecordDetailByFilter } = useApiHook();
    const [recordRankDetails, setRecordRankDetails] = useState(null);

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!record) {
            return;
        }

        if(!recordDetails) {
            return;
        }

        async function fetchInit() {
            await handleSearchNRankRecordDetailByFilter()
        }

        fetchInit();
    }, [record, recordDetails, wsId])

    const handleSearchNRankRecordDetailByFilter = async () => {
        let infoIds = recordInfos?.map(r => r.id);
        let itemIds = recordDetails?.map(r => r.item_id);
        let mallProductIds = recordDetails?.map(r => r.mall_product_id);

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
                handleClose();
            }
        })
    }

    const handleClose = () => {
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
                <CustomDialog.Title>랭킹 추세</CustomDialog.Title>
                <Container>
                    <Wrapper>
                        {recordDetails?.map((recordDetail, idx) => {
                            return (
                                <div
                                    key={'record_trend_wrapper_idx' + idx}
                                    className='trend-wrapper'    
                                >
                                    <RecordDetailInfoFieldView
                                        recordDetail={recordDetail}
                                    />
                                    <RankTableFieldView
                                        recordInfos={recordInfos}
                                        recordDetail={recordDetail}
                                        recordRankDetails={recordRankDetails}
                                    />
                                </div>
                            )
                        })}
                    </Wrapper>
                </Container>
            </CustomDialog>
        </>
    )
}