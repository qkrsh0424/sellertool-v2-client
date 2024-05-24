import * as St from './MdCopyCreate.styled';
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import { useSelectedErpItemListValueHook } from "../../../contexts/SelectedErpItemListProvider";
import { memo, useEffect, useState } from 'react';
import _ from 'lodash';
import { StaticValues } from './StaticValues';
import ResizableTh from '../../../../../../../components/table/th/v1/ResizableTh';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { CustomDateUtils } from '../../../../../../../utils/CustomDateUtils';
import { CustomNumberUtils } from '../../../../../../../utils/CustomNumberUtils';
import { useApiHook } from '../../../hooks/useApiHook';
import { useSelector } from 'react-redux';
import { useErpItemFetcherHook } from '../../../hooks/useErpItemFetcherHook';
import { customBackdropController } from '../../../../../../../components/backdrop/default/v1';
import { customToast } from '../../../../../../../components/toast/custom-react-toastify/v1';

const STATIC_VALUES = StaticValues();

export function MdCopyCreate({
    open = false,
    toggleCopyCreateErpItemsModalOpen,
    toggleControlDrawerOpen
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();

    const apiHook = useApiHook();
    const erpItemFetcherHook = useErpItemFetcherHook();

    // Reference. 대량의 데이터를 state화 시킬때 나누어서 처리하는 방법
    // const chunkSize = 100; // 한 번에 렌더링할 행의 수
    // let currentIndex = 0;

    // useEffect(() => {
    //     if (!selectedErpItemListValueHook) {
    //         return;
    //     }

    //     const loadMoreData = () => {
    //         if (currentIndex < selectedErpItemListValueHook.length) {
    //             const nextIndex = Math.min(currentIndex + chunkSize, selectedErpItemListValueHook.length);

    //             setTargetErpItemList(prev => {
    //                 return {
    //                     ...prev,
    //                     content: !prev.content ?
    //                         [...selectedErpItemListValueHook.slice(currentIndex, nextIndex).map(r => ({ ...r, id: uuidv4(), uniqueCode: null, originId: r?.id }))] :
    //                         [...prev.content, ...selectedErpItemListValueHook.slice(currentIndex, nextIndex).map(r => ({ ...r, id: uuidv4(), uniqueCode: null, originId: r?.id }))]
    //                 }
    //             })

    //             currentIndex = nextIndex;
    //         }
    //     };

    //     // loadMoreData();
    //     const interval = setInterval(loadMoreData, 100); // 100ms마다 새로운 데이터를 추가

    //     return () => clearInterval(interval);
    // }, [selectedErpItemListValueHook]);

    const handleCloseModal = () => {
        toggleCopyCreateErpItemsModalOpen(false);
    }

    const handleCloseControlDrawer = () => {
        toggleControlDrawerOpen(false)
    }

    const handleReqCopyCreate = async () => {
        let body = {
            erpItemIds: selectedErpItemListValueHook?.map(r => r.id),
            workspaceId: wsId
        }

        handleCloseModal();
        handleCloseControlDrawer();
        customBackdropController().showBackdrop();
        const createResult = await apiHook.reqCopyCreateErpItemList({ body, headers: { wsId: wsId } });

        if (createResult.content) {
            customToast.success(createResult?.content + '개의 주문건이 복사 생성 되었습니다.');
            erpItemFetcherHook.reqCountErpItems();
            erpItemFetcherHook.reqFetchErpItemSlice();
        }
        customBackdropController().hideBackdrop();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => handleCloseModal()}
                maxWidth="xl"
            >
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <St.BodyContainer>
                    <St.ConfirmFieldWrapper>
                        <div className='text'>
                            {selectedErpItemListValueHook?.length} 개의 주문건을 복사 생성 합니다.
                        </div>
                        <div>
                            <CustomBlockButton
                                type='button'
                                onClick={() => handleReqCopyCreate()}
                            >
                                복사 생성
                            </CustomBlockButton>
                        </div>
                    </St.ConfirmFieldWrapper>
                    <St.TableFieldWrapper>
                        <h3>미리보기</h3>
                        <div className='table-box'>
                            <table cellSpacing={0}>
                                <thead>
                                    <TableHeaderRow
                                        headers={STATIC_VALUES.HEADERS}
                                    />
                                </thead>
                                <tbody>
                                    {selectedErpItemListValueHook?.map((targetErpItem, rowIndex) => {
                                        return (
                                            <TableBodyRow
                                                key={targetErpItem?.id}
                                                targetErpItem={targetErpItem}
                                                headers={STATIC_VALUES.HEADERS}
                                                rowIndex={rowIndex}
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </St.TableFieldWrapper>
                </St.BodyContainer>
            </CustomDialog>
        </>
    );
}

function TableHeaderRow({
    headers
}) {
    return (
        <tr>
            <th
                className="fixed-header"
                width={100}
            >
                No.
            </th>
            {headers?.map(header => {
                return (
                    <ResizableTh
                        key={header.name}
                        className="fixed-header"
                        scope="col"
                        width={200}
                    >
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                        >
                            <div>
                                {header.headerName}
                            </div>
                        </div>
                    </ResizableTh>
                );
            })}
        </tr>
    );
}

const TableBodyRow = memo(function TableBodyRowMemo({
    targetErpItem,
    headers,
    rowIndex,
}) {
    return (
        <>
            <tr>
                <td>{rowIndex + 1}</td>
                {headers?.map(header => {
                    if (header?.name === 'uniqueCode') {
                        return (<td key={header.name}>자동생성</td>);
                    }

                    if (header?.valueType === 'date') {
                        return (
                            <td key={header.name}>{targetErpItem[header.name] ? CustomDateUtils().dateToYYYYMMDDhhmmss(targetErpItem[header.name]) : ''}</td>
                        );
                    }

                    if (header?.valueType === 'numberWithCommas') {
                        return (
                            <td key={header.name}>{targetErpItem[header.name] ? CustomNumberUtils().numberWithCommas2(targetErpItem[header.name]) : ''}</td>
                        )
                    }

                    return (
                        <td key={header.name}>{targetErpItem[header.name] ? targetErpItem[header.name] : ''}</td>
                    )
                })}
            </tr>
        </>
    );
})