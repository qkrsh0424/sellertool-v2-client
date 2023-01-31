import Head from 'next/head';
import MainComponent from '../../../../views/erp/collection/order-upload';
import FooterMain from '../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../views/navbar/secondary-navbar-v2';

export default function ErpCollectionOrderUploadPage(props) {
    return (
        <>
            <Head>
                <title>발주업로드 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}