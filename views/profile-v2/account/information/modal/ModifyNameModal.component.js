import Image from "next/image";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import useModifyNameHook from "../../hooks/useModifyNameHook";
import { Container } from "../styles/ModifyNameModal.styled";
import { customBackdropController } from "../../../../../components/backdrop/default/v1";

export default function ModifyNameModalComponent({
    onClose,
    onConfirm
}) {
    const {
        modifyName,
        onChangeModifyName,
        checkNameFormatValid
    } = useModifyNameHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const customBackdrop = customBackdropController();

    const __handle = {
        submit: {
            confirm: async (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                customBackdrop.showBackdrop();
                try {
                    checkNameFormatValid(modifyName);
                    await onConfirm({ name: modifyName });
                } catch (err) {
                    alert(err.message);
                    return;
                }
                customBackdrop.hideBackdrop();
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
                        수정하실 회원님의 <span className='accent-text'>이름</span>을 지정해 주세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                type='text'
                                className='input-item'
                                placeholder="이름"
                                value={modifyName || ''}
                                onChange={(e) => onChangeModifyName(e)}
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