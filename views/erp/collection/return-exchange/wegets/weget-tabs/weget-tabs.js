import { useState } from 'react';
import * as St from './weget-tabs.styled';
import { useRouter } from 'next/router';

export function WegetTabs(props) {
    const router = useRouter();

    const tab = router.query.tab || 'ALL';

    const handleChangeTab = (tab) => {
        router.push({
            pathname: router.pathname,
            query: {
                tab: tab
            }
        });
    }
    return (
        <>
            <St.Frame.Container>
                <St.Frame.Tabs>
                    <St.Frame.Tab
                        onClick={() => handleChangeTab('ALL')}
                        className={`${tab === 'ALL' ? 'active' : ''}`}
                    >
                        전체
                    </St.Frame.Tab>
                    <St.Frame.Tab
                        onClick={() => handleChangeTab('RETURN')}
                        className={`${tab === 'RETURN' ? 'active' : ''}`}
                    >
                        반품
                    </St.Frame.Tab>
                    <St.Frame.Tab
                        onClick={() => handleChangeTab('EXCHANGE')}
                        className={`${tab === 'EXCHANGE' ? 'active' : ''}`}
                    >
                        교환
                    </St.Frame.Tab>
                </St.Frame.Tabs>
            </St.Frame.Container>
        </>
    );
}