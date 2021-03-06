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
`;

const AuthInputBox = styled.div`
    width: 80%;
    margin:auto;
    margin-top: 30px;

    input::placeholder {
        font-size: 12px;
    }

    .input-label{
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
        color: #555;
    }
    
    .input-item{
        width: 90%;
        padding: 8px 5px;

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
            background: #f0f0f0;
            border: 2px solid #f0f0f0;
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

    button {
        width: 10%;
        margin-left: 5px;
        border-radius: 5px;
        border: 1px solid #2C73D2;
        background-color: #2C73D2;
        color: white;
        cursor: pointer;

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
            border: 1px solid #e0e0e0;
        }

        @media screen and (max-width: 576px) {
            width: 20%;
            font-size: 12px;
        }
    }

    .auth-input-box {
        display: flex;
        padding: 5px 0;
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

        background: #309FFF;
        border: 2px solid #309FFF;
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        transition: all .5s;
        
        cursor: pointer;
        
        &:hover{
            background: #2C73D2;
            border: 2px solid #2C73D2;
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
        if(!props.verifiedEmail) {
            return null;
        }

        dispatchInputValueState({
            type: 'SET_DATA',
            payload: {
                name: 'verifiedEmail',
                value: props.verifiedEmail
            }
        });
        dispatchInputValueState({
            type: 'SET_DATA',
            payload: {
                name: 'emailAuthNumber',
                value: ''
            }
        })

        if(props.verifiedEmail) {
            dispatchFormValidState({
                type: 'SET_DATA',
                payload: {
                    name: 'email',
                    value: true
                }
            });
        }
        setIsEmailAddressChanged(false);
        setIsEmailAuthNumberRequest(false);
    }, [props.verifiedEmail]);

    useEffect(() => {
        if(!isEmailAddressChanged) {
            return;
        }

        dispatchInputValueState({
            type: 'SET_DATA',
            payload: {
                name: 'emailAuthNumber',
                value: ''
            }
        })

        dispatchFormValidState({
            type: 'SET_DATA',
            payload: {
                name: 'email',
                value: false
            }
        })

        setIsEmailAuthNumberRequest(false);
    }, [isEmailAddressChanged]);

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

                if(e.target.name === 'email') {
                    setIsEmailAddressChanged(true);
                    
                    if(e.target.value === '') {
                        setIsEmailAddressChanged(false);
                    }
                }
            }
        }
    }

    const _onClickSignup = () => {
        if (!checkUsernameForm(inputValueState.username)) {
            _onSnackbarOpen('????????? ????????? ????????? ?????????.');
            usernameRef.current.focus();
            return;
        }
        if (!checkPassword(inputValueState.password)) {
            _onSnackbarOpen('???????????? ????????? ????????? ?????????.')
            passwordRef.current.focus();
            return;
        }
        if (!comparePassword(inputValueState.password, inputValueState.passwordCheck)) {
            _onSnackbarOpen('??????????????? ?????? ?????? ????????? ?????????.')
            passwordCheckRef.current.focus();
            return;
        }
        if (!checkNicknameForm(inputValueState.nickname)) {
            _onSnackbarOpen('????????? ????????? ????????? ?????????.');
            nicknameRef.current.focus();
            return;
        }
        if (inputValueState.email) {
            if (!formValidState.email) {
                _onSnackbarOpen('????????? ????????? ????????? ?????????.');
                emailRef.current.focus();
                return;
            }
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
            getEmailAuthNumber: function () {
                if(!checkEmailFormat(inputValueState.email)) {
                    _onSnackbarOpen('????????? ????????? ????????? ?????????.');
                    return;
                }
                props.onActionGetEmailAuthNumber(inputValueState.email);
                setIsEmailAddressChanged(false);
                setIsEmailAuthNumberRequest(true);
            },
            verifyEmailAuthNumber: function () {
                if(!inputValueState.emailAuthNumber) {
                    _onSnackbarOpen('??????????????? ????????? ?????????.');
                    return;
                }
                props.onActionVerifyEmailAuthNumber(inputValueState.email, inputValueState.emailAuthNumber);
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderBox>
                        <div className='title'>
                            ????????? ????????????
                        </div>
                    </HeaderBox>
                    <InputBox>
                        <div
                            className='input-label'
                        >?????????</div>
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
                            >?????? ??????</ValidTag>
                            <ValidTag
                                isValid={props.isNotDuplicatedState.username && formValidState.username}
                            >?????? ??????</ValidTag>
                        </div>
                        <div
                            className={`input-notice`}
                        >* [a~z] [0~9] [._] ????????? ????????? ???????????????.</div>
                        <div
                            className={`input-notice`}
                        >* ?????? 6??? ?????? 20??? ????????? ??????????????????.</div>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>????????????</div>
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
                            >?????? ??????</ValidTag>
                        </div>
                        <div className='input-notice'>* ??????, ??????, ??????????????? ???????????? ??????????????????.</div>
                        <div className='input-notice'>* ???????????? 8?????? ~ 20?????? ????????? ??????????????????.</div>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>???????????? ??????</div>
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
                            >???????????? ??????</ValidTag>
                        </div>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>?????????</div>
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
                            >?????? ??????</ValidTag>
                        </div>
                        <div className='input-notice'>* ?????? 3??? ?????? 15??? ????????? ??????????????????.</div>
                    </InputBox>

                    <AuthInputBox>
                        <div className='input-label'>?????????</div>
                        <div className='auth-input-box'>
                            <input
                                type='text'
                                ref={emailRef}
                                className={`input-item ${formValidState.email === true ? 'pass-input-item' : ''}`}
                                name='email'
                                value={inputValueState.email || ''}
                                onChange={(e) => _inputValueState().onChangeInputValue(e)}
                                onBlur={(e) => _onBlurInput(e)}
                            ></input>
                            <button type='button' onClick={() => _reqUserInfoAuth().getEmailAuthNumber()} disabled={!isEmailAddressChanged}>??????</button>
                        </div>

                        <div className='auth-input-box'>
                            <input
                                type='number'
                                ref={emailAuthNumberRef}
                                className={`input-item ${formValidState.emailAuthNumber === true ? 'pass-input-item' : ''}`}
                                name='emailAuthNumber'
                                value={inputValueState.emailAuthNumber || ''}
                                onChange={(e) => _inputValueState().onChangeInputValue(e)}
                                onBlur={(e) => _onBlurInput(e)}
                                placeholder='????????? ???????????? ??????'
                                disabled={!isEmailAuthNumberRequest}
                            ></input>
                            <button type='button' onClick={() => _reqUserInfoAuth().verifyEmailAuthNumber()} disabled={!isEmailAuthNumberRequest}
                            >??????</button>
                        </div>
                        <div className='input-notice'>
                            <ValidTag
                                isValid={formValidState.email}
                            >?????? ??????</ValidTag>
                        </div>
                        <div className='input-notice'>* ???????????? ???????????? ???????????? ?????????????????????.</div>
                    </AuthInputBox>

                    <SignupButtonBox>
                        <button type='button' className='submit-button' onClick={() => _onClickSignup()}>????????????</button>
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