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
// import SubInfoFieldView from "./view/SubInfoField.view";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import RankDetailSkeletonFieldView from "./view/RankDetailSkeletonField.view";
import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { customBackdropController } from "../../../../../../../../components/backdrop/default/v1";
import FieldLoadingV2 from "../../../../../../../modules/loading/FieldLoadingV2";
import DetailControlFieldView from "./view/DetailControlField.view";
import useNRankRecordInfoHook from "./hooks/useNRankRecordInfoHook";
import { DetailRankTableComponent } from "../detail-rank-table/v2";
import _ from "lodash";
import InfoSelectorFieldView from "./view/InfoSelectorField.view";

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

    const {
        onReqSearchNRankRecordInfos,
        onReqSearchNRankRecordDetailsByInfos,
        onReqChangeNRankRecordStatusToPendingAndCreateNRankRecordInfo,
        onReqCreateNRankRecordDetails,
    } = useApiHook();

    const {
        recordDetails,
        adRecordDetails,
        openedSubInfoRecordDetailIds,
        recordDetailsBySearchedInfos,
        traceableRecordDetails,
        traceableAdRecordDetails,
        onSetRecordDetailsBySearchedInfos,
        onSetRecordDetails,
        onSetAdRecordDetails,
        onSetTraceableRecordDetails,
        onSetTraceableAdRecordDetails,
        onAddOpenedSubInfoRecordDetailId,
        onRemoveOpenedSubInfoRecordDetailId,
        onActionFoldAllOptions,
        onActionUnfoldAllOptions,
        checkStatusForModalOpen
    } = useNRankRecordDetailHook();

    const {
        recordInfos,
        selectedRecordInfo,
        currentRecordInfoIdx,
        lastSearchedRecordInfo,
        onSetCurrentRecordInfoIdx,
        onSetRecordInfos,
        onChangeSelectedRecordInfo
    } = useNRankRecordInfoHook({ record });

    const [isAdRankView, setIsAdRankView] = useState(false);
    const [isInitSearchLoading, setIsInitSearchLoading] = useState(false);
    const [detailTrendModalOpen, setDetailTrendModalOpen] = useState(false);

    let isPending = currentPendingRecordIds?.includes(record?.id);

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!record) {
            return;
        }

        async function initialize() {
            setIsInitSearchLoading(true);
            await handleSearchNRankRecordInfos();
            setIsInitSearchLoading(false);
        }

        initialize();
    }, [record, wsId])

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(!recordInfos) {
            return;
        }

        async function fetchRecordDetails() {
            setIsInitSearchLoading(true);
            await handleSearchNRankRecordDetailsByInfos();
            setIsInitSearchLoading(false);
        }

        fetchRecordDetails();
        onSetCurrentRecordInfoIdx(recordInfos.length-1)
    }, [recordInfos, wsId])

    useEffect(() => {
        if(!selectedRecordInfo) {
            return;
        }

        if(!recordDetailsBySearchedInfos) {
            return;
        }
        
        handleInitDetailsBySelectedRecordInfo();
    }, [selectedRecordInfo, recordDetailsBySearchedInfos])

    const handleSearchNRankRecordInfos = async () => {
        await onReqSearchNRankRecordInfos({
            params: { record_id: record.id },
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                let sortedResults = _.sortBy(results, 'created_at');
                onSetRecordInfos(sortedResults);
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
        await onReqChangeNRankRecordStatusToPendingAndCreateNRankRecordInfo({
            headers: { wsId: wsId },
            body: { record_id: recordId, record_info_id: createRecordInfoId }
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

    const handleCreateNRankRecordDetail = async () => {
        await onReqCreateNRankRecordDetails({
            body: { record_id: record.id, record_info_id: createRecordInfoId },
            headers: { wsId: wsId }
        })
    }

    const handleInitDetailsBySelectedRecordInfo = () => {
        let data = recordDetailsBySearchedInfos.filter(r => r.nrank_record_info_id === selectedRecordInfo.id);

        let details = [];
        let adDetails = [];

        data.forEach(r => {
            if(r.advertising_yn === 'y') {
                adDetails.push(r);
            }else {
                details.push(r);
            }
        })

        onSetRecordDetails(details);
        onSetAdRecordDetails(adDetails);
    }

    const handleChangeAdRankView = () => {
        setIsAdRankView(true);
    }

    const handleChangeRankView = () => {
        setIsAdRankView(false);
    }

    const handleOpenDetailTrendModal = (e) => {
        e.stopPropagation();

        try {
            checkStatusForModalOpen();
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            });
            return;
        }
        setDetailTrendModalOpen(true);
    }

    const handleCloseDetailTrendModal = () => {
        setDetailTrendModalOpen(false);
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
                    <RecordInfoFieldView
                        record={record}
                        lastSearchedRecordInfo={lastSearchedRecordInfo}
                    />

                    <ButtonFieldView
                        lastSearchedRecordInfo={lastSearchedRecordInfo}
                        isPending={isPending}
                        isInitSearchLoading={isInitSearchLoading}
                        onSubmit={handleChangeNRankRecordStatusToPending}
                    />

                    <DetailControlFieldView
                        isPending={isPending}
                        recordInfos={recordInfos}
                        currentRecordInfoIdx={currentRecordInfoIdx}
                        selectedRecordInfo={selectedRecordInfo}
                        traceableRecordDetails={traceableRecordDetails}
                        traceableAdRecordDetails={traceableAdRecordDetails}

                        onActionFoldAllOptions={onActionFoldAllOptions}
                        onActionUnfoldAllOptions={onActionUnfoldAllOptions}
                        onSetCurrentRecordInfoIdx={onSetCurrentRecordInfoIdx}
                        onChangeSelectedRecordInfo={onChangeSelectedRecordInfo}
                        onOpenDetailTrendModal={handleOpenDetailTrendModal}
                    />

                    <InfoSelectorFieldView
                        isPending={isPending}
                        recordInfos={recordInfos}
                        currentRecordInfoIdx={currentRecordInfoIdx}
                        selectedRecordInfo={selectedRecordInfo}
                        onSetCurrentRecordInfoIdx={onSetCurrentRecordInfoIdx}
                        onChangeSelectedRecordInfo={onChangeSelectedRecordInfo}
                    />

                    <ViewControlFieldView
                        isAdRankView={isAdRankView}
                        recordDetails={recordDetails}
                        adRecordDetails={adRecordDetails}
                        onChangeAdRankView={handleChangeAdRankView}
                        onChangeRankView={handleChangeRankView}
                    />

                    <div>
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
                                    {isInitSearchLoading && !recordInfos &&
                                        <FieldLoadingV2
                                            oxStyle={{
                                                borderRadius: '15px'
                                            }}
                                        />
                                    }

                                    {isAdRankView ?
                                        <AdRankDetailFieldView
                                            lastSearchedRecordInfo={lastSearchedRecordInfo}
                                            adRecordDetails={adRecordDetails}
                                            openedSubInfoRecordDetailIds={openedSubInfoRecordDetailIds}
                                            onAddOpenedSubInfoRecordDetailId={onAddOpenedSubInfoRecordDetailId}
                                            onRemoveOpenedSubInfoRecordDetailId={onRemoveOpenedSubInfoRecordDetailId}
                                        />
                                        :
                                        <RankDetailFieldView
                                            record={record}
                                            lastSearchedRecordInfo={lastSearchedRecordInfo}
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

                    <div className='detail-info-text'>
                        <span>{currentRecordInfoIdx + 1}</span>
                        <span> / </span>
                        <span>{recordInfos?.length || 1}</span>
                    </div>
                </Wrapper>
            </CustomDialog>

            {/* detail rank trend modal */}
            {detailTrendModalOpen &&
                <DetailRankTableComponent
                    open={detailTrendModalOpen}
                    onClose={() => handleCloseDetailTrendModal()}
                    record={record}
                    recordInfos={recordInfos}
                    recordDetailsBySearchedInfos={recordDetailsBySearchedInfos}
                    traceableRecordDetails={traceableRecordDetails}
                    traceableAdRecordDetails={traceableAdRecordDetails}
                />
            }
        </>
    )
}