import Image from "next/image";
import { useRef, useState } from "react";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import { getRemovedPrefixZero, numberFormatUtils } from "../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container } from "../styles/EditTotalPurchasePricesModal.styled";

export default function EditTotalPurchasePricesModalComponent({
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [inputValue, setInputValue] = useState('');

    const __handle = {
        change: {
            inputValue: (e) => {
                let value = e.target.value;

                if (!value) {
                    setInputValue('');
                    return;
                }

                value = value.replaceAll(',', '');
                value = getRemovedPrefixZero(value);

                if (value.match(/^[0-9]{0,9}$/)) {
                    setInputValue(value);
                }
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                if (!inputValue || inputValue < 0 || inputValue > 999999999) {
                    alert('총 구매가격은 0-999999999 이내의 숫자만 입력가능 합니다.');
                    return;
                }

                onConfirm(inputValue);
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
                        총 구매가격을 일괄 변경합니다.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                type='text'
                                className='input-item'
                                placeholder="총 구매가격"
                                value={numberFormatUtils.numberWithCommas(inputValue) || ''}
                                onChange={(e) => __handle.change.inputValue(e)}
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