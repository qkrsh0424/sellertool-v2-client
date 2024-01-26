import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import useUploadDatasHook from "./hooks/useUploadDatasHook";
import { Container } from "./index.styled";
import UploadDataListFieldComponent from "./upload-data-list/UploadDataListField.component";
import UploadMethodControlComponent from "./upload-method-control/UploadMethodControl.component";
import BackdropLoadingComponent from "../../../modules/loading/BackdropLoadingComponent";
import TipFieldComponent from "./tip-field/TipField.component";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { useExcelTranslatorHook } from "./hooks/useExcelTranslatorHook";

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const excelTranslatorHook = useExcelTranslatorHook();
    const {
        uploadDatas,
        reqUploadWithExcel,
        reqSaveUploadDatas,
        onFillEmptyChannerOrderDate,
        onSubmitUploadWithSingle,
        onDeleteUploadData,
        onDeleteUploadDataAll
    } = useUploadDatasHook();

    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function fetch() {
            handleReqFetchExcelTranslatorList();
        }

        fetch();
    }, [wsId]);

    const handleReqFetchExcelTranslatorList = async () => {
        let { results, response } = await apiHook.reqFetchExcelTranslatorList({ headers: { wsId: wsId } });
        if (results) {
            excelTranslatorHook.onSetExcelTranslatorList(results);
        }
    }


    const handleSubmitUploadWithExcel = async (formData, successCallback) => {
        formData.append('workspaceId', wsId);
        formData.append('excelTranslatorId', excelTranslatorHook?.selectedExcelTranslator?.id);

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
                        <TipFieldComponent />
                        <UploadMethodControlComponent
                            excelTranslatorList={excelTranslatorHook?.excelTranslatorList}
                            selectedExcelTranslator={excelTranslatorHook?.selectedExcelTranslator}
                            onChangeSelectedExcelTranslator={excelTranslatorHook.onSetSelectedExcelTranslator}
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