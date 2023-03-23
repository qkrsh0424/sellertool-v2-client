import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FooterMain from "../../../views/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import WorkspaceCreateMainComponent from "../../../views/workspace/create-v2";

const WorkspaceCreatePage = () => {
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
    }, [userRedux]);

    return (
        <>
            <Head>
                <title>워크스페이스 생성</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <WorkspaceCreateMainComponent></WorkspaceCreateMainComponent>
            <FooterMain></FooterMain>
        </>
    );
}

export default WorkspaceCreatePage;