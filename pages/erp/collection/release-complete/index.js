import Head from 'next/head';
import MainComponent from '../../../../views/erp/collection/release-complete';
import FooterMain from '../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../views/navbar/secondary-navbar-v2';

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