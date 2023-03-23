import Link from "next/link";
import { useState } from "react";
import CustomInput from "../../../../../components/input/default/v1/CustomInput";
import formatValidUtils from "../../../../../utils/formatValidUtils";
import CustomImage from "../../../../modules/image/CustomImage";
import { Container, InputBox, LogoBox, SubmitButton, Wrapper } from "./styles/FormField.styled";

export default function FormFieldComponent({
    onSubmitResetPassword
}) {
    const [formValues, setFormValues] = useState({
        password: '',
        passwordChecker: ''
    })

    const handleChangeFormValuesOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitResetPassword(formValues);
    }

    const returnPasswordValid = (password) => {
        return formatValidUtils.isPasswordFormatValid(password);
    }

    const returnPasswordCheckerValid = (password, passwordChecker) => {
        if (!password || !passwordChecker) {
            return false;
        }

        if (password === passwordChecker) {
            return true;
        }

        return false;
    }

    let isPasswordFormatValid = returnPasswordValid(formValues?.password);
    let isPasswordCheckerFormatValid = returnPasswordCheckerValid(formValues?.password, formValues?.passwordChecker);

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
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <h2 className='title'>비밀번호 재설정</h2>
                        <InputBox>
                            <div className='label'>비밀번호</div>
                            <CustomInput
                                type='password'
                                className='input-item'
                                name='password'
                                placeholder={'영문, 숫자, 특수문자 혼합 8-50자'}
                                value={formValues?.password || ''}
                                onChange={(e) => handleChangeFormValuesOfName(e)}
                                minLength={8}
                                maxLength={50}
                                required
                            />
                        </InputBox>
                        <InputBox>
                            <div className='label'>비밀번호 확인</div>
                            <CustomInput
                                type='password'
                                className='input-item'
                                name='passwordChecker'
                                value={formValues?.passwordChecker || ''}
                                onChange={(e) => handleChangeFormValuesOfName(e)}
                                minLength={8}
                                maxLength={50}
                                required
                            />
                        </InputBox>
                        <SubmitButton
                            type='submit'
                            disabled={!isPasswordFormatValid || !isPasswordCheckerFormatValid}
                        >
                            확인
                        </SubmitButton>
                    </form>
                </Wrapper>
            </Container>
        </>
    );
}