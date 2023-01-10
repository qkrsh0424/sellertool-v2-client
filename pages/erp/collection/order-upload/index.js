import Head from 'next/head';
import MainComponent from '../../../../component/erp/collection/order-upload';
import FooterMain from '../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../component/navbar/secondary-navbar-v2';

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