import Image from "next/image";
import { forwardRef } from "react";
import { useRef } from "react";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomInput from "../../../../modules/input/CustomInput";
import { Container, ContentContainer, SubmitButtonContainer } from "../styles/EditStockMemoModal.styled";

export default function EditStockMemoModalComponent({
    selectedItem,
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const inputValueRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        let value = inputValueRef.current.value;
        if (!value || value?.length < 1 || value?.length > 50) {
            alert('메모는 1-50 내외로 입력해 주세요.');
            return;
        }

        onConfirm(value);
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
                        메모 수정
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <CustomInput
                            ref={inputValueRef}
                            type='text'
                            className='input-item'
                            defaultValue={selectedItem?.memo}
                            placeholder={'메모'}
                        />
                    </ContentContainer>
                    <SubmitButtonContainer>
                        <SingleBlockButton
                            type='button'
                            className='button-item'
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
                            className='button-item'
                            style={{
                                background: 'var(--mainColor)',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </SingleBlockButton>
                    </SubmitButtonContainer>
                </form>
            </Container>
        </>
    );
}