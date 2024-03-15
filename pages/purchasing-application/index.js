import Head from "next/head";
import PrimaryNavbarMainComponent from '../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../views/navbar/secondary-navbar-v2';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MainComponent from "../../views/purchasing-application";

export default function PurchasingApplication(props) {
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
                <title>구매 신청서 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
        </>
    );
}