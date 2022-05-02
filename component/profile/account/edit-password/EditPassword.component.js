import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { checkPassword, comparePassword } from '../../../../utils/regexUtils';

const Container = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;

    .title{
        font-size: 18px;
        font-weight: 500;
    }

    .input-box{
        margin-bottom: 25px;
        width: 430px;

        @media screen and (max-width: 576px){
            width: 100%;
        }
    }

    .input-label{
        margin-bottom: 10px;
        font-size: 14px;
    }

    .input-notice{
        color: #707070;
        font-size: 12px;
        margin-top: 3px;
    }

    .input-el{
        padding: 10px 5px;
        width: 100%;
        border: 1px solid #e0e0e0;
        box-sizing: border-box;

        &:focus{
            outline: none;
            background: #2C73D20D;
        }
    }

    .submit-button-el{
        font-size: 18px;
        padding: 0;
        margin: 0;
        width: 250px;
        height: 50px;
        background:#2C73D2;
        color:white;
        border: none;

        cursor: pointer;

        &:disabled{
            cursor: not-allowed;
            background: #e0e0e0;
        }

        @media screen and (max-width: 576px){
            width: 90%;
        }
    }

    .input-el-box {
        width: 75%;
    }
`;

const EditPasswordComponent = (props) => {
    const [password, dispatchPassword] = useReducer(passwordReducer, initialPassword);
    const [disabledBtn, setDisabledBtn] = useState(true);

    useEffect(() => {
        dispatchPassword({
            type: 'CLEAR'
        })
    }, [props.userInfo]);

    useEffect(() => {
        if (password.currentPassword && password.newPassword && password.checkPassword) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }

    }, [password])
    const __password = {
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchPassword({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                });
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                if (__password.verify.form()) {
                    props.onSubmitChangePassword(password);
                }
            }
        },
        verify: {
            form: () => {
                if (!comparePassword(password.newPassword, password.checkPassword)) {
                    alert('새 비밀번호를 확인해 주세요.');
                    return false;
                }

                if (!checkPassword(password.newPassword)) {
                    alert('새 비밀번호 형식을 확인해 주세요.');
                    return false;
                }

                return true;
            }
        }
    }
    return (
        <>
            <Container>
                <div className='title'>비밀번호 변경</div>
                <form onSubmit={__password.submit.confirm}>
                    <div style={{ marginTop: '10px' }}>
                        <div className='input-box'>
                            <div className='input-label'>현재 비밀번호</div>
                            <div className='input-el-box'>
                                <input
                                    className='input-el'
                                    type='password'
                                    name='currentPassword'
                                    value={password.currentPassword || ''}
                                    onChange={__password.change.valueOfName}
                                    required
                                ></input>
                                <div className='input-notice'>현재 비밀번호를 입력해 주세요.</div>
                            </div>
                        </div>
                        <div className='input-box'>
                            <div className='input-label'>새 비밀번호</div>
                            <div className='input-el-box'>
                                <input
                                    className='input-el'
                                    type='password'
                                    name='newPassword'
                                    value={password.newPassword || ''}
                                    onChange={__password.change.valueOfName}
                                    required
                                ></input>
                                <div className='input-notice'>영문, 숫자, 특수문자를 혼합하여 입력해주세요.</div>
                                <div className='input-notice'>공백없이 8자리 ~ 20자리 이내로 입력해주세요.</div>
                            </div>
                        </div>
                        <div className='input-box'>
                            <div className='input-label'>새 비밀번호 확인</div>
                            <div className='input-el-box'>
                                <input
                                    className='input-el'
                                    type='password'
                                    name='checkPassword'
                                    value={password.checkPassword || ''}
                                    onChange={__password.change.valueOfName}
                                    required
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <button
                            type='submit'
                            className='submit-button-el'
                            disabled={disabledBtn}
                        >비밀번호 변경</button>
                    </div>
                </form>
            </Container>
        </>
    );
}
export default EditPasswordComponent;

const initialPassword = {
    currentPassword: '',
    newPassword: '',
    checkPassword: ''
};

const passwordReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialPassword;
        default: return initialPassword;
    }
}