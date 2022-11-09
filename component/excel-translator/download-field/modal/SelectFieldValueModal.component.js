import Image from "next/image";
import { useState } from "react";
import HighlightedText from "../../../modules/text/HighlightedText";
import { Container } from "../styles/SelectFieldValueModal.styled";

export default function SelectFieldValueModalComponent({
    excelTranslatorHeader,
    onClose,
    onChangeTargetCellNumber
}) {
    const [inputValue, setInputValue] = useState('');

    const __handle = {
        change: {
            inputValue: (e) => {
                let value = e.target.value;
                setInputValue(value);
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
                        설정할 <span style={{ color: 'var(--mainColor)' }}>필드값</span>을 선택해 주세요.
                    </div>
                </div>
                <div className='content-group'>
                    <div className='content-box'>
                        <div className='input-box'>
                            <input
                                type='text'
                                className='input-el'
                                onChange={(e) => __handle.change.inputValue(e)}
                                value={inputValue || ''}
                                placeholder='필드값을 입력하세요.'
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className='content-group'>
                    <div className='content-box'>
                        {excelTranslatorHeader?.uploadHeaderDetail?.details?.map(r => {
                            let isAccent = inputValue && r.headerName.includes(inputValue);

                            return (
                                <span
                                    key={r.id}
                                    className={`${isAccent ? 'tag-accent' : 'tag'}`}
                                    onClick={() => onChangeTargetCellNumber(r.cellNumber)}
                                >
                                    {isAccent ?
                                        <HighlightedText
                                            text={`${r.headerName}`}
                                            query={inputValue}
                                            highlightColor={'var(--defaultRedColor)'}
                                        />
                                        :
                                        r.headerName
                                    }
                                </span>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </>
    );
}

