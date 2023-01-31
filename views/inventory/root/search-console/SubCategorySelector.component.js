import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import SelectSubCategoryModalComponent from "./modal/SelectSubCategoryModal.component";
import { Box } from "./styles/SubCategorySelector.styled";

export default function SubCategorySelectorComponent({
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
                <CommonModalComponent
                    open={selectModalOpen}
                    onClose={handleCloseSelectModal}
                >
                    <SelectSubCategoryModalComponent
                        productSubCategory={productSubCategory}
                        productSubCategories={productSubCategories}
                        onActionSelectCategory={onActionSelectSubCategory}
                        onClose={handleCloseSelectModal}
                    />
                </CommonModalComponent>
            }
        </>
    );
}