import styled from 'styled-components';
import { useRouter } from 'next/router';
import { csrfDataConnect } from '../../data_connect/csrfDataConnect';
import BodyComponent from './BodyComponent';
import { loginDataConnect } from '../../data_connect/loginDataConnect';
import SnackbarCenter from '../modules/snackbar/SnackbarCenter';
import { useState } from 'react';

const Container = styled.div`
    margin-bottom: 150px;
`;

const MainComponent = () => {
    const router = useRouter();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const __handleDataConnect = () => {
        return {
            login: async function (inputValueState) {
                await csrfDataConnect().getAuthCsrf();
                await loginDataConnect().login(inputValueState)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            router.replace('/');
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        console.log(res)
                        if (!res) {
                            return;
                        }

                        if (res.status === 500) {
                            alert('undefined error.')
                            return;
                        }

                        if (res.status === 401 && res.data.message === 'auth_failed') {
                            setSnackbarMessage(res.data?.memo);
                            setSnackbarOpen(true);
                            return;
                        }

                        alert(res.data?.memo);
                    })
                    ;
            }
        }
    }

    const __handleEventControl = () => {
        return {
            onSubmitLogin: async function (inputValueState) {
                await __handleDataConnect().login(inputValueState);
            },
            onSnackbarClose: function () {
                setSnackbarOpen(false)
            }
        }
    }

    return (
        <>

            <Container>
                <BodyComponent
                    onSubmitLogin={(inputValueState) => __handleEventControl().onSubmitLogin(inputValueState)}
                ></BodyComponent>
            </Container>


            {/* Snackbar */}
            <SnackbarCenter
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={() => __handleEventControl().onSnackbarClose()}
            ></SnackbarCenter>
        </>
    );
}

export default MainComponent;