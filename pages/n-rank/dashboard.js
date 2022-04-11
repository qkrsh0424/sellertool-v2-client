import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import MainComponent from "../../component/n-rank/dashboard/MainComponent";
import NavbarMain from "../../component/navbar/NavbarMain";

const NaverRankDashboard = () => {
    return (
        <>
            <Head>
                <title>네이버 랭킹 조회 | 셀러툴</title>
            </Head>
            <NavbarMain></NavbarMain>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}
export default NaverRankDashboard;