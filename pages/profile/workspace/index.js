import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FooterMain from '../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../views/navbar/primary-navbar';
import ProfileWorkspaceMainComponent from '../../../views/profile-v2/workspace';

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
                <title>프로필 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <ProfileWorkspaceMainComponent></ProfileWorkspaceMainComponent>
            {/* <FooterMain></FooterMain> */}
        </>
    );
}
export default ProfileWorkspacePage;