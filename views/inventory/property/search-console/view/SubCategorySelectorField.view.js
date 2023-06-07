import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Box } from "../style/SubCategorySelector.styled";
import SelectSubCategoryModalComponent from "../modal/SelectSubCategoryModal.component";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";

export default function SubCategorySelectorFieldView({
    productSubCategory,
    productSubCategories,
    onActionSelectSubCategory
}) {
    const [selectModalOpen, setSelectModalOpen] = useState(false);

    const handleOpenSelectModal = () => {
        setSelectModalOpen(true);
    }

    const handleCloseSelectModal = () => {
        setSelectModalOpen(false);
    }

    return (
        <>
            <Box>
                <div className='label'>서브 카테고리</div>
                <SingleBlockButton
                    type='button'
                    className='select-button-item'
                    onClick={() => handleOpenSelectModal()}
                >
                    {productSubCategory?.name ?? '전체'}
                </SingleBlockButton>
            </Box>

            {selectModalOpen &&
                <CustomDialog
                    open={selectModalOpen}
                    maxWidth={'xs'}
                    onClose={() => handleCloseSelectModal()}
                >
                    <CustomDialog.CloseButton onClose={() => handleCloseSelectModal()} />
                    <CustomDialog.Title>서브 카테고리를 선택해 주세요.</CustomDialog.Title>
                    <SelectSubCategoryModalComponent
                        productSubCategory={productSubCategory}
                        productSubCategories={productSubCategories}
                        onActionSelectCategory={onActionSelectSubCategory}
                        onClose={handleCloseSelectModal}
                    />
                </CustomDialog>
            }
        </>
    );
}