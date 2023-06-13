import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FooterMain from "../../../views/footer/FooterMain";
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
                <title>워크스페이스 관리 | 셀러툴</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <WorkspaceManagementMainComponent></WorkspaceManagementMainComponent>
            {/* <FooterMain></FooterMain> */}
        </>
    );
}
export default WorkspaceManagementPage;