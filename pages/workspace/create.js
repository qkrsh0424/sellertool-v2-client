import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import PrimaryNavbarMainComponent from "../../component/navbar/primary-navbar";
import WorkspaceCreateMainComponent from "../../component/workspace/create";

const WorkspaceCreatePage = () => {
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