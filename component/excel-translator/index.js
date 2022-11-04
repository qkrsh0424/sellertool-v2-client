import DownloadFieldComponent from "./download-field/DownloadField.component";
import HeadComponent from "./head/Head.component";
import HeaderSelectorComponent from "./header-selector/HeaderSelector.component";
import useExcelTranslatorHeaderHook from "./header-selector/hooks/useExcelTranslatorHeaderHook";
import useExcelTranslatorHeadersHook from "./header-selector/hooks/useExcelTranslatorHeadersHook";
import useViewExcelTranslatorHeaderIdsHook from "./header-selector/hooks/useViewExcelTranslatorHeaderIdsHook";
import { Container } from "./styles/Main.styled";
import UploadFieldComponent from "./upload-field/UploadField.component";

export default function MainComponent(props) {
    const {
        excelTranslatorHeaders,
        reqCreateExcelTranslatorHeader,
        reqModifyExcelTranslatorHeader,
        reqDeleteExcelTranslatorHeader,
        reqChangeUploadHeaderDetail,
        reqChangeDownloadHeaderDetail
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
                            excelTranslatorHeader={excelTranslatorHeader}

                            onSubmitModifyUploadHeaderDetail={__handle.submit.modifyUploadHeaderDetail}
                        />
                    )
                }
                {excelTranslatorHeader &&
                    (

                        <DownloadFieldComponent
                            excelTranslatorHeader={excelTranslatorHeader}

                            onSubmitModifyDownloadHeaderDetail={__handle.submit.modifyDownloadHeaderDetail}
                        />
                    )
                }
                je;p
            </Container>
        </>
    );
}