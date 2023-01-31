import { useEffect } from "react";
import { useState } from "react";
import { userConsentDataConnect } from "../../../../data_connect/userConsentDataConnect";

export default function useUserConsentHook(props) {
    const [userConsent, setUserConsent] = useState(null);

    useEffect(() => {
        reqFetchUserConsent();
    }, []);

    const reqFetchUserConsent = async () => {
        await userConsentDataConnect().searchMy()
            .then(res => {
                if (res.status === 200) {
                    setUserConsent(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqChangeMarketingPhoneYn = async ({ body, successCallback }) => {
        let bool = await userConsentDataConnect().changeMarketingPhoneYn({ body })
            .then(res => {
                if (res.status === 200) {
                    return true;
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })

        if (bool) {
            await reqFetchUserConsent();
            successCallback();
        }
    }

    const reqChangeMarketingEmailYn = async ({ body, successCallback }) => {
        let bool = await userConsentDataConnect().changeMarketingEmailYn({ body })
            .then(res => {
                if (res.status === 200) {
                    return true;
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })

        if (bool) {
            await reqFetchUserConsent();
            successCallback();
        }
    }

    return {
        userConsent,
        reqChangeMarketingPhoneYn,
        reqChangeMarketingEmailYn
    }
}