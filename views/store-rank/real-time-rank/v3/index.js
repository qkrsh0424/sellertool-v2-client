import Layout from "../../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordItemListComponent } from "./components";
import useSearchInputHook from "./hooks/useSearchInputHook";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import { useSelector } from "react-redux";
import { useApiHook } from "./hooks/useApiHook";
import { useEffect } from "react";

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqCreateSearchInput, onReqDeleteNRankRecord, onReqSearchNRankRecordList } = useApiHook();
    const { keyword, mallName, onChangeKeyword, onChangeMallName, onClearKeyword, onClearMallName, checkSearchInfoForm } = useSearchInputHook();
    const { searchedRecordList: recordList, onSetRecordList } = useNRankRecordListHook({ keyword, mallName });

    useEffect(() => {
        if(!wsId) {
            return;
        }

        async function initialize() {
            handleReqSearchNRankRecordList()
        }

        initialize();
    }, [wsId])

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
            successCallback: () => {
                onClearKeyword();
                onClearMallName();
                handleReqSearchNRankRecordList();
            }
        })
    }

    const handleReqDeleteRankRecord = async (selectedId, callback) => {
        await onReqDeleteNRankRecord({
            params: {
                id: selectedId
            },
            headers: { wsId: wsId }
        },{
            successCallback: () => {
                callback();
                handleReqSearchNRankRecordList();
            }
        })
    }

    const handleReqSearchNRankRecordList = async () => {
        await onReqSearchNRankRecordList({
            headers: { wsId: wsId }
        }, {
            successCallback: (results) => {
                onSetRecordList(results);
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
                    <RecordItemListComponent
                        keyword={keyword}
                        mallName={mallName}
                        recordList={recordList}
                        onDeleteRankRecord={handleReqDeleteRankRecord}
                        onSearchNRankRecordList={handleReqSearchNRankRecordList}
                        onSetRecordList={onSetRecordList}
                    />
                </Layout>
            </Container>
        </>
    );
}