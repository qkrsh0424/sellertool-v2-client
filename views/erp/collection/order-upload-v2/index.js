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
import { ManagedWorkspaceApisContextProvider } from "./contexts/ManagedWorkspaceApisContext";
import moment from "moment";



export default function MainComponent(props) {
    return (
        <>
            <ManagedWorkspaceApisContextProvider>
                <CoreComponent />
            </ManagedWorkspaceApisContextProvider>
        </>
    );
}

function CoreComponent() {
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
        onActionFillEmptyOrderNumber1,
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

        if (result?.content) {
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

    const handleBringErpItemsFromOtherWorkspace = async (erpItems) => {
        if (!erpItems || erpItems?.length <= 0) {
            return;
        }

        onPushList(erpItems?.map(r => {
            return {
                channelOrderDate: isNaN(Date.parse(r?.erpItem?.channelOrderDate)) ? null : moment(r?.erpItem?.channelOrderDate).format('YYYY-MM-DD HH:mm:ss'),
                prodName: r?.erpItemOrderInfo?.prodName || '',
                optionName: r?.erpItemOrderInfo?.optionName || '',
                unit: r?.erpItemOrderInfo?.unit || '',
                receiver: r?.erpItemReceiverInfo?.receiver || '',
                receiverContact1: r?.erpItemReceiverInfo?.receiverContact1 || '',
                receiverContact2: r?.erpItemReceiverInfo?.receiverContact2 || '',
                destination: r?.erpItemDeliveryInfo?.destination || '',
                destinationDetail: r?.erpItemDeliveryInfo?.destinationDetail || '',
                salesChannel: r?.erpItemOrderInfo?.salesChannel || '',
                orderNumber1: r?.erpItemOrderInfo?.orderNumber1 || '',
                orderNumber2: r?.erpItemOrderInfo?.orderNumber2 || '',
                channelProdCode: r?.erpItemOrderInfo?.channelProdCode || '',
                channelOptionCode: r?.erpItemOrderInfo?.channelOptionCode || '',
                zipCode: r?.erpItemDeliveryInfo?.zipCode || '',
                courier: r?.erpItemDeliveryInfo?.courier || '',
                transportType: r?.erpItemDeliveryInfo?.transportType || '',
                deliveryMessage: r?.erpItemDeliveryInfo?.deliveryMessage || '',
                waybillNumber: r?.erpItemDeliveryInfo?.waybillNumber || '',
                price: String(r?.erpItemOrderInfo.price) || '0',
                deliveryCharge: String(r?.erpItemOrderInfo.deliveryCharge) || '0',
                barcode: r?.erpItemOrderInfo.barcode || '',
                prodCode: r.productOption.prodCode,
                optionCode: r.productOption.code,
                releaseOptionCode: r.productOption.optionCode,
                releaseLocation: r.productOption.releaseLocation,
                managementMemo1: r.erpItemManagementMemo.managementMemo1,
                managementMemo2: r.erpItemManagementMemo.managementMemo2,
                managementMemo3: r.erpItemManagementMemo.managementMemo3,
                managementMemo4: r.erpItemManagementMemo.managementMemo4,
                managementMemo5: r.erpItemManagementMemo.managementMemo5,
                managementMemo6: r.erpItemManagementMemo.managementMemo6,
                managementMemo7: r.erpItemManagementMemo.managementMemo7,
                managementMemo8: r.erpItemManagementMemo.managementMemo8,
                managementMemo9: r.erpItemManagementMemo.managementMemo9,
                managementMemo10: r.erpItemManagementMemo.managementMemo10,
                id: uuidv4()
            }
        }))

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
                            onBringErpItemsFromOtherWorkspace={handleBringErpItemsFromOtherWorkspace}
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
                            onActionFillEmptyOrderNumber1={onActionFillEmptyOrderNumber1}
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