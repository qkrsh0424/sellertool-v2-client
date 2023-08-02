
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
import { getCookie } from "cookies-next";

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

    const { onReqCreateNRankRecrodDetail, onReqSearchNRankRecordDetail } = useApiHook({ record });
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
        setIsRecordDetailsSearchLoading(true);
        await onReqCreateNRankRecrodDetail({
            body: {
                record_id: record.id
            },
            headers: { wsId: wsId }
        },{
            successCallback: async () => {
                setIsRecordSearchLoading(true);
                await onSearchNRankRecordList();
                setIsRecordSearchLoading(false);
            }
        })
        setIsRecordDetailsSearchLoading(false);
    }

    const handleSearchNRankRecordDetail = async () => {
        await onReqSearchNRankRecordDetail({
            params: {
                record_info_id: record.current_nrank_record_info_id
            },
            headers: { wsId: wsId }
        },{
            successCallback: (results) => {
                let rankDetails = []
                let adRankDetails = []
                results.forEach(r => {
                    r.advertising_yn === 'y' ? adRankDetails.push(r) : rankDetails.push(r);
                })
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
                    </DetailWrapper>
                </Wrapper>
            </CustomDialog>
        </>
    )
}