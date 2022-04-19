import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkEmailFormat, checkNameForm, checkNicknameForm, checkPhoneNumberFormat } from '../../../../utils/regexUtils';
import { ButtonFieldWrapper, Container, FormFieldWrapper, TitleFieldWrapper } from './BasicInformation.styled';

function TitleFieldView() {
    return (
        <TitleFieldWrapper>
            <div className='title'>기본 정보</div>
        </TitleFieldWrapper>
    );
}

function FormFieldView({ userInfo, onChangeValue }) {
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
                    <input
                        className='input-el'
                        type='text'
                        name='email'
                        value={userInfo.email || ''}
                        onChange={onChangeValue}
                    ></input>
                </div>
                <div className='input-box'>
                    <div className='input-label'>전화번호</div>
                    <input
                        className='input-el'
                        type='text'
                        name='phoneNumber'
                        value={userInfo.phoneNumber || ''}
                        onChange={onChangeValue}
                    ></input>
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

                return true;
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

                            onChangeValue={__userInfo.change.valueOfName}
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