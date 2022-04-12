import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import MarginMain from "../../component/margin/dashboard/MarginMain";
import PrimaryNavbarMainComponent from "../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../component/navbar/secondary-navbar";

const MarginDashboardPage = () => {
    return (
        <>
            <Head>
                <title>마진율 계산기 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <MarginMain></MarginMain>
            <FooterMain></FooterMain>
        </>
    );
}

export default MarginDashboardPage;