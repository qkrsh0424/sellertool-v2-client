import Link from "next/link";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import CustomImage from "../../modules/image/CustomImage";
import useLoginFormHook from "../hooks/useLoginFormHook";
import { Container, FormGroup, InputBox, LogoBox, Wrapper } from "./FormField.styled";
import { useState } from "react";

export default function FormFieldComponent({
    onSubmitLogin
}) {
    const {
        loginForm,
        onChangeValueOfName
    } = useLoginFormHook();

    const [isCapsLock, setIsCapsLock] = useState(false);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        onSubmitLogin({ loginForm: loginForm });
    }

    function checkCapsLock(event) {
        if (event.getModifierState("CapsLock")) {
            setIsCapsLock(true);
        } else {
            setIsCapsLock(false);
        }
    }

    return (
        <>
            <Container>
                <LogoBox>
                    <Link href='/' passHref>
                        <a>
                            <CustomImage src='/images/logo/logo1.png' priority={true} loading='eager' />
                        </a>
                    </Link>
                </LogoBox>
                <Wrapper>
                    <div
                        style={{
                            marginTop: '40px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: '18px',
                        }}
                    >
                        로그인
                    </div>
                    <FormGroup onSubmit={handleSubmitLogin}>
                        <InputBox>
                            <input
                                type='text'
                                className={`input-item`}
                                name='username'
                                value={loginForm.username || ''}
                                onChange={(e) => onChangeValueOfName(e)}
                                placeholder={'아이디'}
                                required
                            ></input>
                        </InputBox>
                        <InputBox
                            style={{
                                marginTop: 20
                            }}
                        >
                            <input
                                type='password'
                                className={`input-item`}
                                name='password'
                                value={loginForm.password || ''}
                                onChange={(e) => onChangeValueOfName(e)}
                                placeholder={'패스워드'}
                                required
                                onKeyUp={(e) => checkCapsLock(e)}
                            ></input>
                        </InputBox>
                        {isCapsLock && <div style={{ fontSize: '12px', color: 'var(--defaultRedColor)', marginTop: '5px' }}>CapsLock 키가 활성화 되어있습니다.</div>}
                        <div
                            className='find-link-group'
                        >
                            <Link
                                href={'/find/username'}
                                passHref
                            >
                                <span className='username'>
                                    아이디
                                </span>
                            </Link>
                            <Link
                                href={'/find/password'}
                                passHref
                            >
                                <span className='password'>
                                    비밀번호 찾기
                                </span>
                            </Link>
                        </div>
                        <SingleBlockButton
                            type='submit'
                            className='submit-button'
                        >
                            로그인
                        </SingleBlockButton>
                    </FormGroup>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '13px',
                            color: '#808080',
                            marginTop: '40px',
                            marginBottom: '80px'
                        }}
                    >
                        회원이 아니신가요? <Link href='/signup' passHref><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>회원가입</span></Link>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}