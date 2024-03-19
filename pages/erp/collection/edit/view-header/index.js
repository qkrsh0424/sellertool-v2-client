import Head from 'next/head';
import MainComponent from '../../../../../views/erp/collection/edit/view-header';
import FooterMain from '../../../../../views/footer/FooterMain';
import PrimaryNavbarMainComponent from '../../../../../views/navbar/primary-navbar';
import SecondaryNavbarMainComponent from '../../../../../views/navbar/secondary-navbar-v2';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ErpCollectionEditViewHeaderPage(props) {
    const userRedux = useSelector(state => state.userRedux);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (router?.isReady) {
            setIsLoading(false);
        }

    }, [router?.isReady]);

    useEffect(() => {
        async function fetchInit() {
            if (isLoading) {
                return;
            }

            if (userRedux.isLoading === false && !userRedux.userInfo) {
                alert('로그인이 필요한 서비스 입니다.');
                router.replace('/');
                return;
            }
        }
        fetchInit();
    }, [
        isLoading,
        router,
        userRedux.isLoading,
        userRedux.userInfo
    ]);

    if (userRedux.isLoading || !userRedux.userInfo) {
        return null;
    }

    return (
        <>
            <Head>
                <title>통합 발주 관리 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            <PrimaryNavbarMainComponent />
            <SecondaryNavbarMainComponent />
            <MainComponent />
            {/* <FooterMain /> */}
        </>
    );
}