import { useState } from "react";
import { fieldTypes, splitters } from "../../../../../../static-data/erp-collection-excel-download-form/RefExcelDownloadForm";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import CustomInput from "../../../../../modules/input/CustomInput";
import CommonModalComponent from "../../../../../modules/modal/CommonModalComponent";
import useCreateFormDetailsHook from "../hooks/useCreateFormDetailsHook";
import { AddButtonBox, CardItem, CardItemList, Container } from "./FormDetailList.styled";
import EditFieldTypeModalComponent from "./modal/EditFieldTypeModal.component";
import EditMergeSplitterModalComponent from "./modal/EditMergeSplitterModal.component";
import EditValueSplitterModalComponent from "./modal/EditValueSplitterModal.component";
import EditViewDetailsModalComponent from "./modal/EditViewDetailsModal.component";

export default function FormDetailListComponent({
    refErpCollectionHeaders,
    createFormDetails,
    onAddFormDetail,
    onDeleteFormDetail,
    onChangeCustomCellName,
    onChangeFieldType,
    onChangeValueSplitter,
    onChangeMergeSplitter,
    onChangeMergeYn,
    onChangeFixedValue,
    onChangeViewDetails,
}) {

    const [targetFormDetail, setTargetFormDetail] = useState(null);
    const [editFieldTypeModalOpen, setEditFieldTypeModalOpen] = useState(false);
    const [editValueSplitterModalOpen, setEditValueSplitterModalOpen] = useState(false);
    const [editMergeSplitterModalOpen, setEditMergeSplitterModalOpen] = useState(false);
    const [editViewDetailsModalOpen, setEditViewDetailsModalOpen] = useState(false);

    const handleOpenEditFieldTypeModal = (formDetail) => {
        setTargetFormDetail(formDetail);
        setEditFieldTypeModalOpen(true);
    }

    const handleCloseEidtFieldTypeModal = () => {
        setEditFieldTypeModalOpen(false);
        setTargetFormDetail(null);
    }

    const handleOpenEditValueSplitterModal = (formDetail) => {
        setTargetFormDetail(formDetail);
        setEditValueSplitterModalOpen(true);
    }

    const handleCloseEditValueSplitterModal = () => {
        setEditValueSplitterModalOpen(false);
        setTargetFormDetail(null);
    }

    const handleOpenEditMergeSplitterModal = (formDetail) => {
        setTargetFormDetail(formDetail);
        setEditMergeSplitterModalOpen(true);
    }

    const handleCloseEditMergeSplitterModal = () => {
        setEditMergeSplitterModalOpen(false);
        setTargetFormDetail(null);
    }

    const handleOpenEditViewDetailsModal = (formDetail) => {
        setTargetFormDetail(formDetail);
        setEditViewDetailsModalOpen(true);
    }

    const handleCloseEditViewDetailsModal = () => {
        setEditViewDetailsModalOpen(false);
        setTargetFormDetail(null);
    }

    return (
        <>
            <Container>
                <AddButtonBox>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => onAddFormDetail()}
                    >
                        구성요소 추가
                    </SingleBlockButton>
                </AddButtonBox>
                <CardItemList>
                    {createFormDetails?.map((formDetail, index) => {
                        return (
                            <CardItem key={formDetail.id}>
                                <div className='wrapper'>
                                    <div className='mgl-flex mgl-flex-alignItems-center'>
                                        <div className='count-box'>
                                            {index + 1}.
                                        </div>
                                        <div className='delete-box'>
                                            <button
                                                type='button'
                                                className='button-item'
                                                onClick={() => onDeleteFormDetail(index)}
                                            >
                                                <CustomImage
                                                    src='/images/icon/delete_default_e56767.svg'
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='name-box'>
                                        <div className='label'>
                                            구성요소명
                                        </div>
                                        <CustomInput
                                            type='input'
                                            className='input-item'
                                            value={formDetail?.customCellName || ''}
                                            onChange={(e) => onChangeCustomCellName(e, index)}
                                        />
                                    </div>
                                    <div className='fieldType-box'>
                                        <div className='label'>
                                            필드타입
                                        </div>
                                        <SingleBlockButton
                                            type='button'
                                            className='button-item'
                                            onClick={() => handleOpenEditFieldTypeModal(formDetail)}
                                        >
                                            {formDetail.fieldType}
                                        </SingleBlockButton>
                                    </div>
                                    {(formDetail?.fieldType === '일반' || formDetail?.fieldType === '고정값') &&
                                        <>
                                            <div className='fieldSplitter-box'>
                                                <div className='label'>
                                                    필드 구분자
                                                </div>
                                                <SingleBlockButton
                                                    type='button'
                                                    className='button-item'
                                                    onClick={() => handleOpenEditValueSplitterModal(formDetail)}
                                                >
                                                    <Splitter
                                                        splitter={formDetail.valueSplitter}
                                                    />
                                                </SingleBlockButton>
                                            </div>
                                            {formDetail?.fieldType === '일반' &&
                                                <div className='viewDetails-box'>
                                                    <div className='label'>
                                                        필드값
                                                    </div>
                                                    <div>
                                                        <span className='detail-name setting-button' onClick={() => handleOpenEditViewDetailsModal(formDetail)}>설정</span>
                                                        {formDetail?.viewDetails?.map((viewDetail, index) => {
                                                            let viewDetailName = refErpCollectionHeaders?.find(r => r.matchedFieldName === viewDetail)?.originHeaderName;
                                                            return (
                                                                <span key={index} className='detail-name'>{index + 1}. {viewDetailName}</span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            }
                                            {formDetail?.fieldType === '고정값' &&
                                                <div className='fixedValue-box'>
                                                    <div className='label'>
                                                        고정값
                                                    </div>
                                                    <CustomInput
                                                        type='input'
                                                        className='input-item'
                                                        value={formDetail?.fixedValue || ''}
                                                        onChange={(e) => onChangeFixedValue(e, formDetail?.id)}
                                                    />
                                                </div>
                                            }
                                            <div className='mergeYn-box'>
                                                <div className='label'>
                                                    병합사용
                                                </div>
                                                {formDetail.mergeYn === 'n' &&
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='button-item-off'
                                                        onClick={() => onChangeMergeYn('y', formDetail?.id)}
                                                    >
                                                        OFF
                                                    </SingleBlockButton>
                                                }
                                                {formDetail.mergeYn === 'y' &&
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='button-item-on'
                                                        onClick={() => onChangeMergeYn('n', formDetail?.id)}
                                                    >
                                                        ON
                                                    </SingleBlockButton>
                                                }
                                            </div>
                                            {formDetail.mergeYn === 'y' &&
                                                <div className='fieldSplitter-box'>
                                                    <div className='label'>
                                                        병합 구분자
                                                    </div>
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='button-item'
                                                        onClick={() => handleOpenEditMergeSplitterModal(formDetail)}
                                                    >
                                                        <Splitter
                                                            splitter={formDetail.mergeSplitter}
                                                        />
                                                    </SingleBlockButton>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            </CardItem>
                        );
                    })}
                </CardItemList>
            </Container>

            {editFieldTypeModalOpen &&
                <CommonModalComponent
                    open={editFieldTypeModalOpen}
                    onClose={handleCloseEidtFieldTypeModal}
                >
                    <EditFieldTypeModalComponent
                        targetFormDetail={targetFormDetail}
                        fieldTypes={fieldTypes}
                        onClose={handleCloseEidtFieldTypeModal}
                        onChangeFieldType={onChangeFieldType}
                    />
                </CommonModalComponent>
            }

            {editValueSplitterModalOpen &&
                <CommonModalComponent
                    open={editValueSplitterModalOpen}
                    onClose={handleCloseEditValueSplitterModal}
                >
                    <EditValueSplitterModalComponent
                        targetFormDetail={targetFormDetail}
                        splitters={splitters}
                        onClose={handleCloseEditValueSplitterModal}
                        onChangeValueSplitter={onChangeValueSplitter}
                    />
                </CommonModalComponent>
            }

            {editMergeSplitterModalOpen &&
                <CommonModalComponent
                    open={editMergeSplitterModalOpen}
                    onClose={handleCloseEditMergeSplitterModal}
                >
                    <EditMergeSplitterModalComponent
                        targetFormDetail={targetFormDetail}
                        splitters={splitters}
                        onClose={handleCloseEditMergeSplitterModal}
                        onChangeMergeSplitter={onChangeMergeSplitter}
                    />
                </CommonModalComponent>
            }

            {editViewDetailsModalOpen &&
                <CommonModalComponent
                    open={editViewDetailsModalOpen}
                    onClose={handleCloseEditViewDetailsModal}
                    maxWidth={'xl'}
                >
                    <EditViewDetailsModalComponent
                        targetFormDetail={targetFormDetail}
                        refErpCollectionHeaders={refErpCollectionHeaders}
                        onClose={handleCloseEditViewDetailsModal}
                        onChangeViewDetails={onChangeViewDetails}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

function Splitter({ splitter }) {
    switch (splitter) {
        case '\n':
            return '줄바꿈'
        case '\t':
            return '들여쓰기'
        case ' ':
            return '띄어쓰기'
        default:
            return splitter
    }
}