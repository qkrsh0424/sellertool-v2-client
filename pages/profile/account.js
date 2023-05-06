import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FooterMain from '../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../views/navbar/primary-navbar';
import ProfileAccountMainComponent from '../../views/profile-v2/account';

const ProfileAccountPage = (props) => {
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
                <title>프로필 / 내 정보</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <ProfileAccountMainComponent></ProfileAccountMainComponent>
            {/* <FooterMain></FooterMain> */}
        </>
    );
}
export default ProfileAccountPage;