import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Box } from "../style/CategorySelector.styled";
import SelectCategoryModalComponent from "../modal/SelectCategoryModal.component";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";

export default function CategorySelectorFieldView({
    productCategories,
    productCategory,
    onActionSelectCategory
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
                <div className='label'>카테고리</div>
                <SingleBlockButton
                    type='button'
                    className='select-button-item'
                    onClick={() => handleOpenSelectModal()}
                >
                    {productCategory?.name ?? '전체'}
                </SingleBlockButton>
            </Box>

            {selectModalOpen &&
                <CustomDialog
                    open={selectModalOpen}
                    maxWidth={'xs'}
                    onClose={() => handleCloseSelectModal()}
                >
                    <CustomDialog.CloseButton />
                    <CustomDialog.Title>카테고리를 선택해 주세요.</CustomDialog.Title>
                    <SelectCategoryModalComponent
                        productCategories={productCategories}
                        productCategory={productCategory}
                        onActionSelectCategory={onActionSelectCategory}
                        onClose={handleCloseSelectModal}
                    />
                </CustomDialog>

                // <CustomCommonModal
                //     open={selectModalOpen}
                //     title={'카테고리를 선택해 주세요.'}
                //     element={
                //         <SelectCategoryModalComponent
                //             productCategories={productCategories}
                //             productCategory={productCategory}
                //             onActionSelectCategory={onActionSelectCategory}
                //             onClose={handleCloseSelectModal}
                //         />
                //     }
                //     maxWidth={'xs'}
                //     onClose={() => handleCloseSelectModal()}
                // />
            }
        </>
    );
}