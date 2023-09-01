import { useState } from "react";
import { Box } from "./FgCategorySelector.styled";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { MdCategorySelector } from "../modals/MdCategorySelector";

export function FgCategorySelector({
    productCategories,
    productCategory,
    onSelectCategory
}) {
    const [selectModalOpen, setSelectModalOpen] = useState(false);

    const toggleSelectModalOpen = (setOpen) => {
        setSelectModalOpen(setOpen);
    }

    return (
        <>
            <Box>
                <div className='label'>카테고리</div>
                <CustomBlockButton
                    type='button'
                    className='select-button-item'
                    onClick={() => toggleSelectModalOpen(true)}
                >
                    {productCategory?.name ?? '전체'}
                </CustomBlockButton>
            </Box>
            {selectModalOpen &&
                <MdCategorySelector
                    open={selectModalOpen}
                    onClose={() => toggleSelectModalOpen(false)}
                    productCategories={productCategories}
                    productCategory={productCategory}
                    onSelectCategory={(item) => onSelectCategory(item)}
                />
            }
        </>
    );
}