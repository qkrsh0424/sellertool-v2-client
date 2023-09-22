import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import CustomSelect from "../../../../../../../modules/select/CustomSelect";
import { CustomCancelConfirmButton } from "../../../../modules/buttons/cancel-confirm-button/v1";
import { Container, Wrapper } from "./style/CategorySelectorModal.styled";

export function CategorySelectorModalComponent({
    open,
    onClose,
    categories,
    selectedRecord,
    onChangeSelectedRecordCategory,
    onUpdateNRankRecordCategoryId
}) {
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="xs"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>카테고리 설정</CustomDialog.Title>
                <Container>
                    <Wrapper>
                        <CustomSelect className='select-el' value={selectedRecord?.nrank_record_category_id || ''} onChange={(e) => onChangeSelectedRecordCategory(e)}>
                            <option value={''}>선택</option>
                            {categories?.map(category => {
                                return (
                                    <option key={'category_id_' + category.id} value={category.id}>{category.name}</option>
                                )
                            })}
                        </CustomSelect>
                    </Wrapper>
                    <CustomCancelConfirmButton
                        onCancel={onClose}
                        onConfirm={onUpdateNRankRecordCategoryId}
                    />
                </Container>
            </CustomDialog>
        </>
    )
}