
import Head from 'next/head';
import styled from 'styled-components';
import FooterMain from '../component/footer/FooterMain';
import HomeMain from '../component/home/HomeMain';
import NavbarMain from '../component/navbar/NavbarMain';

export default function Home() {
	return (
		<>
			<Head>
				<title>셀러툴 홈</title>
			</Head>
			<NavbarMain></NavbarMain>
			<HomeMain></HomeMain>
			<FooterMain></FooterMain>
		</>
	)
}
