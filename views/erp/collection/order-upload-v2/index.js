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
import { customSignitureUtils } from "../../../../utils/customSignitureUtils";
import { FdTemporaryErpItem } from "./components/FdTemporaryErpItem/FdTemporaryErpItem";
import { v4 as uuidv4 } from 'uuid';

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const excelTranslatorHook = useExcelTranslatorHook();
    const {
        uploadDatas,
        reqUploadWithExcel,
        reqSaveUploadDatas,
        onPushList,
        onFillEmptyChannerOrderDate,
        onSubmitUploadWithSingle,
        onDeleteUploadData,
        onDeleteUploadDataAll
    } = useUploadDatasHook();

    const [apiKey, setApiKey] = useState(null);
    const [temporaryErpItemList, setTemporaryErpItemList] = useState(null);

    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function fetch() {
            reqFetchExcelTranslatorList();
            reqFetchApiKey();
        }

        fetch();
    }, [wsId]);

    useEffect(() => {
        if (apiKey) {
            reqFetchTemporaryErpItemList();
        }
    }, [apiKey]);

    const reqFetchApiKey = async () => {
        let headers = {
            wsId: wsId
        }

        const result = await apiHook.reqFetchWorkspaceApi({ headers });

        if (result?.content) {
            setApiKey(result?.content)
        }
    }

    const reqFetchExcelTranslatorList = async () => {
        let { results, response } = await apiHook.reqFetchExcelTranslatorList({ headers: { wsId: wsId } });
        if (results) {
            excelTranslatorHook.onSetExcelTranslatorList(results);
        }
    }

    const reqFetchTemporaryErpItemList = async () => {
        const timestamp = Date.now().toString();
        const signiture = customSignitureUtils.generateSigniture({ apiKey: apiKey?.apiKey, secretKey: apiKey?.secretKey, timestamp: timestamp })
        let headers = customSignitureUtils.makeHeaders({ apiKey: apiKey?.apiKey, timestamp: timestamp, signiture: signiture });

        const result = await apiHook.reqFetchTemporaryErpItemList({ headers: headers });

        if (result?.content) {
            setTemporaryErpItemList(result?.content);
        }
    }

    const reqDeleteTemporaryErpItemList = async () => {
        handleOpenBackdrop();
        const timestamp = Date.now().toString();
        const signiture = customSignitureUtils.generateSigniture({ apiKey: apiKey?.apiKey, secretKey: apiKey?.secretKey, timestamp: timestamp })
        let headers = customSignitureUtils.makeHeaders({ apiKey: apiKey?.apiKey, timestamp: timestamp, signiture: signiture });

        const result = await apiHook.reqDeleteTemporaryErpItemList({ headers: headers })

        if(result?.content){
            alert(`${result?.content} 건의 임시 주문건을 삭제 했습니다.`)
            setTemporaryErpItemList(null);
        }
        handleCloseBackdrop();
    }

    const handleLoadTemporaryErpItemList = async () => {
        handleOpenBackdrop();
        onPushList(temporaryErpItemList?.map(r => ({ ...r, id: uuidv4() })));
        handleCloseBackdrop();
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
                        {temporaryErpItemList &&
                            <FdTemporaryErpItem
                                temporaryErpItemList={temporaryErpItemList}
                                onLoadTemporaryErpItemList={handleLoadTemporaryErpItemList}
                                onReqDeleteTemporaryErpItemList={reqDeleteTemporaryErpItemList}
                            />
                        }
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