import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import MarginMain from "../../component/margin/dashboard/MarginMain";
import NavbarMain from "../../component/navbar/NavbarMain";

const MarginDashboardPage = () =>{
    return (
        <>
            <Head>
				<title>마진율 계산기 | 셀러툴</title>
			</Head>
			<NavbarMain></NavbarMain>
            <MarginMain></MarginMain>
            <FooterMain></FooterMain>
        </>
    );
}

export default MarginDashboardPage;