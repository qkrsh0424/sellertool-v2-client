import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { csrfDataConnect } from "../../data_connect/csrfDataConnect";
import { signupDataConnect } from "../../data_connect/signupDataConnect";
import { userDataConnect } from "../../data_connect/userDataConnect";
import { userInfoAuthDataConnect } from "../../data_connect/userInfoAuthDataConnect";
import SnackbarCenter from "../modules/SnackbarCenter";
import BodyComponent from "./BodyComponent";

const Container = styled.div`
    margin-bottom: 150px;
`;

const MainComponent = () => {
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('no message');
    const [snackbarSeverity, setSnackbarSeverity] = useState('info');

    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

    const [isNotDuplicatedState, setIsNotDuplicatedState] = useState({
        username: false
    });

    const _onSnackbarOpen = (message) =>{
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    }

    const _onSnackbarClose = () =>{
        setSnackbarOpen(false);
    }

    const __handleDataConnect = () => {
        return {
            signup: async function (params) {
                await csrfDataConnect().getAuthCsrf();
                await signupDataConnect().signup(params)
                    .then(res => {
                        if(res.status===200 && res.data.message === 'success'){
                            router.replace('/login');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        alert(res.data.memo);
                    })
            },
            checkUsernameDuplicate: async function (params) {
                await userDataConnect().checkUsernameDuplicate(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            let result = res.data?.data;
                            if (!result.isEmpty && !result.isDuplicated) {
                                setIsNotDuplicatedState({
                                    ...isNotDuplicatedState,
                                    username: true
                                });
                                return;
                            }
                        }
                        setIsNotDuplicatedState({
                            ...isNotDuplicatedState,
                            username: false
                        });
                    })
                    .catch(err => {
                        setIsNotDuplicatedState({
                            ...isNotDuplicatedState,
                            username: false
                        });
                        alert('유저 중복 체크 에러');
                    })
            },
            getEmailAuthNumber: async function (email) {
                await userInfoAuthDataConnect().getEmailAuthNumber(email)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
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
            verifyEmailAuthNumber: async function (email, emailAuthNumber) {
                await userInfoAuthDataConnect().verifyEmailAuthNumber(email, emailAuthNumber)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
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
        }
    }

    const __handleEventControl = () => {
        return {
            onActionResetVerifiedEmail: () => {
                setIsVerifiedEmail(false);
            },
            onSubmitSignup: async function (inputValueState) {
                let body = {
                    ...inputValueState,
                    verifiedEmail : isVerifiedEmail
                }
                await __handleDataConnect().signup(body);
            },
            onCheckUsernameDuplicate: async function(inputValueState){
                await __handleDataConnect().checkUsernameDuplicate(inputValueState);
            },
            onActionGetEmailAuthNumber: async function(email) {
                await __handleDataConnect().getEmailAuthNumber(email);
            },
            onActionVerifyEmailAuthNumber: async function(email, emailAuthNumber) {
                await __handleDataConnect().verifyEmailAuthNumber(email, emailAuthNumber);
            }
        }
    }
    return (
        <>
            <Container>
                <BodyComponent
                    isNotDuplicatedState={isNotDuplicatedState}
                    isVerifiedEmail={isVerifiedEmail}

                    onCheckUsernameDuplicate={(inputValueState)=>__handleEventControl().onCheckUsernameDuplicate(inputValueState)}
                    onSubmitSignup={(inputValueState) => __handleEventControl().onSubmitSignup(inputValueState)}
                    onActionResetVerifiedEmail={() => __handleEventControl().onActionResetVerifiedEmail()}
                    onActionGetEmailAuthNumber={(email) => __handleEventControl().onActionGetEmailAuthNumber(email)}
                    onActionVerifyEmailAuthNumber={(email, emailAuthNumber) => __handleEventControl().onActionVerifyEmailAuthNumber(email, emailAuthNumber)}
                ></BodyComponent>
            </Container>

            {/* Snackbar */}
            <SnackbarCenter
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}

                onClose={() => _onSnackbarClose()}
            ></SnackbarCenter>
        </>
    );
}

export default MainComponent;