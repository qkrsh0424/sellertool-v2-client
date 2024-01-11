import { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { useSelector } from "react-redux";
import { useApiHook } from "./hooks/useApiHook";
import { customToast } from "../../../../components/toast/custom-react-toastify/v1";
import { useRouter } from "next/router";
import { useCdnHook } from "./hooks/useCdnHook";
import { ExcelTranslatorReferenceHeaderBucketListProvider, useExcelTranslatorReferenceHeaderBucketListActionsHook } from "./contexts/ExcelTranslatorReferenceHeaderBucketListProvider";
import { FdSelector } from "./components/FdSelector/FdSelector";
import { useExcelTranslatorHook } from "./hooks/useExcelTranslatorHook";
import { FdEditName } from "./components/FdEditName/FdEditName";
import { FdFloatingButton } from "./components/FdFloatingButton/FdFloatingButton";
import { FdDelete } from "./components/FdDelete/FdDelete";
import { customBackdropController } from "../../../../components/backdrop/default/v1";
import { FdDownloadExcel } from "./components/FdDownloadExcel/FdDownloadExcel";
import { FdMode } from "./components/FdMode/FdMode";

const VALUE_TYPE = {
    FIXED: 'FIXED',
    MAPPING: 'MAPPING'
}

const MODE = {
    EDIT: 'EDIT',
    DELETE: 'DELETE'
}

export default function MainComponent(props) {
    return (
        <ExcelTranslatorReferenceHeaderBucketListProvider>
            <MainComponentCore />
        </ExcelTranslatorReferenceHeaderBucketListProvider>
    );
}

function MainComponentCore() {
    const router = useRouter();
    const excelTranslatorId = router?.query?.excelTranslatorId;
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const excelTranslatorHook = useExcelTranslatorHook();

    const [enabledDnd, setEnabledDnd] = useState(false);
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [mode, setMode] = useState(MODE.EDIT);

    useEffect(() => {
        const animation = window.requestAnimationFrame(() => setEnabledDnd(true));

        return () => {
            window.cancelAnimationFrame(animation);
            setEnabledDnd(false);
        };
    }, []);

    // fetch excelTranslatorList
    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function fetchExcelTranslatorList() {
            await apiHook.reqFetchExcelTranslatorList({ headers: { wsId: wsId } }, (results, response) => {
                if (results) {
                    excelTranslatorHook.onSetExcelTranslatorList(results);
                }
            });
        }

        fetchExcelTranslatorList();

        return () => {
            excelTranslatorHook.onSetExcelTranslatorList(null);
        }
    }, [wsId]);


    useEffect(() => {
        if (!excelTranslatorId || !excelTranslatorHook?.excelTranslatorList) {
            return;
        }

        const selectedExcelTranslator = excelTranslatorHook?.excelTranslatorList?.find(r => r.id === excelTranslatorId);

        if (selectedExcelTranslator) {
            excelTranslatorHook.onSetSelectedExcelTranslator(selectedExcelTranslator);
        }

        return () => {
            excelTranslatorHook.onSetSelectedExcelTranslator(null);
        };
    }, [excelTranslatorId, excelTranslatorHook?.excelTranslatorList])

    const toggleDisabledSubmit = (bool) => {
        setDisabledSubmit(bool)
    }

    const handleChangeMode = (mode) => {
        setMode(mode);
    }

    const handleChangeExcelTranslatorNameFromEvent = (e) => {
        let value = e.target.value;
        excelTranslatorHook?.onSetSelectedExcelTranslator(prev => {
            return {
                ...prev,
                name: value
            }
        })
    }

    const handleSetExcelTranslatorDownloadHeaderList = (excelTranslatorDownloadHeaderList) => {
        let newSelectedExcelTranslator = {
            ...excelTranslatorHook?.selectedExcelTranslator,
            excelTranslatorDownloadHeaderList: [...excelTranslatorDownloadHeaderList]
        }

        excelTranslatorHook.onSetSelectedExcelTranslator(newSelectedExcelTranslator);
    }

    const handleReqUpdate = async () => {
        let excelTranslatorName = excelTranslatorHook?.selectedExcelTranslator?.name;
        let excelTranslatorDownloadHeaderList = excelTranslatorHook?.selectedExcelTranslator?.excelTranslatorDownloadHeaderList;

        try {
            checkCreateForm({ excelTranslatorName: excelTranslatorName, excelTranslatorDownloadHeaderList: excelTranslatorDownloadHeaderList });
        } catch (err) {
            customToast.error(err.message);
            return;
        }

        let newExcelTranslatorName = excelTranslatorName.trim();
        let newExcelTranslatorDownloadHeaderList = excelTranslatorDownloadHeaderList?.map((r, index) => {
            let mappingValueList = r?.mappingValues ? JSON.parse(r?.mappingValues) : [];
            return {
                ...r,
                headerName: r?.headerName?.trim(),
                fixedValue: r?.fixedValue?.trim(),
                mappingValues: JSON.stringify(mappingValueList?.map(r => r?.trim())),
                orderNumber: index
            }
        })

        const body = {
            ...excelTranslatorHook?.selectedExcelTranslator,
            name: newExcelTranslatorName,
            downloadHeaderCount: newExcelTranslatorDownloadHeaderList?.length,
            excelTranslatorDownloadHeaderList: newExcelTranslatorDownloadHeaderList,
        }

        await apiHook.reqUpdateExcelTranslator({ body: body, headers: { wsId: wsId } }, (results, response) => {
            router.replace({
                pathname: '/excel-editor/translator'
            })
        })
    }

    const handleReqDelete = async ({ successCallback }) => {
        let body = {
            id: excelTranslatorHook?.selectedExcelTranslator?.id
        }

        customBackdropController().showBackdrop();
        await apiHook.reqDeleteExcelTranslator({ body: body, headers: { wsId: wsId } }, (results, response) => {
            if (results) {
                successCallback();
                router.replace({
                    pathname: '/excel-editor/translator'
                })
            }
        });
        customBackdropController().hideBackdrop();
    }

    if (!enabledDnd) {
        return null;
    }

    return (
        <>
            <ContextFetch />
            <Layout
                sidebarColor={'#ffffff'}
                sidebarName={'엑셀 편집기'}
                headerName={'수정 및 삭제'}
            >
                {enabledDnd &&
                    <>
                        <FdMode
                            mode={mode}
                            onChangeMode={handleChangeMode}
                        />
                        <FdSelector
                            excelTranslatorList={excelTranslatorHook?.excelTranslatorList}
                        />
                        {excelTranslatorHook?.selectedExcelTranslator &&
                            <>
                                {mode === MODE.EDIT &&
                                    <>
                                        <FdEditName
                                            excelTranslatorName={excelTranslatorHook?.selectedExcelTranslator?.name}
                                            onChangeExcelTranslatorNameFromEvent={handleChangeExcelTranslatorNameFromEvent}
                                        />
                                        <FdDownloadExcel
                                            excelTranslatorDownloadHeaderList={excelTranslatorHook?.selectedExcelTranslator?.excelTranslatorDownloadHeaderList}
                                            onSetExcelTranslatorDownloadHeaderList={handleSetExcelTranslatorDownloadHeaderList}
                                            onToggleDisabledCreate={toggleDisabledSubmit}
                                        />
                                        {!disabledSubmit &&
                                            <FdFloatingButton
                                                onSubmit={handleReqUpdate}
                                            />
                                        }
                                    </>
                                }
                                {mode === MODE.DELETE &&
                                    <>
                                        <FdDelete
                                            onReqDelete={handleReqDelete}
                                        />
                                    </>
                                }
                            </>
                        }
                    </>
                }
            </Layout>
        </>
    );
}

function ContextFetch() {
    const excelTranslatorReferenceHeaderBucketListActionsHook = useExcelTranslatorReferenceHeaderBucketListActionsHook();

    const cdnHook = useCdnHook();

    useEffect(() => {
        async function fetchReferenceHeaderBucketList() {
            await cdnHook.getExcelTranslatorReferenceHeaderBucketListJson().then(res => {
                if (res?.status === 200) {
                    excelTranslatorReferenceHeaderBucketListActionsHook.onSet(res?.data);
                }
            })
                .catch(err => {
                    console.log(err?.response);
                })
        }

        fetchReferenceHeaderBucketList();

        return () => excelTranslatorReferenceHeaderBucketListActionsHook.onSet(null);
    }, []);

    return null;
}

function checkCreateForm({
    excelTranslatorName,
    excelTranslatorDownloadHeaderList
}) {
    if (!excelTranslatorName || excelTranslatorName?.length <= 0 || excelTranslatorName?.length > 50) {
        throw new Error('변환기 이름을 1-50자 이내로 입력해 주세요.');
    }

    if (!excelTranslatorDownloadHeaderList || excelTranslatorDownloadHeaderList?.length <= 0 || excelTranslatorDownloadHeaderList?.length > 100) {
        throw new Error('변환기 설정의 필드를 1개 이상 100개 이하로 추가해 주세요.');
    }

    let checkDuplicateHeaderNameSet = new Set();

    excelTranslatorDownloadHeaderList?.forEach((r, index) => {
        if (checkDuplicateHeaderNameSet.has(r?.headerName)) {
            throw new Error(`필드명의 중복은 허용되지 않습니다. 필드명:"${r?.headerName}" 을 하나만 등록해 주세요.`);
        }
        checkDuplicateHeaderNameSet.add(r?.headerName);

        if (r.headerName?.length <= 0 || r.headerName?.length > 30) {
            throw new Error(`필드명은 1-30자 이내로 입력해 주세요. \n${index + 1}열의 필드명을 확인해 주세요.`);
        }

        if (r.valueType !== VALUE_TYPE.FIXED && r.valueType !== VALUE_TYPE.MAPPING) {
            throw new Error('결과 타입에 정의되지 않은 값이 있습니다. 새로고침 후 재시도 해주세요.');
        }

        if (r.valueType === VALUE_TYPE.FIXED) {
            if (r?.fixedValue?.length > 100) {
                throw new Error(`고정값은 최대 100자 까지만 입력이 가능합니다.\n${index + 1}열의 세부 내용을 확인해 주세요.`);
            }
        }

        if (r.valueType === VALUE_TYPE.MAPPING) {
            const mappingValueList = r?.mappingValues ? JSON.parse(r?.mappingValues) : [];
            if (r?.separator === null || r?.separator === undefined) {
                throw new Error(`매핑값 구분자는 필수 선택입니다.\n${index + 1}열의 세부 내용을 확인해 주세요.`);
            }

            if (mappingValueList?.length <= 0 || mappingValueList?.length > 5) {
                throw new Error(`매핑값은 1-5개 필수 등록 입니다.\n${index + 1}열의 세부 내용을 확인해 주세요.`);
            }
            let checkDuplicateMappingValueSet = new Set();
            mappingValueList?.forEach(r => {
                if (checkDuplicateMappingValueSet.has(r)) {
                    throw new Error(`동일한 이름의 매핑값 중복 등록은 허용되지 않습니다.\n${index + 1}열의 세부 내용을 확인해 주세요.`);
                }

                if (!r || r?.length <= 0 || r?.length > 30) {
                    throw new Error(`매핑값의 이름은 1-30자 이내로 입력해 주세요.\n${index + 1}열의 세부 내용을 확인해 주세요.`);
                }
                checkDuplicateMappingValueSet.add(r);
            })

        }
    })
}