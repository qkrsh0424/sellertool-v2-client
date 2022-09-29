import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import MainComponent from "../../component/n-rank/dashboard/MainComponent";
import PrimaryNavbarMainComponent from "../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../component/navbar/secondary-navbar-v2";

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