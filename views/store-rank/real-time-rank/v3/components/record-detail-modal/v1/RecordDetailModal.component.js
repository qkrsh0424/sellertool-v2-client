
import useNRankRecordDetailHook from "./hooks/useNRankRecordDetailHook";
import { DetailWrapper, Wrapper } from "./styles/RecordDetailModal.styled";
import RankDetailFieldView from "./view/RankDetailField.view";
import RecordInfoFieldView from "./view/RecordInfoField.view";
import ButtonFieldView from "./view/ButtonField.view";
import AdRankDetailFieldView from "./view/AdRankDetailField.view";
import { useEffect, useState } from "react";
import ViewControlFieldView from "./view/ViewControlField.view";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { CustomProgressIcon } from "../../progress/progress-icon/v1";
import SubInfoFieldView from "./view/SubInfoField.view";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { customToast, defaultOptions } from "../../../../../../../components/toast/custom-react-toastify/v1";
import RankDetailSkeletonFieldView from "./view/RankDetailSkeletonField.view";

export function RecordDetailModalComponent({
    open,
    onClose,
    record,
    onSearchNRankRecordList
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const [isRecordSearchLoading, setIsRecordSearchLoading] = useState(false);
    const [isRecordDetailsSearchLoading, setIsRecordDetailsSearchLoading] = useState(false);
    const [isAdRankView, setIsAdRankView] = useState(false);

    const { onReqCreateNRankRecordDetail, onReqSearchNRankRecordDetail } = useApiHook();
    const { recordDetails, adRecordDetails, targetRecordInfo, onSetRecordDetails, onSetAdRecordDetails, onActionUpdateTargetRecordInfo } = useNRankRecordDetailHook({ record });

    useEffect(() => {
        if(!wsId) {
            return;
        }

        if(record) {
            let pendingIds = getCookie('nrank_search_pending_ids');
            let ids = pendingIds?.split(" ") ?? [];
            ids.includes(record.id) ? setIsRecordDetailsSearchLoading(true) : setIsRecordDetailsSearchLoading(false);
        }

        if(!(record && record.current_nrank_record_info_id)) {
            return;
        }

        async function initialize() {
            await handleSearchNRankRecordDetail()
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

    const handleCreateNRankRecordDetail = async () => {
        let pendingIds = getCookie('nrank_search_pending_ids');
        let updatedIds = pendingIds ? pendingIds.concat(",", record.id) : record.id
        setCookie('nrank_search_pending_ids', updatedIds);
        
        setIsRecordDetailsSearchLoading(true);
        await onReqCreateNRankRecordDetail({
            body: { record_id: record.id },
            headers: { wsId: wsId }
        },{
            success: async () => {
                let content = `[${record.keyword} - ${record.mall_name}] 랭킹 업데이트 완료 !`
                customToast.success(content, {
                    ...defaultOptions,
                    toastId: content
                });

                setIsRecordSearchLoading(true);
                await onSearchNRankRecordList();
                setIsRecordSearchLoading(false);
            },
            finally: () => {
                let updatedPendingIds = getCookie('nrank_search_pending_ids');
                let ids = updatedPendingIds.split(",");
                let updatedIds = ids.filter(id => id !== record.id).join(",");
                updatedIds.length === 0 ? deleteCookie('nrank_search_pending_ids') : setCookie('nrank_search_pending_ids', updatedIds);
            }
        })
        setIsRecordDetailsSearchLoading(false);
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

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="md"
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
                        isRecordSearchLoading={isRecordSearchLoading}
                        isRecordDetailsSearchLoading={isRecordDetailsSearchLoading}
                        onSubmit={handleCreateNRankRecordDetail}
                    />
                    <DetailWrapper style={{ position: 'relative' }}>
                        <ViewControlFieldView
                            isAdRankView={isAdRankView}
                            recordDetails={recordDetails}
                            adRecordDetails={adRecordDetails}
                            onChangeAdRankView={handleChangeAdRankView}
                            onChangeRankView={handleChangeRankView}
                        />
                        
                        {isRecordDetailsSearchLoading &&
                            <CustomProgressIcon
                                type={'sync'}
                                color='var(--mainColor)'
                                size={20}
                                margin={20}
                                isBackgroundBlur={true}
                            />
                        }

                        {/* {(adRecordDetails && recordDetails) ?
                            (isAdRankView) ?
                                <AdRankDetailFieldView
                                    adRecordDetails={adRecordDetails}
                                />
                                :
                                <RankDetailFieldView
                                    targetRecordInfo={targetRecordInfo}
                                    recordDetails={recordDetails}
                                />
                            :
                            <RankDetailSkeletonFieldView />
                        } */}
                        
                        {(adRecordDetails && recordDetails && !isRecordDetailsSearchLoading) &&
                            <>
                                {isAdRankView ?
                                    <AdRankDetailFieldView
                                        adRecordDetails={adRecordDetails}
                                    />
                                    :
                                    <RankDetailFieldView
                                        targetRecordInfo={targetRecordInfo}
                                        recordDetails={recordDetails}
                                    />
                                }
                            </>
                        }

                        {isRecordDetailsSearchLoading &&
                            <RankDetailSkeletonFieldView />
                        }
                    </DetailWrapper>
                </Wrapper>
            </CustomDialog>
        </>
    )
}