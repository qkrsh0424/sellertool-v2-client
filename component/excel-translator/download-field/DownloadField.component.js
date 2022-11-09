import Image from "next/image";
import { useEffect, useState } from "react";
import valueUtils from "../../../utils/valueUtils";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../modules/modal/CommonModalComponent";
import ResizableTh from "../../modules/table/ResizableTh";
import ModifyDownloadHeaderDetailsModalComponent from "./modal/ModifyDownloadHeaderDetailsModal.component";
import { ButtonGroup, Container, TableBox, TableWrapper, Title, Wrapper } from "./styles/DownloadField.styled";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import useDisabledBtn from "../../../hooks/button/useDisabledBtn";
import { BackdropHookComponent, useBackdropHook } from "../../../hooks/backdrop/useBackdropHook";
import LoadExistingModalComponent from "./modal/LoadExistingModal.component";

export default function DownloadFieldComponent({
    excelTranslatorHeaders,
    excelTranslatorHeader,
    excelTranslatorDatas,
    onSubmitModifyDownloadHeaderDetail,
    onSubmitDownloadDataExcel,
    onSubmitDownloadSampleExcelForDownloadHeader
}) {
    const [modifyDownloadHeaderDetailsModalOpen, setModifyDownloadHeaderDetailsModalOpen] = useState(false);
    const [downloadExcelDatas, setDownloadExcelDatas] = useState(null);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const {
        open: backdropOpen,
        onActionOpen: onActionOpenBackdrop,
        onActionClose: onActionCloseBackdrop
    } = useBackdropHook();

    useEffect(() => {
        if (!excelTranslatorDatas || !excelTranslatorHeader?.downloadHeaderDetail?.details) {
            setDownloadExcelDatas(null);
            return;
        }

        __handle.action.setDownloadExcelDatas();

    }, [excelTranslatorDatas, excelTranslatorHeader?.downloadHeaderDetail?.details]);

    const __handle = {
        action: {
            openModifyDownloadHeaderDetailsModal: () => {
                if (valueUtils.isEmptyValues(excelTranslatorHeader?.uploadHeaderDetail?.details)) {
                    alert('업로드 엑셀 양식을 먼저 설정해 주세요.');
                    return;
                }
                setModifyDownloadHeaderDetailsModalOpen(true);
            },
            closeModifyDownloadHeaderDetailsModal: () => {
                setModifyDownloadHeaderDetailsModalOpen(false);
            },
            setDownloadExcelDatas: () => {
                let datas = [];

                for (let i = 0; i < excelTranslatorDatas.length; i++) {
                    let detailDatas = [];
                    for (let j = 0; j < excelTranslatorHeader?.downloadHeaderDetail?.details.length; j++) {
                        if (excelTranslatorHeader?.downloadHeaderDetail?.details[j].targetCellNumber == '-1') {
                            let detailData = {
                                id: uuidv4(),
                                colData: excelTranslatorHeader?.downloadHeaderDetail?.details[j].fixedValue,
                                cellType: 'String'
                            }

                            detailDatas.push(detailData);
                        } else {
                            let detailData = {
                                id: uuidv4(),
                                colData: excelTranslatorDatas[i].details[excelTranslatorHeader?.downloadHeaderDetail?.details[j].targetCellNumber].colData,
                                cellType: excelTranslatorDatas[i].details[excelTranslatorHeader?.downloadHeaderDetail?.details[j].targetCellNumber].cellType
                            }
                            detailDatas.push(detailData);
                        }
                    }

                    datas.push({
                        id: uuidv4(),
                        details: detailDatas
                    });
                }

                setDownloadExcelDatas(datas);
            }
        },
        submit: {
            modifyDownloadHeaderDetail: (downloadHeaderDetail) => {
                let body = {
                    id: excelTranslatorHeader.id,
                    downloadHeaderDetail: downloadHeaderDetail
                }

                onSubmitModifyDownloadHeaderDetail({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyDownloadHeaderDetailsModal();
                    }
                })
            },
            downloadDataExcel: async () => {
                setDisabledBtn(true);
                if (!excelTranslatorDatas || !downloadExcelDatas) {
                    return;
                }

                // 엑셀 헤더 데이터 생성
                let headerDetails = excelTranslatorHeader?.downloadHeaderDetail?.details.map(r => {
                    return {
                        id: uuidv4(),
                        colData: r.headerName,
                        cellType: 'String'
                    }
                })

                let datas = _.cloneDeep(downloadExcelDatas);
                datas.unshift({
                    id: uuidv4(),
                    details: headerDetails
                });

                let body = {
                    uploadHeaderTitle: excelTranslatorHeader.uploadHeaderTitle,
                    downloadHeaderTitle: excelTranslatorHeader.downloadHeaderTitle,
                    excelTranslatorDatas: datas
                };

                onActionOpenBackdrop();
                await onSubmitDownloadDataExcel({
                    body: body,
                    successCallback: () => {
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
                        다운로드 엑셀
                    </Title>
                    <ButtonGroup>
                        <div className='wrapper'>
                            <SingleBlockButton
                                type='button'
                                className='box-button'
                                onClick={() => __handle.submit.downloadDataExcel()}
                                disabled={disabledBtn}
                            >
                                엑셀 다운로드
                            </SingleBlockButton>
                            <div className='mgl-flex'>
                                <SingleBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => onSubmitDownloadSampleExcelForDownloadHeader()}
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
                                    onClick={() => __handle.action.openModifyDownloadHeaderDetailsModal()}
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
                    {!valueUtils.isEmptyValues(excelTranslatorHeader?.downloadHeaderDetail?.details) &&
                        (
                            <Table
                                downloadHeaderDetail={excelTranslatorHeader?.downloadHeaderDetail}
                                downloadExcelDatas={downloadExcelDatas}
                            />
                        )
                    }
                    {valueUtils.isEmptyValues(excelTranslatorHeader?.downloadHeaderDetail?.details) &&
                        (
                            <TableWrapper>
                                <div className='empty-box'>
                                    <div className='text'>
                                        <span className='accent'>다운로드 엑셀 &gt; 우측 상단</span>
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

            {modifyDownloadHeaderDetailsModalOpen &&
                <CommonModalComponent
                    open={modifyDownloadHeaderDetailsModalOpen}
                    maxWidth={'lg'}

                    onClose={__handle.action.closeModifyDownloadHeaderDetailsModal}
                >
                    <ModifyDownloadHeaderDetailsModalComponent
                        excelTranslatorHeaders={excelTranslatorHeaders}
                        excelTranslatorHeader={excelTranslatorHeader}
                        onClose={__handle.action.closeModifyDownloadHeaderDetailsModal}
                        onConfirm={__handle.submit.modifyDownloadHeaderDetail}
                    />
                </CommonModalComponent>
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
    downloadHeaderDetail,
    downloadExcelDatas
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <TableHead
                        downloadHeaderDetail={downloadHeaderDetail}
                    />
                    <tbody>
                        {downloadExcelDatas?.map((r, index) => {
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
    downloadHeaderDetail
}) {
    return (
        <thead>
            <tr>
                {downloadHeaderDetail?.details?.map((r, index) => {
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