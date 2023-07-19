import Layout from "../../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordItemListComponent } from "./components";
import useSearchInputHook from "./hooks/useSearchInputHook";
import useNRankRecordListHook from "./hooks/useNRankRecordListHook";

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){

    const {
        recordList,
        reqDeleteNRankRecord,
        reqSearchNRankRecordList
    } = useNRankRecordListHook();

    const {
        keyword,
        mallName,
        onChangeKeyword,
        onChangeMallName,
        reqCreateSearchInfo
    } = useSearchInputHook({ recordList })

    const handleActionSubmitRecordInfo = (e) => {
        e.preventDefault();

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
                        reqSearchNRankRecordList={reqSearchNRankRecordList}
                    />
                </Layout>
            </Container>
        </>
    );
}