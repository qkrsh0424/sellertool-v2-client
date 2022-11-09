import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import useModifyEmailHook from "../../hooks/useModifyEmailHook";
import { Container } from "../styles/ModifyEmailModal.styled";

export default function ModifyEmailModalComponent({
    onClose,
    onConfirm
}) {
    const userRedux = useSelector(state => state.userRedux);

    const {
        modifyEmailForm,
        onChangeModifyEmailFormOfName,
        reqSendEmailValidationCode,
        onClearEmailValidationCode,
        checkEmailFormatValid,
        checkValidationCodeFormatValid,
        returnEmailValid
    } = useModifyEmailHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [emailValidationCodeInputModeOpen, setEmailValidationCodeInputModeOpen] = useState(false);

    const __handle = {
        action: {
            openEmailValidationCodeInputMode: () => {
                setEmailValidationCodeInputModeOpen(true);
            },
            closeEmailValidationCodeInputMode: () => {
                onClearEmailValidationCode();
                setEmailValidationCodeInputModeOpen(false);
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                try {
                    checkEmailFormatValid(modifyEmailForm.email);
                    checkValidationCodeFormatValid(modifyEmailForm.emailValidationCode);

                    onConfirm({
                        email: modifyEmailForm.email,
                        emailValidationCode: modifyEmailForm.emailValidationCode
                    })
                } catch (err) {
                    alert(err.message);
                    return;
                }
            },
            sendEmailValidationCode: async () => {
                setDisabledBtn(true);

                try {
                    checkEmailFormatValid(modifyEmailForm.email);
                    await reqSendEmailValidationCode({
                        email: modifyEmailForm.email,
                        successCallback: () => __handle.action.openEmailValidationCodeInputMode()
                    })
                } catch (err) {
                    alert(err.message);
                    return;
                }
            },
        }
    }
    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div
                    className='title-box'
                >
                    <div className='title'>
                        회원정보 중 <span className='accent-text'>이메일</span>을 수정하기 위해 인증절차가 필요합니다.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box mgl-flex mgl-flex-alignItems-center'>
                            <div className='icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/mail_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                />
                            </div>
                            <div className='text-item'>
                                {userRedux?.userInfo?.email}
                            </div>
                        </div>
                    </div>
                    <div className='content-group'>
                        <div className='content-box mgl-flex'>
                            <input
                                type='email'
                                className='input-item'
                                placeholder="이메일 ex)example@sellertool.io"
                                name='email'
                                value={modifyEmailForm.email || ''}
                                onChange={(e) => onChangeModifyEmailFormOfName(e)}
                                style={{
                                    flex: 1
                                }}
                                disabled={emailValidationCodeInputModeOpen ? true : false}
                                required
                            ></input>
                            {emailValidationCodeInputModeOpen ?
                                <SingleBlockButton
                                    type='button'
                                    className='validation-button-el'
                                    onClick={__handle.action.closeEmailValidationCodeInputMode}
                                    disabled={disabledBtn}
                                >
                                    재시도
                                </SingleBlockButton>
                                :
                                <SingleBlockButton
                                    type='button'
                                    className='validation-button-el'
                                    onClick={() => __handle.submit.sendEmailValidationCode()}
                                    disabled={!returnEmailValid(modifyEmailForm.email) || disabledBtn}
                                >
                                    인증
                                </SingleBlockButton>
                            }
                        </div>
                        {emailValidationCodeInputModeOpen &&
                            (
                                <>
                                    <div className='content-box'>
                                        <input
                                            type='text'
                                            className='input-item'
                                            placeholder="인증번호"
                                            name='emailValidationCode'
                                            value={modifyEmailForm.emailValidationCode || ''}
                                            onChange={(e) => onChangeModifyEmailFormOfName(e)}
                                            maxLength={6}
                                            required
                                        ></input>
                                    </div>
                                    <div className='content-box'>
                                        <div className='input-notice'>해당 이메일로 인증번호를 발송했습니다.(유효시간 30분)</div>
                                        <div className='input-notice'>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.</div>
                                        <div className='input-notice' style={{ color: '#e56767' }}>이미 사용중인 이메일은 인증번호를 받을 수 없습니다.</div>
                                        <div className='input-notice' style={{ color: '#e56767' }}>인증번호를 여전히 받지 못한 경우 스팸 메세지함을 확인하여 주세요.</div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className='button-group'>
                        <SingleBlockButton
                            type='button'
                            className='button-el'
                            style={{
                                background: '#959eae',
                                flex: 1
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-el'
                            style={{
                                background: 'var(--mainColor)',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            변경
                        </SingleBlockButton>
                    </div>
                </form>
            </Container>
        </>
    );
}