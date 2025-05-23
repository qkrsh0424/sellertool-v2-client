import { FormControlLabel, Switch } from '@mui/material';
import styled from 'styled-components';
import { useSettingVariablesActionsContextHook, useSettingVariablesValueContextHook } from '../../contexts/setting-variables-context';
import { useErpcExcelDownloadFormsValueContextHook } from '../../contexts/erpc-excel-download-forms-context';
import CustomSelect from '../../../../../../../components/select/default/v1/CustomSelect';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { customToast } from '../../../../../../../components/toast/custom-react-toastify/v1';
import { erpcExcelDownloadFormDataConnect } from '../../../../../../../data_connect/erpcExcelDownloadFormDataConnect';
import { useSelector } from 'react-redux';
import { customBackdropController } from '../../../../../../../components/backdrop/default/v1';
import { productOptionPackageDataConnect } from '../../../../../../../data_connect/productOptionPackageDataConnect';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { InventoryDataConnect } from '../../../../../../../data_connect/inventoryDataConnect';
import { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';
import { ArrowDown01, ArrowDown10, ArrowUpDown } from 'lucide-react';

const StyledContainer = styled.div`

    .settings-box-list{
        display: flex;
        flex-direction: column;
        gap: 10px;
        .settings-box{
            display: flex;
            align-items: center;
            gap: 10px;
            .switch-label{
                font-size: 14px;
                font-weight: 500;
                user-select: none;
            }

            select{
                width: fit-content;
                padding-right: 30px;
                border-radius: 3px;
            }

            .create-structure-button{
                background-color: #333;
                color: #fff;
                border-radius: 3px;
                padding: 5px 10px;
                border: none;
                cursor: pointer;
                width: 150px;
            }
        }
    }
`;

const StyledTableFrame = styled.div`
    margin-top: 20px;

    .downdload-excel-button{
        margin-top: 20px;
        background-color: #333;
        color: #fff;
        border-radius: 3px;
        padding: 5px 10px;
        border: none;
        cursor: pointer;
    }
`;

const StyledTableContainer = styled.div`
  overflow-x: auto;
  margin: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-height: 500px;
  border: 1px solid #efefef;
`;

const StyledTable = styled.table`
  table-layout: auto;    /* 내용 길이에 맞춰 열 너비 자동 */
  white-space: nowrap;   /* 한 줄로 표시하여 열이 자동 확장 */
  border-collapse: collapse;
  background-color: #ffffff;

  /* width: 100%;  <-- 필요한 경우 제거하거나 조정
     min-width: 800px; <-- 원한다면 유지 (너무 좁아지지 않게)
  */
`;

const StyledTableHeader = styled.thead`
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #f8f9fa;
`

const StyledTableHeaderCell = styled.th`
    padding: 16px;
    text-align: left;
    font-weight: 600;
    color: #495057;
    border-bottom: 2px solid #dee2e6;
    white-space: nowrap;
    font-size: 11px;
`

const StyledTableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f8f9fa;
    }
    
    &:hover {
        background-color: #e9ecef;
    }

    &.selected{
        background-color:rgb(231, 238, 244) !important;
    }
`

const StyledTableCell = styled.td`
  padding: 16px;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
  font-size: 11px;
`

const StyledFooter = styled.div`
    margin-top: 20px;
    button{
        border-radius: 3px;
        background-color: #333;
        color: #fff;
        border:none;
    }
`;

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

export function WegetSettings({
    selectedErpItems
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const workspaceId = workspaceRedux?.workspaceInfo?.id || null;

    const erpcExcelDownloadFormsValueContextHook = useErpcExcelDownloadFormsValueContextHook();
    const erpcExcelDownloadForms = erpcExcelDownloadFormsValueContextHook.erpcExcelDownloadForms;
    const settingVariablesValueContextHook = useSettingVariablesValueContextHook();
    const settingVariablesActionsContextHook = useSettingVariablesActionsContextHook();
    const settingVariables = settingVariablesValueContextHook.settingVariables;

    const [tableDatas, setTableDatas] = useState(null);
    const [sortElements, setSortElements] = useState([])

    const handleChangeIsCombineDeliveryFlag = (e) => {
        settingVariablesActionsContextHook.settingVariables.setValue({
            ...settingVariables,
            isCombineDeliveryFlag: e.target.checked
        });
    }

    const handleChangeIsDividePackageFlag = (e) => {
        settingVariablesActionsContextHook.settingVariables.setValue({
            ...settingVariables,
            isDividePackageFlag: e.target.checked
        });
    }

    const handleSelectExcelDownloadForm = async (downloadFormId) => {
        const downloadForm = erpcExcelDownloadForms.find(item => item.id === downloadFormId) || null;

        if (!downloadForm) {
            settingVariablesActionsContextHook.settingVariables.setValue({
                ...settingVariables,
                selectedErpcDownloadForm: null
            })
            return;
        }

        const params = {
            erpcExcelDownloadFormId: downloadForm?.id
        }

        const headers = {
            wsId: workspaceId
        }

        customBackdropController().showBackdrop();
        const newDownloadFormResponse = await erpcExcelDownloadFormDataConnect().searchRelatedFormDetails(params, headers)
        customBackdropController().hideBackdrop();
        if (newDownloadFormResponse?.data?.data) {
            settingVariablesActionsContextHook.settingVariables.setValue({
                ...settingVariables,
                selectedErpcDownloadForm: newDownloadFormResponse?.data?.data
            })
        }
    }

    const handleCreateExcelStructure = async () => {
        if (!settingVariables?.selectedErpcDownloadForm) {
            customToast.error('다운로드 양식을 선택해주세요.');
            return;
        }

        customBackdropController().showBackdrop();
        let newSelectedErpItems = _.cloneDeep(selectedErpItems);

        if (settingVariables?.isDividePackageFlag) {
            // 패키지상품인것 추출
            const packageOrders = selectedErpItems.filter(item => item.packageYn === 'y');

            const packageInfosRes = await productOptionPackageDataConnect().searchProductInfoListByProductOptionIds({
                productOptionIds: packageOrders.map(item => item.productOptionId)
            }, {
                wsId: workspaceId
            })

            if (packageInfosRes?.data?.data) {
                const packageInfos = packageInfosRes?.data?.data;

                // 패키지 추출한것 주문에 추가
                packageOrders?.forEach(packageOrder => {
                    packageInfos.forEach(packageInfo => {
                        const newUnit = packageOrder?.unit * packageInfo?.unit;
                        if (packageOrder) {
                            newSelectedErpItems.push({
                                ...packageOrder,
                                id: uuidv4(),
                                productCategoryName: packageInfo?.productCategoryVo?.name,
                                productSubCategoryName: packageInfo?.productSubCategoryVo?.name,
                                prodName: packageInfo?.productVo?.name,
                                productName: packageInfo?.productVo?.name,
                                optionName: packageInfo?.productOptionVo?.name,
                                productOptionName: packageInfo?.productOptionVo?.name,
                                productOptionId: packageInfo?.productOptionVo?.id,
                                packageYn: 'n',
                                unit: newUnit || 0,
                            })
                        }
                    })
                })
                // 패키지 상품의 주문을 제거
                newSelectedErpItems = newSelectedErpItems.filter(item => item.packageYn !== 'y');
            }
        }
        const inventoryStocks = (await InventoryDataConnect.baseErpCollectionPage().searchStockList({
            body: {
                productOptionIds: newSelectedErpItems.map(item => item.productOptionId),
            },
            headers: {
                wsId: workspaceId
            }
        }))?.data?.data || [];

        // downloadOrderItem 폼으로 List 변환
        let downloadOrderItems = newSelectedErpItems.map(r => {
            let stockUnit = inventoryStocks?.find(inventoryStock => inventoryStock.productOptionId === r.productOptionId)?.stockUnit ?? 0;
            let collections = [{
                ...r,
                optionStockUnit: stockUnit
            }];
            return getDownloadOrderItem(collections);
        })

        let orderItemList = [];
        // 일반 orderItem 폼으로 list 변환
        downloadOrderItems.forEach(r => {
            orderItemList.push(...r.collections)
        })
        let dataList = []; // 최종 결과물을 저장할 공간

        // 합배송 설정이 되어있다면 주문건 합치기
        if (settingVariables?.isCombineDeliveryFlag) {

            let s = new Set(); // 수취인명 + 주소 중복 체크를 위한 Set
            let stack = []; // 수취인명 + 주소 중복인 경우 데이터를 담아둘 임시 스텍

            // 수취인명 + 주소 기준으로 정렬
            orderItemList.sort((a, b) => {
                let str1 = a.receiver + a.destination + a.destinationDetail;
                let str2 = b.receiver + b.destination + b.destinationDetail;
                return str1 < str2 ? -1 : str1 > str2 ? 1 : 0;
            })

            orderItemList.forEach((r, index) => {
                let str = r.receiver + r.destination + r.destinationDetail;

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
        } else {
            dataList = downloadOrderItems;
        }

        const tableDatas = [];
        tableDatas.push(settingVariables?.selectedErpcDownloadForm?.erpcExcelDownloadFormDetails?.map(r => r.customCellName));

        dataList?.forEach(data => {
            const tableData = [];
            const downloadFormDetails = settingVariables?.selectedErpcDownloadForm?.erpcExcelDownloadFormDetails;
            downloadFormDetails?.forEach(formDetail => {
                let value = '';
                if (formDetail?.fieldType === '고정값') {
                    value = formDetail?.fixedValue;
                } else if (formDetail?.fieldType === '운송코드') {
                    value = data?.combinedFreightCode;
                } else {
                    const collections = data?.collections;
                    if (formDetail?.mergeYn === 'y') {
                        value = collections?.map(collection => {
                            return formDetail?.viewDetails?.map(viewDetail => {
                                return collection[viewDetail];
                            }).join(formDetail?.valueSplitter);
                        }).join(formDetail?.mergeSplitter);
                    } else {
                        value = formDetail?.viewDetails?.map(viewDetail => {
                            return collections[0][viewDetail];
                        }).join(formDetail?.valueSplitter);
                    }
                }
                tableData.push(value);
            })
            tableDatas.push(tableData);

        })

        setTableDatas(tableDatas);
        customBackdropController().hideBackdrop();
    }

    const handleDownloadExcel = async () => {
        const currentDateTime = moment().format('YYYYMMDDHHmmss');
        customBackdropController().showBackdrop();
        await exportStyledExcel(tableDatas, `${currentDateTime}_${settingVariables?.selectedErpcDownloadForm?.name}.xlsx`);
        customBackdropController().hideBackdrop();
    }

    console.log(sortElements);
    return (
        <>
            <StyledContainer>
                <div className='settings-box-list'>
                    <div className='settings-box'>
                        <FormControlLabel control={<Switch checked={settingVariables?.isCombineDeliveryFlag || false} onChange={(e) => handleChangeIsCombineDeliveryFlag(e)} />} label={<span className='switch-label'>합배송 설정</span>} />
                    </div>
                    <div className='settings-box'>
                        <FormControlLabel control={<Switch checked={settingVariables?.isDividePackageFlag || false} onChange={(e) => handleChangeIsDividePackageFlag(e)} />} label={<span className='switch-label'>패키지 분리</span>} />
                    </div>
                    <div className='settings-box'>
                        <CustomSelect value={settingVariables?.selectedErpcDownloadForm?.id || ''} onChange={(e) => handleSelectExcelDownloadForm(e.target.value)}>
                            <option value=''>다운로드 양식 선택</option>
                            {erpcExcelDownloadForms?.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>
                            })}
                        </CustomSelect>
                        <CustomBlockButton
                            type='button'
                            className='create-structure-button'
                            onClick={() => handleCreateExcelStructure()}
                        >
                            엑셀 구조 생성
                        </CustomBlockButton>
                    </div>
                </div>
                <StyledTableFrame>
                    {tableDatas &&
                        <StyledTableContainer>
                            <StyledTable>
                                <StyledTableHeader>
                                    <tr>
                                        {tableDatas[0]?.map((r, index) => {
                                            return (
                                                <StyledTableHeaderCell key={index}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                        <div>{r}</div>
                                                        <div>
                                                            {/* sortElements에 index에 해당하는 요소가 없으면 ArrowUpDown으로 표시하고, index에 해당하는 요소가 있고 asc이면 ArrowDown01, desc이면 ArrowDown10 아이콘을 쓴다. */}
                                                            {/* ArrowUpDown 클릭시 sortElements에 [index, 'asc']를, ArrowDown01 클릭시 [index, 'desc']를, ArrowDown10 클릭시 sortElements에서 지우기 */}
                                                            {/* 바깥쪽 배열은 순서가 중요하므로 asc->desc 로 갈때는 지우고 삽입하는 과정 말고 수정으로 처리해줘 */}
                                                            {sortElements?.find(item => item[0] === index) ? (
                                                                sortElements.find(item => item[0] === index)[1] === 'asc' ?
                                                                    <ArrowDown01 size={14} style={{ cursor: 'pointer', color: '#81C784' }} onClick={() => {
                                                                        // Update the sort element from 'asc' to 'desc'
                                                                        const newSortElements = sortElements.map(item =>
                                                                            item[0] === index ? [index, 'desc'] : item
                                                                        );
                                                                        setSortElements(newSortElements);
                                                                        const sortedData = multiSort(tableDatas.slice(1), newSortElements);
                                                                        setTableDatas([tableDatas[0], ...sortedData]);
                                                                    }} />
                                                                    :
                                                                    <ArrowDown10 size={14} style={{ cursor: 'pointer', color: '#E57373' }} onClick={() => {
                                                                        // Remove the sort element for this index
                                                                        const newSortElements = sortElements.filter(item => item[0] !== index);
                                                                        setSortElements(newSortElements);
                                                                        const sortedData = multiSort(tableDatas.slice(1), newSortElements);
                                                                        setTableDatas([tableDatas[0], ...sortedData]);
                                                                    }} />
                                                            ) :
                                                                <ArrowUpDown size={14} style={{ cursor: 'pointer' }} onClick={() => {
                                                                    // Add a new sort element with ascending order
                                                                    const newSortElements = [...sortElements, [index, 'asc']];
                                                                    setSortElements(newSortElements);
                                                                    const sortedData = multiSort(tableDatas.slice(1), newSortElements);
                                                                    setTableDatas([tableDatas[0], ...sortedData]);
                                                                }} />
                                                            }
                                                        </div>
                                                    </div>
                                                </StyledTableHeaderCell>
                                            )
                                        })}
                                    </tr>
                                </StyledTableHeader>
                                <tbody>
                                    {tableDatas?.slice(1, 11)?.map((excelData, index) => {
                                        return (
                                            <StyledTableRow key={index}>
                                                {excelData.map((r, index) => {
                                                    return (
                                                        <StyledTableCell key={index}>{r}</StyledTableCell>
                                                    )
                                                })}
                                            </StyledTableRow>
                                        );
                                    })}
                                </tbody>
                            </StyledTable>
                        </StyledTableContainer>
                    }
                    {tableDatas &&
                        <CustomBlockButton
                            type='button'
                            className='downdload-excel-button'
                            onClick={() => handleDownloadExcel()}
                            disabled={!tableDatas}
                        >
                            엑셀 다운로드
                        </CustomBlockButton>
                    }
                </StyledTableFrame>
            </StyledContainer>
        </>
    );
}

function multiSort(array, criteria) {
    return array.sort((a, b) => {
        for (let [index, order] of criteria) {
            let compareResult;

            if (typeof a[index] === 'string' && typeof b[index] === 'string') {
                compareResult = a[index].localeCompare(b[index]);
            } else {
                compareResult = a[index] - b[index];
            }

            if (compareResult !== 0) {
                return order === 'asc' ? compareResult : -compareResult;
            }
        }
        return 0;
    });
}

async function exportStyledExcel(data, fileName = "export.xlsx") {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 데이터 추가 (2차원 배열)
    data.forEach((row, rowIndex) => {
        const excelRow = worksheet.addRow(row);
        // 예: 첫 행을 헤더로 스타일 지정
        if (rowIndex === 0) {
            excelRow.eachCell((cell) => {
                cell.font = { bold: true, name: "Arial", size: 12 };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'efefef' },
                };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        }
    });

    // 각 열의 최대 텍스트 길이를 계산하여 열 너비 설정
    worksheet.columns.forEach((column) => {
        let maxLength = 10; // 기본 너비 설정 (예: 10)
        column.eachCell({ includeEmpty: true }, (cell) => {
            const cellValue = cell.value ? cell.value.toString() : "";
            if (cellValue.length * 1.4 > maxLength) {
                maxLength = cellValue.length * 1.4;
            }
        });
        // 약간의 여유 공간을 위해 +2 정도를 추가할 수 있음
        column.width = maxLength + 5;
    });

    // 워크북을 버퍼로 작성
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
}