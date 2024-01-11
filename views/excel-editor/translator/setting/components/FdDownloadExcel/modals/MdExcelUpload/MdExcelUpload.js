import { useSelector } from "react-redux";
import CustomExcelFileUploader from "../../../../../../../../components/uploader/CustomExcelFileUploader";
import { useApiHook } from "../../../../hooks/useApiHook";
import { v4 as uuidv4 } from 'uuid';
import { customBackdropController } from "../../../../../../../../components/backdrop/default/v1";

export function MdExcelUpload({
    open,
    onClose,
    onSubmit
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const handleReqUploadExcel = async ({ formData }) => {
        customBackdropController().showBackdrop();
        await apiHook.reqUploadSettingExcel({ params: null, body: formData, headers: { wsId: wsId } }, (results, response) => {

            if (results) {
                let newExcelTranslatorDownloadHeaderList = results?.map((r, index) => {
                    return {
                        id: uuidv4(),
                        headerName: r?.headerName,
                        cellType: r?.cellType,
                        valueType: r?.valueType,
                        fixedValue: r?.fixedValue,
                        separator: r?.separator,
                        mappingValues: r?.mappingValues,
                        orderNumber: index
                    }
                })
                onSubmit(newExcelTranslatorDownloadHeaderList);
                onClose();
            }
        })
        customBackdropController().hideBackdrop();
    }

    return (
        <>
            <CustomExcelFileUploader
                open={open}
                onClose={() => onClose()}
                onConfirm={({ formData }) => handleReqUploadExcel({ formData: formData })}
            />
        </>
    );
}