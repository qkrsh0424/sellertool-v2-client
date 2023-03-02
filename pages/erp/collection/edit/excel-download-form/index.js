import Head from 'next/head';
import MainComponent from '../../../../../views/erp/collection/edit/excel-download-form';
import FooterMain from '../../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../../views/navbar/secondary-navbar-v2';

export default function ErpCollectionEditExcelDownloadFormPage(props) {
    return (
        <>
            <Head>
                <title>다운로드 폼 수정 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}