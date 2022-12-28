import Head from 'next/head';
import MainComponent from '../../../../component/erp/collection/release-complete';
import FooterMain from '../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../component/navbar/secondary-navbar-v2';

export default function ErpCollectionReleaseCompletePage(props) {
    return (
        <>
            <Head>
                <title>출고상태관리 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}