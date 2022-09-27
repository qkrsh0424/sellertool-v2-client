import Image from "next/image";
import { useEffect, useState } from "react";
import useDisabledBtn from "../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import useSignupFormHook from "../hooks/useSignupFormHook";
import useSignupValidHook from "../hooks/useSignupValidHook";
import { Container, FormGroup, HeaderWrapper, InputBox, Wrapper } from "./FormField.styled";

export default function FormFieldComponent(props) {
    const [usernameDuplicatedNoticeOpen, setUsernameDuplicatedNoticeOpen] = useState(false);
    const [usernamePassNoticeOpen, setUsernamePassNoticeOpen] = useState(false);
    const [emailValidationCodeInputModeOpen, setEmailValidationCodeInputModeOpen] = useState(false);
    const [phoneNumberValidationCodeInputModeOpen, setPhoneNumberValidationCodeInputModeOpen] = useState(false);

    const {
        signupForm,
        onChangeValueOfName: onChangeValueOfNameForSignupForm,
        onClearEmailValidationCode,
        onClearPhoneNumberValidationCode,
        reqIsDuplicateUsername,
        reqSendEmailValidationCode,
        reqSendPhoneNumberValidationCode
    } = useSignupFormHook();

    const {
        signupValid,
        canSubmit,
        returnUsernameValid,
        returnPasswordValid,
        returnPasswordCheckerValid,
        returnNicknameValid,
        returnEmailValid,
        returnEmailValidationCodeValid,
        returnPhoneNumberValid,
        returnPhoneNumberValidationCodeValid,
        onSetSignupValid
    } = useSignupValidHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    useEffect(() => {
        let usernameValid = returnUsernameValid(signupForm.username);
        let passwordValid = returnPasswordValid(signupForm.password);
        let passwordCheckerValid = returnPasswordCheckerValid(signupForm.password, signupForm.passwordChecker);
        let nicknameValid = returnNicknameValid(signupForm.nickname);
        let emailValid = returnEmailValid(signupForm.email);
        let emailValidationCodeValid = returnEmailValidationCodeValid(signupForm.emailValidationCode);
        let phoneNumberValid = returnPhoneNumberValid(signupForm.phoneNumber);
        let phoneNumberValidationCodeValid = returnPhoneNumberValidationCodeValid(signupForm.phoneNumberValidationCode);

        onSetSignupValid({
            ...signupValid,
            username: usernameValid,
            password: passwordValid,
            passwordChecker: passwordCheckerValid,
            nickname: nicknameValid,
            email: emailValid,
            emailValidationCode: emailValidationCodeValid,
            phoneNumber: phoneNumberValid,
            phoneNumberValidationCode: phoneNumberValidationCodeValid
        })
    }, [
        signupForm.username,
        signupForm.password,
        signupForm.passwordChecker,
        signupForm.nickname,
        signupForm.email,
        signupForm.emailValidationCode,
        signupForm.phoneNumber,
        signupForm.phoneNumberValidationCode
    ]);

    const __handle = {
        action: {
            openEmailValidationCodeInputMode: () => {
                setEmailValidationCodeInputModeOpen(true);
            },
            closeEmailValidationCodeInputMode: () => {
                setEmailValidationCodeInputModeOpen(false);
                onClearEmailValidationCode();
            },
            openPhoneNumberValidationCodeInputMode: () => {
                setPhoneNumberValidationCodeInputModeOpen(true);
            },
            closePhoneNumberValidationCodeInputMode: () => {
                setPhoneNumberValidationCodeInputModeOpen(false);
                onClearPhoneNumberValidationCode();
            }
        },
        submit: {
            checkDuplicateUsername: async (e) => {
                if (!returnUsernameValid(signupForm.username)) {
                    setUsernameDuplicatedNoticeOpen(false);
                    setUsernamePassNoticeOpen(false);
                    onSetSignupValid({
                        ...signupValid,
                        usernamePassDuplicete: false
                    })
                    return;
                }

                let isDuplicatedUsername = await reqIsDuplicateUsername({ username: signupForm.username });

                if (isDuplicatedUsername) {
                    setUsernameDuplicatedNoticeOpen(true);
                    setUsernamePassNoticeOpen(false);
                    onSetSignupValid({
                        ...signupValid,
                        usernamePassDuplicete: false
                    })
                } else {
                    setUsernameDuplicatedNoticeOpen(false);
                    setUsernamePassNoticeOpen(true);
                    onSetSignupValid({
                        ...signupValid,
                        usernamePassDuplicete: true
                    })
                }

            },
            sendEmailValidationCode: async () => {
                if (!returnEmailValid(signupForm.email)) {
                    alert('이메일 형식을 확인해 주세요.');
                    return;
                }
                setDisabledBtn(true);

                reqSendEmailValidationCode({
                    email: signupForm.email,
                    successCallback: () => __handle.action.openEmailValidationCodeInputMode()
                })
            },
            sendPhoneNumberValidationCode: async () => {
                if (!returnPhoneNumberValid(signupForm.phoneNumber)) {
                    alert('휴대전화 형식을 확인해 주세요.');
                    return;
                }
                setDisabledBtn(true);

                reqSendPhoneNumberValidationCode({
                    phoneNumber: signupForm.phoneNumber,
                    successCallback: () => __handle.action.openPhoneNumberValidationCodeInputMode()
                })

            },
            confirmSignup: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                if (canSubmit) {
                    props.onSubmitSignup({ signupForm });
                }
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderWrapper>
                        <div className='head-box'>
                            <SingleBlockButton
                                className='prev-button-el'
                                onClick={() => props.onActionCloseSignupFormMode()}
                            >
                                <div className='prev-button-icon-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src={`/images/icon/arrow_left_000000.svg`}
                                        className='icon-el'
                                        layout="responsive"
                                        width={1}
                                        height={1}
                                        alt={'prev icon'}
                                    />
                                </div>
                            </SingleBlockButton>
                        </div>
                        <div className='head-box'>
                            <div className='title'>
                                회원가입
                            </div>
                        </div>
                        <div className='head-box'>
                            <div className='page'>
                                2 / 2
                            </div>
                        </div>
                    </HeaderWrapper>
                    <FormGroup
                        onSubmit={(e) => __handle.submit.confirmSignup(e)}
                    >
                        <InputBox>
                            <div
                                className='input-label'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >아이디</div>
                                <ValidTag
                                    isValid={signupValid.username}
                                >형식 체크</ValidTag>
                            </div>
                            <input
                                type='text'
                                className={`input-item`}
                                name='username'
                                defaultValue={signupForm.username || ''}
                                onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                onBlur={(e) => __handle.submit.checkDuplicateUsername(e)}
                                placeholder={'5-20자의 영문 소문자, 숫자와 특수기호(_),(.)만 사용 가능합니다.'}
                                required
                            ></input>
                            {signupValid.usernamePassDuplicete && usernamePassNoticeOpen &&
                                <div className='input-notice' style={{ color: '#5fcf80' }}>멋진 아이디네요!</div>
                            }
                            {usernameDuplicatedNoticeOpen &&
                                <div className='input-notice' style={{ color: '#e56767' }}>이미 사용중인 아이디 입니다.</div>
                            }
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >패스워드</div>
                                <div>
                                    <ValidTag
                                        isValid={signupValid.password}
                                    >형식 체크</ValidTag>
                                </div>
                            </div>
                            <input
                                type='password'
                                className={`input-item`}
                                name='password'
                                value={signupForm.password || ''}
                                onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                placeholder={'영문, 숫자, 특수문자 혼합 8-50자'}
                                minLength={8}
                                maxLength={50}
                                required
                            ></input>
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >패스워드 확인</div>
                                <div>
                                    <ValidTag
                                        isValid={signupValid.passwordChecker}
                                    >패스워드 확인</ValidTag>
                                </div>
                            </div>
                            <input
                                type='password'
                                className={`input-item`}
                                name='passwordChecker'
                                value={signupForm.passwordChecker || ''}
                                onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                minLength={8}
                                maxLength={50}
                                required
                            ></input>
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >닉네임</div>
                                <div>
                                    <ValidTag
                                        isValid={signupValid.nickname}
                                    >형식 체크</ValidTag>
                                </div>
                            </div>
                            <input
                                type='text'
                                className={`input-item`}
                                name='nickname'
                                value={signupForm.nickname || ''}
                                onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                placeholder={'2자 이상 15자 이하로 입력해 주세요.'}
                                minLength={2}
                                maxLength={15}
                                required
                            ></input>
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >이메일</div>
                                <div>
                                    <ValidTag
                                        isValid={signupValid.email}
                                    >형식 체크</ValidTag>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <input
                                    type='email'
                                    className={`input-item`}
                                    name='email'
                                    value={signupForm.email || ''}
                                    onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                    placeholder={'example@example.com'}
                                    required
                                    disabled={emailValidationCodeInputModeOpen ? true : false}
                                ></input>
                                {emailValidationCodeInputModeOpen ?
                                    <SingleBlockButton
                                        type='button'
                                        className='validation-button-el'
                                        onClick={__handle.action.closeEmailValidationCodeInputMode}
                                        disabled={disabledBtn}
                                    >
                                        재시도
                                    </SingleBlockButton>
                                    :
                                    <SingleBlockButton
                                        type='button'
                                        className='validation-button-el'
                                        onClick={__handle.submit.sendEmailValidationCode}
                                        disabled={!returnEmailValid(signupForm.email) || disabledBtn}
                                    >
                                        인증번호 발송
                                    </SingleBlockButton>
                                }
                            </div>
                            {emailValidationCodeInputModeOpen &&
                                <div
                                    style={{
                                        marginTop: '10px'
                                    }}
                                >
                                    <input
                                        type='text'
                                        className={`input-item`}
                                        name='emailValidationCode'
                                        value={signupForm.emailValidationCode || ''}
                                        placeholder="인증번호를 입력하세요."
                                        onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                        minLength={6}
                                        maxLength={6}
                                        required
                                    ></input>
                                    <div style={{ marginTop: '10px' }}>
                                        <div className='input-notice'>해당 이메일로 인증번호를 발송했습니다.(유효시간 30분)</div>
                                        <div className='input-notice'>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.</div>
                                        <div className='input-notice' style={{ color: '#e56767' }}>이미 가입된 이메일은 인증번호를 받을 수 없습니다.</div>
                                        <div className='input-notice' style={{ color: '#e56767' }}>인증번호를 여전히 받지 못한 경우 스팸 메일함을 확인하여 주세요.</div>
                                    </div>
                                </div>
                            }
                        </InputBox>
                        <InputBox>
                            <div
                                className='input-label'
                            >
                                <div
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >휴대전화</div>
                                <div>
                                    <ValidTag
                                        isValid={signupValid.phoneNumber}
                                    >형식 체크</ValidTag>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <input
                                    type='text'
                                    className={`input-item`}
                                    name='phoneNumber'
                                    value={signupForm.phoneNumber || ''}
                                    onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                    placeholder={'ex)01012341234'}
                                    maxLength={11}
                                    required
                                    disabled={phoneNumberValidationCodeInputModeOpen ? true : false}
                                ></input>
                                {phoneNumberValidationCodeInputModeOpen ?
                                    <SingleBlockButton
                                        type='button'
                                        className='validation-button-el'
                                        onClick={__handle.action.closePhoneNumberValidationCodeInputMode}
                                        disabled={disabledBtn}
                                    >
                                        재시도
                                    </SingleBlockButton>
                                    :
                                    <SingleBlockButton
                                        type='button'
                                        className='validation-button-el'
                                        onClick={() => __handle.submit.sendPhoneNumberValidationCode()}
                                        disabled={!returnPhoneNumberValid(signupForm.phoneNumber) || disabledBtn}
                                    >
                                        인증번호 발송
                                    </SingleBlockButton>
                                }
                            </div>
                            {phoneNumberValidationCodeInputModeOpen &&
                                <div
                                    style={{
                                        marginTop: '10px'
                                    }}
                                >
                                    <input
                                        type='text'
                                        className={`input-item`}
                                        name='phoneNumberValidationCode'
                                        value={signupForm.phoneNumberValidationCode || ''}
                                        placeholder="인증번호를 입력하세요."
                                        onChange={(e) => onChangeValueOfNameForSignupForm(e)}
                                        minLength={6}
                                        maxLength={6}
                                        required
                                    ></input>
                                    <div style={{ marginTop: '10px' }}>
                                        <div className='input-notice'>해당 휴대전화로 인증번호를 발송했습니다.(유효시간 30분)</div>
                                        <div className='input-notice'>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.</div>
                                        <div className='input-notice' style={{ color: '#e56767' }}>이미 가입된 휴대전화는 인증번호를 받을 수 없습니다.</div>
                                        <div className='input-notice' style={{ color: '#e56767' }}>인증번호를 여전히 받지 못한 경우 스팸 메세지함을 확인하여 주세요.</div>
                                    </div>
                                </div>
                            }
                        </InputBox>
                        <SingleBlockButton
                            type='submit'
                            className='submit-button'
                            disabled={!canSubmit || disabledBtn}
                        >
                            회원가입
                        </SingleBlockButton>
                    </FormGroup>
                </Wrapper>
            </Container>
        </>
    );
}

function ValidTag(props) {
    return (<span className={`valid-label ${props.isValid === true ? 'pass-valid-label' : ''}`}>{props.children}</span>);
}