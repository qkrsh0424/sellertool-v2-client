import { useState } from "react";
import { Box } from "./FgSubCategorySelector.styled";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { MdSubCategorySelector } from "../modals/MdSubCategorySelector";

export function FgSubCategorySelector({
    productSubCategories,
    productSubCategory,
    onSelectSubCategory
}) {
    const [selectModalOpen, setSelectModalOpen] = useState(false);

    const toggleSelectModalOpen = (setOpen) => {
        setSelectModalOpen(setOpen);
    }

    return (
        <>
            <Box>
                <div className='label'>서브 카테고리</div>
                <CustomBlockButton
                    type='button'
                    className='select-button-item'
                    onClick={() => toggleSelectModalOpen(true)}
                >
                    {productSubCategory?.name ?? '전체'}
                </CustomBlockButton>
            </Box>
            {selectModalOpen &&
                <MdSubCategorySelector
                    open={selectModalOpen}
                    onClose={() => toggleSelectModalOpen(false)}
                    productSubCategories={productSubCategories}
                    productSubCategory={productSubCategory}
                    onSelectSubCategory={(item) => onSelectSubCategory(item)}
                />
            }
        </>
    );
}