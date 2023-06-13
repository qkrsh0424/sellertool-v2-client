import styled from 'styled-components';
import Layout from '../layout/Layout';
import SearchConsoleComponent from './search-console/SearchConsole.component';
import ItemListComponent from './item-list/ItemList.component';

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(props) {
    return (
        <>
            <Container>
                <Layout
                    sidebarName={'통합 재고 관리'}
                    headerName={'재고주기 분석'}
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