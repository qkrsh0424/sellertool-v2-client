import Head from "next/head";
import MainComponent from "../../component/excel-translator";
import FooterMain from "../../component/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../component/navbar/secondary-navbar-v2";

export default function ExcelTranslatorPage(props) {
    return (
        <>
            <Head>
                <title>셀러툴 홈</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}