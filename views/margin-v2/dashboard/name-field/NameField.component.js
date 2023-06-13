import { useState } from 'react';
import styled from 'styled-components';
import CustomBlockButton from '../../../../components/buttons/block-button/v1/CustomBlockButton';
import DeleteMarginRecordModalComponent from './DeleteMarginRecordModal.component';
import MarginRecordsModalComponent from './MarginRecordsModal.component';

const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 20px;
`;

const Wrapper = styled.div`
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    padding: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name-box{
        display: inline-block;
        padding-left: 10px;
        border-left: 4px solid var(--mainColor);
        flex:1;

        .name{
            font-size: 16px;
            font-weight: 700;
            color: #404040;
        }

        .tag{
            font-size: 13px;
            font-weight: 500;
            color: #808080;
            margin-top:5px;
        }
    }
`;

const LoadButton = styled(CustomBlockButton)`
    width:60px;
    margin: 0;
    height: 30px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 700;
    background: #333;
    color:#fff;
    border: none;
`;

const DeleteButton = styled(CustomBlockButton)`
    width:60px;
    margin: 0;
    height: 30px;
    border-radius: 5px;
    font-size: 11px;
    font-weight: 700;
    background: var(--defaultRedColor);
    color:#fff;
    border: none;
    margin-left:5px;
`;

export default function NameFieldComponent({
    marginRecordPage,
    marginRecord,
    onSubmitDeleteMarginRecord,
    MARGIN_RECORDS_SIZE,
    MARGIN_RECORDS_PAGE,
    onChangePage,
    onChangeSize
}) {
    const [marginRecordsModalOpen, setMarginRecordsModalOpen] = useState(false);
    const [deleteMarginRecordModalOpen, setDeleteMarginRecordModalOpen] = useState(false);

    const toggleMarginRecordsModalOpen = (setOpen) => {
        setMarginRecordsModalOpen(setOpen);
    }

    const toggleDeleteMarginRecordModalOpen = (setOpen) => {
        setDeleteMarginRecordModalOpen(setOpen);
    }

    const handleSubmitDeleteMarginRecord = () => {
        if (!marginRecord) {
            alert('마진 레코드를 선택해 주세요.');
            return;
        }
        const body = {
            marginRecordId: marginRecord?.id
        }
        onSubmitDeleteMarginRecord(body, () => { toggleDeleteMarginRecordModalOpen(false) });
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='name-box'>
                        <div className='name'>{marginRecord?.name || '선택없음'}</div>
                        <div className='tag'>{marginRecord?.tag || '태그 미지정'}</div>
                    </div>
                    <div className='mgl-flex mgl-alignItems-center'>
                        <LoadButton
                            type='button'
                            onClick={() => toggleMarginRecordsModalOpen(true)}
                        >불러오기</LoadButton>
                        {marginRecord &&
                            <DeleteButton
                                type='button'
                                onClick={() => toggleDeleteMarginRecordModalOpen(true)}
                            >삭제</DeleteButton>
                        }

                    </div>
                </Wrapper>
            </Container>

            <MarginRecordsModalComponent
                open={marginRecordsModalOpen}
                onClose={() => toggleMarginRecordsModalOpen(false)}
                marginRecordPage={marginRecordPage}
                selectedMarginRecord={marginRecord}
                MARGIN_RECORDS_SIZE={MARGIN_RECORDS_SIZE}
                MARGIN_RECORDS_PAGE={MARGIN_RECORDS_PAGE}
                onChangePage={onChangePage}
                onChangeSize={onChangeSize}
            />

            {deleteMarginRecordModalOpen &&
                <DeleteMarginRecordModalComponent
                    open={deleteMarginRecordModalOpen}
                    onClose={() => toggleDeleteMarginRecordModalOpen(false)}
                    onConfirm={() => handleSubmitDeleteMarginRecord()}
                />
            }
        </>
    );
}