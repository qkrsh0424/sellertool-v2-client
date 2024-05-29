import { memo, useCallback, useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../../../contexts/SelectedErpItemListProvider";
import * as St from './MdStockRelease.styled';
import { StatusUtils } from "../../../utils/StatusUtils";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../components/image/CustomImage";
import { TableVirtuoso } from "react-virtuoso";
import CustomInput from "../../../../../../../components/input/with-label/v1/CustomInput";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";
import { CustomDateUtils } from "../../../../../../../utils/CustomDateUtils";
import { CustomNumberUtils } from "../../../../../../../utils/CustomNumberUtils";
import { useApiHook } from "../../../hooks/useApiHook";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import _ from "lodash";
import { useErpItemActionsHook, useErpItemValueHook } from "../../../contexts/ErpItemProvider";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";

export function MdStockRelease({
    open = false,
    toggleStockReleaseModalOpen,
    toggleControlDrawerOpen,

    erpCollectionHeader
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);
    const [notice, setNotice] = useState(null);
    const [memo, setMemo] = useState('');

    const handleCloseModal = () => {
        toggleStockReleaseModalOpen(false);
    }

    const handleClearSelectedItem = useCallback((erpItemId) => {
        selectedErpItemListActionsHook.setValue(prev => {
            const newItems = prev?.filter(r => r.id !== erpItemId);
            if (newItems?.length <= 0) {
                toggleStockReleaseModalOpen(false)
                toggleControlDrawerOpen(false)
            }
            return newItems;
        })
    }, [])

    const handleChangeMemo = (e) => {
        let value = e.target.value;

        setMemo(value);
    }

    const handleSubmit = async () => {
        setDisabledBtn(true);
        try {
            if (!memo || memo?.length > 150) {
                throw new Error('출고메모는 1-150자 내외 필수 입력입니다.');
            }
            let stockReflectedItems = [];
            let notSetReleaseOptionCodeItems = [];
            let notCompleteItems = [];

            selectedErpItemListValueHook?.forEach(r => {
                const classificationType = StatusUtils().getClassificationTypeForFlags({ salesYn: r?.salesYn, releaseYn: r?.releaseYn, holdYn: r?.holdYn });

                if (r.stockReflectYn === 'y') {
                    stockReflectedItems.push(r);
                }

                if (!r.releaseOptionCode) {
                    notSetReleaseOptionCodeItems.push(r);
                }

                if (classificationType !== 'COMPLETE') {
                    notCompleteItems.push(r);
                }

            });

            if (stockReflectedItems?.length >= 1) {
                throw new Error(`이미 재고반영 처리된 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => (`${r.uniqueCode}\n`))?.join().replaceAll(',', '')}`);
            }

            if (notSetReleaseOptionCodeItems?.length >= 1) {
                throw new Error(`[M] 출고옵션코드가 지정되지 않은 데이터가 있습니다. 해당 데이터를 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${notSetReleaseOptionCodeItems?.map(r => (`${r.uniqueCode}\n`))?.join().replaceAll(',', '')}`);
            }

            if (notCompleteItems?.length >= 1) {
                throw new Error(`출고완료 상태가 아닌 주문건이 있습니다. 해당 주문건을 제외 후 실행해 주세요.\n[M] 주문수집번호 :\n${notCompleteItems?.map(r => (`${r.uniqueCode}\n`))?.join().replaceAll(',', '')}`);
            }
        } catch (err) {
            setNotice(err.message);
            return;
        }

        customBackdropController().showBackdrop();

        const erpItemIds = selectedErpItemListValueHook?.map(r => r.id);

        let body = {
            erpItemIds: erpItemIds,
            memo: memo
        }

        const updateResult = await apiHook.reqStockRelease({ body, headers: { wsId: wsId } })

        if (updateResult?.content) {
            const updateIds = [...updateResult?.content];

            const fetchResult = await apiHook.reqFetchErpItemListByIds({
                body: {
                    ids: updateIds,
                    matchedCode: router?.query?.matchedCode
                },
                headers: { wsId: wsId }
            })

            if (fetchResult?.content) {
                let newErpItemContent = _.cloneDeep(erpItemValueHook?.content);
                let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

                newErpItemContent.content = newErpItemContent?.content?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                newSelectedErpItemList = newSelectedErpItemList?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                erpItemActionsHook.content.onSet(newErpItemContent);
                selectedErpItemListActionsHook.onSet(newSelectedErpItemList);

                toggleStockReleaseModalOpen(false);
                toggleControlDrawerOpen(false);
                customToast.success(`${erpItemIds?.length}개의 주문건에 대한 재고가 반영되었습니다.`)
            }
        }
        customBackdropController().hideBackdrop();
    }

    // Reference. 대량의 데이터를 state화 시킬때 나누어서 처리하는 방법
    useEffect(() => {
        if (!selectedErpItemListValueHook) {
            return;
        }

        // interval clear, 아래 조건을 걸지 않으면 인터벌이 무한 루프로 처리되기 때문에 필수!
        if (currentDisplayIndex >= selectedErpItemListValueHook?.length) {
            return;
        }

        const chunkSize = 10;
        const displayMoreData = () => {
            if (currentDisplayIndex < selectedErpItemListValueHook?.length) {
                setCurrentDisplayIndex(Math.min(currentDisplayIndex + chunkSize, selectedErpItemListValueHook?.length));
            }
        }

        const interval = setInterval(displayMoreData, 100); // 100ms마다 새로운 데이터를 추가

        return () => clearInterval(interval);
    }, [selectedErpItemListValueHook, currentDisplayIndex]);

    return (
        <>
            <CustomDialog open={open} maxWidth='md' onClose={() => handleCloseModal()} backgroundColor={'#fff'}>
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <St.BodyContainer>
                    <St.SubmitFormWrapper onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <CustomInput
                            type='text'
                            value={memo || ''}
                            onChange={(e) => handleChangeMemo(e)}
                            label={<><span style={{ color: 'var(--defaultRedColor)' }}>*</span><span>출고메모</span></>}
                        />
                        <CustomBlockButton
                            type='submit'
                            className='submit'
                            disabled={disabledBtn}
                        >
                            재고반영
                        </CustomBlockButton>
                        {notice &&
                            <div className='noticeBox'>
                                {notice}
                            </div>
                        }
                    </St.SubmitFormWrapper>
                    <St.TableFieldWrapper>
                        <h3>미리보기</h3>
                        <div className='table-box'>
                            <TableVirtuoso
                                data={selectedErpItemListValueHook?.slice(0, currentDisplayIndex)}
                                // data={selectedErpItemListValueHook}
                                totalCount={selectedErpItemListValueHook?.length}
                                fixedHeaderContent={() => (
                                    <TableHeaderRow
                                        headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                    />
                                )}
                                itemContent={(rowIndex, targetErpItem) => (
                                    <TableBodyRow
                                        targetErpItem={targetErpItem}
                                        headers={erpCollectionHeader?.erpCollectionHeaderDetails}
                                        rowIndex={rowIndex}
                                        onClearSelectedErpItem={handleClearSelectedItem}
                                    />
                                )}
                            />
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
                width={80}
            >
                선택해제
            </th>
            <th
                className="fixed-header"
                width={120}
            >
                재고반영 가능 여부
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
    onClearSelectedErpItem
}) {
    let isStockReflectedFlag = targetErpItem?.stockReflectYn === 'y' ? true : false;
    let isNotSetReleaseOptionCodeFlag = !targetErpItem?.releaseOptionCode ? true : false;
    let isNotCompletedStatusFlag = StatusUtils().getClassificationTypeForFlags({ salesYn: targetErpItem?.salesYn, releaseYn: targetErpItem?.releaseYn, holdYn: targetErpItem?.holdYn }) !== 'COMPLETE' ? true : false;

    return (
        <>
            <td>
                <div className='selectClearButtonBox'>
                    <CustomBlockButton
                        type='button'
                        onClick={() => onClearSelectedErpItem(targetErpItem?.id)}
                        className='selectClearButton'
                    >
                        <CustomImage src='/images/icon/close_default_e56767.svg' />
                    </CustomBlockButton>
                </div>
            </td>
            <td>
                <div className='reflectNoticeBox'>
                    {isStockReflectedFlag && <div className='warning'>이미 재고반영 됨</div>}
                    {isNotSetReleaseOptionCodeFlag && <div className='warning'>출고욥선코드 미지정</div>}
                    {isNotCompletedStatusFlag && <div className='warning'>출고완료상태가 아님</div>}
                    {(!isStockReflectedFlag && !isNotSetReleaseOptionCodeFlag && !isNotCompletedStatusFlag) && <div className='success'>정상</div>}
                </div>
            </td>
            {headers?.map(header => {
                if (['channelOrderDate', 'createdAt', 'salesAt', 'releaseAt', 'holdAt'].includes(header.matchedFieldName)) {
                    return (
                        <td key={header.id}>{targetErpItem[header?.matchedFieldName] ? CustomDateUtils().dateToYYYYMMDDhhmmss(targetErpItem[header?.matchedFieldName]) : ''}</td>
                    )
                }

                if (['price', 'deliveryCharge'].includes(header.matchedFieldName)) {
                    return (
                        <td key={header.id}>{targetErpItem[header?.matchedFieldName] ? CustomNumberUtils().numberWithCommas2(targetErpItem[header?.matchedFieldName]) : ''}</td>
                    )
                }

                return (
                    <td key={header.id}>{targetErpItem[header?.matchedFieldName] ? targetErpItem[header?.matchedFieldName] : ''}</td>
                )
            })}
        </>
    );
})