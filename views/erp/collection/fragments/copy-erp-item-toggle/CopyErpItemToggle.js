import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import ConfirmModalComponentV2 from '../../../../modules/modal/ConfirmModalComponentV2';

export default function CopyErpItemToggle({
    selectedErpItems,
    onSubmitCopyCreate
}) {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const handleOpenConfirmModal = () => {
        if (!selectedErpItems || selectedErpItems?.length < 1) {
            alert('데이터를 먼저 선택해 주세요.');
            return;
        } else if (selectedErpItems?.length > 10) {
            alert('한번에 복사 생성 가능한 데이터의 개수는 최대 10개 입니다.');
            return;
        }

        setConfirmModalOpen(true);
    }

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    }

    const handleSubmit = () => {
        let body = {
            erpItemIds: selectedErpItems?.map(r => r.id)
        }

        onSubmitCopyCreate(body, () => handleCloseConfirmModal());
    }

    return (
        <>
            <SingleBlockButton
                type='button'
                className='button-item'
                onClick={() => handleOpenConfirmModal()}
            >
                복사 생성
            </SingleBlockButton>

            <ConfirmModalComponentV2
                open={confirmModalOpen}
                onClose={() => handleCloseConfirmModal()}
                onConfirm={() => handleSubmit()}
                message={
                    <div>선택된 데이터들을 복사 생성 합니다.</div>
                }
            />
        </>
    );
}