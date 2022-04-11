import Head from "next/head";
import NavbarMain from "../component/navbar/NavbarMain";
import FooterMain from "../component/footer/FooterMain";
import MainComponent from "../component/signup/MainComponent";

const SignupPage = () => {
    return (
        <>
            <Head>
                <title>회원가입 | 셀러툴</title>
            </Head>
            <NavbarMain></NavbarMain>
            <MainComponent></MainComponent>
            <FooterMain></FooterMain>
        </>
    );
}

export default SignupPage;