import Layout from "../layout/Layout";
import styled from "styled-components";
import { InputFieldComponent, RecordDetailComponent, RecordItemListComponent } from "./components";
import { useRouter } from "next/router";

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(){
    const router = useRouter();

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'스토어 랭킹'}
                    headerName={'실시간 랭킹'}
                    sidebarColor={'#ffffff'}
                >
                    {router.query.recordId ?
                        <>
                            <RecordDetailComponent />
                        </>
                        :
                        <>
                            <InputFieldComponent />
                            <RecordItemListComponent />
                        </>
                    }
                </Layout>
            </Container>
        </>
    );
}