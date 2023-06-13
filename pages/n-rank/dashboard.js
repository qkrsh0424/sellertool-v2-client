import Head from "next/head";
import FooterMain from "../../views/footer/FooterMain";
import MainComponent from "../../views/n-rank/dashboard/MainComponent";
import PrimaryNavbarMainComponent from "../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../views/navbar/secondary-navbar-v2";

const NaverRankDashboard = () => {
    return (
        <>
            <Head>
                <title>네이버 랭킹 조회 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}
export default NaverRankDashboard;