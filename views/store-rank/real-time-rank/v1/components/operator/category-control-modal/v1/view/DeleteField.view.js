import { CustomCancelConfirmButton } from "../../../../../modules/buttons/cancel-confirm-button/v1";
import CustomSelect from "../../../../../modules/select/CustomSelect";
import { Wrapper } from "../styles/EditField.styled";

export default function DeleteFieldView({
    categories,
    selectedCategory,
    onChagnePageToMain,
    onChangeSelectedCategory,
    onDeleteNRankRecordCategory
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
                <div>
                    <div><span style={{ color: 'var(--defaultRedColor)' }}>해당 카테고리로 설정된 랭킹 내역이 모두 초기화됩니다.</span></div>
                    <div>정말로 해당 카테고리를 삭제하시겠습니까?</div>
                </div>
            </div>
            <CustomCancelConfirmButton
                onCancel={onChagnePageToMain}
                onConfirm={onDeleteNRankRecordCategory}
                confirmBtnStyle={{
                    background: 'var(--defaultRedColor)',
                    width: '40%'
                }}
            />
        </Wrapper>
    )
}