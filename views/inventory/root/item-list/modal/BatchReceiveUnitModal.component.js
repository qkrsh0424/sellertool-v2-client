import Image from "next/image";
import { useState } from "react";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import { getRemovedPrefixZero, numberFormatUtils } from "../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomInput from "../../../../modules/input/CustomInput";
import { Container, ContentContainer, SubmitButtonContainer } from "../styles/BatchReceiveUnitModal.styled";

export default function BatchReceiveUnitModalComponent({
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [inputValue, setInputValue] = useState('');

    const handleChangeInputValue = (e) => {
        let value = e.target.value;

        if (!value) {
            setInputValue('');
            return;
        }

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,5}$/)) {
            setInputValue(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        if (!inputValue || inputValue < 1 || inputValue > 99999) {
            alert('입고수량은 1-99999 이내의 숫자만 입력 가능합니다.');
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
                        입고수량 일괄 등록
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <CustomInput
                            type='text'
                            className='input-item'
                            placeholder={'입고수량'}
                            value={inputValue || ''}
                            onChange={(e) => handleChangeInputValue(e)}
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