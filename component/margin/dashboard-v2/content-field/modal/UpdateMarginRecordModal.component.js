import Image from "next/image";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container } from "../styles/UpdateMarginRecordModal.styled";

export default function UpdateMarginRecordModalComponent({
    marginRecordForm,
    onClose,
    onConfirm,
    onChangeValueOfName
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const __handle = {
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                onConfirm();
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
                                src='http://localhost:3000/images/icon/close_default_959eae.svg'
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
                        저장된 데이터를 <span style={{ color: 'var(--mainColor)' }}>수정</span>해 보세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                type='text'
                                className='input-item'
                                placeholder="상품명"
                                name='name'
                                value={marginRecordForm.name || ''}
                                onChange={(e) => onChangeValueOfName(e)}
                                style={{
                                    flex: 1
                                }}
                                disabled={disabledBtn}
                                required
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
                            확인
                        </SingleBlockButton>
                    </div>
                </form>
            </Container>
        </>
    );
}