import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import HighlightedText from "../../../../modules/text/HighlightedText";
import { Container } from "../styles/SelectCategoryModal.styled";

export default function SelectCategoryModalComponent({
    productCategory,
    productCategories,
    onClose,
    onActionSelectCategory
}) {
    const [inputValue, setInputValue] = useState('');

    const handleSelectCategory = (data) => {
        onActionSelectCategory(data);
        onClose();
    }

    const handleChangeInputValue = (e) => {
        let value = e.target.value;
        setInputValue(value);
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
                        <span style={{ color: 'var(--mainColor)' }}>카테고리</span>를 선택해 주세요.
                    </div>
                </div>
                <div className='content-group'>
                    <div className='content-box'>
                        <div className='input-box'>
                            <input
                                type='text'
                                className='input-el'
                                onChange={(e) => handleChangeInputValue(e)}
                                value={inputValue || ''}
                                placeholder='카테고리명을 입력하세요.'
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className='content-group'>
                    <div className='content-box'>
                        <span
                            className={`tag ${!productCategory && 'tag-accent'}`}
                            onClick={() => handleSelectCategory()}
                        >
                            전체
                        </span>
                        {productCategories?.map(r => {
                            let isMatched = inputValue && r.name.includes(inputValue);

                            if (!inputValue) {
                                return (
                                    <span
                                        key={r.id}
                                        className={`tag ${productCategory?.id === r.id && 'tag-accent'}`}
                                        onClick={() => handleSelectCategory(r)}
                                    >
                                        {r.name}
                                    </span>
                                );
                            }

                            if (isMatched) {
                                return (
                                    <span
                                        key={r.id}
                                        className={`tag ${productCategory?.id === r.id && 'tag-accent'}`}
                                        onClick={() => handleSelectCategory(r)}
                                    >
                                        <HighlightedText
                                            text={`${r.name}`}
                                            query={inputValue}
                                            highlightColor={'var(--defaultRedColorOpacity500)'}
                                        />
                                    </span>
                                );
                            }
                        })}
                    </div>
                </div>
            </Container>
        </>
    );
}