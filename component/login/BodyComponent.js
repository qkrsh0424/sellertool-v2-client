import { useReducer, useRef } from 'react';
import styled from 'styled-components';

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

const SubmitButtonBox = styled.div`
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

const initialInputValueState = {
    username: '',
    password: ''
}

const inputValueStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        default: return { ...state };
    }
}

const BodyComponent = (props) => {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const [inputValueState, dispatchInputValueState] = useReducer(inputValueStateReducer, initialInputValueState);

    const _onChangeInputValueState = (e) => {
        dispatchInputValueState({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const _onClickSubmitBtn = () =>{
        props.onSubmitLogin(inputValueState);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeaderBox>
                        <div className='title'>
                            셀러툴 로그인
                        </div>
                    </HeaderBox>
                    <InputBox>
                        <div
                            className={`input-label`}
                        >아이디</div>
                        <input
                            type='text'
                            ref={usernameRef}
                            className={`input-item`}
                            name='username'
                            value={inputValueState.username || ''}
                            onChange={(e) => _onChangeInputValueState(e)}
                        ></input>
                    </InputBox>
                    <InputBox>
                        <div
                            className={`input-label`}
                        >패스워드</div>
                        <input
                            type='password'
                            ref={passwordRef}
                            className={`input-item`}
                            name='password'
                            value={inputValueState.password || ''}
                            onChange={(e) => _onChangeInputValueState(e)}
                        ></input>
                    </InputBox>
                    <SubmitButtonBox>
                        <button type='button' className='submit-button' onClick={() => _onClickSubmitBtn()}>로그인</button>
                    </SubmitButtonBox>
                </Wrapper>
            </Container>
        </>
    );
}
export default BodyComponent;