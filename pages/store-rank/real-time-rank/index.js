import Head from "next/head";
import FooterMain from "../../../views/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../../views/navbar/secondary-navbar-v2";
import MainComponent from "../../../views/store-rank/real-time-rank";

const StoreRankRealTimeRankPage = () => {
    return (
        <>
            <Head>
                <title>스토어 랭킹 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}
export default StoreRankRealTimeRankPage;