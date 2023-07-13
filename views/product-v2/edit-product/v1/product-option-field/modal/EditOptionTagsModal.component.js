import Image from "next/image";
import { useRef } from "react";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import { Container } from "../styles/EditOptionTagsModal.styled";

export default function EditOptionTagsModalComponent({
    onClose,
    onSetOptionTagsWitchOptionNames,
    onSetOptionTagsWithInput
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const inputValueRef = useRef();

    const __handle = {
        submit: {
            coverWithOptionName: () => {
                setDisabledBtn(true);
                onSetOptionTagsWitchOptionNames();
                onClose();
            },
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                let value = inputValueRef.current.value;
                if (value.length > 50) {
                    alert('옵션 태그를 50자 이내로 입력해 주세요.');
                    return;
                }

                value = value.trim();
                onSetOptionTagsWithInput(value);
                onClose();
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
                        옵션 태그를 일괄 변경합니다.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <SingleBlockButton
                                type='button'
                                className='event-button-item'
                                onClick={() => __handle.submit.coverWithOptionName()}
                            >
                                옵션명으로 덮어쓰기
                            </SingleBlockButton>
                        </div>
                    </div>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                ref={inputValueRef}
                                type='text'
                                className='input-item'
                                placeholder="옵션 태그"
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