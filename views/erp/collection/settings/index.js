import { useSellertoolDatas } from "../../../../hooks/sellertool-datas";
import Layout from "../layout/Layout";
import ExcelDownloadForm from "./excel-download-form/ExcelDownloadForm.component";
import { Container } from "./styles/index.styled";
import ViewHeaderComponent from "./view-header/ViewHeader.component";

export default function MainComponent(props) {
    const sellertoolDatas = useSellertoolDatas();

    const handleSetFavoriteViewHeaderIds = (array) => {
        sellertoolDatas._onSetFavoriteViewHeaderIds(array);
    }

    const handleSetFavoriteDownloadFormIds = (array) => {
        sellertoolDatas._onSetFavoriteDownloadFormIds(array);
    }

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'주문수집관리'}
                    headerName={'설정'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <ViewHeaderComponent
                            erpcFavoriteViewHeaderIds={sellertoolDatas?.favoriteViewHeaderIdsForErpc}
                            onActionSetFavoriteViewHeaderIds={(array) => handleSetFavoriteViewHeaderIds(array)}
                        />
                        <ExcelDownloadForm
                            erpcFavoriteDownloadFormIds={sellertoolDatas?.favoriteDownloadFormIdsForErpc}
                            onActionSetFavoriteDownloadFormIds={(array) => handleSetFavoriteDownloadFormIds(array)}
                        />
                    </>
                </Layout>
            </Container>
        </>
    );
}