import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userDataConnect } from "../../data_connect/userDataConnect";

export default function UserPermissionComponent(props) {
    const router = useRouter();
    const reduxDispatch = useDispatch();

    useEffect(() => {
        async function userFetchInit() {
            
            if (!router.pathname) {
                return;
            }

            await __handle.req.fetchUserInfo();
        }
        userFetchInit();
    }, [router?.pathname]);

    const __handle = {
        req: {
            fetchUserInfo: async () => {
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
            }
        }
    }
    return null;
}