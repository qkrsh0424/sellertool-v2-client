import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { checkEmailFormat, checkNicknameForm, checkPassword, checkUsernameForm, comparePassword } from "../../utils/regexUtils";
import SnackbarCenter from '../modules/SnackbarCenter';

const Container = styled.div`
    /* padding:10% 20%; */
    overflow: hidden;
`;

const Wrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 5%;
    border: 2px solid #2C73D2;
    border-radius: 10px;

    @media all and (max-width:992px){
        margin-top: 10%;
        width: 90%;
    }
`;

const HeaderBox = styled.div`
    position: relative;
    height: 100px;
    background: #2C73D2;

    .title{
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 25px;
        font-weight: 600;

        @media all and (max-width: 992px){
            font-size: 20px;
        }
    }
`;

const InputBox = styled.div`
    width: 80%;
    margin:auto;
    margin-top: 30px;
    .input-label{
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #555;
    }

    .input-item{
        width: 100%;
        padding: 8px 5px;
        margin-bottom: 5px;

        border: 2px solid #e1e1e1;
        border-radius: 5px;

        font-size: 16px;

        transition: all .5s;
        outline: none;

        &:hover{
            border: 2px solid #309FFF;
        }
        &:focus{
            border: 2px solid #2C73D2;
        }
        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
            border: 1px solid #e0e0e0;
        }
    }

    .pass-input-item{
        border: 2px solid #50bb1a;
    }

    .input-notice{
        color: #707070;
        font-size: 12px;
        margin-top: 3px;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
    }
    
    .re-request {
        color: #2C73D2;
        text-decoration: underline;
        cursor: pointer;
    }

    .valid-label{
        display:inline-block;
        margin-right:5px;
        padding:1px 5px;

        border:1px solid red;
        border-radius: 3px;

        color:red;
    }

    .pass-valid-label{
        border:1px solid #50bb1a;
        color:#50bb1a;
    }

    .auth-box {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;
    }

    .input-el-box {
        width: 80%;
    }

    .input-side-btn {
        padding: 10px;
        margin: 0 5px;
        border-radius: 5px;
        border: 1px solid #2C73D2;
        background-color: #2C73D2;
        color: white;
        cursor: pointer;
        width: 100px;

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
            border: 1px solid #e0e0e0;
        }

        transition: all .3s;
        &:hover{
            background: #309FFF;
            border: 1px solid #309FFF;
        }
    }
`;

const SignupButtonBox = styled.div`
    width: 80%;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    .submit-button{
        width: 100%;
        padding: 8px;

        background: #2C73D2;
        border: 2px solid #2C73D2;
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        transition: all .5s;
        
        cursor: pointer;
        
        &:hover{
            background: #309FFF;
            border: 2px solid #309FFF;
        }

        &:active{
            transition: all 0s;
            background: #609FFF;
            border: 2px solid #609FFF;
        }
    }
`;

const ValidTag = (props) => {
    return (<span className={`valid-label ${props.isValid === true ? 'pass-valid-label' : ''}`}>{props.children}</span>);
}

const initialInputValueState = {
    username: '',
    password: '',
    passwordCheck: '',
    nickname: ''
}
const initialFormValidState = {
    username: false,
    password: false,
    passwordCheck: false,
    nickname: false,
}

const inputValueStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return { ...state }
    }
}

const formValidStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
    }
}

const BodyComponent = (props) => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const passwordCheckRef = useRef();
    const nicknameRef = useRef();
    const emailRef = useRef();
    const emailAuthNumberRef = useRef();

    const [inputValueState, dispatchInputValueState] = useReducer(inputValueStateReducer, initialInputValueState);
    const [formValidState, dispatchFormValidState] = useReducer(formValidStateReducer, initialFormValidState);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [isEmailAddressChanged, setIsEmailAddressChanged] = useState(false);
    const [isEmailAuthNumberRequest, setIsEmailAuthNumberRequest] = useState(false);

    useEffect(() => {
        // 이메일 인증 성공 시
        if(props.isVerifiedEmail) {
            dispatchFormValidState({
                type: 'SET_DATA',
                payload: {
                    name: 'email',
                    value: true
                }
            })

            setIsEmailAddressChanged(false);
            setIsEmailAuthNumberRequest(false);
            dispatchInputValueState({
                type: 'SET_DATA',
                payload: {
                    name: 'emailAuthNumber',
                    value: ''
                }
            })
        }else{
            dispatchFormValidState({
                type: 'SET_DATA',
                payload: {
                    name: 'email',
                    value: false
                }
            })
        }
    }, [props.isVerifiedEmail])

    const _inputValueState = () => {
        return {
            onChangeInputValue: function (e) {
                dispatchInputValueState({
                    type: 'SET_DATA',
                    payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
            }
        }
    }

    const _onClickSignup = () => {
        if (!checkUsernameForm(inputValueState.username)) {
            _onSnackbarOpen('아이디 형식을 확인해 주세요.');
            usernameRef.current.focus();
            return;
        }
        if (!checkPassword(inputValueState.password)) {
            _onSnackbarOpen('패스워드 형식을 확인해 주세요.')
            passwordRef.current.focus();
            return;
        }
        if (!comparePassword(inputValueState.password, inputValueState.passwordCheck)) {
            _onSnackbarOpen('패스워드를 다시 한번 확인해 주세요.')
            passwordCheckRef.current.focus();
            return;
        }
        if (!checkNicknameForm(inputValueState.nickname)) {
            _onSnackbarOpen('닉네임 형식을 확인해 주세요.');
            nicknameRef.current.focus();
            return;
        }
        if(!formValidState.email) {
            alert('이메일 인증을 진행해주세요.');
            emailRef.current.focus();
            return;
        }

        props.onSubmitSignup(inputValueState);
    }

    const _onSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    }

    const _onSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    const _onBlurInput = (e) => {
        switch (e.target.name) {
            case 'username':
                if (checkUsernameForm(inputValueState.username)) {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'username',
                            value: true
                        }
                    });
                    props.onCheckUsernameDuplicate(inputValueState);
                } else {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'username',
                            value: false
                        }
                    });
                }
                break;
            case 'password':
                if (checkPassword(inputValueState.password)) {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'password',
                            value: true
                        }
                    })
                } else {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'password',
                            value: false
                        }
                    })
                }
                if (comparePassword(inputValueState.password, inputValueState.passwordCheck)) {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'passwordCheck',
                            value: true
                        }
                    })
                } else {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'passwordCheck',
                            value: false
                        }
                    })
                }
                break;
            case 'passwordCheck':
                if (comparePassword(inputValueState.password, inputValueState.passwordCheck)) {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'passwordCheck',
                            value: true
                        }
                    })
                } else {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'passwordCheck',
                            value: false
                        }
                    })
                }
                break;
            case 'nickname':
                if (checkNicknameForm(inputValueState.nickname)) {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'nickname',
                            value: true
                        }
                    })
                } else {
                    dispatchFormValidState({
                        type: 'SET_DATA',
                        payload: {
                            name: 'nickname',
                            value: false
                        }
                    })
                }
                break;
            default: break;
        }
    }

    const _reqUserInfoAuth = () => {
        return {
            onChangeIsEmailAddressValue: () => {
                props.onActionResetVerifiedEmail();
                setIsEmailAddressChanged(!isEmailAddressChanged);
            },
            onActionResetEmailAuth: () => {
                setIsEmailAddressChanged(false);
                setIsEmailAuthNumberRequest(false);

                dispatchInputValueState({
                    type: 'SET_DATA',
                    payload: {
                        name: 'emailAuthNumber',
                        value: ''
                    }
                })
                props.onActionResetVerifiedEmail();
            },
            getEmailAuthNumber: () => {
                if(!checkEmailFormat(inputValueState.email)) {
                    _onSnackbarOpen('이메일 형식을 확인해 주세요.');
                    return;
                }
                props.onActionGetEmailAuthNumber(inputValueState.email);
                setIsEmailAddressChanged(false);
                setIsEmailAuthNumberRequest(true);
            },
            verifyEmailAuthNumber: () => {
                if(!inputValueState.emailAuthNumber) {
                    _onSnackbarOpen('인증번호를 입력해 주세요.');
                    return;
                }
                props.onActionVerifyEmailAuthNumber(inputValueState.email, inputValueState.emailAuthNumber);
            },
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderBox>
                        <div className='title'>
                            셀러툴 회원가입
                        </div>
                    </HeaderBox>
                    <InputBox>
                        <div
                            className='input-label'
                        >아이디</div>
                        <input
                            type='text'
                            ref={usernameRef}
                            className={`input-item ${(formValidState.username === true && props.isNotDuplicatedState.username === true) ? 'pass-input-item' : ''}`}
                            name='username'
                            value={inputValueState.username || ''}
                            onChange={(e) => _inputValueState().onChangeInputValue(e)}
                            onBlur={(e) => _onBlurInput(e)}
                        ></input>
                        <div className='input-notice'>
                            <ValidTag
                                isValid={formValidState.username}
                            >형식 체크</ValidTag>
                            <ValidTag
                                isValid={props.isNotDuplicatedState.username && formValidState.username}
                            >중복 체크</ValidTag>
                        </div>
                        <div
                            className={`input-notice`}
                        >* [a~z] [0~9] [._] 형식의 문자만 지원합니다.</div>
                        <div
                            className={`input-notice`}
                        >* 최소 6자 최대 20자 이내로 입력해주세요.</div>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>패스워드</div>
                        <input
                            type='password'
                            ref={passwordRef}
                            className={`input-item ${formValidState.password === true ? 'pass-input-item' : ''}`}
                            name='password'
                            value={inputValueState.password || ''}
                            onChange={(e) => _inputValueState().onChangeInputValue(e)}
                            onBlur={(e) => _onBlurInput(e)}
                        ></input>
                        <div className='input-notice'>
                            <ValidTag
                                isValid={formValidState.password}
                            >형식 체크</ValidTag>
                        </div>
                        <div className='input-notice'>* 영문, 숫자, 특수문자를 혼합하여 입력해주세요.</div>
                        <div className='input-notice'>* 공백없이 8자리 ~ 20자리 이내로 입력해주세요.</div>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>패스워드 확인</div>
                        <input
                            type='password'
                            ref={passwordCheckRef}
                            className={`input-item ${formValidState.passwordCheck === true ? 'pass-input-item' : ''}`}
                            name='passwordCheck'
                            value={inputValueState.passwordCheck || ''}
                            onChange={(e) => _inputValueState().onChangeInputValue(e)}
                            onBlur={(e) => _onBlurInput(e)}
                        ></input>
                        <div className='input-notice'>
                            <ValidTag
                                isValid={formValidState.passwordCheck}
                            >패스워드 확인</ValidTag>
                        </div>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>닉네임</div>
                        <input
                            type='text'
                            ref={nicknameRef}
                            className={`input-item ${formValidState.nickname === true ? 'pass-input-item' : ''}`}
                            name='nickname'
                            value={inputValueState.nickname || ''}
                            onChange={(e) => _inputValueState().onChangeInputValue(e)}
                            onBlur={(e) => _onBlurInput(e)}
                        ></input>
                        <div className='input-notice'>
                            <ValidTag
                                isValid={formValidState.nickname}
                            >형식 체크</ValidTag>
                        </div>
                        <div className='input-notice'>* 최소 3자 최대 15자 이내로 입력해주세요.</div>
                    </InputBox>

                    <InputBox>
                        <div className='input-label'>이메일</div>
                        <div className='auth-box'>
                            <div className='input-el-box'>
                                <input
                                    type='text'
                                    ref={emailRef}
                                    className={`input-item ${formValidState.email === true ? 'pass-input-item' : ''}`}
                                    name='email'
                                    value={inputValueState.email || ''}
                                    onChange={(e) => _inputValueState().onChangeInputValue(e)}
                                    onBlur={(e) => _onBlurInput(e)}
                                    disabled={!isEmailAddressChanged}
                                ></input>
                                <div className='input-notice'>
                                    <ValidTag
                                        isValid={formValidState.email}
                                    >인증 완료</ValidTag>
                                </div>
                                <div className='input-notice'>회원 수정을 완료해야 변경된 정보가 저장됩니다.</div>
                            </div>
                            {!isEmailAuthNumberRequest &&
                                !isEmailAddressChanged &&
                                <button type='button' className='input-side-btn' onClick={() => _reqUserInfoAuth().onChangeIsEmailAddressValue()}>이메일 작성</button>
                            }
                            {isEmailAddressChanged &&
                                <button type='button' className='input-side-btn' onClick={() => _reqUserInfoAuth().getEmailAuthNumber()}>인증번호 받기</button>
                            }
                        </div>

                        {isEmailAuthNumberRequest &&
                            <div className='auth-box'>
                                <div className='input-el-box'>
                                    <input
                                        type='number'
                                        ref={emailAuthNumberRef}
                                        className={`input-item ${formValidState.emailAuthNumber === true ? 'pass-input-item' : ''}`}
                                        name='emailAuthNumber'
                                        value={inputValueState.emailAuthNumber || ''}
                                        onChange={(e) => _inputValueState().onChangeInputValue(e)}
                                        onBlur={(e) => _onBlurInput(e)}
                                        placeholder='인증번호'
                                    ></input>
                                    <div className='input-notice'>* 이메일이 도착하지 않는다면 재요청해주세요.</div>
                                    <div className='input-notice re-request' onClick={() => _reqUserInfoAuth().onActionResetEmailAuth()}>이메일 작성 및 재요청</div>
                                </div>
                                <button type='button' className='input-side-btn' onClick={() => _reqUserInfoAuth().verifyEmailAuthNumber()}>인증</button>
                            </div>
                        }
                    </InputBox>

                    <SignupButtonBox>
                        <button type='button' className='submit-button' onClick={() => _onClickSignup()}>회원가입</button>
                    </SignupButtonBox>
                </Wrapper>
            </Container>

            {/* Snackbar */}
            <SnackbarCenter
                open={snackbarOpen}
                message={snackbarMessage}
                severity={'warning'}

                onClose={() => _onSnackbarClose()}
            ></SnackbarCenter>
        </>
    );
}

export default BodyComponent;