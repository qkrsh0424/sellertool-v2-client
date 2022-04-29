import { useEffect, useReducer, useState } from 'react';
import { checkEmailFormat, checkNameForm, checkNicknameForm, checkPhoneNumberFormat } from '../../../../utils/regexUtils';
import { ButtonFieldWrapper, Container, FormFieldWrapper, TitleFieldWrapper } from './BasicInformation.styled';

function TitleFieldView() {
    return (
        <TitleFieldWrapper>
            <div className='title'>기본 정보</div>
        </TitleFieldWrapper>
    );
}

function FormFieldView({ userInfo, userAuthInfo, isPhoneNumberChanged, isPhoneAuthNumberRequest, isEmailAddressChanged, isEmailAuthNumberRequest,
    onChangeValue, onChangeAuthValue, onActionGetPhoneAuthNumber, onActionVerifyPhoneAuthNumber, onActionGetEmailAuthNumber, onActionVerifyEmailAuthNumber }) {
    return (
        <FormFieldWrapper>
            <div style={{ marginTop: '10px' }}>
                <div className='input-box'>
                    <div className='input-label'>이름</div>
                    <input
                        className='input-el'
                        type='text'
                        name='name'
                        value={userInfo.name || ''}
                        onChange={onChangeValue}
                    ></input>
                </div>
                <div className='input-box'>
                    <div className='input-label'>닉네임</div>
                    <div>
                        <input
                            className='input-el'
                            type='text'
                            name='nickname'
                            value={userInfo.nickname || ''}
                            onChange={onChangeValue}
                            required
                        ></input>
                        <div className='input-notice'>최소 3자 최대 15자 이내로 입력해주세요.</div>
                    </div>
                </div>
                <div className='input-box'>
                    <div className='input-label'>이메일</div>
                    <div className='auth-box'>
                        <div className='auth-input'>
                            <input
                                className='input-el'
                                type='text'
                                name='email'
                                value={userInfo.email || ''}
                                onChange={onChangeValue}
                                required
                            ></input>
                            <div className='input-notice'>이메일이 도착하지 않는다면 재요청해주세요.</div>
                        </div>
                        <button type='button' onClick={onActionGetEmailAuthNumber} disabled={!isEmailAddressChanged}>인증</button>
                    </div>
                    <div className='auth-box'>
                        <div className="auth-input">
                            <input
                                className='input-el'
                                type='number'
                                name='emailAuthNumber'
                                value={userAuthInfo?.emailAuthNumber || ''}
                                onChange={onChangeAuthValue}
                                placeholder='인증번호'
                                disabled={!isEmailAuthNumberRequest}
                            ></input>
                        </div>
                        <button type='button' onClick={onActionVerifyEmailAuthNumber} disabled={!isEmailAuthNumberRequest}>확인</button>
                    </div>
                </div>
                <div className='input-box'>
                    <div className='input-label'>전화번호</div>
                    <div className='auth-box'>
                        <div className='auth-input'>
                            <input
                                className='input-el'
                                type='number'
                                name='phoneNumber'
                                value={userInfo.phoneNumber || ''}
                                onChange={onChangeValue}
                                required
                            ></input>
                            <div className='input-notice'>숫자만 입력해주세요.</div>
                        </div>
                        <button type='button' onClick={onActionGetPhoneAuthNumber} disabled={!isPhoneNumberChanged}>인증</button>
                    </div>
                    <div className='auth-box'>
                        <div className='auth-input'>
                            <input
                                className='input-el'
                                type='number'
                                name='phoneAuthNumber'
                                value={userAuthInfo?.phoneAuthNumber || ''}
                                onChange={onChangeAuthValue}
                                placeholder='인증번호'
                                disabled={!isPhoneAuthNumberRequest}
                            ></input>
                        </div>
                        <button type='button' onClick={onActionVerifyPhoneAuthNumber} disabled={!isPhoneAuthNumberRequest}>확인</button>
                    </div>
                </div>
            </div>
        </FormFieldWrapper>
    );
}

function ButtonFieldView({ isChanged }) {
    return (
        <ButtonFieldWrapper>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button
                    type='submit'
                    className='submit-button-el'
                    disabled={!isChanged}
                >기본 정보 저장</button>
            </div>
        </ButtonFieldWrapper>
    );
}

// TODO : 이메일 인증 및 전화번호 인증 구현해야됨.
const BasicInformationComponent = (props) => {
    const [userInfo, dispatchUserInfo] = useReducer(userInfoReducer, initialUserInfo);
    const [isChanged, setIsChanged] = useState(false);
    const [userAuthInfo, dispatchUserAuthInfo] = useReducer(userAuthInfoReducer, initialUserAuthInfo);
    const [isPhoneNumberChanged, setIsPhoneNumberChanged] = useState(false);
    const [isPhoneAuthNumberRequest, setIsPhoneAuthNumberRequest] = useState(false);
    const [isEmailAddressChanged, setIsEmailAddressChanged] = useState(false);
    const [isEmailAuthNumberRequest, setIsEmailAuthNumberRequest] = useState(false);

    useEffect(() => {
        if (!props.userInfo) {
            return null;
        }

        dispatchUserInfo({
            type: 'SET_DATA',
            payload: props.userInfo
        })
    }, [props.userInfo]);

    useEffect(() => {
        if(!props.verifiedPhoneNumber) {
            return null;
        }

        dispatchUserAuthInfo({
            type: 'CHANGE_DATA',
            payload: {
                name: 'verifiedPhoneNumber',
                value: props.verifiedPhoneNumber
            }
        });

        setIsPhoneNumberChanged(false);
        setIsPhoneAuthNumberRequest(false);
    }, [props.verifiedPhoneNumber]);

    useEffect(() => {
        if(!props.verifiedEmail) {
            return null;
        }

        dispatchUserAuthInfo({
            type: 'CHANGE_DATA',
            payload: {
                name: 'verifiedEmail',
                value: props.verifiedEmail
            }
        });

        setIsEmailAddressChanged(false);
        setIsEmailAuthNumberRequest(false);
    }, [props.verifiedEmail]);

    useEffect(() => {
        if (!props.userInfo || !userInfo) {
            setIsChanged(false);
            return;
        }

        if (props.userInfo.phoneNumber !== userInfo.phoneNumber) {
            setIsPhoneNumberChanged(true);
            setIsPhoneAuthNumberRequest(false);
        }
        
        if (userAuthInfo && (userAuthInfo.verifiedPhoneNumber !== userInfo.phoneNumber)) {
            // 인증 내역 제거
            dispatchUserAuthInfo({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'verifiedPhoneNumber',
                    value: ''
                }
            });
            dispatchUserAuthInfo({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'phoneAuthNumber',
                    value: ''
                }
            })
        }

        if (props.userInfo.email !== userInfo.email) {
            setIsEmailAddressChanged(true);
            setIsEmailAuthNumberRequest(false);
        }

        if (userAuthInfo && (userAuthInfo.verifiedEmail !== userInfo.email)) {
            // 인증 내역 제거
            dispatchUserAuthInfo({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'verifiedEmail',
                    value: ''
                }
            });
            dispatchUserAuthInfo({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'emailAuthNumber',
                    value: ''
                }
            })
        }

        if (JSON.stringify(props.userInfo) != JSON.stringify(userInfo)) {
            setIsChanged(true);
            return;
        }

        setIsChanged(false);
        setIsPhoneNumberChanged(false);
        setIsPhoneAuthNumberRequest(false);
        setIsEmailAddressChanged(false);
        setIsEmailAuthNumberRequest(false);
    }, [props.userInfo, userInfo])

    const __userInfo = {
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchUserInfo({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                if (__userInfo.verify.form()) {
                    dispatchUserAuthInfo({
                        type: 'CLEAR'
                    });
                    props.onSubmitUpdateUserInfo(userInfo);
                }
            }
        },
        verify: {
            form: () => {
                if (!checkNicknameForm(userInfo.nickname)) {
                    alert('닉네임은 최소 3자 최대 15자 이내로 입력해 주세요.');
                    return false;
                }

                if (userInfo.name && !checkNameForm(userInfo.name)) {
                    alert('이름을 확인해 주세요.');
                    return false;
                }

                if (userInfo.email && !checkEmailFormat(userInfo.email)) {
                    alert('이메일 형식을 확인해 주세요.');
                    return false;
                }

                if (userInfo.phoneNumber && !checkPhoneNumberFormat(userInfo.phoneNumber)) {
                    alert('전화번호 형식을 확인해 주세요.');
                    return false;
                }

                if(isPhoneNumberChanged) {
                    if(!userAuthInfo || !userAuthInfo.verifiedPhoneNumber) {
                        alert('변경된 전화번호에 대한 인증이 완료되지 않았습니다.');
                        return false;
                    }
                }

                if(isEmailAddressChanged) {
                    if(!userAuthInfo || !userAuthInfo.verifiedEmail) {
                        alert('변경된 이메일에 대한 인증이 완료되지 않았습니다.');
                        return false;
                    }
                }

                return true;
            }
        },
        req: {
            phoneAuthNumber: () => {
                if(!checkPhoneNumberFormat(userInfo.phoneNumber)) {
                    alert('전화번호 형식을 확인해 주세요.');
                    return;
                }
                props.onActionGetPhoneAuthNumber(userInfo.phoneNumber);
                setIsPhoneAuthNumberRequest(true);
            },
            emailAuthNumber: () => {
                if(!checkEmailFormat(userInfo.email)) {
                    alert('이메일 형식을 확인해 주세요.');
                    return;
                }
                props.onActionGetEmailAuthNumber(userInfo.email);
                setIsEmailAuthNumberRequest(true);
            }
        }
    }

    const __userAuthInfo = {
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchUserAuthInfo({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            }
        },
        req: {
            verifyPhoneAuthNumber: () => {
                if(!userAuthInfo?.phoneAuthNumber) {
                    alert('인증번호를 입력해주세요.');
                    return;
                }
                props.onActionVerifyPhoneAuthNumber(userInfo.phoneNumber, userAuthInfo.phoneAuthNumber);
                dispatchUserAuthInfo({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'phoneAuthNumber',
                        value: ''
                    }
                });
            },
            verifyEmailAuthNumber: () => {
                if(!userAuthInfo?.emailAuthNumber) {
                    alert('인증번호를 입력해주세요.');
                    return;
                }
                props.onActionVerifyEmailAuthNumber(userInfo.email, userAuthInfo.emailAuthNumber);
                dispatchUserAuthInfo({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'emailAuthNumber',
                        value: ''
                    }
                });
            }
        }
    }

    return (
        <>
            {userInfo &&
                <Container>
                    <TitleFieldView />
                    <form onSubmit={__userInfo.submit.confirm}>
                        <FormFieldView
                            userInfo={userInfo}
                            userAuthInfo={userAuthInfo}
                            isPhoneNumberChanged={isPhoneNumberChanged}
                            isPhoneAuthNumberRequest={isPhoneAuthNumberRequest}
                            isEmailAddressChanged={isEmailAddressChanged}
                            isEmailAuthNumberRequest={isEmailAuthNumberRequest}

                            onChangeValue={__userInfo.change.valueOfName}
                            onChangeAuthValue={__userAuthInfo.change.valueOfName}
                            onActionGetPhoneAuthNumber={__userInfo.req.phoneAuthNumber}
                            onActionVerifyPhoneAuthNumber={__userAuthInfo.req.verifyPhoneAuthNumber}
                            onActionGetEmailAuthNumber={__userInfo.req.emailAuthNumber}
                            onActionVerifyEmailAuthNumber={__userAuthInfo.req.verifyEmailAuthNumber}
                        />
                        <ButtonFieldView
                            isChanged={isChanged}
                        />
                    </form>
                </Container>
            }
        </>
    );
}
export default BasicInformationComponent;

const initialUserInfo = null;
const initialUserAuthInfo = null;

const userInfoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialUserInfo;
        default: return initialUserInfo;
    }
}

const userAuthInfoReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialUserAuthInfo;
        default: return initialUserAuthInfo;
    }
}