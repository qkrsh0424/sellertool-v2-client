import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import WorkspaceManagementMainComponent from "../../../views/workspace/management-v2/index";

const WorkspaceManagementPage = (props) => {
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
                <title>워크스페이스 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <WorkspaceManagementMainComponent></WorkspaceManagementMainComponent>
        </>
    );
}
export default WorkspaceManagementPage;