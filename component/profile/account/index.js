import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import { userDataConnect } from '../../../data_connect/userDataConnect';
import LineBreakerBottom from '../../modules/fragment/LineBreakerBottom';
import NotAllowedComponent from '../../modules/not-allowed/NotAllowedComponent';
import Layout from '../layout/Layout';
import BasicInformationComponent from './basic-information/BasicInformation.component';
import EditPasswordComponent from './edit-password/EditPassword.component';
import HeadComponent from './head/Head.component';
import SnackbarCenter from "../../modules/snackbar/SnackbarCenter";
import { useState } from "react";
import { userInfoAuthDataConnect } from '../../../data_connect/userInfoAuthDataConnect';

const Container = styled.div`
    background-color: var(--defaultBackground);
`;

const ProfileAccountMainComponent = (props) => {
    const dispatch = useDispatch();
    const userRedux = useSelector(state => state.userRedux);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('no message');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const [isVerifiedPhoneNumber, setIsVerifiedPhoneNumber] = useState(false);

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
                        setIsVerifiedPhoneNumber(true);
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
                await userInfoAuthDataConnect().getEmailAuthNumber(email).then(res => {
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
                    verifiedEmail: isVerifiedEmail,
                    verifiedPhoneNumber: isVerifiedPhoneNumber
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
            },
            onActionResetVerifiedPhoneNumber: () => {
                setIsVerifiedPhoneNumber(false);
            },
            onActionGetEmailAuthNumber: async (email) => {
                await __user.req.getEmailAuthNumber(email);
            },
            onActionVerifyEmailAuthNumber: async (email, authNumber) => {
                await __user.req.verifyEmailAuthNumber(email, authNumber);
            },
            onActionGetPhoneAuthNumber: async (phoneNumber) => {
                await __user.req.getPhoneAuthNumber(phoneNumber);
            },
            onActionVerifyPhoneAuthNumber: async (phoneNumber, authNumber) => {
                await __user.req.verifyPhoneAuthNumber(phoneNumber, authNumber);
            }
        }
    }

    if (userRedux.isLoading === true) {
        return null;
    }

    if (userRedux.isLoading === false && (!userRedux.userInfo)) {
        return (
            <NotAllowedComponent></NotAllowedComponent>
        );
    }

    const _onSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    }

    const _onSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    return (
        <>
            <Container>
                <Layout>
                    <HeadComponent></HeadComponent>
                    <BasicInformationComponent
                        userInfo={userRedux?.info}
                        isVerifiedEmail={isVerifiedEmail}
                        isVerifiedPhoneNumber={isVerifiedPhoneNumber}

                        onSubmitUpdateUserInfo={__user.submit.updateInfo}
                        onActionGetEmailAuthNumber={__user.action.onActionGetEmailAuthNumber}
                        onActionVerifyEmailAuthNumber={__user.action.onActionVerifyEmailAuthNumber}
                        onActionGetPhoneAuthNumber={__user.action.onActionGetPhoneAuthNumber}
                        onActionVerifyPhoneAuthNumber={__user.action.onActionVerifyPhoneAuthNumber}
                        onActionResetVerifiedEmail={__user.action.onActionResetVerifiedEmail}
                        onActionResetVerifiedPhoneNumber={__user.action.onActionResetVerifiedPhoneNumber}
                    ></BasicInformationComponent>
                    <LineBreakerBottom
                        lineColor={'#e0e0e0'}
                    />
                    <EditPasswordComponent
                        userInfo={userRedux?.info}

                        onSubmitChangePassword={__user.submit.changePassword}
                    ></EditPasswordComponent>

                    {/* Snackbar */}
                    <SnackbarCenter
                        open={snackbarOpen}
                        message={snackbarMessage}
                        severity={snackbarSeverity}

                        onClose={() => _onSnackbarClose()}
                    ></SnackbarCenter>
                </Layout>
            </Container>
        </>
    );
}
export default ProfileAccountMainComponent;