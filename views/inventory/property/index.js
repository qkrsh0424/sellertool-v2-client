import Layout from "../layout/Layout";
import { Container } from "./index.styled";
import ItemListComponnet from "./item-list/ItemList.component";
import SearchConsoleComponent from "./search-console/SearchConsole.component";

export default function Inventory_PropertyComponent() {
    return (
        <>
            <Container>
                <Layout
                    sidebarName={'통합 재고 관리'}
                    headerName={'재고자산'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <SearchConsoleComponent />
                        <ItemListComponnet />
                    </>
                </Layout>
            </Container>
        </>
    )
}