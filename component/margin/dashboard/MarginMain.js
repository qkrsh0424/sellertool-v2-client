import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { csrfDataConnect } from "../../../data_connect/csrfDataConnect";
import { marginRecordDataConnect } from "../../../data_connect/marginRecordDataConnect";
import CalculatorMain from "../../calculator/CalculatorMain";
import BackdropLoading from "../../modules/loading/BackdropLoadingComponent";
import SnackbarCenter from "../../modules/SnackbarCenter";
import DashboardComponent from "./DashboardComponent";

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialMarginRecordState = null;
const initialMarginRecordListState = null;

const marginRecordStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }

    }
}

const marginRecordListStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'CLEAR':
            return null;
        default: return { ...state }
    }
}

const MarginMain = () => {
    const workspaceRdx = useSelector(state => state.workspaceState)
    const router = useRouter();

    const [marginRecordState, dispatchMarginRecordState] = useReducer(marginRecordStateReducer, initialMarginRecordState);
    const [marginRecordListState, dispatchMarginRecordListState] = useReducer(marginRecordListStateReducer, initialMarginRecordListState);

    const [backdropLoading, setBackdropLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    useEffect(() => {
        async function fetchInit() {
            if (!router.isReady) {
                return;
            }
            if (router.query.marginRecordId) {
                await __handleDataConnect().getMarginRecord();
            } else {
                dispatchMarginRecordState({
                    type: 'CLEAR'
                })
            }
        }

        fetchInit();
    }, [router]);

    const __handleDataConnect = () => {
        return {
            createMarginRecord: async function (params) {
                await marginRecordDataConnect().createMarginRecord(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            __handleEventControl().onSnackbarOpen('저장되었습니다.', 'success');
                            router.replace({
                                pathname: router.pathname,
                                query: { ...router.query, marginRecordId: res.data?.data?.id }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);

                        __handleEventControl().onSnackbarOpen(err.response?.data?.memo, 'error');
                        router.replace({
                            pathname: router.pathname
                        })
                    })
            },
            updateMarginRecord: async function (params) {
                await marginRecordDataConnect().updateMarginRecord(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            __handleEventControl().onSnackbarOpen('수정되었습니다.', 'success');
                            router.replace({
                                pathname: router.pathname,
                                query: { ...router.query }
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);

                        __handleEventControl().onSnackbarOpen(err.response?.data?.memo, 'error');
                        router.replace({
                            pathname: router.pathname
                        })
                    })
            },
            deleteMarginRecord: async function (params) {
                await marginRecordDataConnect().deleteMarginRecord(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            __handleEventControl().getMarginRecordList();
                        }
                    })
                    .catch(err => {
                        console.log(err.response);

                        __handleEventControl().onSnackbarOpen(err.response?.data?.memo, 'error');
                        router.replace({
                            pathname: router.pathname
                        })
                    })
            },
            getMarginRecord: async function () {
                let params = {
                    marginRecordId: router.query.marginRecordId
                }
                await marginRecordDataConnect().searchMarginRecord(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchMarginRecordState({
                                type: 'INIT_DATA',
                                payload: res.data?.data
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        alert(err.response?.data?.memo);
                        router.replace({
                            pathname: router.pathname
                        })
                    })
            },
            getMarginRecordList: async function (params) {
                await marginRecordDataConnect().searchMarginRecordList(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchMarginRecordListState({
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

    const __handleEventControl = () => {
        return {
            saveMarginRecord: async function (params, nameState) {
                if (!workspaceRdx?.info?.id) {
                    alert('워크스페이스를 찾을 수 없음.');
                    router.reload();
                    return;
                }
                params.workspaceId = workspaceRdx?.info?.id;
                params.name = nameState;
                setBackdropLoading(true);
                await __handleDataConnect().createMarginRecord(params);
                setBackdropLoading(false);
            },
            updateMarginRecord: async function (params) {
                setBackdropLoading(true);
                await __handleDataConnect().updateMarginRecord(params);
                setBackdropLoading(false);
            },
            deleteMarginRecord: async function (marginRecordId) {

                let params = {
                    marginRecordId: marginRecordId
                }
                setBackdropLoading(true);
                await __handleDataConnect().deleteMarginRecord(params);
                setBackdropLoading(false);
            },
            getMarginRecordList: async function () {
                if (!workspaceRdx?.info?.id) {
                    alert('워크스페이스 아이디를 찾을 수 없음.');
                    router.reload();
                    return;
                }
                let params = {
                    workspaceId: workspaceRdx.info.id
                }

                await __handleDataConnect().getMarginRecordList(params);
            },
            clearMarginRecordList: async function () {
                setTimeout(() => {
                    dispatchMarginRecordListState({
                        type: 'CLEAR'
                    })
                }, 200)
            },
            onSnackbarOpen: function (message, severity) {
                setSnackbarOpen(true);
                setSnackbarMessage(message);
                setSnackbarSeverity(severity)
            },
            onSnackbarClose: function () {
                setSnackbarOpen(false);
            }
        }
    }

    return (
        <>
            <Container>
                <h5 style={{ paddingLeft: '10px', color: '#505050' }}>
                    | 마진율 계산기 |
                </h5>
                <DashboardComponent
                    marginRecordState={marginRecordState}
                    marginRecordListState={marginRecordListState}

                    saveMarginRecord={(params, nameState) => __handleEventControl().saveMarginRecord(params, nameState)}
                    updateMarginRecord={(params) => __handleEventControl().updateMarginRecord(params)}
                    deleteMarginRecord={(marginRecordId) => __handleEventControl().deleteMarginRecord(marginRecordId)}
                    getMarginRecordList={() => __handleEventControl().getMarginRecordList()}
                    clearMarginRecordList={() => __handleEventControl().clearMarginRecordList()}
                ></DashboardComponent>
                <CalculatorMain></CalculatorMain>
            </Container>

            {/* Snackbar */}
            <SnackbarCenter
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}

                onClose={() => __handleEventControl().onSnackbarClose()}
            ></SnackbarCenter>
            {/* Loading */}
            <BackdropLoading
                open={backdropLoading}
            ></BackdropLoading>
        </>
    );
}

export default MarginMain;