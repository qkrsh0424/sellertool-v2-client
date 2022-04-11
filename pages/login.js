import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FooterMain from "../component/footer/FooterMain";
import MainComponent from "../component/login/MainComponent";
import NavbarMain from "../component/navbar/NavbarMain";
import { isAnonymous } from "../utils/cookieCheckUtils";

const LoginPage = () => {
    const userRdx = useSelector(state => state.userState);
    const router = useRouter();

    useEffect(() => {
        async function fetchInit() {
            if (userRdx.isLoading === false && userRdx.info) {
                router.replace('/');
                return;
            }
        }
        fetchInit();
    }, [userRdx]);

    return (
        <>
            <Head>
                <title>로그인 | 셀러툴</title>
            </Head>
            {(userRdx.isLoading === false && !userRdx.info) &&
                <>
                    <NavbarMain></NavbarMain>
                    <MainComponent></MainComponent>
                    <FooterMain></FooterMain>
                </>
            }
        </>
    );
}

export default LoginPage;