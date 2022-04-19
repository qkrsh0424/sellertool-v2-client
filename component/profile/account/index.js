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

const Container = styled.div`

`;

const ProfileAccountMainComponent = (props) => {
    const dispatch = useDispatch();
    const userRdx = useSelector(state => state.userState);

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
                await userDataConnect().updateInfo(body)
                    .catch(err => {
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
            }
        },
        submit: {
            updateInfo: async (body) => {
                await __user.req.updateInfo(body);
                await __user.req.fetchData();
            },
            changePassword: async (body) => {
                console.log(body)
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

    return (
        <>
            <Layout>
                <Container>
                    <HeadComponent></HeadComponent>
                    <BasicInformationComponent
                        userInfo={userRdx?.info}

                        onSubmitUpdateUserInfo={__user.submit.updateInfo}
                    ></BasicInformationComponent>
                    <LineBreakerBottom
                        lineColor={'#e0e0e0'}
                    />
                    <EditPasswordComponent
                        userInfo={userRdx?.info}

                        onSubmitChangePassword={__user.submit.changePassword}
                    ></EditPasswordComponent>
                </Container>
            </Layout>
        </>
    );
}
export default ProfileAccountMainComponent;