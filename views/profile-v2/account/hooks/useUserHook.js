import { useDispatch } from "react-redux";
import { userDataConnect } from "../../../../data_connect/userDataConnect";

export default function useUserHook(props) {
    const reduxDispatch = useDispatch();

    const reqDispatchUser = async () => {
        await userDataConnect().getInfoOwn()
            .then(res => {
                if (res?.status === 200 && res?.data?.message === 'success') {
                    reduxDispatch({
                        type: 'USER_REDUX_SET_DATA',
                        payload: {
                            isLoading: false,
                            userInfo: res.data.data
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err, err.response);
                reduxDispatch({
                    type: 'USER_REDUX_SET_DATA',
                    payload: {
                        isLoading: false,
                        userInfo: null
                    }
                });
            })
            ;
    }

    const reqChangeNickname = async ({
        body,
        successCallback
    }) => {
        await userDataConnect().changeNickname(body)
            .then(res => {
                if (res.status === 200) {
                    reqDispatchUser();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const reqChangeName = async ({
        body,
        successCallback
    }) => {
        await userDataConnect().changeName(body)
            .then(res => {
                if (res.status === 200) {
                    reqDispatchUser();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const reqChangePhoneNumber = async ({
        body,
        successCallback
    }) => {
        await userDataConnect().changePhoneNumber(body)
            .then(res => {
                if (res.status === 200) {
                    reqDispatchUser();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const reqChangeEmail = async ({
        body,
        successCallback
    }) => {
        await userDataConnect().changeEmail(body)
            .then(res => {
                if (res.status === 200) {
                    reqDispatchUser();
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const reqChangePassword = async ({
        body,
        successCallback
    }) => {
        await userDataConnect().changePassword(body)
            .then(res => {
                if (res.status === 200) {
                    reduxDispatch({
                        type: 'USER_REDUX_CLEAR_USER_INFO'
                    })
                    reduxDispatch({
                        type: 'WORKSPACE_REDUX_CLEAR_WORKSPACE_INFO'
                    })
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    return {
        reqChangeNickname,
        reqChangeName,
        reqChangePhoneNumber,
        reqChangeEmail,
        reqChangePassword
    }
}