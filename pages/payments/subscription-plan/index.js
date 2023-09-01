import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../../views/navbar/secondary-navbar-v2";
import { useEffect } from "react";
import MainComponent from "../../../views/payments/subscription-plan/v1";

export default function PaymentsSubscriptionPlanPage(props) {
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

    if (userRedux.isLoading || !userRedux.userInfo) {
        return null;
    }

    return (
        <>
            <Head>
                <title>구독플랜 결제 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <MainComponent />
        </>
    );
}