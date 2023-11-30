import { useState } from "react";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import HighlightedText from "../../../../../components/text/highlight/HighlightedText";
import { St } from "./MdSelectSubCategory.styled";

export function MdSelectSubCategory({
    open = false,
    productSubCategoryList,
    productSubCategory,
    onSelect,
    onClose = () => { },
}) {
    const [inputValue, setInputValue] = useState('');

    const handleSelectSubCategory = (data) => {
        onSelect(data?.id);
        onClose();
    }

    const handleChangeInputValue = (e) => {
        let value = e.target.value;
        setInputValue(value);
    }

    return (
        <>
            <CustomDialog open={open} maxWidth="xs" onClose={() => onClose()}>
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>카테고리 선택</CustomDialog.Title>
                <St.Container>
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
                                className={`tag ${!productSubCategory && 'tag-accent'}`}
                                onClick={() => handleSelectSubCategory()}
                            >
                                전체
                            </span>
                            {productSubCategoryList?.map(r => {
                                let isMatched = inputValue && r.name.includes(inputValue);

                                if (!inputValue) {
                                    return (
                                        <span
                                            key={r.id}
                                            className={`tag ${productSubCategory?.id === r.id && 'tag-accent'}`}
                                            onClick={() => handleSelectSubCategory(r)}
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
                                            onClick={() => handleSelectSubCategory(r)}
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
                </St.Container>
            </CustomDialog>
        </>
    );
}