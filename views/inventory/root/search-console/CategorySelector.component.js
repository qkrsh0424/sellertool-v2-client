import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import SelectCategoryModalComponent from "./modal/SelectCategoryModal.component";
import { Box } from "./styles/CategorySelector.styled";

export default function CategorySelectorComponent({
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
                <CommonModalComponent
                    open={selectModalOpen}
                    onClose={handleCloseSelectModal}
                >
                    <SelectCategoryModalComponent
                        productCategories={productCategories}
                        productCategory={productCategory}
                        onActionSelectCategory={onActionSelectCategory}
                        onClose={handleCloseSelectModal}
                    />
                </CommonModalComponent>
            }
        </>
    );
}