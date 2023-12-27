import { useEffect } from "react";
import Layout from "../../layout/Layout";
import { FdPreview } from "./components/FdPreview/FdPreview";
import { FdSelector } from "./components/FdSelector/FdSelector";
import { FdUploader } from "./components/FdUploader/FdUploader";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { useExcelTranslatorHook } from "./hooks/useExcelTranslatorHook";
import { customBackdropController } from "../../../../components/backdrop/default/v1";

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const excelTranslatorHook = useExcelTranslatorHook();

    useEffect(() => {
        if (!wsId) {
            return;
        }
        handleReqFetchExcelTranslatorList();
    }, [wsId]);

    const handleReqFetchExcelTranslatorList = async () => {
        await apiHook.reqFetchExcelTranslatorList({ headers: { wsId: wsId } },
            (results) => {
                excelTranslatorHook.onSetExcelTranslatorList(results);
            }
        )
    }

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
            console.log(results);
        })
        customBackdropController().hideBackdrop();
    }

    const handleRefresh = () => {
        excelTranslatorHook.onSetUploadHeaderList(null);
        excelTranslatorHook.onSetUploadRowDataList(null);
        excelTranslatorHook.onSetDownloadHeaderList(null);
        excelTranslatorHook.onSetDownloadRowDataList(null);
    }
    return (
        <>
            <Layout
                sidebarColor={'#ffffff'}
                sidebarName={'엑셀 편집기'}
                headerName={'대시보드'}
            >
                <FdSelector
                    excelTranslatorList={excelTranslatorHook.excelTranslatorList}
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