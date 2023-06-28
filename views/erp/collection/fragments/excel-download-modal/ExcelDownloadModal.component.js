import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { dateToYYYYMMDDhhmmssFile, dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import CustomSelect from "../../../../modules/select/CustomSelect";
import useErpcExcelDownloadFormsHook from "../hooks/useErpcExcelDownloadFormsHook";
import useRefErpCollectionHeadersHook from "../hooks/useRefErpCollectionHeadersHook";
import { Container, ExcelDownloadFormSelectorFieldWrapper, OperatorsFieldWrapper, PreviewTableFieldWrapper, TableBox, TipFieldWrapper } from "./ExcelDownloadModal.styled";
import InputFieldView from "./InputField.view";
import ExcelDownloadFormTableComponent from "./ExcelDownloadFormTable.component";
import { checkFileNameFormat } from "../../../../../utils/regexUtils";
import useInventoryStocksHook from "../hooks/useInventoryStocksHook";
import BackdropLoadingComponent from "../../../../modules/loading/BackdropLoadingComponent";
import { useSellertoolDatas } from "../../../../../hooks/sellertool-datas";

// collections를 가지고 downloadOrderItem 폼으로 변환, collection = [...orderItem]
const getDownloadOrderItem = (collections) => {
    return {
        receiver: collections[0].receiver,
        destination: collections[0].destination,
        combinedUniqueCode: collections.map(r => r.uniqueCode).join(),
        combinedFreightCode: collections.map(r => r.freightCode).join(),
        collections: collections
    }
}

/**
 * @deprecated
 * excel-download-modal-v2 가 문제가 없을시 해당 버전의 파일들(excel-download-modal/*) 모두 삭제 가능. 
 */
const ExcelDownloadModalComponent = ({
    erpCollectionHeader,
    selectedErpItems,

    onClose,
    ...props
}) => {
    const router = useRouter();
    const sellertoolDatas = useSellertoolDatas();
    const erpcFavoriteDownloadFormIds = sellertoolDatas?.favoriteDownloadFormIdsForErpc ?? [];
    const [downloadOrderItemList, dispatchDownloadOrderItemList] = useReducer(downloadOrderItemListReducer, initialDownloadOrderItemList);
    const [checkedItemList, dispatchCheckedItemList] = useReducer(checkedItemListReducer, initialCheckedItemList);
    const [selectedExcelHeader, dispatchSelectedExcelHeader] = useReducer(selectedExcelHeaderReducer, initialSelectedExcelHeader);
    const [downloadExcelFileName, dispatchDownloadExcelFileName] = useReducer(downloadExcelFileNameReducer, initialDownloadExcelFileName);
    const {
        refErpCollectionHeaders
    } = useRefErpCollectionHeadersHook();

    const {
        erpcExcelDownloadForms,
        reqDownloadForm
    } = useErpcExcelDownloadFormsHook();

    const {
        inventoryStocks
    } = useInventoryStocksHook(selectedErpItems);

    const [backdropOpen, setBackdropOpen] = useState(false);

    useEffect(() => {
        if (!selectedErpItems || selectedErpItems?.length <= 0 || !inventoryStocks) {
            return;
        }

        // downloadOrderItem 폼으로 List 변환
        let dataList = selectedErpItems.map(r => {
            let stockUnit = inventoryStocks?.find(inventoryStock => inventoryStock.productOptionId === r.productOptionId)?.stockUnit ?? 0;
            let collections = [{
                ...r,
                optionStockUnit: stockUnit
            }];
            return getDownloadOrderItem(collections);
        })

        // 수취인명 + 주소 기준으로 정렬
        dataList.sort((a, b) => {
            let str1 = a.receiver + a.destination;
            let str2 = b.receiver + b.destination;
            return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
        })

        _onSet_downloadOrderItemList(dataList);

    }, [selectedErpItems, inventoryStocks]);

    useEffect(() => {
        if (!selectedExcelHeader) {
            return;
        }

        let fileName = `${dateToYYYYMMDDhhmmssFile(new Date())}_${selectedExcelHeader.name}_주문수집`;

        dispatchDownloadExcelFileName({
            type: 'SET_DATA',
            payload: fileName
        })
    }, [selectedExcelHeader]);

    const _onSet_downloadOrderItemList = (data) => {
        dispatchDownloadOrderItemList({
            type: 'SET_DATA',
            payload: data
        })
    }

    const toggleBackdropOpen = (setOpen) => {
        setBackdropOpen(setOpen);
    }

    // 전체 주문건 합치기
    const handleCombineAll = () => {
        let orderItemList = [];
        // 일반 orderItem 폼으로 list 변환
        downloadOrderItemList.forEach(r => {
            orderItemList.push(...r.collections)
        })

        let s = new Set(); // 수취인명 + 주소 중복 체크를 위한 Set
        let stack = []; // 수취인명 + 주소 중복인 경우 데이터를 담아둘 임시 스텍
        let dataList = []; // 최종 결과물을 저장할 공간

        // 수취인명 + 주소 기준으로 정렬
        orderItemList.sort((a, b) => {
            let str1 = a.receiver + a.destination;
            let str2 = b.receiver + b.destination;
            return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
        })

        orderItemList.forEach((r, index) => {
            let str = r.receiver + r.destination;

            if (!s.has(str)) {
                s.add(str);

                // 기존에 담겨 있던 스텍 모두 비우기
                if (stack.length > 0) {
                    dataList.push(getDownloadOrderItem([...stack]));
                    stack = [];
                }
            }
            stack.push(r);
        })

        // 남은 스택들 모두 비우기
        if (stack.length > 0) {
            dataList.push(getDownloadOrderItem([...stack]));
            stack = [];
        }

        _onSet_downloadOrderItemList(dataList);
    }

    // 전체 주문건 분리
    const handleInsulateAll = () => {
        let orderItemList = [];
        downloadOrderItemList.forEach(r => {
            orderItemList.push(...r.collections)
        });

        let dataList = orderItemList.map(r => {
            return getDownloadOrderItem([r]);
        })

        _onSet_downloadOrderItemList(dataList);
    }

    // 선택된 주문건 분리
    const handleInsulateSelected = () => {
        if (checkedItemList.length <= 0) {
            return;
        }

        let dataList = [];

        downloadOrderItemList.forEach(orderItem => {
            let collections = []; // 선택되지 않은 데이터들 유지하기위한 공간
            let insulateCollections = []; // 분리된 데이터들 담는 공간

            orderItem.collections.forEach(collection => {
                // 체크 리스트에 포함되면 insulateCollections에 담는다.
                if (checkedItemList.some(s => s.id === collection.id)) {
                    insulateCollections.push(collection)
                } else {
                    collections.push(collection)
                }
            });

            if (insulateCollections.length > 0) {
                insulateCollections.forEach(r => {
                    dataList.push(getDownloadOrderItem([r]))
                })
            }

            if (collections.length > 0) {
                dataList.push(getDownloadOrderItem(collections))
            }
        })

        dispatchCheckedItemList({
            type: 'CLEAR'
        });
        _onSet_downloadOrderItemList(dataList);
    }

    const handleCheckItem = (item) => {
        let checked = isCheckedItem(item);
        let data = [...checkedItemList];

        if (checked) {
            data = data.filter(r => r.id !== item.id);
        } else {
            data.push(item);
        }

        dispatchCheckedItemList({
            type: 'SET_DATA',
            payload: data
        });
    }

    const isCheckedItem = (item) => {
        return checkedItemList.some(r => r.id === item.id);
    }

    const handleSelectExcelDownloadForm = (e) => {
        let id = e.target.value;
        let header = erpcExcelDownloadForms.filter(r => r.id === id)[0];

        if (!id) {
            dispatchSelectedExcelHeader({
                type: 'CLEAR'
            })
        }
        dispatchSelectedExcelHeader({
            type: 'SET_DATA',
            payload: header
        })
    }

    const onActionDownloadExcel = async () => {
        if (!checkFileNameFormat(downloadExcelFileName)) {
            alert('파일명에 허용되지 않은 특수문자가 포함되어 있습니다. \n제거해야 할 특수문자 : \/:*?%."<>|');
            return;
        }
        toggleBackdropOpen(true);
        await reqDownloadForm(selectedExcelHeader?.id, downloadOrderItemList, downloadExcelFileName)
        toggleBackdropOpen(false);
    }

    const onChangeDownloadExcelFileName = (e) => {
        dispatchDownloadExcelFileName({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    return (
        <>
            <Container>
                <HeadField
                    onClose={onClose}
                />
                <OperatorsField
                    onActionCombineAll={handleCombineAll}
                    onActionInsulateAll={handleInsulateAll}
                    onActionInsulateSelected={handleInsulateSelected}
                />
                <TipField
                    matchedCode={router?.query?.matchedCode || 'releaseOption'}
                />
                <PreviewTableField
                    matchedCode={router?.query?.matchedCode || 'releaseOption'}
                    erpCollectionHeader={erpCollectionHeader}
                    downloadOrderItemList={downloadOrderItemList}

                    isCheckedItem={isCheckedItem}
                    onActionCheckItem={handleCheckItem}
                />
                <ExcelDownloadFormSelectorField
                    erpcExcelDownloadForms={erpcExcelDownloadForms}
                    erpcFavoriteDownloadFormIds={erpcFavoriteDownloadFormIds}
                    selectedExcelHeader={selectedExcelHeader}

                    onActionSelectExcelDownloadForm={handleSelectExcelDownloadForm}
                />
                {selectedExcelHeader &&
                    <>
                        <ExcelDownloadFormTableComponent
                            refErpCollectionHeaders={refErpCollectionHeaders}
                            selectedExcelHeader={selectedExcelHeader}
                        ></ExcelDownloadFormTableComponent>
                        <InputFieldView
                            downloadExcelFileName={downloadExcelFileName}
                            onChangeDownloadExcelFileName={onChangeDownloadExcelFileName}
                            onActionDownloadExcel={onActionDownloadExcel}
                        ></InputFieldView>
                    </>
                }
            </Container>
            <BackdropLoadingComponent
                open={backdropOpen}
            />
        </>
    );
}
export default ExcelDownloadModalComponent;

const initialDownloadOrderItemList = null;
const initialCheckedItemList = [];
const initialSelectedExcelHeader = null;
const initialDownloadExcelFileName = null;

const downloadOrderItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return null;
    }
}

const checkedItemListReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return [];
        default: return [];
    }
}

const selectedExcelHeaderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialSelectedExcelHeader;
        default: return initialSelectedExcelHeader;
    }
}

const downloadExcelFileNameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialDownloadExcelFileName;
        default: return initialDownloadExcelFileName;
    }
}

function HeadField({
    onClose
}) {
    return (
        <>
            <div className='header-close-button-box'>
                <button
                    type='button'
                    className='header-close-button-el'
                    onClick={() => onClose()}
                >
                    <CustomImage
                        src='/images/icon/close_default_959eae.svg'
                    />
                </button>
            </div>
            <div className='title-box'>
                <div className='title'>
                    엑셀 다운로드
                </div>
            </div>
        </>
    );
}

function OperatorsField({
    onActionCombineAll,
    onActionInsulateAll,
    onActionInsulateSelected,
}) {
    return (
        <OperatorsFieldWrapper>
            <div className='flex-box'>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => onActionCombineAll()}
                >
                    전체 주문건 합치기
                </SingleBlockButton>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => onActionInsulateAll()}
                >
                    전체 주문건 분리
                </SingleBlockButton>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => onActionInsulateSelected()}
                >
                    선택 주문건 분리
                </SingleBlockButton>
            </div>
        </OperatorsFieldWrapper>
    );
}

function TipField({ matchedCode }) {
    return (
        <TipFieldWrapper>
            <div>
                ※ 상품 매칭 항목 : <span className='highlight'>{matchedCode === 'optionCode' ? '[M] 옵션코드' : '[M] 출고옵션코드'}</span>
            </div>
        </TipFieldWrapper>
    );
}

function PreviewTableField({
    erpCollectionHeader,
    matchedCode,
    downloadOrderItemList,

    isCheckedItem,
    onActionCheckItem
}) {
    return (
        <PreviewTableFieldWrapper>
            <TableBox>
                <table cellSpacing="0">
                    <colgroup>
                        <col width={'50px'}></col>
                        <col width={'50px'}></col>
                        {erpCollectionHeader?.erpCollectionHeaderDetails?.map((r, index) => {
                            return (
                                <col key={index} width={'200px'}></col>
                            );
                        })}

                    </colgroup>
                    <thead>
                        <tr>
                            <th className="fixed-header" scope="col">#</th>
                            <th className="fixed-header" scope="col">선택</th>
                            {erpCollectionHeader?.erpCollectionHeaderDetails?.map((r, index) => {
                                return (
                                    <th key={index} className="fixed-header" scope="col">
                                        <div>{r.customHeaderName}</div>
                                        {(HIGHLIGHT_FIELDS.includes(r.matchedFieldName) || r.matchedFieldName === matchedCode) &&
                                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: 'var(--mainColorOpacity500)' }}></div>
                                        }
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {downloadOrderItemList?.map((r1, r1Index) => {

                            return (
                                <React.Fragment key={r1Index}>
                                    <tr>
                                        <td
                                            rowSpan={r1.collections.length + 1}
                                            style={{ background: '#e0e0e0', fontSize: '13px', fontWeight: '700' }}
                                        >
                                            {r1Index + 1}
                                        </td>
                                    </tr>
                                    {r1.collections?.map((r2, r2Index) => {
                                        let checked = isCheckedItem(r2);

                                        return (
                                            <tr
                                                key={r2.id}
                                            >
                                                <td
                                                    style={{ background: '#e0e0e0' }}
                                                >
                                                    <input
                                                        type='checkbox'
                                                        className='checkbox-item'
                                                        checked={checked}
                                                        onChange={() => onActionCheckItem(r2)}
                                                    ></input>
                                                </td>
                                                {erpCollectionHeader?.erpCollectionHeaderDetails?.map(r3 => {
                                                    let matchedFieldName = r3.matchedFieldName;
                                                    if (matchedFieldName === 'createdAt' || matchedFieldName === 'salesAt' || matchedFieldName === 'releaseAt' || matchedFieldName === 'channelOrderDate') {
                                                        return (
                                                            <td key={matchedFieldName}>{r2[matchedFieldName] ? dateToYYYYMMDDhhmmss(r2[matchedFieldName]) : ""}</td>
                                                        )
                                                    }

                                                    return (
                                                        <td key={matchedFieldName}>{r2[matchedFieldName]}</td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </PreviewTableFieldWrapper>
    );
}

function ExcelDownloadFormSelectorField({
    erpcExcelDownloadForms,
    erpcFavoriteDownloadFormIds,
    selectedExcelHeader,
    onActionSelectExcelDownloadForm
}) {
    return (
        <>
            <ExcelDownloadFormSelectorFieldWrapper>
                <div className='select-wrapper'>
                    <div className='select-label'>다운로드 양식을 선택해 주세요.</div>
                    <CustomSelect
                        className='select-el'
                        value={selectedExcelHeader?.id || ''}
                        onChange={(e) => onActionSelectExcelDownloadForm(e)}
                    >
                        <option value=''>선택</option>
                        <option value='' disabled>--- 즐겨찾기 ---</option>
                        {erpcFavoriteDownloadFormIds?.map(favoriteDownloadFormId => {
                            const erpcExcelDownloadForm = erpcExcelDownloadForms?.find(r => r.id === favoriteDownloadFormId);
                            if (!erpcExcelDownloadForm) {
                                return null;
                            }

                            return (
                                <option
                                    key={erpcExcelDownloadForm?.id}
                                    value={erpcExcelDownloadForm?.id}
                                >{erpcExcelDownloadForm?.name}</option>
                            );
                        })}
                        <option value='' disabled>--- 목록 ---</option>
                        {erpcExcelDownloadForms?.filter(r => !erpcFavoriteDownloadFormIds?.includes(r.id))?.map(excelDownloadForm => {
                            return (
                                <option
                                    key={excelDownloadForm?.id}
                                    value={excelDownloadForm?.id}
                                >{excelDownloadForm?.name}</option>
                            );
                        })}
                    </CustomSelect>
                </div>
            </ExcelDownloadFormSelectorFieldWrapper>
        </>
    );
}

const HIGHLIGHT_FIELDS = [
    'productCategoryName',
    'productSubCategoryName',
    'productName',
    'productTag',
    'productOptionName',
    'productOptionTag',
    'productOptionReleaseLocation',
    'optionStockUnit'
];