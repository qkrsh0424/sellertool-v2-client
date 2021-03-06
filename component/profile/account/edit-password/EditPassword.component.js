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
                    alert('??? ??????????????? ????????? ?????????.');
                    return false;
                }

                if (!checkPassword(password.newPassword)) {
                    alert('??? ???????????? ????????? ????????? ?????????.');
                    return false;
                }

                return true;
            }
        }
    }
    return (
        <>
            <Container>
                <div className='title'>???????????? ??????</div>
                <form onSubmit={__password.submit.confirm}>
                    <div style={{ marginTop: '10px' }}>
                        <div className='input-box'>
                            <div className='input-label'>?????? ????????????</div>
                            <div className='input-el-box'>
                                <input
                                    className='input-el'
                                    type='password'
                                    name='currentPassword'
                                    value={password.currentPassword || ''}
                                    onChange={__password.change.valueOfName}
                                    required
                                ></input>
                                <div className='input-notice'>?????? ??????????????? ????????? ?????????.</div>
                            </div>
                        </div>
                        <div className='input-box'>
                            <div className='input-label'>??? ????????????</div>
                            <div className='input-el-box'>
                                <input
                                    className='input-el'
                                    type='password'
                                    name='newPassword'
                                    value={password.newPassword || ''}
                                    onChange={__password.change.valueOfName}
                                    required
                                ></input>
                                <div className='input-notice'>??????, ??????, ??????????????? ???????????? ??????????????????.</div>
                                <div className='input-notice'>???????????? 8?????? ~ 20?????? ????????? ??????????????????.</div>
                            </div>
                        </div>
                        <div className='input-box'>
                            <div className='input-label'>??? ???????????? ??????</div>
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
                        >???????????? ??????</button>
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