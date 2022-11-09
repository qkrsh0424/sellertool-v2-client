import Link from "next/link";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import useLoginFormHook from "../hooks/useLoginFormHook";
import { Container, FormGroup, InputBox, Wrapper } from "./FormField.styled";

export default function FormFieldComponent(props) {
    const {
        loginForm,
        onChangeValueOfName
    } = useLoginFormHook();

    const __handle = {
        submit: {
            login: (e) => {
                e.preventDefault();
                props.onSubmitLogin({ loginForm: loginForm });
            }
        }
    }

    return (
        <>
            <Container>
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
                    <FormGroup onSubmit={__handle.submit.login}>
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
                            ></input>
                        </InputBox>
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