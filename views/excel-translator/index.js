import DownloadFieldComponent from "./download-field/DownloadField.component";
import HeadComponent from "./head/Head.component";
import HeaderSelectorComponent from "./header-selector/HeaderSelector.component";
import useExcelTranslatorDatasHook from "./hooks/useExcelTranslatorDatasHook";
import useExcelTranslatorHeaderHook from "./hooks/useExcelTranslatorHeaderHook";
import useExcelTranslatorHeadersHook from "./hooks/useExcelTranslatorHeadersHook";
import useViewExcelTranslatorHeaderIdsHook from "./hooks/useViewExcelTranslatorHeaderIdsHook";
import { Container } from "./styles/Main.styled";
import UploadFieldComponent from "./upload-field/UploadField.component";

export default function MainComponent(props) {
    const {
        excelTranslatorHeaders,
        reqCreateExcelTranslatorHeader,
        reqModifyExcelTranslatorHeader,
        reqDeleteExcelTranslatorHeader,
        reqChangeUploadHeaderDetail,
        reqChangeDownloadHeaderDetail,
        reqDownloadSampleExcelForUploadHeader,
        reqDownloadSampleExcelForDownloadHeader
    } = useExcelTranslatorHeadersHook();

    const {
        excelTranslatorHeader,
    } = useExcelTranslatorHeaderHook({
        excelTranslatorHeaders: excelTranslatorHeaders
    });

    const {
        viewExcelTranslatorHeaderIds,
        onSetViewExcelTranslatorHeaderIds
    } = useViewExcelTranslatorHeaderIdsHook({
        excelTranslatorHeaders: excelTranslatorHeaders
    });

    const {
        excelTranslatorDatas,
        reqUploadData,
        reqDownloadData
    } = useExcelTranslatorDatasHook({
        excelTranslatorHeader: excelTranslatorHeader
    });

    const __handle = {
        submit: {
            createExcelTranslatorHeader: async ({
                body,
                successCallback
            }) => {
                await reqCreateExcelTranslatorHeader({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            modifyExcelTranslatorHeader: async ({
                body,
                successCallback
            }) => {
                await reqModifyExcelTranslatorHeader({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            deleteExcelTranslatorHeader: async ({
                body,
                successCallback
            }) => {
                await reqDeleteExcelTranslatorHeader({
                    body: body,
                    successCallback: () => {
                        successCallback();

                        // 로컬스토리지에 저장된 헤더 아이디를 제거한다.
                        let viewExcelTranslatorIds = viewExcelTranslatorHeaderIds.filter(r => r !== body.id);
                        onSetViewExcelTranslatorHeaderIds({
                            body: viewExcelTranslatorIds,
                            successCallback: () => { }
                        });
                    }
                })
            },
            modifyViewExcelTranslatorHeaderIds: ({
                body,
                successCallback
            }) => {
                onSetViewExcelTranslatorHeaderIds({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            modifyUploadHeaderDetail: async ({
                body,
                successCallback
            }) => {
                await reqChangeUploadHeaderDetail({
                    body: body,
                    successCallback: () => {
                        alert('업로드 엑셀 양식이 변경되어 다운로드 엑셀 양식이 초기화 됩니다.');
                        successCallback();
                    }
                })
            },
            modifyDownloadHeaderDetail: async ({
                body,
                successCallback
            }) => {
                await reqChangeDownloadHeaderDetail({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            uploadDataExcel: async ({
                formData,
                successCallback
            }) => {
                await reqUploadData({
                    formData: formData,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            downloadDataExcel: async ({
                body,
                successCallback
            }) => {
                await reqDownloadData({
                    body: body,
                    successCallback: () => {
                        successCallback();
                    }
                })
            },
            downloadSampleExcelForUploadHeader: async () => {
                if (!excelTranslatorHeader?.uploadHeaderDetail?.details) {
                    alert('업로드 엑셀 양식을 먼저 설정해 주세요.');
                    return;
                }

                let body = {
                    excelTranslatorHeaderId: excelTranslatorHeader.id
                }

                await reqDownloadSampleExcelForUploadHeader({
                    body,
                    successCallback: () => { }
                })
            },
            downloadSampleExcelForDownloadHeader: async () => {
                if (!excelTranslatorHeader?.downloadHeaderDetail?.details) {
                    alert('다운로드 엑셀 양식을 먼저 설정해 주세요.');
                    return;
                }

                let body = {
                    excelTranslatorHeaderId: excelTranslatorHeader.id
                }

                await reqDownloadSampleExcelForDownloadHeader({
                    body,
                    successCallback: () => { }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <HeadComponent />
                <HeaderSelectorComponent
                    excelTranslatorHeaders={excelTranslatorHeaders}
                    excelTranslatorHeader={excelTranslatorHeader}

                    viewExcelTranslatorHeaderIds={viewExcelTranslatorHeaderIds}
                    onSubmitCreateExcelTranslatorHeader={__handle.submit.createExcelTranslatorHeader}
                    onSubmitModifyExcelTranslatorHeader={__handle.submit.modifyExcelTranslatorHeader}
                    onSubmitDeleteExcelTranslatorHeader={__handle.submit.deleteExcelTranslatorHeader}
                    onSubmitModifyViewExcelTranslatorHeaderIds={__handle.submit.modifyViewExcelTranslatorHeaderIds}

                />
                {excelTranslatorHeader &&
                    (
                        <UploadFieldComponent
                            excelTranslatorHeaders={excelTranslatorHeaders}
                            excelTranslatorHeader={excelTranslatorHeader}
                            excelTranslatorDatas={excelTranslatorDatas}

                            onSubmitModifyUploadHeaderDetail={__handle.submit.modifyUploadHeaderDetail}
                            onSubmitUploadDataExcel={__handle.submit.uploadDataExcel}
                            onSubmitDownloadSampleExcelForUploadHeader={__handle.submit.downloadSampleExcelForUploadHeader}
                        />
                    )
                }
                {excelTranslatorHeader &&
                    (

                        <DownloadFieldComponent
                            excelTranslatorHeaders={excelTranslatorHeaders}
                            excelTranslatorHeader={excelTranslatorHeader}
                            excelTranslatorDatas={excelTranslatorDatas}

                            onSubmitModifyDownloadHeaderDetail={__handle.submit.modifyDownloadHeaderDetail}
                            onSubmitDownloadDataExcel={__handle.submit.downloadDataExcel}
                            onSubmitDownloadSampleExcelForDownloadHeader={__handle.submit.downloadSampleExcelForDownloadHeader}
                        />
                    )
                }
            </Container>
        </>
    );
}