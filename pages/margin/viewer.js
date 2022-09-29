import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import MainComponent from "../../component/margin/viewer/MainComponent";
import PrimaryNavbarMainComponent from "../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../component/navbar/secondary-navbar-v2";

const MarginViewerPage = () => {
    return (
        <>
            <Head>
                <title>마진율 계산기 뷰어 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}

export default MarginViewerPage;