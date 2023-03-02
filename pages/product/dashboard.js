import Head from 'next/head';
import FooterMain from '../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../views/navbar/secondary-navbar-v2';
import ProductDashboardMainComponent from '../../views/product-v2/dashboard';

export default function ProductDashboardPage(props) {
    return (
        <>
            <Head>
                <title>상품 관리 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <ProductDashboardMainComponent></ProductDashboardMainComponent>
            <FooterMain></FooterMain>
        </>
    );
}