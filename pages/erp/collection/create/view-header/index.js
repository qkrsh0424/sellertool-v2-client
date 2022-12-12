import Head from 'next/head';
import MainComponent from '../../../../../component/erp/collection/create/view-header';
import FooterMain from '../../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../../component/navbar/secondary-navbar-v2';

export default function ErpCollectionCreateViewHeaderPage(props) {
    return (
        <>
            <Head>
                <title>뷰헤더 생성 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}