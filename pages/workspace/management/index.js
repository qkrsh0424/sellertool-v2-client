import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PrimaryNavbarMainComponent from "../../../views/navbar/primary-navbar";
import WorkspaceManagementMainComponent from "../../../views/workspace/management-v2/index";

const WorkspaceManagementPage = (props) => {
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
                <title>워크스페이스 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <WorkspaceManagementMainComponent></WorkspaceManagementMainComponent>
        </>
    );
}
export default WorkspaceManagementPage;