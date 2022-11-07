import Image from "next/image";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import useModifyDownloadHeaderDetailFormHook from "../hooks/useModifyDownloadHeaderDetailFormHook";
import { Container, ControlGroup, FlexBlock } from "../styles/ModifyDownloadHeaderDetailModal.styled";
import { v4 as uuidv4 } from 'uuid';
import CustomSelect from "../../../modules/select/CustomSelect";
import CustomCheckboxV2 from "../../../modules/checkbox/CustomCheckboxV2";
import CustomExcelFileUploader from "../../../modules/uploader/CustomExcelFileUploader";
import { useState } from "react";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import LoadExistingModalComponent from "./LoadExistingModal.component";

export default function ModifyDownloadHeaderDetailsModalComponent({
    excelTranslatorHeaders,
    excelTranslatorHeader,
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const {
        modifyDownloadHeaderDetailForm,
        onActionSelectExistingHeaderDetail,
        reqUploadSampleExcel,
        onActionAddDetails,
        onActionDeleteDetail,
        onChangeHeaderName,
        onChangeFixedValue,
        onChangeFixedValueUsageOn,
        onChangeFixedValueUsageOff,
        onChangeTargetCellNumber,
        onActionChangeOrder,
        checkDownloadHeaderDetailFormatValid,
        checkDetailsFormatValid,
        checkHeaderNameFormatValid,
        checkFixedValueFormatValid
    } = useModifyDownloadHeaderDetailFormHook({
        excelTranslatorHeader: excelTranslatorHeader
    });

    const [excelUploaderModalOpen, setExcelUploaderModalOpen] = useState(false);
    const [loadExistingModeOpen, setLoadExistingModeOpen] = useState(false);

    const __handle = {
        action: {
            openExcelUploaderModal: () => {
                setExcelUploaderModalOpen(true);
            },
            closeExcelUploaderModal: () => {
                setExcelUploaderModalOpen(false);
            },
            openLoadExistingMode: () => {
                setLoadExistingModeOpen(true);
            },
            closeLoadExistingMode: () => {
                setLoadExistingModeOpen(false);
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                try {
                    checkDownloadHeaderDetailFormatValid();
                    checkDetailsFormatValid();
                    checkHeaderNameFormatValid();
                    checkFixedValueFormatValid();
                } catch (err) {
                    alert(err.message);
                    return;
                }

                onConfirm(modifyDownloadHeaderDetailForm)
            },
            uploadSampleExcel: async ({
                formData
            }) => {
                await reqUploadSampleExcel({
                    formData,
                    successCallback: () => {
                        __handle.action.closeExcelUploaderModal();
                    }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div
                    className='title-box'
                >
                    <div className='title'>
                        다운로드 엑셀 양식을 <span className='accent-text'>설정</span>해 주세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <ControlGroup
                        className='mgl-flex'
                    >
                        <SingleBlockButton
                            type='button'
                            className='loadSampleExcel-button'
                            onClick={() => __handle.action.openLoadExistingMode()}
                        >
                            양식 불러오기
                        </SingleBlockButton>
                        <FlexBlock />
                        <SingleBlockButton
                            type='button'
                            className='uploadSampleExcel-button'
                            onClick={() => __handle.action.openExcelUploaderModal()}
                        >
                            양식 엑셀 업로드
                        </SingleBlockButton>
                    </ControlGroup>
                    <div className='content-group'>
                        <DragDropContext onDragEnd={(result) => onActionChangeOrder(result)}>
                            <Droppable droppableId={uuidv4()}>
                                {provided => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {modifyDownloadHeaderDetailForm?.details?.map((detail, index) => {
                                            return (
                                                <Draggable
                                                    key={detail.id}
                                                    draggableId={detail.id}
                                                    index={index}
                                                >
                                                    {(provided => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div
                                                                className='content-box mgl-flex mgl-flex-alignItems-center'
                                                            >
                                                                <div className='order-box'>
                                                                    <div className='icon-figure'>
                                                                        <Image
                                                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                                            src='/images/icon/arrowUpDown_default_808080.svg'
                                                                            layout='responsive'
                                                                            width={1}
                                                                            height={1}
                                                                            alt="close icon"
                                                                            loading="lazy"
                                                                        ></Image>
                                                                    </div>
                                                                </div>
                                                                <div className='number-box'>
                                                                    <div className='number'>
                                                                        {index + 1}.
                                                                    </div>
                                                                </div>
                                                                <div className='sub-content-box'>
                                                                    <div className='input-box'>
                                                                        <div className='input-label'>헤더명</div>
                                                                        <input
                                                                            type='text'
                                                                            className='input-el'
                                                                            name='headerName'
                                                                            placeholder="앞뒤 공백 제외 < 20 자"
                                                                            value={detail.headerName || ''}
                                                                            onChange={(e) => onChangeHeaderName(e, detail.id)}
                                                                            required
                                                                        ></input>
                                                                    </div>
                                                                    <div className='select-box'>
                                                                        <div className='select-label'>필드값</div>
                                                                        <CustomSelect
                                                                            className='select-el'
                                                                            onChange={(e) => onChangeTargetCellNumber(e, detail.id)}
                                                                            value={detail.targetCellNumber || ''}
                                                                            disabled={detail.targetCellNumber == '-1'}
                                                                        >
                                                                            {excelTranslatorHeader?.uploadHeaderDetail?.details?.map((uploadDetail) => {
                                                                                return (
                                                                                    <option
                                                                                        key={uploadDetail.id}
                                                                                        value={uploadDetail.cellNumber}
                                                                                    >
                                                                                        {uploadDetail.headerName}
                                                                                    </option>
                                                                                )
                                                                            })}
                                                                            <option value={'-1'}>고정값</option>
                                                                        </CustomSelect>
                                                                    </div>
                                                                    <div className='switch-box'>
                                                                        <div className='switch-label'>고정값 여부</div>
                                                                        {detail.targetCellNumber == '-1' ?
                                                                            <SingleBlockButton
                                                                                type='button'
                                                                                className='switch-el switch-on'
                                                                                onClick={() => onChangeFixedValueUsageOff(detail.id)}
                                                                            >
                                                                                ON
                                                                            </SingleBlockButton>
                                                                            :

                                                                            <SingleBlockButton
                                                                                type='button'
                                                                                className='switch-el switch-off'
                                                                                onClick={() => onChangeFixedValueUsageOn(detail.id)}
                                                                            >
                                                                                OFF
                                                                            </SingleBlockButton>
                                                                        }
                                                                    </div>
                                                                    <div className='input-box'>
                                                                        <div className='input-label'>고정값</div>
                                                                        <input
                                                                            type='text'
                                                                            className='input-el'
                                                                            name='fixedValue'
                                                                            placeholder="앞뒤 공백 제외 < 20 자"
                                                                            value={detail.fixedValue || ''}
                                                                            onChange={(e) => onChangeFixedValue(e, detail.id)}
                                                                            disabled={detail.targetCellNumber != '-1'}
                                                                        ></input>
                                                                    </div>
                                                                </div>
                                                                <div className='delete-button-box'>
                                                                    <SingleBlockButton
                                                                        type='button'
                                                                        className='delete-button'
                                                                        onClick={() => onActionDeleteDetail(detail.id)}
                                                                    >
                                                                        <div className='icon-figure'>
                                                                            <Image
                                                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                                                src='/images/icon/delete_default_e56767.svg'
                                                                                layout='responsive'
                                                                                width={1}
                                                                                height={1}
                                                                                alt="close icon"
                                                                                loading="lazy"
                                                                            ></Image>
                                                                        </div>
                                                                    </SingleBlockButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Draggable>

                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                                }
                            </Droppable>
                        </DragDropContext>

                        <div
                            className='mgl-flex mgl-flex-justifyContent-center'
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <SingleBlockButton
                                type='button'
                                className='add-button'
                                onClick={() => onActionAddDetails()}
                            >
                                <div className='icon-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src='/images/icon/add_default_ffffff.svg'
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        alt="close icon"
                                        loading="lazy"
                                    ></Image>
                                </div>
                            </SingleBlockButton>
                        </div>
                    </div>
                    <div className='button-group'>
                        <SingleBlockButton
                            type='button'
                            className='button-el'
                            style={{
                                background: '#959eae',
                                flex: 1
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-el'
                            style={{
                                background: 'var(--mainColor)',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </SingleBlockButton>
                    </div>
                </form>
            </Container>
            {loadExistingModeOpen &&
                (
                    <CommonModalComponent
                        open={loadExistingModeOpen}

                        onClose={__handle.action.closeLoadExistingMode}
                    >
                        <LoadExistingModalComponent
                            excelTranslatorHeaders={excelTranslatorHeaders}
                            onClose={__handle.action.closeLoadExistingMode}
                            onActionSelectExistingHeaderDetail={onActionSelectExistingHeaderDetail}
                        />
                    </CommonModalComponent>
                )
            }

            {excelUploaderModalOpen &&
                (
                    <CustomExcelFileUploader
                        open={excelUploaderModalOpen}

                        onClose={__handle.action.closeExcelUploaderModal}
                        onConfirm={__handle.submit.uploadSampleExcel}
                    />
                )
            }
        </>
    );
}