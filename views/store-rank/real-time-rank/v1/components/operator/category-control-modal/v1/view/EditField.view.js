import { useEffect, useRef } from "react";
import { CustomCancelConfirmButton } from "../../../../../modules/buttons/cancel-confirm-button/v1";
import CustomSelect from "../../../../../modules/select/CustomSelect";
import { Wrapper } from "../styles/EditField.styled";
import CustomInput from "../../../../../../../../modules/input/CustomInput";

export default function EditFieldView({
    categories,
    selectedCategory,
    inputValue,
    onChangePageToMain,
    onChangeInputValue,
    onChangeSelectedCategory,
    onUpdateNRankRecordCategory
}) {
    const inputRef = useRef();

    useEffect(() => {
        if(!selectedCategory) {
            return;
        }

        inputRef?.current?.focus();
    }, [selectedCategory])

    return (
        <Wrapper>
            <div className='content-box'>
                <div>
                    <CustomSelect className='select-el' value={selectedCategory?.id || ''} onChange={(e) => onChangeSelectedCategory(e)}>
                        <option value={''}>선택</option>
                        {categories?.map(r => {
                            return (
                                <option key={'nrank_record_category' + r.id} value={r.id}>{r.name}</option>
                            )
                        })}
                    </CustomSelect>
                </div>

                <CustomInput
                    ref={inputRef}
                    className='input-el'
                    name='name'
                    onChange={(e) => onChangeInputValue(e)}
                    value={inputValue || ''}
                    placeholder="카테고리명"
                    required
                    disabled={!selectedCategory}
                />
            </div>
            <CustomCancelConfirmButton
                className='button-el'
                onCancel={onChangePageToMain}
                onConfirm={onUpdateNRankRecordCategory}
            />
        </Wrapper>
    )
}