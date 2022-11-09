import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FooterMain from "../component/footer/FooterMain";
import MainComponent from "../component/login-v2";
import PrimaryNavbarMainComponent from "../component/navbar/primary-navbar";
import { isAnonymous } from "../utils/cookieCheckUtils";

const LoginPage = () => {
    const userRedux = useSelector(state => state.userRedux);
    const router = useRouter();

    useEffect(() => {
        async function fetchInit() {
            if (userRedux.isLoading === false && userRedux.userInfo) {
                router.replace('/');
                return;
            }
        }
        fetchInit();
    }, [userRedux]);

    return (
        <>
            <Head>
                <title>로그인 | 셀러툴</title>
            </Head>
            {(userRedux.isLoading === false && !userRedux.userInfo) &&
                <>
                    <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
                    <MainComponent></MainComponent>
                    <FooterMain></FooterMain>
                </>
            }
        </>
    );
}

export default LoginPage;