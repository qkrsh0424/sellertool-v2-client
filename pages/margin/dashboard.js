import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import MainComponent from "../../component/margin/dashboard-v2";
import PrimaryNavbarMainComponent from "../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../component/navbar/secondary-navbar-v2";

const MarginDashboardPage = () => {
    return (
        <>
            <Head>
                <title>마진율 계산기 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}

export default MarginDashboardPage;