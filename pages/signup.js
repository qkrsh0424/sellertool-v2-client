import Head from "next/head";
import FooterMain from "../views/footer/FooterMain";
import MainComponent from "../views/signup-v2/index";
import PrimaryNavbarMainComponent from "../views/navbar/primary-navbar";

const SignupPage = () => {
    return (
        <>
            <Head>
                <title>회원가입 | 셀러툴</title>
            </Head>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}

export default SignupPage;