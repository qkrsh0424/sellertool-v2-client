import Head from 'next/head';
import MainComponent from '../../../../../component/erp/collection/create/excel-download-form';
import FooterMain from '../../../../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../../component/navbar/secondary-navbar-v2';

export default function ErpCollectionCreateExcelDownloadFormPage(props) {
    return (
        <>
            <Head>
                <title>다운로드 폼 생성 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}