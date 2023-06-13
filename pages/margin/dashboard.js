import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FooterMain from "../../views/footer/FooterMain";
import MainComponent from "../../views/margin-v2/dashboard";
import PrimaryNavbarMainComponent from "../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../views/navbar/secondary-navbar-v2";

const MarginDashboardPage = () => {
    const userRedux = useSelector(state => state.userRedux);
    const router = useRouter();

    useEffect(() => {
        async function fetchInit() {
            if (userRedux.isLoading === false && !userRedux.userInfo) {
                alert('로그인이 필요한 서비스 입니다.');
                router.replace('/');
                return;
            }
        }
        fetchInit();
    }, [userRedux.isLoading, userRedux.userInfo]);

    if(userRedux.isLoading || !userRedux.userInfo){
        return null;
    }

    return (
        <>
            <Head>
                <title>마진율 계산기 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <MainComponent></MainComponent>
            {/* <FooterMain></FooterMain> */}
        </>
    );
}

export default MarginDashboardPage;