import { useEffect, useState } from "react";
import { validationDataConnect } from "../../../../data_connect/validationDataConnect";
import formatValidUtils from "../../../../utils/formatValidUtils";

export default function useModifyEmailHook(props) {
    const [modifyEmailForm, setModifyEmailForm] = useState({
        email: '',
        emailValidationCode: ''
    });

    const reqSendEmailValidationCode = async ({
        email,
        successCallback
    }) => {
        let validationType = 'forModify';

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

    const onChangeModifyEmailFormOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setModifyEmailForm({
            ...modifyEmailForm,
            [name]: value
        })
    }

    const onClearEmailValidationCode = () =>{
        setModifyEmailForm({
            ...modifyEmailForm,
            emailValidationCode:''
        })
    }

    const checkEmailFormatValid = (email) => {
        if (!formatValidUtils.isEmailFormatValid(email)) {
            throw new Error('휴대전화 형식을 확인해 주세요.');
        }
    }

    const checkValidationCodeFormatValid = (validationCode) => {
        if (!formatValidUtils.isValidationCodeFormatValid(validationCode)) {
            throw new Error('인증번호를 정확하게 입력해 주세요.');
        }
    }

    const returnEmailValid = (email) => {
        return formatValidUtils.isEmailFormatValid(email);
    }

    return {
        modifyEmailForm,
        onChangeModifyEmailFormOfName,
        reqSendEmailValidationCode,
        onClearEmailValidationCode,
        checkEmailFormatValid,
        checkValidationCodeFormatValid,
        returnEmailValid
    }
}