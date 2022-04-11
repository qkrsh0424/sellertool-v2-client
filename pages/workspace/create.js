import Head from "next/head";
import FooterMain from "../../component/footer/FooterMain";
import NavbarMain from "../../component/navbar/NavbarMain";
import WorkspaceCreateMainComponent from "../../component/workspace/create";
import MainComponent from "../../component/workspace/create/MainComponent";

const WorkspaceCreatePage = () => {
    return (
        <>
            <Head>
                <title>워크스페이스 생성</title>
            </Head>
            <NavbarMain></NavbarMain>
            <WorkspaceCreateMainComponent></WorkspaceCreateMainComponent>
            {/* <MainComponent></MainComponent> */}
            <FooterMain></FooterMain>
        </>
    );
}

export default WorkspaceCreatePage;