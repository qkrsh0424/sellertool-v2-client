import { useSelector } from 'react-redux';
import { CustomDialog } from '../../../../../../../components/dialog/v1/CustomDialog';
import * as St from './MdDeleteSelected.styled';
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from '../../../contexts/SelectedErpItemListProvider';
import { useApiHook } from '../../../hooks/useApiHook';
import { useErpItemFetcherHook } from '../../../hooks/useErpItemFetcherHook';
import ResizableTh from '../../../../../../../components/table/th/v1/ResizableTh';
import { memo } from 'react';
import { CustomDateUtils } from '../../../../../../../utils/CustomDateUtils';
import { CustomNumberUtils } from '../../../../../../../utils/CustomNumberUtils';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { customBackdropController } from '../../../../../../../components/backdrop/default/v1';
import _ from 'lodash';
import { customToast } from '../../../../../../../components/toast/custom-react-toastify/v1';

export function MdDeleteSelected({
    open,
    toggleDeleteErpItemsConfirmModalOpen,
    toggleControlDrawerOpen,
    erpCollectionHeader,
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();

    const apiHook = useApiHook();
    const erpItemFetcherHook = useErpItemFetcherHook();

    const handleCloseModal = () => {
        toggleDeleteErpItemsConfirmModalOpen(false);
    }

    const handleReqDelete = async () => {
        customBackdropController().showBackdrop(true);

        let headers = {
            wsId: wsId
        }

        let body = {
            ids: selectedErpItemListValueHook?.map(r => r.id)
        }

        const deleteResult = await apiHook.reqDeleteErpItemList({ body, headers });

        if (deleteResult?.content) {
            const fetchIds = [...deleteResult?.content];
            let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

            newSelectedErpItemList = newSelectedErpItemList?.filter(erpItem => !fetchIds?.includes(erpItem?.id));

            selectedErpItemListActionsHook.onSet(newSelectedErpItemList);

            customToast.success(fetchIds?.length + '개의 주문건이 삭제 되었습니다.');
            erpItemFetcherHook.reqCountErpItems();
            erpItemFetcherHook.reqFetchErpItemSlice();
            toggleDeleteErpItemsConfirmModalOpen(false);
            toggleControlDrawerOpen(false);
        }

        customBackdropController().hideBackdrop(false);
    }

    return (
        <>
            <CustomDialog open={open} maxWidth={'xl'} onClose={() => handleCloseModal()}>
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <St.BodyContainer>
                    <St.ConfirmFieldWrapper>
                        <div className='text'>
                            {selectedErpItemListValueHook?.length} 개의 주문건을 영구 삭제 합니다.
                        </div>
                        <div>
                            <CustomBlockButton
                                type='button'
                                onClick={() => handleReqDelete()}
                            >
                                삭제
                            </CustomBlockButton>
                        </div>
                    </St.ConfirmFieldWrapper>
                    <St.TableFieldWrapper>
                        <h3>미리보기</h3>
                        <div className='table-box'>
                            <table cellSpacing={0}>
                                <thead>
                                    <TableHeaderRow
                                        headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                    />
                                </thead>
                                <tbody>
                                    {selectedErpItemListValueHook?.map((targetErpItem, rowIndex) => {
                                        return (
                                            <TableBodyRow
                                                key={targetErpItem?.id}
                                                targetErpItem={targetErpItem}
                                                headers={erpCollectionHeader?.erpCollectionHeaderDetails}
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
}) {
    return (
        <>
            <tr>
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