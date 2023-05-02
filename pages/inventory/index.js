import Head from "next/head";
import FooterMain from '../../views/footer/FooterMain';
import MainComponent from "../../views/inventory/root";
import PrimaryNavbarMainComponent from '../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../views/navbar/secondary-navbar-v2';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function InventoryPage(props) {
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
                <title>통합 재고 관리 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}