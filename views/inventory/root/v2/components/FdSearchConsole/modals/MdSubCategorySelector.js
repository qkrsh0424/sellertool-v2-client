import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import HighlightedText from "../../../../../../../components/text/highlight/HighlightedText";
import { Container } from "./MdSubCategorySelector.styled";

export function MdSubCategorySelector({
    open = false,
    onClose = () => { },
    productSubCategories,
    productSubCategory,
    onSelectSubCategory = () => { }
}) {
    const [inputValueRef, setInputValueRef] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (!inputValueRef) {
            return;
        }

        inputValueRef?.focus();
    }, [inputValueRef]);

    const handleSelectCategory = (item) => {
        onSelectSubCategory(item);
        onClose();
    }

    const handleChangeInputValue = (e) => {
        let value = e.target.value;
        setInputValue(value);
    }


    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>서브 카테고리를 선택해 주세요.</CustomDialog.Title>
                <Container>
                    <div className='content-group'>
                        <div className='content-box'>
                            <div className='input-box'>
                                <input
                                    ref={(ref) => setInputValueRef(ref)}
                                    type='text'
                                    className='input-el'
                                    onChange={(e) => handleChangeInputValue(e)}
                                    value={inputValue || ''}
                                    placeholder='서브 카테고리명을 입력하세요.'
                                >
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className='content-group'>
                        <div className='content-box'>
                            <span
                                className={`tag ${!productSubCategory && 'tag-accent'}`}
                                onClick={() => handleSelectCategory()}
                            >
                                전체
                            </span>
                            {productSubCategories?.map(r => {
                                let isMatched = inputValue && r.name.includes(inputValue);

                                if (!inputValue) {
                                    return (
                                        <span
                                            key={r.id}
                                            className={`tag ${productSubCategory?.id === r.id && 'tag-accent'}`}
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
                                            className={`tag ${productSubCategory?.id === r.id && 'tag-accent'}`}
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
            </CustomDialog>
        </>
    );
}