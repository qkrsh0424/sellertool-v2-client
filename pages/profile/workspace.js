import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FooterMain from '../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../component/navbar/primary-navbar';
import ProfileWorkspaceMainComponent from '../../component/profile-v2/workspace';

const ProfileWorkspacePage = (props) => {
    const userRedux = useSelector(state => state.userRedux);
    const router = useRouter();

    useEffect(() => {
        async function fetchInit() {
            if (userRedux.isLoading === false && !userRedux.userInfo) {
                router.replace('/login');
                return;
            }
        }
        fetchInit();
    }, [userRedux.isLoading, userRedux.userInfo]);

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