import Head from 'next/head';
import FooterMain from '../../component/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../component/navbar/primary-navbar';
import ProfileAccountMainComponent from '../../component/profile/account';

const ProfileAccountPage = (props) => {
    return (
        <>
            <Head>
                <title>프로필 / 내방구</title>
            </Head>
            <PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
            <ProfileAccountMainComponent></ProfileAccountMainComponent>
            <FooterMain></FooterMain>
        </>
    );
}
export default ProfileAccountPage;