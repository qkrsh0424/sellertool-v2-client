
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FooterMain from '../component/footer/FooterMain';
import HomeMain from '../component/home/HomeMain';
import PrimaryNavbarMainComponent from '../component/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../component/navbar/secondary-navbar-v2';

export default function Home() {
	const workspaceRedux = useSelector(state => state.workspaceRedux);
	const userRedux = useSelector(state => state.userRedux);
	const router = useRouter();

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
