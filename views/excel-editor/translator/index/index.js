import Layout from "../../layout/Layout";
import { FdPreview } from "./components/FdPreview/FdPreview";
import { FdSelector } from "./components/FdSelector/FdSelector";
import { FdUploader } from "./components/FdUploader/FdUploader";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { useExcelTranslatorHook } from "./hooks/useExcelTranslatorHook";
import { customBackdropController } from "../../../../components/backdrop/default/v1";
import { useEffect } from "react";
import { ExcelTranslatorReactQuery } from "../../react-query/ExcelTranslatorReactQuery";

const excelTranslatorReactQuery = ExcelTranslatorReactQuery();

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const RQ_ExcelTranslatorList = excelTranslatorReactQuery.useFetchList({ headers: { wsId: wsId } });

    const excelTranslatorHook = useExcelTranslatorHook();

    useEffect(() => {
        if (RQ_ExcelTranslatorList?.data) {
            excelTranslatorHook?.onSetExcelTranslatorList(RQ_ExcelTranslatorList?.data?.data?.data);
        }
    }, [RQ_ExcelTranslatorList?.data])

    const handleReqUploadExcel = async (formData, successCallback) => {
        customBackdropController().showBackdrop();
        formData.append('excelTranslatorId', excelTranslatorHook?.selectedExcelTranslator?.id);
        await apiHook.reqUploadSourceExcel({ params: null, body: formData, headers: { wsId: wsId } }, (results, response) => {
            if (results) {
                excelTranslatorHook.onSetUploadHeaderList(results?.uploadHeaderList);
                excelTranslatorHook.onSetUploadRowDataList(results?.uploadRowDataList);
                excelTranslatorHook.onSetDownloadHeaderList(results?.downloadHeaderList);
                excelTranslatorHook.onSetDownloadRowDataList(results?.downloadRowDataList);
                successCallback();
            }
        });
        customBackdropController().hideBackdrop();
    }

    const handleReqDownloadExcel = async () => {
        let body = {
            excelTranslatorName: excelTranslatorHook?.selectedExcelTranslator?.name,
            downloadHeaderList: excelTranslatorHook?.downloadHeaderList,
            downloadRowDataList: excelTranslatorHook?.downloadRowDataList
        }

        customBackdropController().showBackdrop();
        await apiHook.reqDownloadResultExcel({ body: body, headers: { wsId: wsId } }, (results, response) => {
            console.log(`변환기 결과 엑셀 다운로드 상태: ${results}`);
        })
        customBackdropController().hideBackdrop();
    }

    const handleRefresh = () => {
        excelTranslatorHook.onSetUploadHeaderList(null);
        excelTranslatorHook.onSetUploadRowDataList(null);
        excelTranslatorHook.onSetDownloadHeaderList(null);
        excelTranslatorHook.onSetDownloadRowDataList(null);
    }

    if (RQ_ExcelTranslatorList.isLoading) {
        customBackdropController().showBackdrop();
    } else {
        customBackdropController().hideBackdrop();
    }

    return (
        <>
            <Layout
                sidebarColor={'#ffffff'}
                sidebarName={'엑셀 편집기'}
                headerName={'대시보드'}
            >
                <FdSelector
                    excelTranslatorList={excelTranslatorHook?.excelTranslatorList}
                    selectedExcelTranslator={excelTranslatorHook?.selectedExcelTranslator}
                    onSetSelectedExcelTranslator={excelTranslatorHook.onSetSelectedExcelTranslator}
                />
                {excelTranslatorHook?.selectedExcelTranslator &&
                    <>
                        <FdUploader
                            uploadHeaderList={excelTranslatorHook?.uploadHeaderList}
                            downloadHeaderList={excelTranslatorHook?.downloadHeaderList}
                            onReqUploadExcel={(formData, successCallback) => handleReqUploadExcel(formData, successCallback)}
                            onReqDownloadExcel={() => handleReqDownloadExcel()}
                            onRefresh={handleRefresh}
                        />
                        <FdPreview
                            selectedExcelTranslator={excelTranslatorHook?.selectedExcelTranslator}
                            uploadHeaderList={excelTranslatorHook?.uploadHeaderList}
                            uploadRowDataList={excelTranslatorHook?.uploadRowDataList}
                            downloadHeaderList={excelTranslatorHook?.downloadHeaderList}
                            downloadRowDataList={excelTranslatorHook?.downloadRowDataList}
                        />
                    </>
                }
            </Layout>
        </>
    );
}