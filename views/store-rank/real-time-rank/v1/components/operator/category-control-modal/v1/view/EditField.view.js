import { CustomCancelConfirmButton } from "../../../../../modules/buttons/cancel-confirm-button/v1";
import CustomSelect from "../../../../../modules/select/CustomSelect";
import { Wrapper } from "../styles/EditField.styled";

export default function EditFieldView({
    categories,
    selectedCategory,
    inputValue,
    onChagnePageToMain,
    onChangeInputValue,
    onChangeSelectedCategory,
    onUpdateNRankRecordCategory
}) {
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

                <input
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
                onCancel={onChagnePageToMain}
                onConfirm={onUpdateNRankRecordCategory}
            />
        </Wrapper>
    )
}