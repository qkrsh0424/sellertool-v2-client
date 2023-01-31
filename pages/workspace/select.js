import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FooterMain from "../../views/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../views/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../views/navbar/secondary-navbar-v2";
import MainComponent from "../../views/workspace/select";

export default function WorkspaceSelectPage(props) {
    const userRedux = useSelector(state => state.userRedux);
    const router = useRouter();

    useEffect(() => {
        async function fetchInit() {
            if (userRedux.isLoading === false && !userRedux.userInfo) {
                router.replace('/');
                return;
            }
        }
        fetchInit();
    }, [userRedux.isLoading, userRedux.userInfo]);

    return (
        <>
            <Head>
                <title>셀러툴 홈</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            <FooterMain />
        </>
    );
}