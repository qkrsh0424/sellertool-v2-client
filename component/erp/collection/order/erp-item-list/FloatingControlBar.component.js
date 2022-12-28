import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import EditErpItemModalComponent from "./modal/EditErpItemsModal.component";
import { Container, ControlButtonsContainer } from "./styles/FloatingControlBar.styled";

export default function FloatingControlBarComponent({
    selectedErpItems,
    onSelectClearAllErpItems,
    onSelectClearErpItem,
    reqUpdateErpItems,
    reqFetchSelectedErpItems,
    reqDeleteErpItems,
    reqChangeStatusToSales
}) {
    const [controlButtonsViewOpen, setControlButtonsViewOpen] = useState(false);
    const [editErpItemsModalOpen, setEditErpItemsModalOpen] = useState(false);
    const [deleteErpItemsConfirmModalOpen, setDeleteErpItemsConfirmModalOpen] = useState(false);
    const [changeStatusToSalesModalOpen, setChangeStatusToSalesModalOpen] = useState(false);


    const handleOpenControlButtonsView = () => {
        if (controlButtonsViewOpen) {
            setControlButtonsViewOpen(false);
            return;
        }
        setControlButtonsViewOpen(true);
    }

    const handleOpenEditErpItems = () => {
        setEditErpItemsModalOpen(true);
    }

    const handleCloseEditErpItems = () => {
        setEditErpItemsModalOpen(false);
    }

    const handleSubmitUpdateErpItems = (body) => {
        reqUpdateErpItems(body, () => {
            handleCloseEditErpItems();
            reqFetchSelectedErpItems();
        })
    }

    const handleOpenDeleteErpItemsConfirmModal = () => {
        setDeleteErpItemsConfirmModalOpen(true);
    }

    const handleCloseDeleteErpItemsConfirmModal = () => {
        setDeleteErpItemsConfirmModalOpen(false);
    }

    const handleSubmitDeleteErpItems = () => {
        let body = {
            ids: selectedErpItems?.map(r => r.id)
        }

        reqDeleteErpItems(body, () => {
            handleCloseDeleteErpItemsConfirmModal();
            onSelectClearAllErpItems();
        })
    }

    const handleOpenChangeStatusToSalesModal = () => {
        setChangeStatusToSalesModalOpen(true);
    }

    const handleCloseChangeStatusToSalesModal = () => {
        setChangeStatusToSalesModalOpen(false);
    }

    const handleSubmitChangeStatusToSales = () => {
        let body = {
            ids: selectedErpItems?.map(r => r.id)
        }
        reqChangeStatusToSales(body, () => {
            handleCloseChangeStatusToSalesModal();
            onSelectClearAllErpItems();
        })
    }
    return (
        <>
            <Container
                controlButtonsViewOpen={controlButtonsViewOpen}
            >
                <ControlButtonsContainer
                    controlButtonsViewOpen={controlButtonsViewOpen}
                >
                    <div className='groups'>
                        <div className='label'>일괄 데이터 처리</div>
                        <div>
                            <span
                                className='control-button-item'
                                onClick={() => handleOpenEditErpItems()}
                            >
                                수정
                            </span>
                        </div>
                    </div>
                    <div className='groups'>
                        <div className='label'>상태 관리</div>
                        <div>
                            <span
                                className='control-button-item'
                                onClick={() => handleOpenChangeStatusToSalesModal()}
                            >
                                판매전환
                            </span>
                            <span
                                className='control-button-item'
                                style={{
                                    color: 'var(--defaultRedColor)',
                                    border: '1px solid var(--defaultRedColor)'
                                }}
                                onClick={() => handleOpenDeleteErpItemsConfirmModal()}
                            >
                                데이터 삭제
                            </span>
                        </div>
                    </div>
                    <div className='groups'>
                        <div className='label'>기타</div>
                        <div>
                            <span className='control-button-item'>
                                엑셀 다운로드
                            </span>
                            <span
                                className='control-button-item'
                                onClick={() => onSelectClearAllErpItems()}
                            >
                                전체해제
                            </span>
                        </div>
                    </div>
                </ControlButtonsContainer>
                <SingleBlockButton
                    type='button'
                    className='floating-button-item'
                    onClick={() => handleOpenControlButtonsView()}
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
        </>
    );
}