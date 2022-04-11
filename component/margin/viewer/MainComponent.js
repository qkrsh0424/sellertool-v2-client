import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { marginRecordDataConnect } from '../../../data_connect/marginRecordDataConnect';
import BodyComponent from './BodyComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialMarginRecordState = null;

const marginRecordStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        default: return { ...state }
    }
}

const MainComponent = (props) => {
    const router = useRouter();
    const [marginRecordState, dispatchMarginRecordState] = useReducer(marginRecordStateReducer, initialMarginRecordState);

    useEffect(() => {
        async function fetchInit() {
            if (!router.isReady) {
                return;
            }

            let marginRecordId = router.query.marginRecordId;
            let openKey = router.query.openKey;

            if (!marginRecordId || !openKey) {
                alert('요청하신 정보를 찾을 수 없습니다.');
                return;
            }

            let params = {
                marginRecordId: marginRecordId,
                openKey: openKey
            }
            await __handleDataConnect().getMarginRecordViewer(params);
        }
        fetchInit();
    }, [router]);

    const __handleDataConnect = () => {
        return {
            getMarginRecordViewer: async function (params) {
                await marginRecordDataConnect().searchMarginRecordViewer(params)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchMarginRecordState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }
    return (
        <>
            <Container>
                <h5 style={{ paddingLeft: '10px', color: '#505050' }}>
                    | 마진율 계산기 뷰어 |
                </h5>
                <BodyComponent
                    marginRecordState={marginRecordState}
                ></BodyComponent>
            </Container>
        </>
    );
}
export default MainComponent;