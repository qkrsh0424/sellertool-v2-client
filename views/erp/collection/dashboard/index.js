import Layout from "../layout/Layout";
import styled from 'styled-components';
import NumberOfOrderCharComponent from "./number-of-order-chart/NumberOfOrderChart.component";

export const Container = styled.div`
    background:var(--defaultBackground);
`;

export default function MainComponent(props) {
    return (
        <>
            <Container>
                <Layout
                    sidebarName={'발주관리'}
                    headerName={'대시보드'}
                    sidebarColor={'#ffffff'}
                >
                    <NumberOfOrderCharComponent />
                </Layout>
            </Container>
        </>
    );
}