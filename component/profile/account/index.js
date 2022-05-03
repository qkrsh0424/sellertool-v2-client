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
import { userInfoAuthDataConnect } from '../../../data_connect/userInfoAuthDataConnect';

const Container = styled.div`

`;

const ProfileAccountMainComponent = (props) => {
    const dispatch = useDispatch();
    const userRdx = useSelector(state => state.userState);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('no message');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');
    
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(null);

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

                        if (res?.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        alert(res?.data?.memo);
                    })
            },
            getPhoneAuthNumber: async (phoneNumber) => {
                await userInfoAuthDataConnect().getPhoneAuthNumber(phoneNumber).then(res => {
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
                await userInfoAuthDataConnect().verifyPhoneAuthNumber(phoneNumber, phoneAuthNumber).then(res => {
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
                    setVerifiedPhoneNumber(null);
                });
            },
            getEmailAuthNumber: async (email) => {
                await userInfoAuthDataConnect().getEmailAuthNumber(email).then(res => {
                    if (res?.status === 200 && res?.data?.message === 'success') {
                        setSnackbarSeverity('success');
                        _onSnackbarOpen('인증 요청되었습니다.');
                        setIsVerifiedEmail(false);
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
                await userInfoAuthDataConnect().verifyEmailAuthNumber(email, emailAuthNumber).then(res => {
                    if (res?.status === 200 && res?.data?.message === 'success') {
                        setSnackbarSeverity('success');
                        _onSnackbarOpen('인증되었습니다.');
                        setIsVerifiedEmail(true);
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
            }
        },
        submit: {
            updateInfo: async (body) => {
                let data = {
                    ...body,
                    verifiedEmail : isVerifiedEmail
                }
                await __user.req.updateInfo(data);
                await __user.req.fetchData();
            },
            changePassword: async (body) => {
                await __user.req.changePassword(body);
                await __user.req.fetchData();
            }
        },
        action: {
            onActionResetVerifiedEmail: () => {
                setIsVerifiedEmail(false);
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
                        isVerifiedEmail={isVerifiedEmail}

                        onSubmitUpdateUserInfo={__user.submit.updateInfo}
                        onActionGetEmailAuthNumber={__user.req.getEmailAuthNumber}
                        onActionVerifyEmailAuthNumber={__user.req.verifyEmailAuthNumber}
                        onActionGetPhoneAuthNumber={__user.req.getPhoneAuthNumber}
                        onActionVerifyPhoneAuthNumber={__user.req.verifyPhoneAuthNumber}
                        onActionResetVerifiedEmail={__user.action.onActionResetVerifiedEmail}
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