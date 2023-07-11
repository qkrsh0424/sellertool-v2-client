import Layout from "../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordItemListComponent } from "./components";
import useSearchInputHook from "./hooks/useSearchInputHook";

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){
    const {
        keyword,
        mallName,
        onChangeKeyword,
        onChangeMallName
    } = useSearchInputHook()

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
                    />
                    <RecordItemListComponent
                        keyword={keyword}
                        mallName={mallName}
                    />
                </Layout>
            </Container>
        </>
    );
}