import Head from 'next/head';
import MainComponent from '../../../../component/erp/collection/order';
import FooterMain from '../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../component/navbar/secondary-navbar-v2';

export default function ErpCollectionOrderPage(props) {
    return (
        <>
            <Head>
                <title>주문수집관리 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}