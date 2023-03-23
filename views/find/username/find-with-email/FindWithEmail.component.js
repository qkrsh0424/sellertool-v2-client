import Link from "next/link";
import { useState } from "react";
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomInput from "../../../../components/input/default/v1/CustomInput";
import { validationDataConnect } from "../../../../data_connect/validationDataConnect";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import formatValidUtils from "../../../../utils/formatValidUtils";
import CustomImage from "../../../modules/image/CustomImage";
import { Container, InputBox, LogoBox, NextButton, OtherModeButton, Others, Wrapper } from "./styles/FindWithEmail.styled";

export default function FindWithEmailComponent({
    toggleModeType,
    onSubmitNext
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [validationForm, setValidationForm] = useState({
        email: '',
        emailValidationCode: ''
    });

    const [validationCodeInputOpen, setValidationCodeInputOpen] = useState(false);

    const handleChangeEmail = (e) => {
        let value = e.target.value;
        setValidationForm({
            ...validationForm,
            email: value
        })
    }

    const handleChangeValidationCode = (e) => {
        let value = e.target.value;

        let regex = /^[0-9]{0,6}$/
        if (regex.test(value)) {
            setValidationForm({
                ...validationForm,
                emailValidationCode: value
            })
        }
    }

    const handleSubmitSendValidationCode = (e) => {
        e.preventDefault();

        try {
            formatValidUtils.checkEmailFormatValid(validationForm?.email)
        } catch (err) {
            alert(err.message);
            return;
        }

        setDisabledBtn(true);
        let body = {
            email: validationForm?.email,
            validationType: 'forFindUsername'
        }
        validationDataConnect().sendEmailValidationCode(body)
            .then(res => {
                if (res.status === 200) {
                    setValidationCodeInputOpen(true);
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 환경이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            });
    }

    const handleSubmitNext = (e) => {
        e.preventDefault();
        try {
            formatValidUtils.checkEmailFormatValid(validationForm?.email);
            formatValidUtils.checkValidationCodeFormatValid(validationForm?.emailValidationCode);
        } catch (err) {
            alert(err.message);
            return;
        }

        setDisabledBtn(true);

        onSubmitNext(validationForm);
    }

    return (
        <Container>
            <LogoBox>
                <Link href='/' passHref>
                    <a>
                        <CustomImage src='/images/logo/logo1.png' priority={true} loading='eager' />
                    </a>
                </Link>
            </LogoBox>
            <Wrapper>
                <form onSubmit={(e) => handleSubmitNext(e)}>
                    <h2 className='title'>이메일로 아이디 찾기</h2>
                    <InputBox>
                        <div className='label'>이메일</div>
                        <div className='mgl-flex'>
                            <CustomInput
                                type='text'
                                className='input-item'
                                placeholder='ex) example@example.com'
                                value={validationForm?.email || ''}
                                onChange={(e) => handleChangeEmail(e)}
                            />
                            <CustomBlockButton
                                type='button'
                                className='send-button'
                                onClick={(e) => handleSubmitSendValidationCode(e)}
                                disabled={disabledBtn || !formatValidUtils.isEmailFormatValid(validationForm?.email)}
                            >
                                인증번호 발송
                            </CustomBlockButton>
                        </div>
                    </InputBox>
                    {validationCodeInputOpen &&
                        <InputBox style={{ marginTop: '20px' }}>
                            <CustomInput
                                type='text'
                                className='input-item'
                                placeholder='인증번호를 입력하세요.'
                                onChange={(e) => handleChangeValidationCode(e)}
                                value={validationForm?.emailValidationCode || ''}
                            />
                            <div style={{ marginTop: '10px' }}>
                                <div className="input-notice">해당 번호로 인증번호를 발송했습니다.(유효시간 30분)</div>
                                <div className="input-notice">인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.</div>
                                <div className="input-notice" style={{ color: 'var(--defaultRedColor)' }}>가입되어 있지 않은 이메일은 인증번호를 받을 수 없습니다.</div>
                                <div className="input-notice" style={{ color: 'var(--defaultRedColor)' }}>인증번호를 여전히 받지 못한 경우 스팸 메일함을 확인하여 주세요.</div>
                            </div>
                        </InputBox>
                    }
                    <NextButton
                        type='submit'
                        disabled={disabledBtn || !formatValidUtils.isEmailFormatValid(validationForm?.email) || !formatValidUtils.isValidationCodeFormatValid(validationForm?.emailValidationCode)}
                    >
                        다음
                    </NextButton>
                </form>
            </Wrapper>
            <Wrapper style={{ marginTop: '40px' }}>
                <OtherModeButton
                    type='button'
                    onClick={() => toggleModeType('phone')}
                >
                    등록된 <span style={{ color: 'var(--mainColor)', fontWeight: '600' }}>휴대전화</span>로 찾기
                </OtherModeButton>
                <Others>
                    <Link
                        href='/login'
                    >
                        <a>
                            로그인
                        </a>
                    </Link>
                    <span> | </span>
                    <Link
                        href='/find/password'
                    >
                        <a>
                            비밀번호 찾기
                        </a>
                    </Link>
                </Others>
            </Wrapper>
        </Container>
    );
}