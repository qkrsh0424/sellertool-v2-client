import Head from 'next/head';
import FooterMain from '../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../component/navbar/primary-navbar';
import ProfileWorkspaceMainComponent from '../../component/profile/workspace';

const ProfileWorkspacePage = (props) => {
    return (
        <>
            <Head>
                <title>프로필 / 워크스페이스</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <ProfileWorkspaceMainComponent></ProfileWorkspaceMainComponent>
            <FooterMain></FooterMain>
        </>
    );
}
export default ProfileWorkspacePage;