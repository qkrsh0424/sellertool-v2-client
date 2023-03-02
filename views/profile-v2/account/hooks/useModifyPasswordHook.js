import _ from "lodash";
import { useEffect, useState } from "react";
import formatValidUtils from "../../../../utils/formatValidUtils";

export default function useModifyPasswordHook(props) {
    const [modifyPasswordForm, setModifyPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        newPasswordChecker: ''
    });

    const onChangeModifyPasswordFormOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setModifyPasswordForm({
            ...modifyPasswordForm,
            [name]: value
        });
    }

    const checkPasswordFormatValid = (password) => {
        if (!formatValidUtils.isPasswordFormatValid(password)) {
            throw new Error("비밀번호는 영문, 숫자, 특수문자 혼합 8-50자로 지정해 주세요.");
        }
    }

    const checkComparePasswordFormatValid = (password, passwordChecker) => {
        if (!formatValidUtils.isComparePasswordFormatValid(password, passwordChecker)) {
            throw new Error("새 비밀번호를 다시 확인해 주세요.");
        }
    }

    return {
        modifyPasswordForm,
        onChangeModifyPasswordFormOfName,
        checkPasswordFormatValid,
        checkComparePasswordFormatValid
    }
}