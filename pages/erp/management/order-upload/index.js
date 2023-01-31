import Head from 'next/head';
import styled from 'styled-components';
import ErpManagementNavbar from '../../../../views/erp/management/navbar/ErpManagementNavbar';
import ErpOrderUploadComponent from '../../../../views/erp/management/order-upload';
import FooterMain from '../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../views/navbar/secondary-navbar-v2';
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