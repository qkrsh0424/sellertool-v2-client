
import Head from 'next/head';
import FooterMain from '../views/footer/FooterMain';
import HomeMain from '../views/home/index';
import PrimaryNavbarMainComponent from '../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../views/navbar/secondary-navbar-v2';

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
