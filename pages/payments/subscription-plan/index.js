import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../../views/navbar/secondary-navbar-v2";
import { useEffect, useState } from "react";
import MainComponent from "../../../views/payments/subscription-plan/v1";

export default function PaymentsSubscriptionPlanPage(props) {
    const router = useRouter();
    const userRedux = useSelector(state => state.userRedux);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (router?.isReady) {
            setIsLoading(false);
        }

    }, [router?.isReady]);

    useEffect(() => {
        async function fetchInit() {
            if(isLoading){
                return;
            }
            
            if (userRedux.isLoading === false && !userRedux.userInfo) {
                alert('로그인이 필요한 서비스 입니다.');
                router.replace('/');
                return;
            }
        }
        fetchInit();
    }, [
        isLoading,
        router,
        userRedux.isLoading,
        userRedux.userInfo
    ]);

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