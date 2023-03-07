const formatValidUtils = {
    isUsernameFormatValid: (username) => {
        var regex = /^[a-z]([._a-z0-9]){4,19}$/g;
        return regex.test(username);
    },
    isNicknameFormatValid: (nickname) => {
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (nickname.search(spaceSearchRegex) !== -1) {
            return false;
        }

        if (nickname.length < 2 || nickname.length > 15) {
            return false;
        }
        return true;
    },
    isNameFormatValid: (name) => {
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (name.search(spaceSearchRegex) !== -1) {
            return false;
        }

        if (name.length < 2 || name.length > 15) {
            return false;
        }
        return true;
    },
    isPasswordFormatValid: (password) => {
        var num = password.search(/[0-9]/g);
        var eng = password.search(/[a-z]/ig);
        var spe = password.search(/[\\!@#$%^&*()\-_=+[\]{};:`"',.<>/?|~]/gi);

        if (password.length < 8 || password.length > 50) { // 글자수 제한
            return false;
        } else if (password.search(/\s/) !== -1) { // 공백 체크
            return false;
        } else if (num < 0 || eng < 0 || spe < 0) { // 영문, 숫자, 특수문자 혼합 체크
            return false;
        } else {
            return true;
        }
    },
    isComparePasswordFormatValid: (password, passwordChecker) => {
        if (password !== passwordChecker) {
            return false;
        } else {
            return true;
        }
    },
    isPhoneNumberFormatValid: (phoneNumber) => {
        // let regex = /^01([0|1|6|7|8|9])[-.]?([0-9]{3,4})[-.]?([0-9]{4})$/;
        let regex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
        return regex.test(phoneNumber);
    },
    isEmailFormatValid: (email) => {
        let regex = /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
        return regex.test(email);
    },
    isWorkspaceNameFormatValid: (name) => {
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (name.search(spaceSearchRegex) !== -1) {
            return false;
        }

        if (name.length < 2 || name.length > 30) {
            return false;
        }
        return true;
    },
    hasSpaceInFrontAndBack: (name) => {
        let spaceSearchRegex = /^(\s)|(\s)$/;

        if (name.search(spaceSearchRegex) !== -1) {
            return true;
        }

        return false;
    },
    checkPhoneNumberFormatValid: (phoneNumber) => {
        let regex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

        if (!regex.test(phoneNumber)) {
            throw new Error('전화번호 형식이 정확하지 않습니다.');
        }
    },
    checkEmailFormatValid: (email) =>{
        if(!formatValidUtils.isEmailFormatValid(email)){
            throw new Error('이메일 형식이 정확하지 않습니다.');
        }
    },
    checkValidationCodeFormatValid: (number) => {
        let regex = /^[0-9]{6}$/

        if(!regex.test(number)){
            throw new Error('인증번호를 다시 확인해 주세요.');
        }
    },
    isValidationCodeFormatValid: (number) => {
        let regex = /^[0-9]{6}$/

        return regex.test(number);
    }
}

export default formatValidUtils;