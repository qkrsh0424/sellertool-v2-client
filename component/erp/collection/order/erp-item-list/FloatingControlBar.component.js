import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import ExcelDownloadModalComponent from "../../fragments/excel-download-modal/ExcelDownloadModal.component";
import EditErpItemModalComponent from "./modal/EditErpItemsModal.component";
import FloatingControlBarModalComponent from "./modal/FloatingControlBarModal.component";
import { Container, ControlButtonsContainer } from "./styles/FloatingControlBar.styled";

export default function FloatingControlBarComponent({
    erpCollectionHeader,
    selectedErpItems,
    onSelectClearAllErpItems,
    onSelectClearErpItem,
    reqUpdateErpItems,
    reqFetchSelectedErpItems,
    reqDeleteErpItems,
    reqChangeStatusToSales
}) {
    const [controlDrawerOpen, setControlDrawerOpen] = useState(false);

    const [controlButtonsViewOpen, setControlButtonsViewOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [changeStatusToSalesModalOpen, setChangeStatusToSalesModalOpen] = useState(false);
    const [excelDownloadModalOpen, setExcelDownloadModalOpen] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        return () => {
            setControlDrawerOpen(false);
            setControlButtonsViewOpen(false);
            setEditErpItemsModalOpen(false);
            setDeleteErpItemsConfirmModalOpen(false);
            setChangeStatusToSalesModalOpen(false);
            setExcelDownloadModalOpen(false);
            setBackdropOpen(false);
        };
    }, []);

    const handleControlDrawerOpen = (setOpen) => {
        setControlDrawerOpen(setOpen);
    }

    const handleOpenEditErpItems = () => {
        setEditErpItemsModalOpen(true);
    }

    const handleCloseEditErpItems = () => {
        setEditErpItemsModalOpen(false);
    }

    const handleSubmitUpdateErpItems = async (body) => {
        handleOpenBackdrop();
        await reqUpdateErpItems(body, () => {
            handleCloseEditErpItems();
            reqFetchSelectedErpItems();
        })
        handleCloseBackdrop();
    }

    const handleOpenDeleteErpItemsConfirmModal = () => {
        setDeleteErpItemsConfirmModalOpen(true);
    }

    const handleCloseDeleteErpItemsConfirmModal = () => {
        setDeleteErpItemsConfirmModalOpen(false);
    }

    const handleSubmitDeleteErpItems = async () => {
        handleOpenBackdrop();
        let body = {
            ids: selectedErpItems?.map(r => r.id)
        }
        await reqDeleteErpItems(body, () => {
            handleCloseDeleteErpItemsConfirmModal();
            onSelectClearAllErpItems();
        })
        handleCloseBackdrop();
    }

    const handleOpenChangeStatusToSalesModal = () => {
        setChangeStatusToSalesModalOpen(true);
    }

    const handleCloseChangeStatusToSalesModal = () => {
        setChangeStatusToSalesModalOpen(false);
    }

    const handleSubmitChangeStatusToSales = async () => {
        handleOpenBackdrop();
        let body = {
            ids: selectedErpItems?.map(r => r.id)
        }
        await reqChangeStatusToSales(body, () => {
            handleCloseChangeStatusToSalesModal();
            onSelectClearAllErpItems();
        })
        handleCloseBackdrop();
    }

    const handleOpenExcelDownloadModal = () => {
        setExcelDownloadModalOpen(true);
    }

    const handleCloseExcelDownloadModal = () => {
        setExcelDownloadModalOpen(false);
    }

    const handleOpenBackdrop = () => {
        setBackdropOpen(true);
    }

    const handleCloseBackdrop = () => {
        setBackdropOpen(false);
    }

    return (
        <>
            <Container
                controlButtonsViewOpen={controlButtonsViewOpen}
            >
                <SingleBlockButton
                    type='button'
                    className='floating-button-item'
                    onClick={() => handleControlDrawerOpen(true)}
                >
                    <span className='accent'>{selectedErpItems?.length || '0'}</span> 개 선택됨
                </SingleBlockButton>
            </Container>

            {editErpItemsModalOpen &&
                <CommonModalComponent
                    open={editErpItemsModalOpen}
                    onClose={handleCloseEditErpItems}
                    maxWidth={'xl'}
                >
                    <EditErpItemModalComponent
                        selectedErpItems={selectedErpItems}
                        onClose={handleCloseEditErpItems}
                        onSelectClearErpItem={onSelectClearErpItem}
                        onSubmitUpdateErpItems={handleSubmitUpdateErpItems}
                    />
                </CommonModalComponent>
            }

            {deleteErpItemsConfirmModalOpen &&
                <ConfirmModalComponentV2
                    open={deleteErpItemsConfirmModalOpen}
                    onClose={handleCloseDeleteErpItemsConfirmModal}
                    onConfirm={handleSubmitDeleteErpItems}
                    title={'삭제 확인메세지'}
                    message={'선택된 데이터를 영구 삭제 합니다.'}
                    confirmBtnStyle={{
                        background: 'var(--defaultRedColor)'
                    }}
                />
            }

            {changeStatusToSalesModalOpen &&
                <ConfirmModalComponentV2
                    open={changeStatusToSalesModalOpen}
                    onClose={handleCloseChangeStatusToSalesModal}
                    onConfirm={handleSubmitChangeStatusToSales}
                    title={'판매전환 확인메세지'}
                    message={'선택된 데이터를 판매전환 합니다.'}
                />
            }

            {excelDownloadModalOpen &&
                <CommonModalComponent
                    open={excelDownloadModalOpen}
                    onClose={handleCloseExcelDownloadModal}
                    maxWidth={'xl'}
                >
                    <ExcelDownloadModalComponent
                        erpCollectionHeader={erpCollectionHeader}
                        selectedErpItems={selectedErpItems}

                        onClose={handleCloseExcelDownloadModal}
                    />
                </CommonModalComponent>
            }

            {backdropOpen &&
                <BackdropLoadingComponent
                    open={backdropOpen}
                />
            }

            <FloatingControlBarModalComponent
                open={controlDrawerOpen}
                onClose={() => handleControlDrawerOpen(false)}
                handleOpenEditErpItems={handleOpenEditErpItems}
                handleOpenChangeStatusToSalesModal={handleOpenChangeStatusToSalesModal}
                handleOpenDeleteErpItemsConfirmModal={handleOpenDeleteErpItemsConfirmModal}
                handleOpenExcelDownloadModal={handleOpenExcelDownloadModal}
                onSelectClearAllErpItems={onSelectClearAllErpItems}
            />
        </>
    );
}