
import Head from 'next/head';
import FooterMain from '../component/footer/FooterMain';
import HomeMain from '../component/home/index';
import PrimaryNavbarMainComponent from '../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../component/navbar/secondary-navbar-v2';

export default function Home() {

	return (
		<>
			<Head>
				<title>셀러툴 홈</title>
			</Head>
			<PrimaryNavbarMainComponent></PrimaryNavbarMainComponent>
			<SecondaryNavbarMainComponent></SecondaryNavbarMainComponent>
			<HomeMain></HomeMain>
			<FooterMain></FooterMain>
		</>
	)
}
