import { useEffect } from "react";
import Layout from "../layout/Layout";
import ItemListComponent from "./item-list/ItemList.component";
import SearchConsoleComponent from "./search-console/SearchConsole.component";
import { Container } from "./styles/index.styled";
import { inventoryDataConnect } from "../../../data_connect/inventoryDataConnect";
import { useSelector } from "react-redux";
import { productOptionDataConnect } from "../../../data_connect/productOptionDataConnect";

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
                        <SearchConsoleComponent />
                        <ItemListComponent />
                    </>
                </Layout>
            </Container>
        </>
    );
}