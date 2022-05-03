import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import { userDataConnect } from '../../../data_connect/userDataConnect';
import LineBreakerBottom from '../../modules/LineBreakerBottom';
import NotAllowedComponent from '../../modules/not-allowed/NotAllowedComponent';
import Layout from '../layout/Layout';
import BasicInformationComponent from './basic-information/BasicInformation.component';
import EditPasswordComponent from './edit-password/EditPassword.component';
import HeadComponent from './head/Head.component';
import SnackbarCenter from "../../modules/SnackbarCenter";
import { useState } from "react";

const Container = styled.div`

`;

const ProfileAccountMainComponent = (props) => {
    const dispatch = useDispatch();
    const userRdx = useSelector(state => state.userState);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('no message');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(null);
    const [verifiedEmail, setVerifiedEmail] = useState(null);

    const __user = {
        req: {
            fetchData: async () => {
                await userDataConnect().getInfoOwn()
                    .then(res => {
                        if (res?.status === 200 && res?.data?.message === 'success') {
                            dispatch({
                                type: 'USERSTATE_SET_INFO',
                                payload: res.data.data
                            })
                        }
                    })
            },
            updateInfo: async (body) => {
                console.log(body);
                await csrfDataConnect().getAuthCsrf();
                await userDataConnect().updateInfo(body).then(res => {
                    if (res?.status === 200 && res?.data?.message === 'success') {
                        setSnackbarSeverity('success');
                        _onSnackbarOpen('저장되었습니다.');
                    }
                }).catch(err => {
                    let res = err?.response;

                    if (res?.status === 500) {
                        alert('undefined error.');
                        return;
                    }

                    alert(res?.data?.memo);
                })
            },
            changePassword: async (body) => {
                await csrfDataConnect().getAuthCsrf();
                await userDataConnect().changePassword(body)
                    .catch(err => {
                        let res = err?.response;
                        console.log(res);

                        if (res?.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res?.data?.memo);
                    })
            },
            getPhoneAuthNumber: async (phoneNumber) => {
                await userDataConnect().getPhoneAuthNumber(phoneNumber).then(res => {
                    if (res?.status === 200 && res?.data?.message === 'success') {
                        setSnackbarSeverity('success');
                        _onSnackbarOpen('인증 요청되었습니다.');
                    }
                }).catch(err => {
                    let res = err?.response;

                    if (res?.status === 500) {
                        alert('undefined error.');
                        return;
                    }

                    setSnackbarSeverity('error');
                    _onSnackbarOpen(res?.data?.memo);
                });
            },
            verifyPhoneAuthNumber: async (phoneNumber, phoneAuthNumber) => {
                await userDataConnect().verifyPhoneAuthNumber(phoneNumber, phoneAuthNumber).then(res => {
                    if (res?.status === 200 && res?.data?.message === 'success') {
                        setSnackbarSeverity('success');
                        _onSnackbarOpen('인증되었습니다.');
                        setVerifiedPhoneNumber(phoneNumber);
                    }
                }).catch(err => {
                    let res = err?.response;

                    if (res?.status === 500) {
                        alert('undefined error.');
                        return;
                    }

                    setSnackbarSeverity('error');
                    _onSnackbarOpen(res?.data?.memo);
                });
            },
            getEmailAuthNumber: async (email) => {
                await userDataConnect().getEmailAuthNumber(email).then(res => {
                    if (res?.status === 200 && res?.data?.message === 'success') {
                        setSnackbarSeverity('success');
                        _onSnackbarOpen('인증 요청되었습니다.');
                    }
                }).catch(err => {
                    let res = err?.response;

                    if (res?.status === 500) {
                        alert('undefined error.');
                        return;
                    }

                    setSnackbarSeverity('error');
                    _onSnackbarOpen(res?.data?.memo);
                });
            },
            verifyEmailAuthNumber: async (email, emailAuthNumber) => {
                await userDataConnect().verifyEmailAuthNumber(email, emailAuthNumber).then(res => {
                    if (res?.status === 200 && res?.data?.message === 'success') {
                        setSnackbarSeverity('success');
                        _onSnackbarOpen('인증되었습니다.');
                        setVerifiedEmail(email);
                    }
                }).catch(err => {
                    let res = err?.response;

                    if (res?.status === 500) {
                        alert('undefined error.');
                        return;
                    }

                    setSnackbarSeverity('error');
                    _onSnackbarOpen(res?.data?.memo);
                    setVerifiedEmail(null);
                });
            }
        },
        submit: {
            updateInfo: async (body) => {
                await __user.req.updateInfo(body);
                await __user.req.fetchData();
            },
            changePassword: async (body) => {
                await __user.req.changePassword(body);
                await __user.req.fetchData();
            }
        }
    }

    if (userRdx.isLoading === true) {
        return null;
    }

    if (userRdx.isLoading === false && (!userRdx.info)) {
        return (
            <NotAllowedComponent></NotAllowedComponent>
        );
    }

    const _onSnackbarOpen = (message) =>{
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    }

    const _onSnackbarClose = () =>{
        setSnackbarOpen(false);
    }

    return (
        <>
            <Layout>
                <Container>
                    <HeadComponent></HeadComponent>
                    <BasicInformationComponent
                        userInfo={userRdx?.info}
                        verifiedPhoneNumber={verifiedPhoneNumber}
                        verifiedEmail={verifiedEmail}

                        onSubmitUpdateUserInfo={__user.submit.updateInfo}
                        onActionGetPhoneAuthNumber={(phoneNumber) => __user.req.getPhoneAuthNumber(phoneNumber)}
                        onActionVerifyPhoneAuthNumber={(phoneNumber, phoneAuthNumber) => __user.req.verifyPhoneAuthNumber(phoneNumber, phoneAuthNumber)}
                        onActionGetEmailAuthNumber={(email) => __user.req.getEmailAuthNumber(email)}
                        onActionVerifyEmailAuthNumber={(email, emailAuthNumber) => __user.req.verifyEmailAuthNumber(email, emailAuthNumber)}
                    ></BasicInformationComponent>
                    <LineBreakerBottom
                        lineColor={'#e0e0e0'}
                    />
                    <EditPasswordComponent
                        userInfo={userRdx?.info}

                        onSubmitChangePassword={__user.submit.changePassword}
                    ></EditPasswordComponent>
                </Container>

                {/* Snackbar */}
                <SnackbarCenter
                    open={snackbarOpen}
                    message={snackbarMessage}
                    severity={snackbarSeverity}

                    onClose={() => _onSnackbarClose()}
                ></SnackbarCenter>
            </Layout>
        </>
    );
}
export default ProfileAccountMainComponent;