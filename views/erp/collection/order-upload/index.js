import { useState } from "react";
import Layout from "../layout/Layout";
import useUploadDatasHook from "./hooks/useUploadDatasHook";
import { Container } from "./index.styled";
import UploadDataListFieldComponent from "./upload-data-list/UploadDataListField.component";
import UploadMethodControlComponent from "./upload-method-control/UploadMethodControl.component";
import BackdropLoadingComponent from "../../../modules/loading/BackdropLoadingComponent";

export default function MainComponent(props) {
    const [excelTranslatorHeader, setExcelTranslatorHeader] = useState(null);
    const [backdropOpen, setBackdropOpen] = useState(false);

    const {
        uploadDatas,
        reqUploadWithExcel,
        reqSaveUploadDatas,
        onSubmitUploadWithSingle,
        onDeleteUploadData,
        onDeleteUploadDataAll
    } = useUploadDatasHook();

    const handleChangeExcelTranslatorHeader = (data) => {
        setExcelTranslatorHeader(data);
    }

    const handleSubmitUploadWithExcel = async (formData, successCallback) => {
        formData.append('excelTranslatorHeaderId', excelTranslatorHeader?.id);

        handleOpenBackdrop();
        await reqUploadWithExcel(formData, () => { successCallback() });
        handleCloseBackdrop();
    }

    const handleSubmitSaveUploadDatas = async (datas) => {
        if (datas?.length <= 0) {
            return;
        }
        handleOpenBackdrop();

        await reqSaveUploadDatas(datas);
        handleCloseBackdrop();
    }

    const handleOpenBackdrop = () => {
        setBackdropOpen(true);
    }

    const handleCloseBackdrop = () => {
        setBackdropOpen(false);
    }
    return (
        <>
            <Container>
                <Layout
                    sidebarName={'발주관리'}
                    headerName={'발주업로드'}
                    sidebarColor={'#ffffff'}
                >
                    <>
                        <UploadMethodControlComponent
                            excelTranslatorHeader={excelTranslatorHeader}
                            onActionChangeExcelTranslatorHeader={handleChangeExcelTranslatorHeader}
                            onSubmitUploadWithExcel={handleSubmitUploadWithExcel}
                            onSubmitUploadWithSingle={onSubmitUploadWithSingle}
                        />
                        <UploadDataListFieldComponent
                            uploadDatas={uploadDatas}
                            onActionDeleteUploadData={onDeleteUploadData}
                            onActionDeleteUploadDataAll={onDeleteUploadDataAll}
                            onSubmitSaveUploadDatas={handleSubmitSaveUploadDatas}
                        />
                    </>
                </Layout>
            </Container>

            {backdropOpen &&
                <BackdropLoadingComponent
                    open={backdropOpen}
                />
            }
        </>
    );
}