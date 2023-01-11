import Layout from "../layout/Layout";
import ExcelDownloadForm from "./excel-download-form/ExcelDownloadForm.component";
import { Container } from "./styles/index.styled";
import ViewHeaderComponent from "./view-header/ViewHeader.component";

export default function MainComponent(props) {
    return (
        <>
            <Container>
                <Layout
                    sidebarName={'주문수집관리'}
                    headerName={'설정'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <ViewHeaderComponent />
                        <ExcelDownloadForm />
                    </>
                </Layout>
            </Container>
        </>
    );
}