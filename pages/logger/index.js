import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MainView } from '../../views/logger/root';

export default function ErpCollectionReleaseCompletePage(props) {
    const router = useRouter();
    const userRedux = useSelector(state => state.userRedux);
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
                <title>활동 로그 | 셀러툴 - 쇼핑몰 통합관리</title>
            </Head>
            <MainView />
        </>
    );
}