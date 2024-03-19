import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FooterMain from "../views/footer/FooterMain";
import MainComponent from "../views/login-v2";
import PrimaryNavbarMainComponent from "../views/navbar/primary-navbar";

const LoginPage = () => {
    const userRedux = useSelector(state => state.userRedux);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (router?.isReady) {
            setIsLoading(false);
        }

    }, [router?.isReady]);

    useEffect(() => {
        async function fetchInit() {
            if (isLoading) {
                return;
            }
            if (userRedux.isLoading === false && userRedux.userInfo) {
                router.replace('/');
                return;
            }
        }
        fetchInit();
    }, [
        isLoading,
        router,
        userRedux
    ]);

    return (
        <>
            <Head>
                <title>로그인 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            {(userRedux.isLoading === false && !userRedux.userInfo) &&
                <>
                    <MainComponent></MainComponent>
                    {/* <FooterMain></FooterMain> */}
                </>
            }
        </>
    );
}

export default LoginPage;