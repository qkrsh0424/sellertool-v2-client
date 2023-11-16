import { useState } from "react";
import { CustomDialog } from "../../../../../../../../../../../components/dialog/v1/CustomDialog";
import HighlightedText from "../../../../../../../../../../../components/text/highlight/HighlightedText";
import { St } from "./MdSelectCategory.styled";
import { useSearchAggregationActionsHook, useSearchAggregationValueHook } from "../../../../../../../hooks/SearchAggregationHook";

export function MdSelectCategory({
    open = false,
    productCategories,
    onClose = () => { },
}) {
    const searchAggregationValueHook = useSearchAggregationValueHook();
    const searchAggregationActionsHook = useSearchAggregationActionsHook();

    const [inputValue, setInputValue] = useState('');

    const handleSelectCategory = (data) => {
        searchAggregationActionsHook.onChangeProductCategory(data);
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
                                className={`tag ${!searchAggregationValueHook?.productCategory && 'tag-accent'}`}
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
                                            className={`tag ${searchAggregationValueHook?.productCategory?.id === r.id && 'tag-accent'}`}
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
                                            className={`tag ${searchAggregationValueHook?.productCategory?.id === r.id && 'tag-accent'}`}
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
                </St.Container>
            </CustomDialog>
        </>
    );
}