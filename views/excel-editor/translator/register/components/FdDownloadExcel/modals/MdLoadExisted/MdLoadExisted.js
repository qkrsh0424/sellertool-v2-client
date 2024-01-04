import { useEffect, useState } from "react";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import * as St from './MdLoadExisted.styled';
import { useApiHook } from "../../../../hooks/useApiHook";
import { useCdnHook } from "../../../../hooks/useCdnHook";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const LOAD_TYPE = {
    SAMPLE: 'SAMPLE',
    MY: 'MY'
}
export function MdLoadExisted({
    open,
    onClose,
    onSubmit
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();
    const cdnHook = useCdnHook();

    const [loadType, setLoadType] = useState(LOAD_TYPE.SAMPLE);
    const [excelTranslatorSampleList, setExcelTranslatorSampleList] = useState(null);
    const [excelTranslatorList, setExcelTranslatorList] = useState(null);
    const [selectedExcelTranslatorInfo, setSelectedExcelTranslatorInfo] = useState(null);

    useEffect(() => {
        handleCdnFetchExcelTranslatorSampleList();
        handleReqFetchExcelTranslatorList();
    }, []);

    const handleCdnFetchExcelTranslatorSampleList = async () => {
        await cdnHook.getExcelTranslatorSampleListJson()
            .then(res => {
                if (res?.status === 200) {
                    setExcelTranslatorSampleList(res?.data);
                }
            })
    }

    const handleReqFetchExcelTranslatorList = async () => {
        await apiHook.reqFetchExcelTranslatorList({ headers: { wsId: wsId } }, (results) => {
            if (results) {
                setExcelTranslatorList(results);
            }
        })
    }

    const handleChangeLoadType = (loadType) => {
        setLoadType(loadType);
    }

    const handleSelectExcelTranslator = (value) => {
        if (JSON.stringify(selectedExcelTranslatorInfo) === JSON.stringify(value)) {
            setSelectedExcelTranslatorInfo(null);
            return;
        }
        setSelectedExcelTranslatorInfo(value);
    }

    const handleSubmit = () => {
        let newExcelTranslatorDownloadHeaderList = selectedExcelTranslatorInfo?.excelTranslator?.excelTranslatorDownloadHeaderList?.map((r, index) => {
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

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>기존의 설정을 불러옵니다.</CustomDialog.Title>
                <St.Container>
                    <div className='wrapper'>
                        <HeadButtonGroup
                            loadType={loadType}
                            onChangeLoadType={handleChangeLoadType}
                        />
                        <ItemListGroup
                            loadType={loadType}
                            excelTranslatorSampleList={excelTranslatorSampleList}
                            excelTranslatorList={excelTranslatorList}
                            selectedExcelTranslatorInfo={selectedExcelTranslatorInfo}
                            onSelectExcelTranslator={handleSelectExcelTranslator}
                        />
                    </div>
                </St.Container>
                {selectedExcelTranslatorInfo &&
                    <St.SubmitButtonContainer>
                        <div className='description'>
                            <div>작업중이던 변환기 설정이 모두 초기화 됩니다.</div>
                            <div>계속 진행 하시겠습까?</div>
                        </div>
                        <div className='buttonGroupWrapper'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => handleSelectExcelTranslator(null)}
                            >
                                취소
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                style={{ background: 'var(--mainColor)' }}
                                onClick={() => handleSubmit()}
                            >
                                확인
                            </CustomBlockButton>
                        </div>
                    </St.SubmitButtonContainer>
                }
            </CustomDialog>
        </>
    );
}

function HeadButtonGroup({
    loadType,
    onChangeLoadType
}) {
    return (
        <St.HeadButtonGroup>
            <CustomBlockButton
                type='button'
                className={`${loadType === LOAD_TYPE.SAMPLE ? 'button-isActive' : ''}`}
                onClick={() => onChangeLoadType(LOAD_TYPE.SAMPLE)}
            >
                기본
            </CustomBlockButton>
            <CustomBlockButton
                type='button'
                className={`${loadType === LOAD_TYPE.MY ? 'button-isActive' : ''}`}
                onClick={() => onChangeLoadType(LOAD_TYPE.MY)}
            >
                내 변환기
            </CustomBlockButton>
        </St.HeadButtonGroup>
    );
}

function ItemListGroup({
    loadType,
    excelTranslatorSampleList,
    excelTranslatorList,
    selectedExcelTranslatorInfo,
    onSelectExcelTranslator
}) {
    return (
        <St.ItemListGroup>
            {loadType === LOAD_TYPE.SAMPLE &&
                <>
                    {excelTranslatorSampleList?.map(r => {
                        return (
                            <CustomBlockButton
                                type='button'
                                key={r.id}
                                onClick={() => onSelectExcelTranslator({ loadType: LOAD_TYPE.SAMPLE, excelTranslator: r })}
                                className={(selectedExcelTranslatorInfo?.loadType === LOAD_TYPE.SAMPLE && selectedExcelTranslatorInfo?.excelTranslator?.id === r.id) ? 'button-isActive' : ''}
                            >
                                <div className='contentWrapper'>
                                    <div className='contentWrapper__title'>{r?.name}</div>
                                    <div className='contentWrapper__columnCount'>열 개수 : {r?.excelTranslatorDownloadHeaderList?.length}</div>
                                </div>
                            </CustomBlockButton>
                        );
                    })}
                </>
            }
            {loadType === LOAD_TYPE.MY &&
                <>
                    {excelTranslatorList?.map(r => {
                        return (
                            <CustomBlockButton
                                type='button'
                                key={r.id}
                                onClick={() => onSelectExcelTranslator({ loadType: LOAD_TYPE.MY, excelTranslator: r })}
                                className={(selectedExcelTranslatorInfo?.loadType === LOAD_TYPE.MY && selectedExcelTranslatorInfo?.excelTranslator?.id === r.id) ? 'button-isActive' : ''}
                            >
                                <div className='contentWrapper'>
                                    <div className='contentWrapper__title'>{r?.name}</div>
                                    <div className='contentWrapper__columnCount'>열 개수 : {r?.excelTranslatorDownloadHeaderList?.length}</div>
                                </div>
                            </CustomBlockButton>
                        );
                    })}
                </>
            }
        </St.ItemListGroup>
    );
}