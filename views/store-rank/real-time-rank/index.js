import Layout from "../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordItemListComponent } from "./components";

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){
    return (
        <>
            <Container>
                <Layout
                    sidebarName={'스토어 랭킹'}
                    headerName={'실시간 랭킹'}
                    sidebarColor={'#ffffff'}
                >
                    <InputFieldComponent />
                    <RecordItemListComponent />
                </Layout>
            </Container>
        </>
    );
}