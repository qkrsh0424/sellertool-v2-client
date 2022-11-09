import Head from 'next/head';
import FooterMain from '../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../component/navbar/secondary-navbar-v2';
import ProductDashboardMainComponent from '../../component/product/dashboard';

export default function ProductDashboardPage(props) {
    return (
        <>
            <Head>
                <title>상품 관리</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <ProductDashboardMainComponent></ProductDashboardMainComponent>
            <FooterMain></FooterMain>
        </>
    );
}