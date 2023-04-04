import Head from 'next/head';
import MainComponent from '../../../../views/erp/collection/sales';
import FooterMain from '../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../views/navbar/secondary-navbar-v2';

export default function ErpCollectionSalesPage(props) {
    return (
        <>
            <Head>
                <title>주문확정 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}