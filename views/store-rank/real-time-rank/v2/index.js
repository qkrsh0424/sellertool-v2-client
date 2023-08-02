import Layout from "../../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordItemListComponent } from "./components";
import useSearchInputHook from "./hooks/useSearchInputHook";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){

    const {
        keyword,
        mallName,
        onChangeKeyword,
        onChangeMallName,
        reqCreateSearchInfo
    } = useSearchInputHook()

    const {
        isSearchLoading: isRecordSearchLoading,
        searchedRecordList: recordList,
        reqDeleteNRankRecord,
        reqSearchNRankRecordList
    } = useNRankRecordListHook({ keyword, mallName });

    const handleActionSubmitRecordInfo = (e) => {
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

        reqCreateSearchInfo(() => {
            reqSearchNRankRecordList()
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
                        onSubmitRecordInfo={handleActionSubmitRecordInfo}
                    />
                    <RecordItemListComponent
                        keyword={keyword}
                        mallName={mallName}
                        recordList={recordList}
                        reqDeleteNRankRecord={reqDeleteNRankRecord}
                        isRecordSearchLoading={isRecordSearchLoading}
                        reqSearchNRankRecordList={reqSearchNRankRecordList}
                    />
                </Layout>
            </Container>
        </>
    );
}