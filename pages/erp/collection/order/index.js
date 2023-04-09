import Head from 'next/head';
import MainComponent from '../../../../views/erp/collection/order';
import FooterMain from '../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../views/navbar/secondary-navbar-v2';

export default function ErpCollectionOrderPage(props) {
    return (
        <>
            <Head>
                <title>주문확인 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}