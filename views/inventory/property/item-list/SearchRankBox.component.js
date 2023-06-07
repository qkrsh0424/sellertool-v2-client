import { useState } from "react";
import SearchControlFieldView from "./view/SearchControlField.view";
import { CustomDialog } from "../../../../components/dialog/v1/CustomDialog";
import RankedProductOptionInventoryModalComponent from "./modal/rank-inventory-search/RankedProductOptionInventoryModal.component";

export default function SearchRankBoxComponent(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    return (
        <>
            <SearchControlFieldView
                onActionOpenModal={handleOpenModal}
            />
            <CustomDialog
                open={modalOpen}
                maxWidth={'md'}
                onClose={() => handleCloseModal()}
            >
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <CustomDialog.Title>순위별 조회</CustomDialog.Title>
                <RankedProductOptionInventoryModalComponent
                    badStockEndDate={props.badStockEndDate}
                    onClose={handleCloseModal}
                />
            </CustomDialog>
        </>
    )
}