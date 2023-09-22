import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";
import ButtonFieldView from "./view/ButtonField.view";
import AdRankDetailFieldView from "./view/AdRankDetailField.view";
import { useEffect, useState } from "react";
import ViewControlFieldView from "./view/ViewControlField.view";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import { CustomProgressIcon } from "../../../../modules/progress/progress-icon/v1";
import SubInfoFieldView from "./view/SubInfoField.view";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import RankDetailSkeletonFieldView from "./view/RankDetailSkeletonField.view";
import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { customBackdropController } from "../../../../../../../../components/backdrop/default/v1";
import FieldLoadingV2 from "../../../../../../../modules/loading/FieldLoadingV2";

const customBackdropControl = customBackdropController();

export function RecordDetailModalComponent({
    open,
    onClose,
    record,
    createRecordInfoId,
    rankSearchInfo,
    currentPendingRecordIds,
    onSetCurrentPendingRecordIds,
    onSearchSubscriptionPlanSearchInfo
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const [isAdRankView, setIsAdRankView] = useState(false);
    const [isInitSearchLoading, setIsInitSearchLoading] = useState(false);

    const { onReqSearchNRankRecordDetail, onReqChangeNRankRecordStatusToPending, onReqCreateNRankRecordDetail } = useApiHook();
    const {
        recordDetails,
        adRecordDetails,
        targetRecordInfo,
        openedSubInfoRecordDetailIds,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onActionUpdateTargetRecordInfo,
        onAddOpenedSubInfoRecordDetailId,
        onRemoveOpenedSubInfoRecordDetailId,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions
    } = useNRankRecordDetailHook({ record });

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!(record && record.current_nrank_record_info_id)) {
            return;
        }

        async function initialize() {
            setIsInitSearchLoading(true);
            await handleSearchNRankRecordDetail()
            setIsInitSearchLoading(false);
        }

        initialize()
    }, [record, wsId])

    useEffect(() => {
        if(!(record && record.current_nrank_record_info_id)) {
            return;
        }

        onActionUpdateTargetRecordInfo(record.current_nrank_record_info_id)
    }, [record])

    const handleChangeAdRankView = () => {
        setIsAdRankView(true);
    }

    const handleChangeRankView = () => {
        setIsAdRankView(false);
    }

    const handleSearchNRankRecordDetail = async () => {
        await onReqSearchNRankRecordDetail({
            params: { record_info_id: record.current_nrank_record_info_id},
            headers: { wsId: wsId }
        },{
            success: (results) => {
                let rankDetails = []
                let adRankDetails = []
                results.forEach(r => r.advertising_yn === 'y' ? adRankDetails.push(r) : rankDetails.push(r))
                onSetRecordDetails(rankDetails)
                onSetAdRecordDetails(adRankDetails)
            }
        })
    }

    const handleChangeNRankRecordStatusToPending = async () => {
        try {
            if(rankSearchInfo.allowed_search_count <= rankSearchInfo.searched_count) {
                throw new Error("금일 요청 가능한 횟수를 초과하였습니다.");
            }
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            });
            return;
        }

        customBackdropControl.showBackdrop();
        let recordId = record.id;
        await onReqChangeNRankRecordStatusToPending({
            headers: { wsId: wsId },
            params: { id: recordId },
            body: { record_info_id: createRecordInfoId }
        }, {
            success: () => {
                let recordIds = [...currentPendingRecordIds].concat(recordId);
                onSetCurrentPendingRecordIds(recordIds);
                handleCreateNRankRecordDetail();
                onSearchSubscriptionPlanSearchInfo();
            }
        })
        customBackdropControl.hideBackdrop();
    }

    const handleCreateNRankRecordDetail = async () => {
        await onReqCreateNRankRecordDetail({
            body: { record_id: record.id, record_info_id: createRecordInfoId },
            headers: { wsId: wsId }
        })
    }

    let isPending = currentPendingRecordIds?.includes(record?.id);

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
                    <RecordInfoFieldView
                        record={record}
                        targetRecordInfo={targetRecordInfo}
                    />
                    <SubInfoFieldView
                        record={record}
                    />
                    <ButtonFieldView
                        targetRecordInfo={targetRecordInfo}
                        isPending={isPending}
                        isInitSearchLoading={isInitSearchLoading}
                        onSubmit={handleChangeNRankRecordStatusToPending}
                    />
                    <div style={{ position: 'relative' }}>
                        <ViewControlFieldView
                            isAdRankView={isAdRankView}
                            recordDetails={recordDetails}
                            adRecordDetails={adRecordDetails}
                            onChangeAdRankView={handleChangeAdRankView}
                            onChangeRankView={handleChangeRankView}
                            onActionFoldAllOptions={onActionFoldAllOptions}
                            onActionUnfoldAllOptions={onActionUnfoldAllOptions}
                        />

                        <div style={{ position: 'relative' }}>
                            {isPending &&
                                <>
                                    <CustomProgressIcon
                                        type={'sync'}
                                        color='var(--mainColor)'
                                        size={20}
                                        margin={20}
                                        isBackgroundBlur={true}
                                    />
                                    <RankDetailSkeletonFieldView />
                                </>
                            }

                            {!isPending &&
                                <>
                                    {isInitSearchLoading &&
                                        <FieldLoadingV2
                                            oxStyle={{
                                                borderRadius: '15px'
                                            }}
                                        />
                                    }

                                    {isAdRankView ?
                                        <AdRankDetailFieldView
                                            record={record}
                                            targetRecordInfo={targetRecordInfo}
                                            adRecordDetails={adRecordDetails}
                                            openedSubInfoRecordDetailIds={openedSubInfoRecordDetailIds}
                                            onAddOpenedSubInfoRecordDetailId={onAddOpenedSubInfoRecordDetailId}
                                            onRemoveOpenedSubInfoRecordDetailId={onRemoveOpenedSubInfoRecordDetailId}
                                        />
                                        :
                                        <RankDetailFieldView
                                            record={record}
                                            targetRecordInfo={targetRecordInfo}
                                            recordDetails={recordDetails}
                                            openedSubInfoRecordDetailIds={openedSubInfoRecordDetailIds}
                                            onAddOpenedSubInfoRecordDetailId={onAddOpenedSubInfoRecordDetailId}
                                            onRemoveOpenedSubInfoRecordDetailId={onRemoveOpenedSubInfoRecordDetailId}
                                        />
                                    }
                                </>
                            }
                        </div>
                    </div>
                </Wrapper>
            </CustomDialog>
        </>
    )
}