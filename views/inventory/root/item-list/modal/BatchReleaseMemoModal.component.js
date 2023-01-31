import Image from "next/image";
import { useState } from "react";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import { getRemovedPrefixZero, numberFormatUtils } from "../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomInput from "../../../../modules/input/CustomInput";
import { Container, ContentContainer, SubmitButtonContainer } from "../styles/BatchReleaseMemoModal.styled";

export default function BatchReleaseMemoModalComponent({
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [inputValue, setInputValue] = useState('');

    const handleChangeInputValue = (e) => {
        let value = e.target.value;

        setInputValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        if (!inputValue || inputValue.length < 1 || inputValue.length > 50) {
            alert('메모는 1-50자 이내로 입력 가능합니다.');
            return;
        }

        onConfirm(inputValue);
        onClose();
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
                        메모 일괄 등록
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <CustomInput
                            type='text'
                            className='input-item'
                            placeholder={'메모'}
                            value={inputValue || ''}
                            onChange={(e) => handleChangeInputValue(e)}
                            minLength={1}
                            maxLength={50}
                            required
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