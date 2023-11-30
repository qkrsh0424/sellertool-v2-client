import Layout from "../../layout/Layout";
import { FdItemList } from "./components/FdItemList";
import { SearchConsoleState } from "./components/SearchConsoleState";
import { Container } from "./index.styled";

export default function MainComponent(props) {
    return (
        <>
            <Container>
                <Layout
                    sidebarName={'통합 재고 관리'}
                    headerName={'재고조회 / 입출고 관리'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <SearchConsoleState />
                        <FdItemList />
                    </>
                </Layout>
            </Container>
        </>
    );
}