import Head from 'next/head';
import '../styles/globals.css';
import wrapper from '../redux/reducers/configureStore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserPermissionComponent from '../redux/dispatch_component/UserPermissionComponent';
import WorkspacePermissionComponent from '../redux/dispatch_component/WorkspacePermissionComponent';
import Router from 'next/router';

/**
 * 메인 컬러 : #344b98;
 * 진진 파랑 : #2C73D2;
 * 진 파랑 : #309FFF;
 * 중간 파랑 : #609FFF;
 * 연 파랑 : #7DC2FF;
 * 핑크 : #db2e5e;
 * 그린 : #5fcf80;
 * 레드 : #e56767;
 * box-shadow: 1px 1px 10px 0 rgb(72 75 108 / 8%);
 * background: #f9fbfc;
 * modalCloseButtonColor:#959eae
 */
// == NProgress Module START ==
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { CustomToastContainer } from '../components/toast/custom-react-toastify/v1';
import { CustomDefaultBackdrop } from '../components/backdrop/default/v1';

// react-query
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
	QueryCache,
} from '@tanstack/react-query'
import { useState } from 'react';
import { CustomErrorHandler } from '../data_connect/CustomErrorHandler';
import { GlobalReactQueryUtils } from '../react-query/GlobalReactQueryUtils';

// const theme = createTheme();
const theme = createTheme({
	typography: {
		fontFamily: 'var(--mainFont)'
	}
});

Router.onRouteChangeStart = () => {
	NProgress.start();
}
Router.onRouteChangeComplete = () => {
	// console.log('onRouteChangeComplete triggered');
	NProgress.done();
};

Router.onRouteChangeError = () => {
	// console.log('onRouteChangeError triggered');
	NProgress.done();
};
// == NProgress Module END ==

// react-query
const globalReactQueryUtils = GlobalReactQueryUtils();

function MyApp({ Component, pageProps }) {
	const [queryClient] = useState(() => new QueryClient({
		defaultOptions: { ...globalReactQueryUtils.customDefaultOptionsForQueryClient },
		queryCache: new QueryCache({
			onError: (error, query) => {
				CustomErrorHandler.errorReactQuery(error, query?.meta?.errorOrigin);
			},
		})
	}));

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* SEO */}
				<title>셀러툴 - 쇼핑몰 통합관리</title>
				<link rel="canonical" href="https://www.sellertool.io" />
				<meta name="description" content="마진율 계산기 부터 재고관리 까지 오픈마켓 통합 관리 솔루션 셀러툴!" />
				<meta name="keywords" content="셀러툴, 마진율 계산기, 엑셀 변환기, 스마트스토어, 내 상품 순위, 온라인 커머스, 3PL, WMS, 선입선출, 주문관리" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="셀러툴 - 쇼핑몰 통합관리" />
				<meta property="og:description" content="마진율 계산기 부터 재고관리 까지 오픈마켓 관리 솔루션 셀러툴!" />
				<meta property="og:site_name" content="셀러툴 - 쇼핑몰 통합관리" />
				<meta property="og:url" content="https://www.sellertool.io" />
				<meta property="og:locale" content="ko_KR" />
				{/* <meta name="naver-site-verification" content="252da9b025f87c789d7fb532484cf85a81ed52f0" /> */}
				<meta name="naver-site-verification" content="5abe3c64078f2d1754ecfd2de8327d7e31542d4c" />
				{/* SEO */}

				{/* Icon */}
				<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				{/* Icon */}

				{/* Manifest */}
				<link rel="manifest" href="/favicon/manifest.json" />
				{/* Manifest */}

				<meta name="msapplication-TileColor" content="#344b98" />
				<meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
				<meta name="theme-color" content="#344b98" />

				{/* GA 태그 추가 */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=G-3MNX1H7VPY`}
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-3MNX1H7VPY');
						`,
					}}
				></script>
				<script
					async
					src={`https://cdn.iamport.kr/v1/iamport.js`}>
				</script>
			</Head>
			<UserPermissionComponent />
			<WorkspacePermissionComponent />
			<CustomToastContainer />
			<CustomDefaultBackdrop />
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	)
}

export default wrapper.withRedux(MyApp);
