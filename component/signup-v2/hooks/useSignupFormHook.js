import { useState } from "react";
import { userDataConnect } from "../../../data_connect/userDataConnect";
import { validationDataConnect } from "../../../data_connect/validationDataConnect";

export default function useSignupFormHook() {
    const [signupForm, setSignupForm] = useState({
        username: '',
        password: '',
        passwordChecker: '',
        nickname: '',
        email: '',
        emailValidationCode: '',
        phoneNumber: '',
        phoneNumberValidationCode: '',
    });

    const onChangeValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setSignupForm({
            ...signupForm,
            [name]: value
        })
    }

    const reqIsDuplicateUsername = async ({ username }) => {
        return await userDataConnect().checkUsernameDuplicate({ username })
            .then(res => {
                if (res.status === 200) {
                    let isDuplicated = res.data.data.isDuplicated;
                    let isEmpty = res.data.data.isEmpty;

                    if (isDuplicated) {
                        return true;
                    }

                    if (isEmpty) {
                        return true;
                    }

                    return false;
                } else {
                    return true;
                }
            })
            .catch(err => {
                console.log(err, err.response);
                return true;
            })
    }

    const reqSendEmailValidationCode = async ({
        email,
        successCallback
    }) => {
        let validationType = 'forSignup';

        await validationDataConnect().sendEmailValidationCode({ email, validationType })
            .then(res => {
                if (res.status === 200) {
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
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqSendPhoneNumberValidationCode = async ({
        phoneNumber,
        successCallback
    }) => {
        let validationType = 'forSignup';

        await validationDataConnect().sendPhoneNumberValidationCode({ phoneNumber, validationType })
            .then(res => {
                if (res.status === 200) {
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
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
    }

    const reqSignup = async ({
        body,
        successCallback
    }) => {
        await userDataConnect().signup(body)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;
                if (res.status === 500) {
                    alert('undefined error.')
                    return;
                }

                alert(res.data.memo);
            })
    }

    const onClearEmailValidationCode = () => {
        setSignupForm({
            ...signupForm,
            emailValidationCode: ''
        })
    }

    const onClearPhoneNumberValidationCode = () => {
        setSignupForm({
            ...signupForm,
            phoneNumberValidationCode: ''
        })
    }

    return {
        signupForm,
        onChangeValueOfName,
        onClearEmailValidationCode,
        onClearPhoneNumberValidationCode,
        reqSignup,
        reqIsDuplicateUsername,
        reqSendEmailValidationCode,
        reqSendPhoneNumberValidationCode
    }
}