import Head from "next/head";
import FooterMain from "../component/footer/FooterMain";
import MainComponent from "../component/signup/MainComponent";
import PrimaryNavbarMainComponent from "../component/navbar/primary-navbar";

const SignupPage = () => {
    return (
        <>
            <Head>
                <title>회원가입 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}

export default SignupPage;