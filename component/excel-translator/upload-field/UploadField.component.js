import Image from "next/image";
import { useState } from "react";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import { dateToYYMMDDhhmmss } from "../../../utils/dateFormatUtils";
import valueUtils from "../../../utils/valueUtils";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../modules/modal/CommonModalComponent";
import ResizableTh from "../../modules/table/ResizableTh";
import CustomExcelFileUploader from "../../modules/uploader/CustomExcelFileUploader";
import ModifyUploadHeaderDetailsModalComponent from "./modal/ModifyUploadHeaderDetailsModal.component";
import { ButtonGroup, Container, TableBox, TableWrapper, Title, Wrapper } from "./styles/UploadField.styled";

export default function UploadFieldComponent({
    excelTranslatorHeaders,
    excelTranslatorHeader,
    excelTranslatorDatas,
    onSubmitModifyUploadHeaderDetail,
    onSubmitUploadDataExcel,
    onSubmitDownloadSampleExcelForUploadHeader
}) {
    const [modifyUploadHeaderDetailsModalOpen, setModifyUploadHeaderDetailsModalOpen] = useState(false);
    const [excelUploaderModalOpen, setExcelUploaderModalOpen] = useState(false);
    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    const __handle = {
        action: {
            openModifyUploadHeaderDetailsModal: () => {
                setModifyUploadHeaderDetailsModalOpen(true);
            },
            closeModifyUploadHeaderDetailsModal: () => {
                setModifyUploadHeaderDetailsModalOpen(false);
            },
            openExcelUploaderModal: () => {
                setExcelUploaderModalOpen(true);
            },
            closeExcelUploaderModal: () => {
                setExcelUploaderModalOpen(false);
            }
        },
        submit: {
            modifyUploadHeaderDetail: (uploadHeaderDetail) => {
                let body = {
                    id: excelTranslatorHeader.id,
                    uploadHeaderDetail: uploadHeaderDetail
                }

                onSubmitModifyUploadHeaderDetail({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyUploadHeaderDetailsModal();
                    }
                })
            },
            uploadDataExcel: async ({
                formData
            }) => {
                onActionOpenBackdrop();
                await onSubmitUploadDataExcel({
                    formData: formData,
                    successCallback: () => {
                        __handle.action.closeExcelUploaderModal();
                    }
                })
                onActionCloseBackdrop();
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>
                        업로드 엑셀
                    </Title>
                    <ButtonGroup>
                        <div className='wrapper'>
                            <SingleBlockButton
                                type='button'
                                className='box-button'
                                onClick={() => __handle.action.openExcelUploaderModal()}
                            >
                                엑셀 업로드
                            </SingleBlockButton>
                            <div className='mgl-flex'>
                                <SingleBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => onSubmitDownloadSampleExcelForUploadHeader()}
                                >
                                    <div className='button-icon-figure'>
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                            src={'/images/icon/download_default_808080.svg'}
                                            layout='responsive'
                                            width={1}
                                            height={1}
                                            objectFit={'cover'}
                                            alt='image'
                                            loading='lazy'
                                        ></Image>
                                    </div>
                                </SingleBlockButton>
                                <SingleBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => __handle.action.openModifyUploadHeaderDetailsModal()}
                                >
                                    <div className='button-icon-figure'>
                                        <Image
                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                            src={'/images/icon/settings_default_808080.svg'}
                                            layout='responsive'
                                            width={1}
                                            height={1}
                                            objectFit={'cover'}
                                            alt='image'
                                            loading='lazy'
                                        ></Image>
                                    </div>
                                </SingleBlockButton>
                            </div>
                        </div>
                    </ButtonGroup>
                    {!valueUtils.isEmptyValues(excelTranslatorHeader?.uploadHeaderDetail?.details) &&
                        (
                            <Table
                                uploadHeaderDetail={excelTranslatorHeader?.uploadHeaderDetail}
                                excelTranslatorDatas={excelTranslatorDatas}
                            />
                        )
                    }
                    {valueUtils.isEmptyValues(excelTranslatorHeader?.uploadHeaderDetail?.details) &&
                        (
                            <TableWrapper>
                                <div className='empty-box'>
                                    <div className='text'>
                                        <span className='accent'>업로드 엑셀 &gt; 우측 상단</span>
                                        <div className='icon-figure'>
                                            <Image
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src={'/images/icon/settings_default_808080.svg'}
                                                layout='responsive'
                                                width={1}
                                                height={1}
                                                objectFit={'cover'}
                                                alt='image'
                                                loading='lazy'
                                            ></Image>
                                        </div>
                                        <span className='accent'>버튼</span>
                                    </div>
                                    <div className='text'>
                                        을 통해 양식을 먼저 설정해 주세요.
                                    </div>
                                </div>
                            </TableWrapper>
                        )
                    }
                </Wrapper>
            </Container>

            {modifyUploadHeaderDetailsModalOpen &&
                <CommonModalComponent
                    open={modifyUploadHeaderDetailsModalOpen}

                    onClose={__handle.action.closeModifyUploadHeaderDetailsModal}
                >
                    <ModifyUploadHeaderDetailsModalComponent
                        excelTranslatorHeaders={excelTranslatorHeaders}
                        excelTranslatorHeader={excelTranslatorHeader}
                        onClose={__handle.action.closeModifyUploadHeaderDetailsModal}
                        onConfirm={__handle.submit.modifyUploadHeaderDetail}
                    />
                </CommonModalComponent>
            }

            {excelUploaderModalOpen &&
                (
                    <CustomExcelFileUploader
                        open={excelUploaderModalOpen}

                        onClose={__handle.action.closeExcelUploaderModal}
                        onConfirm={__handle.submit.uploadDataExcel}
                    />
                )
            }

            {backdropOpen &&
                (
                    <BackdropHookComponent
                        open={backdropOpen}
                        onClose={() => { }}
                    />
                )
            }
        </>
    );
}

function Table({
    uploadHeaderDetail,
    excelTranslatorDatas
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <TableHead
                        uploadHeaderDetail={uploadHeaderDetail}
                    />
                    <tbody>
                        {excelTranslatorDatas?.map((r, index) => {
                            return (
                                <tr
                                    key={r.id}
                                >
                                    {r?.details?.map(detail => {
                                        return (
                                            <td key={detail.id}>
                                                <span>{detail.cellType === 'Date' ? dateToYYMMDDhhmmss(detail.colData) : detail.colData}</span>
                                            </td>

                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper>
    );
}

function TableHead({
    uploadHeaderDetail
}) {
    return (
        <thead>
            <tr>
                {uploadHeaderDetail?.details?.map((r, index) => {
                    return (
                        <ResizableTh
                            key={index}
                            className="fixed-header"
                            scope="col"
                            width={150}
                            style={{
                                zIndex: '10'
                            }}
                        >
                            {r.headerName}
                        </ResizableTh>
                    )
                })}
            </tr>
        </thead>
    );
}