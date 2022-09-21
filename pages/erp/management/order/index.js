import Head from 'next/head';
import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import OrderComponent from '../../../../component/erp/management/order';
import FooterMain from '../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../component/navbar/secondary-navbar';
const Container = styled.div`

`;

const ErpManagementOrderPage = (props) => {
    return (
        <>
            <Container>
                <Head>
                    <title>리소스 관리</title>
                </Head>
                <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
                <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
                <ErpManagementNavbar></ErpManagementNavbar>
                <OrderComponent></OrderComponent>
                <FooterMain></FooterMain>
            </Container>
        </>
    );
}
export default ErpManagementOrderPage;