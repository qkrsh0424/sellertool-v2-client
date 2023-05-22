import { useState } from "react";
import HighlightedText from "../../../../../components/text/highlight/HighlightedText";
import { Container } from "../style/SelectCategoryModal.styled";

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