import Head from "next/head";
import FooterMain from "../../views/footer/FooterMain";
import MainComponent from "../../views/margin-v2/viewer";
import PrimaryNavbarMainComponent from "../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../views/navbar/secondary-navbar-v2";

const MarginViewerPage = () => {
    return (
        <>
            <Head>
                <title>마진율 계산기 뷰어 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <MainComponent></MainComponent>
            {/* <FooterMain></FooterMain> */}
        </>
    );
}

export default MarginViewerPage;