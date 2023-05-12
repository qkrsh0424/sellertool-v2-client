import { useEffect } from "react";
import Layout from "../layout/Layout";
import ItemListComponent from "./item-list/ItemList.component";
import SearchConsoleComponent from "./search-console/SearchConsole.component";
import { Container } from "./styles/index.styled";
import { inventoryDataConnect } from "../../../data_connect/inventoryDataConnect";
import { useSelector } from "react-redux";
import { productOptionDataConnect } from "../../../data_connect/productOptionDataConnect";

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    // TODO : Delete useEffect
    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        let params = {
            size: 20,
            page: 1,
            assetType: 'property_price',
            orderType: 'asc',
            stockManagementYn:'y',
            packageYn:'n',
            searchCondition:'PRODUCT_OPTION_NAM',
            searchQuery:'',
            productCategoryId:'e1f45458-5896-4086-b13d-40b0820fcefe',
            productSubCategoryId:'f5408e9f-6599-11ed-b93e-061b211b7e76'
        }
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        inventoryDataConnect().searchStockAssetsSlice(params, headers)
            .then(res => {
                console.log(res);
            });
        productOptionDataConnect().count(params, headers)
            .then(res => {
                console.log(res);
            })
    }, [workspaceRedux?.workspaceInfo?.id])

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'재고관리'}
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