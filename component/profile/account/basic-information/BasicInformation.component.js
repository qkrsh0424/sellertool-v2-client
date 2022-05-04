import { identity } from 'lodash';
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

function FormFieldView({ userInfo, isEmailAddressChanged, isEmailAuthNumberRequest, onChangeIsEmailAddressValue, onActionResetEmailAuth,
     isPhoneAuthNumberRequest, isPhoneNumberChanged, onChangeIsPhoneNumberValue, onActionResetPhoneNumberAuth,
    onChangeValue, onActionGetPhoneAuthNumber, onActionVerifyPhoneAuthNumber, onActionGetEmailAuthNumber, onActionVerifyEmailAuthNumber }) {
    return (
        <FormFieldWrapper>
            <div style={{ marginTop: '10px' }}>
                <div className='input-box'>
                    <div className='input-label'>이름<span>(선택)</span></div>
                    <div className='input-el-box'>
                        <input
                            className='input-el'
                            type='text'
                            name='name'
                            value={userInfo.name || ''}
                            onChange={onChangeValue}
                        ></input>
                    </div>
                </div>
                <div className='input-box'>
                    <div className='input-label'>닉네임</div>
                    <div className='input-el-box'>
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
                        <div className='input-el-box'>
                            <input
                                className='input-el'
                                type='text'
                                name='email'
                                value={userInfo.email || ''}
                                onChange={onChangeValue}
                                required
                                disabled={!isEmailAddressChanged}
                            ></input>
                            <div className='input-notice'>회원 수정을 완료해야 변경된 정보가 저장됩니다.</div>
                        </div>
                        {!isEmailAuthNumberRequest && 
                            !isEmailAddressChanged &&
                                <button type='button' className='input-side-btn' onClick={() => onChangeIsEmailAddressValue()}>이메일 변경</button>
                            }
                            {isEmailAddressChanged &&
                                <button type='button' className='input-side-btn' onClick={() => onActionGetEmailAuthNumber()}>인증번호 받기</button>
                            
                        }
                    </div>
                    {isEmailAuthNumberRequest &&
                        <div className='auth-box'>
                            <div className='input-el-box'>
                                <input
                                    className='input-el'
                                    type='number'
                                    name='emailAuthNumber'
                                    value={userInfo.emailAuthNumber || ''}
                                    placeholder='인증번호'
                                    onChange={onChangeValue}
                                ></input>
                                <div className='input-notice'>이메일이 도착하지 않는다면 재요청해주세요.</div>
                                <div className='input-notice re-request' onClick={() => onActionResetEmailAuth()}>이메일 변경 및 재요청</div>
                            </div>
                            <button type='button' className='input-side-btn' onClick={onActionVerifyEmailAuthNumber}>인증</button>
                        </div>
                    }
                </div>
                <div className='input-box'>
                    <div className='input-label'>전화번호<span>(선택)</span></div>
                    <div className='auth-box'>
                        <div className='input-el-box'>
                            <input
                                className='input-el'
                                type='number'
                                name='phoneNumber'
                                value={userInfo.phoneNumber || ''}
                                onChange={onChangeValue}
                                disabled={!isPhoneNumberChanged}
                            ></input>
                            <div className='input-notice'>숫자만 입력해주세요.</div>
                            <div className='input-notice'>회원 수정을 완료해야 변경된 정보가 저장됩니다.</div>
                        </div>
                        {!isPhoneAuthNumberRequest &&
                            !isPhoneNumberChanged &&
                                <button type='button' className='input-side-btn' onClick={() => onChangeIsPhoneNumberValue()}>전화번호 변경</button>
                            }
                            {isPhoneNumberChanged &&
                                <button type='button' className='input-side-btn' onClick={() => onActionGetPhoneAuthNumber()}>인증번호 받기</button>
                        }
                    </div>
                    {isPhoneAuthNumberRequest &&
                        <div className='auth-box'>
                            <div className='input-el-box'>
                                <input
                                    className='input-el'
                                    type='number'
                                    name='phoneAuthNumber'
                                    value={userInfo.phoneAuthNumber || ''}
                                    placeholder='인증번호'
                                    onChange={onChangeValue}
                                ></input>
                                <div className='input-notice'>메세지가 도착하지 않는다면 재요청해주세요.</div>
                                <div className='input-notice re-request' onClick={() => onActionResetPhoneNumberAuth()}>전화번호 변경 및 재요청</div>
                            </div>
                            <button type='button' className='input-side-btn' onClick={onActionVerifyPhoneAuthNumber}>인증</button>
                        </div>
                    }
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

    const [isEmailAddressChanged, setIsEmailAddressChanged] = useState(false);
    const [isEmailAuthNumberRequest, setIsEmailAuthNumberRequest] = useState(false);

    const [isPhoneNumberChanged, setIsPhoneNumberChanged] = useState(false);
    const [isPhoneAuthNumberRequest, setIsPhoneAuthNumberRequest] = useState(false);

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
        if (!props.userInfo || !userInfo) {
            setIsChanged(false);
            return;
        }

        if (JSON.stringify(props.userInfo) != JSON.stringify(userInfo)) {
            setIsChanged(true);
            return;
        }

        setIsChanged(false);
    }, [props.userInfo, userInfo])

    useEffect(() => {
        // 이메일 인증 성공 시
        if(props.isVerifiedEmail) {
            setIsEmailAddressChanged(false);
            setIsEmailAuthNumberRequest(false);
            dispatchUserInfo({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'emailAuthNumber',
                    value: ''
                }
            })
        }
    }, [props.isVerifiedEmail])

    useEffect(() => {
        // 전화번호 인증 성공 시
        if(props.isVerifiedPhoneNumber) {
            setIsPhoneNumberChanged(false);
            setIsPhoneAuthNumberRequest(false);
            dispatchUserInfo({
                type: 'CHANGE_DATA',
                payload: {
                    name: 'phoneAuthNumber',
                    value: ''
                }
            })
        }
    }, [props.isVerifiedPhoneNumber])

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
                    props.onSubmitUpdateUserInfo(userInfo);
                    __userInfo.action.onActionResetEmailAuth();
                    __userInfo.action.onActionResetPhoneNumberAuth();
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

                return true;
            }
        },
        action: {
            onChangeIsEmailAddressValue: () => {
                props.onActionResetVerifiedEmail();
                setIsEmailAddressChanged(!isEmailAddressChanged);
            },
            onActionResetEmailAuth: () => {
                setIsEmailAddressChanged(false);
                setIsEmailAuthNumberRequest(false);

                dispatchUserInfo({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'emailAuthNumber',
                        value: ''
                    }
                })
                props.onActionResetVerifiedEmail();
            },
            onChangeIsPhoneNumberValue: () => {
                props.onActionResetVerifiedPhoneNumber();
                setIsPhoneNumberChanged(!isPhoneNumberChanged);
            },
            onActionResetPhoneNumberAuth: () => {
                setIsPhoneNumberChanged(false);
                setIsPhoneAuthNumberRequest(false);

                dispatchUserInfo({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'phoneAuthNumber',
                        value: ''
                    }
                })
                props.onActionResetVerifiedPhoneNumber();
            },
            getEmailAuthNumber: () => {
                if(!checkEmailFormat(userInfo.email)) {
                    alert('이메일 형식을 확인해 주세요.');
                    return;
                }
                props.onActionGetEmailAuthNumber(userInfo.email);
                setIsEmailAddressChanged(false);
                setIsEmailAuthNumberRequest(true);
            },
            verifyEmailAuthNumber: () => {
                if(!userInfo.emailAuthNumber) {
                    alert('인증번호를 입력해 주세요.');
                    return;
                }
                props.onActionVerifyEmailAuthNumber(userInfo.email, userInfo.emailAuthNumber);
            },
            getPhoneAuthNumber: () => {
                if(!checkPhoneNumberFormat(userInfo.phoneNumber)) {
                    alert('전화번호 형식을 확인해 주세요.');
                    return;
                }
                props.onActionGetPhoneAuthNumber(userInfo.phoneNumber);
                setIsPhoneNumberChanged(false);
                setIsPhoneAuthNumberRequest(true);
            },
            verifyPhoneAuthNumber: () => {
                if(!userInfo.phoneAuthNumber) {
                    alert('인증번호를 입력해 주세요.');
                    return;
                }
                props.onActionVerifyPhoneAuthNumber(userInfo.phoneNumber, userInfo.phoneAuthNumber);
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
                            isEmailAddressChanged={isEmailAddressChanged}
                            isEmailAuthNumberRequest={isEmailAuthNumberRequest}
                            isPhoneNumberChanged={isPhoneNumberChanged}
                            isPhoneAuthNumberRequest={isPhoneAuthNumberRequest}

                            onChangeValue={__userInfo.change.valueOfName}
                            onChangeIsEmailAddressValue={__userInfo.action.onChangeIsEmailAddressValue}
                            onChangeIsPhoneNumberValue={__userInfo.action.onChangeIsPhoneNumberValue}
                            onActionResetEmailAuth={__userInfo.action.onActionResetEmailAuth}
                            onActionResetPhoneNumberAuth={__userInfo.action.onActionResetPhoneNumberAuth}
                            onActionGetPhoneAuthNumber={__userInfo.action.getPhoneAuthNumber}
                            onActionVerifyPhoneAuthNumber={__userInfo.action.verifyPhoneAuthNumber}
                            onActionGetEmailAuthNumber={__userInfo.action.getEmailAuthNumber}
                            onActionVerifyEmailAuthNumber={__userInfo.action.verifyEmailAuthNumber}
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
