import Image from "next/image";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import useModifyPasswordHook from "../../hooks/useModifyPasswordHook";
import { Container } from "../styles/ModifyPasswordModal.styled";
import { customBackdropController } from "../../../../../components/backdrop/default/v1";

export default function ModifyPasswordModalComponent({
    onClose,
    onConfirm
}) {
    const {
        modifyPasswordForm,
        onChangeModifyPasswordFormOfName,
        checkPasswordFormatValid,
        checkComparePasswordFormatValid
    } = useModifyPasswordHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const customBackdrop = customBackdropController();

    const __handle = {
        submit: {
            confirm: async (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                customBackdrop.showBackdrop()
                try {
                    checkPasswordFormatValid(modifyPasswordForm.newPassword);
                    checkComparePasswordFormatValid(modifyPasswordForm.newPassword, modifyPasswordForm.newPasswordChecker);

                    await onConfirm({
                        ...modifyPasswordForm
                    })
                } catch (err) {
                    alert(err.message);
                    return;
                }
                customBackdrop.hideBackdrop()
            }
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
                        안전한 <span className='accent-text'>비밀번호</span>를 지정하여 계정을 보호하세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                type='password'
                                className='input-item'
                                placeholder="현재 비밀번호"
                                name='currentPassword'
                                value={modifyPasswordForm.currentPassword || ''}
                                onChange={(e) => onChangeModifyPasswordFormOfName(e)}
                            ></input>
                        </div>
                        <div className='content-box'>
                            <input
                                type='password'
                                className='input-item'
                                placeholder="새 비밀번호"
                                name='newPassword'
                                value={modifyPasswordForm.newPassword || ''}
                                onChange={(e) => onChangeModifyPasswordFormOfName(e)}
                            ></input>
                        </div>
                        <div className='content-box'>
                            <input
                                type='password'
                                className='input-item'
                                placeholder="새 비밀번호 확인"
                                name='newPasswordChecker'
                                value={modifyPasswordForm.newPasswordChecker || ''}
                                onChange={(e) => onChangeModifyPasswordFormOfName(e)}
                            ></input>
                        </div>
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