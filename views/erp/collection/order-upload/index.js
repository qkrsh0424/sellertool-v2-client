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
        onFillEmptyChannerOrderDate,
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
        datas = datas?.map(r => {
            return {
                ...r,
                channelOrderDate: isNaN(Date.parse(r.channelOrderDate)) ? null : new Date(r.channelOrderDate)
            }
        })

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
                    sidebarName={'통합 발주 관리'}
                    headerName={'주문수집'}
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
                            onActionFillEmptyChannerOrderDate={onFillEmptyChannerOrderDate}
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