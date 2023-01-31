import { userDataConnect } from "../../../data_connect/userDataConnect";

export default function useLoginApiHook(props) {
    const reqLogin = async ({ body, successCallback }) => {
        await userDataConnect().loginLocal({ body })
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.')
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    return {
        reqLogin
    }
}