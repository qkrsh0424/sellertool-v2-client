import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import useModifyPhoneNumberHook from "../../hooks/useModifyPhoneNumberHook";
import { Container } from "../styles/ModifyPhoneNumberModal.styled";
import { customBackdropController } from "../../../../../components/backdrop/default/v1";

export default function ModifyPhoneNumberModalComponent({
    onClose,
    onConfirm
}) {
    const userRedux = useSelector(state => state.userRedux);

    const {
        modifyPhoneNumberForm,
        onChangeModifyPhoneNumberFormOfName,
        reqSendPhoneNumberValidationCode,
        onClearPhoneNumberValidationCode,
        checkPhoneNumberFormatValid,
        checkValidationCodeFormatValid,
        returnPhoneNumberValid
    } = useModifyPhoneNumberHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [phoneNumberValidationCodeInputModeOpen, setPhoneNumberValidationCodeInputModeOpen] = useState(false);
    const customBackdrop = customBackdropController();

    const __handle = {
        action: {
            openPhoneNumberValidationCodeInputMode: () => {
                setPhoneNumberValidationCodeInputModeOpen(true);
            },
            closePhoneNumberValidationCodeInputMode: () => {
                onClearPhoneNumberValidationCode();
                setPhoneNumberValidationCodeInputModeOpen(false);
            }
        },
        submit: {
            confirm: async (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                customBackdrop.showBackdrop();
                try {
                    checkPhoneNumberFormatValid(modifyPhoneNumberForm.phoneNumber);
                    checkValidationCodeFormatValid(modifyPhoneNumberForm.phoneNumberValidationCode);
                    await onConfirm({
                        phoneNumber: modifyPhoneNumberForm.phoneNumber,
                        phoneNumberValidationCode: modifyPhoneNumberForm.phoneNumberValidationCode
                    });
                } catch (err) {
                    alert(err.message);
                    return;
                }
                customBackdrop.hideBackdrop();
            },
            sendPhoneNumberValidationCode: async () => {
                setDisabledBtn(true);
                customBackdrop.showBackdrop();
                try {
                    checkPhoneNumberFormatValid(modifyPhoneNumberForm.phoneNumber);
                    await reqSendPhoneNumberValidationCode({
                        phoneNumber: modifyPhoneNumberForm.phoneNumber,
                        successCallback: () => __handle.action.openPhoneNumberValidationCodeInputMode()
                    })
                } catch (err) {
                    alert(err.message);
                    return;
                }
                customBackdrop.hideBackdrop();
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
                        회원정보 중 <span className='accent-text'>전화번호</span>를 수정하기 위해 인증절차가 필요합니다.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box mgl-flex mgl-flex-alignItems-center'>
                            <div className='icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/phone_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                />
                            </div>
                            <div className='text-item'>
                                {userRedux?.userInfo?.phoneNumber}
                            </div>
                        </div>
                    </div>
                    <div className='content-group'>
                        <div className='content-box mgl-flex'>
                            <input
                                type='text'
                                className='input-item'
                                placeholder="휴대전화 ex)01012341234"
                                name='phoneNumber'
                                value={modifyPhoneNumberForm.phoneNumber || ''}
                                onChange={(e) => onChangeModifyPhoneNumberFormOfName(e)}
                                style={{
                                    flex: 1
                                }}
                                maxLength={11}
                                disabled={phoneNumberValidationCodeInputModeOpen ? true : false}
                                required
                            ></input>
                            {phoneNumberValidationCodeInputModeOpen ?
                                <SingleBlockButton
                                    type='button'
                                    className='validation-button-el'
                                    onClick={__handle.action.closePhoneNumberValidationCodeInputMode}
                                    disabled={disabledBtn}
                                >
                                    재시도
                                </SingleBlockButton>
                                :
                                <SingleBlockButton
                                    type='button'
                                    className='validation-button-el'
                                    onClick={() => __handle.submit.sendPhoneNumberValidationCode()}
                                    disabled={!returnPhoneNumberValid(modifyPhoneNumberForm.phoneNumber) || disabledBtn}
                                >
                                    인증
                                </SingleBlockButton>
                            }
                        </div>
                        {phoneNumberValidationCodeInputModeOpen &&
                            (
                                <>
                                    <div className='content-box'>
                                        <input
                                            type='text'
                                            className='input-item'
                                            placeholder="인증번호"
                                            name='phoneNumberValidationCode'
                                            value={modifyPhoneNumberForm.phoneNumberValidationCode || ''}
                                            onChange={(e) => onChangeModifyPhoneNumberFormOfName(e)}
                                            maxLength={6}
                                            required
                                        ></input>
                                    </div>
                                    <div className='content-box'>
                                        <div className='input-notice'>해당 휴대전화로 인증번호를 발송했습니다.(유효시간 30분)</div>
                                        <div className='input-notice'>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.</div>
                                        <div className='input-notice' style={{ color: '#e56767' }}>이미 사용중인 휴대전화는 인증번호를 받을 수 없습니다.</div>
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