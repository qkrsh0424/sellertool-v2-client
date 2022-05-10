import Head from 'next/head';
import styled from 'styled-components';
import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
import ErpOrderUploadComponent from '../../../../component/erp/management/order-upload';
import FooterMain from '../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../component/navbar/secondary-navbar';
// import ErpManagementNavbar from '../../../../component/erp/management/navbar/ErpManagementNavbar';
// import ErpOrderUploadComponent from '../../../../component/erp/management/order-upload';
// import NavbarMain from '../../../../component/navbar/NavbarMain';
const Container = styled.div`

`;

const ErpManagementOrderUploadPage = (props) => {
    return (
        <>
            <Container>
                <Head>
                    <title>리소스 관리</title>
                </Head>
                <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
                <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
                <ErpManagementNavbar></ErpManagementNavbar>
                <ErpOrderUploadComponent></ErpOrderUploadComponent>
                <FooterMain></FooterMain>
            </Container>
        </>
    );
}
export default ErpManagementOrderUploadPage;