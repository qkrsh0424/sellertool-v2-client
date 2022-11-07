import Image from "next/image";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import useModifyUploadHeaderDetailFormHook from "../hooks/useModifyUploadHeaderDetailFormHook";
import { Container, ControlGroup, FlexBlock, LoadExistingModeContainer, LoadExistingModeWrapper } from "../styles/ModifyUploadHeaderDetailModal.styled";
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from "react";
import CustomExcelFileUploader from "../../../modules/uploader/CustomExcelFileUploader";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import LoadExistingModalComponent from "./LoadExistingModal.component";

export default function ModifyUploadHeaderDetailsModalComponent({
    excelTranslatorHeaders,
    excelTranslatorHeader,
    onClose,
    onConfirm
}) {

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const {
        modifyUploadHeaderDetailForm,
        onActionSelectExistingHeaderDetail,
        reqUploadSampleExcel,
        onActionAddDetails,
        onActionDeleteDetail,
        onChangeHeaderName,
        onActionChangeOrder,
        checkUploadHeaderDetailFormatValid,
        checkDetailsFormatValid,
        checkHeaderNameFormatValid
    } = useModifyUploadHeaderDetailFormHook({
        excelTranslatorHeader: excelTranslatorHeader
    });
    const [loadExistingModeOpen, setLoadExistingModeOpen] = useState(false);

    const [excelUploaderModalOpen, setExcelUploaderModalOpen] = useState(false);

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
                    checkUploadHeaderDetailFormatValid();
                    checkDetailsFormatValid();
                    checkHeaderNameFormatValid();
                } catch (err) {
                    alert(err.message);
                    return;
                }

                onConfirm(modifyUploadHeaderDetailForm)
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
                        업로드 엑셀 양식을 <span className='accent-text'>설정</span>해 주세요.
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
                                        {modifyUploadHeaderDetailForm?.details?.map((detail, index) => {
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
                                                                <div className='input-box'>
                                                                    <div className='input-label'>헤더명</div>
                                                                    <input
                                                                        type='text'
                                                                        className='input-el'
                                                                        name='headerName'
                                                                        placeholder="앞뒤 공백 제외 1-20 자"
                                                                        value={detail.headerName || ''}
                                                                        onChange={(e) => onChangeHeaderName(e, detail.id)}
                                                                        required
                                                                    ></input>
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
                    <>
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
                    </>
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