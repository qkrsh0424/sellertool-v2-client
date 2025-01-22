import { useSelector } from "react-redux";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import * as St from './MdRegisterReturnExchange.styled';
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../../../contexts/SelectedErpItemListProvider";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import { memo, useEffect, useState } from "react";
import { StatusUtils } from "../../../utils/StatusUtils";
import { CustomDateUtils } from "../../../../../../../utils/CustomDateUtils";
import { CustomNumberUtils } from "../../../../../../../utils/CustomNumberUtils";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../components/image/CustomImage";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";
import { v4 as uuidv4 } from 'uuid';
import { ReturnExchangeDataConnect } from "../../../../../../../data_connect/ReturnExchangeDataConnect";
import { useErpItemFetcherHook } from "../../../hooks/useErpItemFetcherHook";

export function MdRegisterReturnExchange({
    open,
    toggleOpenClose,
    toggleControlDrawerOpen,
    erpCollectionHeader,
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const erpItemFetcherHook = useErpItemFetcherHook();

    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();

    const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);

    // Reference. 대량의 데이터를 state화 시킬때 나누어서 처리하는 방법
    useEffect(() => {
        if (!selectedErpItemListValueHook) {
            return;
        }

        // interval clear, 아래 조건을 걸지 않으면 인터벌이 무한 루프로 처리되기 때문에 필수!
        if (currentDisplayIndex >= selectedErpItemListValueHook?.length) {
            return;
        }

        const chunkSize = 100;
        const displayMoreData = () => {
            if (currentDisplayIndex < selectedErpItemListValueHook?.length) {
                setCurrentDisplayIndex(Math.min(currentDisplayIndex + chunkSize, selectedErpItemListValueHook?.length));
            }
        }

        const interval = setInterval(displayMoreData, 100); // 100ms마다 새로운 데이터를 추가

        return () => clearInterval(interval);
    }, [selectedErpItemListValueHook, currentDisplayIndex]);

    const handleRemoveItem = (index) => {
        const newSelectedErpItemList = selectedErpItemListValueHook?.filter((_, i) => i !== index);
        if (newSelectedErpItemList.length === 0) {
            toggleOpenClose(false);
        }
        selectedErpItemListActionsHook.onSet(newSelectedErpItemList);
    }

    const handleReqRegisterReturnExchange = async (returnExchangeType) => {
        const notStockReflectedItemIndexes = selectedErpItemListValueHook?.filter(item => item?.stockReflectYn === 'n')?.map((_, index) => index + 1);

        if (notStockReflectedItemIndexes?.length > 0) {
            customToast.error(`재고 반영이 되지 않은 주문건이 있습니다. [${notStockReflectedItemIndexes?.join(', ')}]행 선택 주문건을 확인해주세요.`);
            return;
        }

        let headers = {
            wsId: wsId
        }

        let body = {
            items: selectedErpItemListValueHook?.map(item => {
                return {
                    ...item,
                    cid: null,
                    id: uuidv4(),
                    fromErpItemId: item?.id,
                    erpItemCreatedAt: item?.createdAt,
                    returnExchangeType: returnExchangeType || 'RETURN', // RETURN, EXCHANGE
                    returnExchangeProceedStatus: 'PREPARING' // PREPARING, COLLECTION_REQUEST, COLLECTING, COLLECTION_COMPLETE, INSPECTION_COMPLETE, PROCESSING_COMPLETE, RETURN_SHIPMENT, EXCHANGE_RE_SHIPMENT_PREPARATION, EXCHANGE_RE_SHIPMENT_COMPLETE
                }
            })
        }

        customBackdropController().showBackdrop();

        const regResult = await ReturnExchangeDataConnect().bulkRegister({ body, headers })
            .then((res) => {
                return {
                    res: res,
                    content: res?.data?.data
                }
            })
            .catch((err) => {
                console.error(err);
            });

        if (regResult?.content) {
            const newCreatedErpItemIds = regResult?.content?.newCreatedErpItemIds;
            const duplicatedErpItemIds = regResult?.content?.duplicatedErpItemIds;

            customToast.success(newCreatedErpItemIds?.length + '개의 주문건이 반품/교환 등록 되었습니다.');

            erpItemFetcherHook.reqCountErpItems();
            erpItemFetcherHook.reqFetchErpItemSlice();
            selectedErpItemListActionsHook.setValue(prev => {
                return prev.filter(r => !newCreatedErpItemIds?.includes(r.id))
            });

            if(duplicatedErpItemIds?.length <= 0){
                toggleOpenClose(false);
                toggleControlDrawerOpen(false);
            }
        }

        customBackdropController().hideBackdrop();
    }

    return (
        <>
            <CustomDialog open={open} maxWidth={'xl'} onClose={() => toggleOpenClose(false)}>
                <CustomDialog.CloseButton onClose={() => toggleOpenClose(false)} />
                <St.Frame.Container>
                    <St.EventButtons.Container>
                        <CustomBlockButton
                            type='button'
                            className='return'
                            onClick={() => handleReqRegisterReturnExchange('RETURN')}
                        >
                            <span>반품으로 등록</span>
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='exchange'
                            onClick={() => handleReqRegisterReturnExchange('EXCHANGE')}
                        >
                            <span>교환으로 등록</span>
                        </CustomBlockButton>
                    </St.EventButtons.Container>
                    <St.Table.Container>
                        <h3>미리보기</h3>
                        <div className='table-box'>
                            <table cellSpacing={0}>
                                <thead>
                                    <TableHeaderRow
                                        headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                    />
                                </thead>
                                <tbody>
                                    {selectedErpItemListValueHook?.slice(0, currentDisplayIndex)?.map((targetErpItem, rowIndex) => {
                                        return (
                                            <TableBodyRow
                                                key={targetErpItem?.id}
                                                targetErpItem={targetErpItem}
                                                headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                                rowIndex={rowIndex}
                                                handleRemoveItem={handleRemoveItem}
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </St.Table.Container>
                </St.Frame.Container>
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
                width={50}
            >
                해제
            </th>
            <th
                className="fixed-header"
                width={80}
            >
                재고반영
            </th>
            {headers?.map(header => {
                return (
                    <ResizableTh
                        key={header.id}
                        className="fixed-header"
                        scope="col"
                        width={200}
                    >
                        <div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                        >
                            <div>
                                {header.customHeaderName}
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
    handleRemoveItem
}) {
    return (
        <>
            <tr>
                <td>
                    <CustomBlockButton
                        type='button'
                        className='delete-button-item'
                        onClick={() => handleRemoveItem(rowIndex)}
                    >
                        <div className='icon-figure'>
                            <CustomImage
                                src={'/images/icon/delete_default_e56767.svg'}
                            />
                        </div>
                    </CustomBlockButton>
                </td>
                <td>
                    {targetErpItem?.stockReflectYn === 'y' ? <span style={{ color: 'var(--defaultGreenColor)' }}>O</span> : <span style={{ color: 'var(--defaultRedColor)' }}>X</span>}
                </td>
                {headers?.map(header => {
                    if (['channelOrderDate', 'createdAt', 'salesAt', 'releaseAt', 'holdAt'].includes(header?.matchedFieldName)) {
                        return (
                            <td key={header.id}>{targetErpItem[header.matchedFieldName] ? CustomDateUtils().dateToYYYYMMDDhhmmss(targetErpItem[header.matchedFieldName]) : ''}</td>
                        );
                    }

                    if (['price', 'deliveryCharge'].includes(header?.matchedFieldName)) {
                        return (
                            <td key={header.id}>{targetErpItem[header.matchedFieldName] ? CustomNumberUtils().numberWithCommas2(targetErpItem[header.matchedFieldName]) : ''}</td>
                        )
                    }

                    return (
                        <td key={header.id}>{targetErpItem[header.matchedFieldName] ? targetErpItem[header.matchedFieldName] : ''}</td>
                    )
                })}
            </tr>
        </>
    );
})