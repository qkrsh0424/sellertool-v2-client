import { userDataConnect } from "../../../data_connect/userDataConnect"

export default function useApiHook(props) {
    const reqSignup = async ({ body, successCallback }) => {
        return await userDataConnect().signup({ body })
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 상태가 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에게 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);

            })
    }

    return {
        reqSignup
    }
}