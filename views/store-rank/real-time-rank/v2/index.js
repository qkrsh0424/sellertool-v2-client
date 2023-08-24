import Layout from "../../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordItemListComponent, RecordItemListSkeletonComponent } from "./components";
import useSearchInputHook from "./hooks/useSearchInputHook";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { useSelector } from "react-redux";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect } from "react";
import { setPlusTime } from "./utils/dateFormatUtils";
import { getRecordPendingStatusExceedSeconds } from "../../../../static-data/nrankRecordOptions";
import useSubscriptionPlanSearchInfoHook from "./hooks/useSubscriptionPlanSearchInfoHook";

const RECORD_STATUS_ENUM = {
    NONE: 'NONE',
    PENDING: 'PENDING',
    COMPLETE: 'COMPLETE',
    FAIL: 'FAIL'
}
    
export const Container = styled.div`
    background: var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqSearchSubscriptionPlanSearchInfo, onReqCreateSearchInput, onReqDeleteNRankRecord, onReqSearchNRankRecordList, onReqChangeNRankRecordListStatusToFail } = useApiHook();
    const { rankSearchInfo, onSetRankSearchInfo } = useSubscriptionPlanSearchInfoHook();
    const { keyword, mallName, onChangeKeyword, onChangeMallName, onClearKeyword, onClearMallName, checkSearchInfoForm } = useSearchInputHook();
    const { searchedRecordList: recordList, currentPendingRecordIds, onSetRecordList, onSetCurrentPendingRecordIds } = useNRankRecordListHook({ keyword, mallName });

    useEffect(() => {
        if(!wsId) {
            return;
        }

        async function initialize() {
            handleReqSearchNRankRecordList()
            handleReqSearchSubscriptionPlanSearchInfo()
        }

        initialize();
    }, [wsId])

    useEffect(() => {
        if(!(currentPendingRecordIds?.length > 0)) {
            return;
        }

        // poling 방식 nrank record 조회 요청
        const fetch = setInterval(() => {
            handleReqSearchNRankRecordList();
        }, [3000])

        return () => clearInterval(fetch);
    }, [currentPendingRecordIds])

    const handleSubmitRecordInput = async (e) => {
        e.preventDefault();

        try {
            if(recordList?.find(r => r.keyword === keyword && r.mall_name === mallName)) {
                throw Error("동일한 검색 항목이 존재합니다")
            }

            checkSearchInfoForm();
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            });
            return;
        }
        
        await onReqCreateSearchInput({
            body: {
                keyword: keyword.trim(),
                mall_name: mallName.trim()
            },
            headers: { wsId: wsId }
        },{
            success: () => {
                onClearKeyword();
                onClearMallName();
                handleReqSearchNRankRecordList();
            }
        })
    }

    const handleReqDeleteRankRecord = async (selectedId, modalClose) => {
        await onReqDeleteNRankRecord({
            params: { id: selectedId },
            headers: { wsId: wsId }
        },{
            success: () => {
                let content = `정상적으로 제거되었습니다.`
                customToast.success(content, {
                    ...defaultOptions,
                    toastId: content
                });
                modalClose();
                handleReqSearchNRankRecordList();
            }
        })
    }

    const handleReqChangeNRankRecordListStatusToFail = async (ids) => {
        await onReqChangeNRankRecordListStatusToFail({
            body: {ids: ids},
            headers: { wsId: wsId }
        }, {
            success: () => {
                handleReqSearchSubscriptionPlanSearchInfo()
            }
        });
    }

    const handleReqSearchSubscriptionPlanSearchInfo = async () => {
        await onReqSearchSubscriptionPlanSearchInfo({
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                onSetRankSearchInfo(results);
            }
        })
    }

    const handleReqSearchNRankRecordList = async () => {
        await onReqSearchNRankRecordList({
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                handleUpdateRecordStatus(results)
                handleChangeLongPendingRecordStatusToFail(results)
            }
        })
    }

    const handleUpdateRecordStatus = (results) => {
        let recordIds = [];

        results.forEach(r => {
            if (r.status === RECORD_STATUS_ENUM.PENDING) {
                recordIds.push(r.id);
            }

            // pending -> complete / fail 로 update된 경우
            if (currentPendingRecordIds?.includes(r.id)) {
                switch (r.status) {
                    case (RECORD_STATUS_ENUM.COMPLETE):
                        var content = `[${r.keyword} - ${r.mall_name}] 랭킹 업데이트 완료 !`
                        customToast.success(content, {
                            ...defaultOptions,
                            toastId: content
                        });
                        break;
                    case (RECORD_STATUS_ENUM.FAIL):
                        var content = `[${r.keyword} - ${r.mall_name}] 랭킹 검색 실패. 재시도 해주세요.`
                        customToast.error(content, {
                            ...defaultOptions,
                            toastId: content
                        });
                        break;
                    default:
                        break;
                }
            }
        })

        onSetRecordList(results);
        onSetCurrentPendingRecordIds([...recordIds]);
    }

    const handleChangeLongPendingRecordStatusToFail = (results) => {
        let recordIds = []
        let currentDate = new Date()

        results.forEach(r => {
            if(r.status === RECORD_STATUS_ENUM.PENDING && r.status_updated_at) {
                let exceedTargetTime = setPlusTime(r.status_updated_at, 0, 0, getRecordPendingStatusExceedSeconds());
                if(currentDate > exceedTargetTime) {
                    recordIds.push(r.id)
                }
            }
        });

        if(recordIds.length > 0) {
            handleReqChangeNRankRecordListStatusToFail(recordIds);
        }
    }

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'스토어 랭킹'}
                    headerName={'실시간 랭킹'}
                    sidebarColor={'#ffffff'}
                >
                    <InputFieldComponent
                        keyword={keyword}
                        mallName={mallName}
                        onChangeKeyword={onChangeKeyword}
                        onChangeMallName={onChangeMallName}
                        onSubmitRecordInput={handleSubmitRecordInput}
                    />
                    
                    {recordList ? 
                        <RecordItemListComponent
                            keyword={keyword}
                            mallName={mallName}
                            recordList={recordList}
                            rankSearchInfo={rankSearchInfo}
                            currentPendingRecordIds={currentPendingRecordIds}
                            onDeleteRankRecord={handleReqDeleteRankRecord}
                            onSetCurrentPendingRecordIds={onSetCurrentPendingRecordIds}
                            onSearchSubscriptionPlanSearchInfo={handleReqSearchSubscriptionPlanSearchInfo}
                        />
                        :
                        <RecordItemListSkeletonComponent />
                    }
                </Layout>
            </Container>
        </>
    );
}