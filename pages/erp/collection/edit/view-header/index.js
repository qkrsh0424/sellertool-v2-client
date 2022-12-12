import Head from 'next/head';
import MainComponent from '../../../../../component/erp/collection/edit/view-header';
import FooterMain from '../../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../../component/navbar/secondary-navbar-v2';

export default function ErpCollectionEditViewHeaderPage(props) {
    return (
        <>
            <Head>
                <title>뷰헤더 수정 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}