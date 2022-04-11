import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import MainComponent from "../../component/margin/viewer/MainComponent";
import NavbarMain from "../../component/navbar/NavbarMain";

const MarginViewerPage = () =>{
    return (
        <>
            <Head>
				<title>마진율 계산기 뷰어 | 셀러툴</title>
			</Head>
			<NavbarMain></NavbarMain>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}

export default MarginViewerPage;