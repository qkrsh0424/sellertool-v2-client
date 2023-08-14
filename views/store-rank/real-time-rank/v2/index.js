import Layout from "../../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordItemListComponent, RecordItemListSkeletonComponent } from "./components";
import useSearchInputHook from "./hooks/useSearchInputHook";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { useSelector } from "react-redux";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect } from "react";

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

    const { onReqCreateSearchInput, onReqDeleteNRankRecord, onReqSearchNRankRecordList } = useApiHook();
    const { keyword, mallName, onChangeKeyword, onChangeMallName, onClearKeyword, onClearMallName, checkSearchInfoForm } = useSearchInputHook();
    const { searchedRecordList: recordList, currentPendingRecordIds, onSetRecordList, onSetCurrentPendingRecordIds } = useNRankRecordListHook({ keyword, mallName });

    useEffect(() => {
        if(!wsId) {
            return;
        }

        async function initialize() {
            handleReqSearchNRankRecordList()
        }

        initialize();
    }, [wsId])

    useEffect(() => {
        if(!(currentPendingRecordIds?.length > 0)) {
            return;
        }

        const fetch = setInterval(() => {
            handleReqSearchNRankRecordList();
        }, [3000])

        return () => clearInterval(fetch);
    }, [currentPendingRecordIds])

    const handleSubmitRecordInput = async (e) => {
        e.preventDefault();

        if(recordList?.length > 0) {
            if(recordList.find(r => r.keyword === keyword && r.mall_name === mallName)) {
                let message = "동일한 검색 항목이 존재합니다";
                customToast.error(message, {
                    ...defaultOptions,
                    toastId: message
                });
                return;
            }
        }

        try {
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

    const handleReqDeleteRankRecord = async (selectedId, callback) => {
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
                callback();
                handleReqSearchNRankRecordList();
            }
        })
    }

    const handleReqSearchNRankRecordList = async () => {
        await onReqSearchNRankRecordList({
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                let pendingIds = [];
                results.forEach(r => {
                    if(r.status === RECORD_STATUS_ENUM.PENDING) {
                        pendingIds.push(r.id);
                    }

                    // pending -> complete / fail 로 update된 경우
                    if(currentPendingRecordIds?.includes(r.id)) {
                        switch(r.status) {
                            case(RECORD_STATUS_ENUM.PENDING):
                                pendingIds.push(r.id);
                                break;
                            case(RECORD_STATUS_ENUM.COMPLETE):
                                var content = `[${r.keyword} - ${r.mall_name}] 랭킹 업데이트 완료 !`
                                customToast.success(content, {
                                    ...defaultOptions,
                                    toastId: content
                                });
                                break;
                            case(RECORD_STATUS_ENUM.FAIL):
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
                onSetCurrentPendingRecordIds([...pendingIds]);
            }
        })
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
                            onDeleteRankRecord={handleReqDeleteRankRecord}
                            currentPendingRecordIds={currentPendingRecordIds}
                            onSetCurrentPendingRecordIds={onSetCurrentPendingRecordIds}
                        />
                        :
                        <RecordItemListSkeletonComponent />
                    }
                </Layout>
            </Container>
        </>
    );
}