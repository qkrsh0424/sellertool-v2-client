import styled from 'styled-components';
import Layout from '../layout/Layout';
import { useState } from 'react';
import PurchasingProcessListComponent from './purchasing-process-list';

const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export default function MainComponent(props) {
    const [purchasingProcessList, setPurchasingProcessList] = useState([
        {
            cid: null,
            id: 'a',
            name: '구매요청',
            processType: 'PURCHASING_REQUEST',
            orderNumber: 100,
            createdAt: null,
            createdByMemberId: null,
            lastUpdatedAt: null,
            lastUpdatedByMemberId: null,
            deletedFlag: false
        },
        {
            cid: null,
            id: 'b',
            name: '구매완료',
            processType: 'PURCHASING_COMPLETED',
            orderNumber: 200,
            createdAt: null,
            createdByMemberId: null,
            lastUpdatedAt: null,
            lastUpdatedByMemberId: null,
            deletedFlag: false
        },
        {
            cid: null,
            id: 'c',
            name: '도착',
            processType: 'ARRIVAL',
            orderNumber: 300,
            createdAt: null,
            createdByMemberId: null,
            lastUpdatedAt: null,
            lastUpdatedByMemberId: null,
            deletedFlag: false
        },
        {
            cid: null,
            id: 'd',
            name: '구매검토',
            processType: 'COMMON1',
            orderNumber: 101,
            createdAt: null,
            createdByMemberId: null,
            lastUpdatedAt: null,
            lastUpdatedByMemberId: null,
            deletedFlag: false
        },
        {
            cid: null,
            id: 'e',
            name: '구매확정',
            processType: 'COMMON1',
            orderNumber: 102,
            createdAt: null,
            createdByMemberId: null,
            lastUpdatedAt: null,
            lastUpdatedByMemberId: null,
            deletedFlag: false
        },
        {
            cid: null,
            id: 'f',
            name: '배대지도착',
            processType: 'COMMON2',
            orderNumber: 201,
            createdAt: null,
            createdByMemberId: null,
            lastUpdatedAt: null,
            lastUpdatedByMemberId: null,
            deletedFlag: false
        },
        {
            cid: null,
            id: 'g',
            name: '세관도착',
            processType: 'COMMON2',
            orderNumber: 202,
            createdAt: null,
            createdByMemberId: null,
            lastUpdatedAt: null,
            lastUpdatedByMemberId: null,
            deletedFlag: false
        }
    ]);

    return (
        <>
            <Container>
                <Layout
                    sidebarName={'구매 프로세스'}
                    headerName={'대시보드'}
                    sidebarColor={'#ffffff'}
                    purchasingProcessList={purchasingProcessList}
                >
                    <PurchasingProcessListComponent />
                </Layout>
            </Container>
        </>
    );
}