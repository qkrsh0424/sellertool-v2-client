import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../component/navbar/primary-navbar";
import SecondaryNavbarMainComponent from "../../component/navbar/secondary-navbar";
import WorkspaceManagementMainComponent from "../../component/workspace/management";

const WorkspaceManagementPage = (props) => {
    return (
        <>
            <Head>
                <title>워크스페이스 관리</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
            <WorkspaceManagementMainComponent></WorkspaceManagementMainComponent>
            <FooterMain></FooterMain>
        </>
    );
}
export default WorkspaceManagementPage;