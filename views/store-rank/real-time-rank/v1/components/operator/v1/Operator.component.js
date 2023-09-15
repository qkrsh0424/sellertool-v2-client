import { useState } from "react";
import { Container } from "./styles/Operator.styled";
import { CategoryControlFieldView } from "./view/CategoryControlField.view";
import { SearchInfoFieldView } from "./view/SearchInfoField.view";
import { CategoryControlModalComponent } from "../category-control-modal/v1";

export function OperatorComponent({
    categories,
    recordList,
    rankSearchInfo,
    onSearchNRankRecordCategories
}) {
    const [categoryControlModalOpen, setCategoryControlModalOpen] = useState(false);

    const handleOpenCategoryControlModal = () => {
        setCategoryControlModalOpen(true)
    }

    const handleCloseCategoryControlModal = () => {
        setCategoryControlModalOpen(false);
    }

    return (
        <>
            <Container>
                <SearchInfoFieldView
                    recordList={recordList}
                    rankSearchInfo={rankSearchInfo}
                />

                <CategoryControlFieldView
                    handleOpenCategoryControlModal={handleOpenCategoryControlModal}
                />

                {categoryControlModalOpen &&
                    <CategoryControlModalComponent
                        open={categoryControlModalOpen}
                        onClose={handleCloseCategoryControlModal}
                        categories={categories}
                        onSearchNRankRecordCategories={onSearchNRankRecordCategories}
                    />
                }
            </Container>
        </>
    )
}