import { useEffect, useState } from "react";
import formatValidUtils from "../../../utils/formatValidUtils";

export default function useSignupValidHook() {
    const [signupValid, setSignupValid] = useState({
        username: false,
        usernamePassDuplicete: false,
        password: false,
        passwordChecker: false,
        nickname: false,
        phoneNumber: false,
        phoneNumberValidationCode: false
    });
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if (
            signupValid.username
            && signupValid.usernamePassDuplicete
            && signupValid.password
            && signupValid.passwordChecker
            && signupValid.nickname
            && signupValid.phoneNumber
            && signupValid.phoneNumberValidationCode
        ) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }

    }, [signupValid])

    const returnUsernameValid = (username) => {
        return formatValidUtils.isUsernameFormatValid(username);
    }

    const returnPasswordValid = (password) => {
        return formatValidUtils.isPasswordFormatValid(password);
    }

    const returnPasswordCheckerValid = (password, passwordChecker) => {
        if (!password || !passwordChecker) {
            return false;
        }

        if (password === passwordChecker) {
            return true;
        }

        return false;
    }

    const returnNicknameValid = (nickname) => {
        return formatValidUtils.isNicknameFormatValid(nickname);
    }

    const returnPhoneNumberValid = (phoneNumber) => {
        return formatValidUtils.isPhoneNumberFormatValid(phoneNumber);
    }

    const returnPhoneNumberValidationCodeValid = (phoneNumberValidationCode) => {
        return formatValidUtils.isValidationCodeFormatValid(phoneNumberValidationCode);
    }

    const onSetSignupValid = (form) => {
        setSignupValid({ ...form })
    }

    return {
        signupValid,
        canSubmit,
        returnUsernameValid,
        returnPasswordValid,
        returnPasswordCheckerValid,
        returnNicknameValid,
        returnPhoneNumberValid,
        returnPhoneNumberValidationCodeValid,
        onSetSignupValid
    }
}