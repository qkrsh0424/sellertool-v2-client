import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { validationDataConnect } from "../../../../data_connect/validationDataConnect";
import formatValidUtils from "../../../../utils/formatValidUtils";

export default function useModifyPhoneNumberHook(props) {
    const [modifyPhoneNumberForm, setModifyPhoneNumberForm] = useState({
        phoneNumber: '',
        phoneNumberValidationCode: ''
    });

    const reqSendPhoneNumberValidationCode = async ({
        phoneNumber,
        successCallback
    }) => {
        let validationType = 'forModify';

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

    const onChangeModifyPhoneNumberFormOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setModifyPhoneNumberForm({
            ...modifyPhoneNumberForm,
            [name]: value
        })
    }

    const onClearPhoneNumberValidationCode = () =>{
        setModifyPhoneNumberForm({
            ...modifyPhoneNumberForm,
            phoneNumberValidationCode:''
        })
    }

    const checkPhoneNumberFormatValid = (phoneNumber) => {
        if (!formatValidUtils.isPhoneNumberFormatValid(phoneNumber)) {
            throw new Error('휴대전화 형식을 확인해 주세요.');
        }
    }

    const checkValidationCodeFormatValid = (validationCode) => {
        if (!formatValidUtils.isValidationCodeFormatValid(validationCode)) {
            throw new Error('인증번호를 정확하게 입력해 주세요.');
        }
    }

    const returnPhoneNumberValid = (phoneNumber) => {
        return formatValidUtils.isPhoneNumberFormatValid(phoneNumber);
    }

    return {
        modifyPhoneNumberForm,
        onChangeModifyPhoneNumberFormOfName,
        reqSendPhoneNumberValidationCode,
        onClearPhoneNumberValidationCode,
        checkPhoneNumberFormatValid,
        checkValidationCodeFormatValid,
        returnPhoneNumberValid
    }
}