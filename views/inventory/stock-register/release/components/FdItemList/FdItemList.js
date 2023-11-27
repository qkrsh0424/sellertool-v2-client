import { useEffect, useState } from "react";
import CustomImage from "../../../../../../components/image/CustomImage";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import { St } from "./FdItemList.styled";
import { usePrepareReleaseItemListActionsHook, usePrepareReleaseItemListValueHook } from "../../contexts/PrepareReleaseItemListProvider";
import { CustomNumberUtils } from "../../../../../../utils/CustomNumberUtils";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { FdBulkInput } from "./components/FdBulkInput/FdBulkInput";
import { useRouter } from "next/router";
import { useInventoryStocksHook } from "../../../../root/v2/hooks";
import { useApiHook } from "../../hooks/useApiHook";
import { useSelector } from "react-redux";
import { FdDateTimeSelector } from "./components/FdDateTimeSelector/FdDateTimeSelector";
import { customToast } from "../../../../../../components/toast/custom-react-toastify/v1";
import { customBackdropController } from "../../../../../../components/backdrop/default/v1";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";

const customNumberUtils = CustomNumberUtils();
const customBackdropControl = customBackdropController();

export function FdItemList({
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const prepareReleaseItemListValueHook = usePrepareReleaseItemListValueHook();
    const prepareReleaseItemListActionsHook = usePrepareReleaseItemListActionsHook();

    const apiHook = useApiHook();
    const inventoryStocksHook = useInventoryStocksHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const [inventoryReleaseItemList, setInventoryReleaseItemList] = useState([]);
    const [stockReflectDateTime, setStockReflectDateTime] = useState(null);
    const [deleteModeOpen, setDeleteModeOpen] = useState(false);
    const [selectedDeleteItemIdList, setSelectedDeleteItemIdList] = useState([]);

    useEffect(() => {
        if (!wsId || !prepareReleaseItemListValueHook || prepareReleaseItemListValueHook?.length <= 0) {
            setInventoryReleaseItemList([]);
            return;
        }

        initializeInventoryReleaseItemList();
        initializeInventoryStocks();
    }, [prepareReleaseItemListValueHook, wsId]);

    useEffect(() => {
        if (!inventoryReleaseItemList || inventoryReleaseItemList?.length <= 0) {
            return;
        }


    }, [inventoryReleaseItemList])

    const initializeInventoryReleaseItemList = () => {
        setInventoryReleaseItemList((prev) => {
            return prepareReleaseItemListValueHook?.map(prepareReleaseItem => {
                let existedItem = prev?.find(r => r?.id === prepareReleaseItem?.id);
                if (existedItem) {
                    return {
                        ...existedItem
                    }
                }

                return {
                    id: prepareReleaseItem?.id,
                    unit: prepareReleaseItem?.unit,
                    memo: prepareReleaseItem?.memo,
                    productOptionId: prepareReleaseItem?.productOptionId,
                    productThumbnailUri: prepareReleaseItem?.productThumbnailUri,
                    productName: prepareReleaseItem?.productName,
                    productTag: prepareReleaseItem?.productTag,
                    productOptionCode: prepareReleaseItem?.productOptionCode,
                    productOptionName: prepareReleaseItem?.productOptionName,
                    productOptionTag: prepareReleaseItem?.productOptionTag,
                }
            })
        })
    }

    const initializeInventoryStocks = async () => {
        if (!wsId || !prepareReleaseItemListValueHook || prepareReleaseItemListValueHook?.length <= 0) {
            return;
        }

        let resultInventoryStocks = null;
        let productOptionIds = prepareReleaseItemListValueHook?.map(r => r.productOptionId);

        await apiHook.reqFetchInventoryStocks({
            body: { productOptionIds: productOptionIds },
            headers: { wsId: wsId }
        },
            (results, response) => {
                resultInventoryStocks = results;
            }
        )

        inventoryStocksHook.onSetInventoryStocks(resultInventoryStocks);
    }

    const toggleDeleteModeOpen = (bool) => {
        setSelectedDeleteItemIdList([]);
        setDeleteModeOpen(bool);
    }

    const handleDeleteItemList = () => {
        let newItemList = [...prepareReleaseItemListValueHook];
        newItemList = newItemList.filter(r => !selectedDeleteItemIdList.includes(r.id));
        prepareReleaseItemListActionsHook.onSet(newItemList);
        toggleDeleteModeOpen(false);
    }

    const handleSelectDeleteItemId = (id) => {
        let newItemList = [...selectedDeleteItemIdList];
        let existed = newItemList.includes(id);

        if (existed) {
            newItemList = newItemList.filter(r => r !== id);
        } else {
            newItemList.push(id);
        }

        setSelectedDeleteItemIdList(newItemList);
    }

    const handleChangeUnit = (reqIndex, value) => {
        value = value.replaceAll(',', '');
        value = customNumberUtils.getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,6}$/)) {
            setInventoryReleaseItemList((prev) => {
                return prev?.map((r, index) => {
                    if (reqIndex === index) {
                        return {
                            ...r,
                            unit: value
                        }
                    }
                    return {
                        ...r
                    }
                })
            });
        }
    }

    const handleChangeUnitBulk = (value) => {
        value = value.replaceAll(',', '');
        value = customNumberUtils.getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,6}$/)) {
            setInventoryReleaseItemList((prev) => {
                return prev?.map((r, index) => {
                    return {
                        ...r,
                        unit: value
                    }
                })
            });
        }
    }

    const handleChangeMemo = (reqIndex, value) => {
        if (value && value?.length > 150) {
            return;
        }

        setInventoryReleaseItemList((prev) => {
            return prev?.map((r, index) => {
                if (reqIndex === index) {
                    return {
                        ...r,
                        memo: value
                    }
                }
                return {
                    ...r
                }
            })
        });
    }

    const handleChangeMemoBulk = (value) => {
        if (value && value?.length > 150) {
            return;
        }

        setInventoryReleaseItemList((prev) => {
            return prev?.map((r, index) => {
                return {
                    ...r,
                    memo: value
                }
            })
        });
    }

    const handleChangeStockReflectDateTime = (value) => {
        setStockReflectDateTime(value);
    }

    const checkUnitFormatValid = () => {
        inventoryReleaseItemList.forEach((r, index) => {
            if (r.unit < 1 || r.unit > 999999) {
                throw new Error(`${index + 1}행, ${r.productName} / ${r.productOptionName}\n수량을 정확히 입력해 주세요.\n허용 범위 [1-999,999]`);
            }
        })
    }

    const checkMemoFormatValid = () => {
        inventoryReleaseItemList.forEach((r, index) => {
            if (r.memo.length > 150) {
                throw new Error(`${index + 1}행, ${r.productName} / ${r.productOptionName}\n메모를 정확히 입력해 주세요.\n허용 범위 [0-150]`);
            }
        })
    }

    const handleSubmitRegister = async () => {
        try {
            checkUnitFormatValid();
            checkMemoFormatValid();
        } catch (err) {
            customToast.error(err.message);
            return;
        }

        setDisabledBtn(true);
        customBackdropControl.showBackdrop();
        const body = {
            inventoryReleases: inventoryReleaseItemList?.map(r => {
                return {
                    id: r?.id,
                    unit: r?.unit,
                    memo: r?.memo ? r?.memo : '',
                    productOptionId: r?.productOptionId,
                    stockReflectDateTime: !stockReflectDateTime ? new Date() : new Date(stockReflectDateTime),
                    erpItemId: null
                }
            })
        }

        await apiHook.reqCreateAllInventoryReleaseList({ body: body, headers: { wsId: wsId } },
            () => {
                router.back();
            }
        );

        customBackdropControl.hideBackdrop();

    }

    if (!inventoryReleaseItemList || inventoryReleaseItemList?.length <= 0) {
        return null;
    }

    return (
        <>
            <St.ControllerContainer>
                <FdBulkInput
                    onChangeUnitBulk={handleChangeUnitBulk}
                    onChangeMemoBulk={handleChangeMemoBulk}
                />
                <FdDateTimeSelector
                    stockReflectDateTime={stockReflectDateTime}
                    onChangeStockReflectDateTime={handleChangeStockReflectDateTime}
                />
            </St.ControllerContainer>

            {!deleteModeOpen &&
                <St.DeleteContainer>
                    <div className='count-text'>총 {inventoryReleaseItemList?.length || 0} 개</div>
                    <CustomBlockButton
                        type='button'
                        className='delete-mode-button'
                        onClick={() => toggleDeleteModeOpen(true)}
                    >
                        삭제
                    </CustomBlockButton>
                </St.DeleteContainer>
            }
            {deleteModeOpen &&
                <St.DeleteContainer>
                    <div className='count-text' style={{ color: 'var(--defaultRedColor)' }}>{selectedDeleteItemIdList?.length || 0} 개 선택됨</div>
                    <div className="flexible-row">
                        <CustomBlockButton
                            type='button'
                            className='delete-button'
                            onClick={() => handleDeleteItemList()}
                        >
                            선택 삭제
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='cancel-button'
                            onClick={() => toggleDeleteModeOpen(false)}
                        >
                            취소
                        </CustomBlockButton>
                    </div>
                </St.DeleteContainer>
            }
            <St.CardListContainer>
                <div className="wrapper">
                    {inventoryReleaseItemList?.map((inventoryReleaseItem, index) => {
                        const isTargetDeleteItem = selectedDeleteItemIdList.includes(inventoryReleaseItem?.id);
                        const remainedQuantity = inventoryStocksHook?.inventoryStocks?.find(r => r.productOptionId === inventoryReleaseItem?.productOptionId)?.stockUnit;

                        return (
                            <div
                                key={inventoryReleaseItem?.id}
                                className='cardItem'
                                onClick={() => {
                                    return deleteModeOpen ? handleSelectDeleteItemId(inventoryReleaseItem?.id) : {}
                                }}
                                style={{
                                    border: isTargetDeleteItem ? '1px solid var(--defaultRedColor)' : '',
                                    cursor: deleteModeOpen ? 'pointer' : ''
                                }}
                            >
                                {deleteModeOpen &&
                                    <div className='delete-button-field'>
                                        <button
                                            type='button'
                                        >
                                            {isTargetDeleteItem ?
                                                <CustomImage
                                                    src={'/images/icon/check_circle_e56767.svg'}
                                                />
                                                :
                                                <CustomImage
                                                    src={'/images/icon/circle_default_e0e0e0.svg'}
                                                />
                                            }
                                        </button>
                                    </div>
                                }
                                <div className='image-figure'>
                                    <CustomImage
                                        src={inventoryReleaseItem?.productThumbnailUri}
                                    />
                                </div>
                                <div className='contents'>
                                    <div className='information'>
                                        <div>
                                            {inventoryReleaseItem?.productName} <span className='tag'>[{inventoryReleaseItem?.productTag ? inventoryReleaseItem?.productTag : '태그 미지정'}]</span>
                                        </div>
                                        <div>
                                            {inventoryReleaseItem?.productOptionName} <span className='tag'>[{inventoryReleaseItem?.productOptionTag ? inventoryReleaseItem?.productOptionTag : '태그 미지정'}]</span>
                                        </div>
                                        <div>
                                            <div>
                                                {inventoryReleaseItem?.productOptionCode}
                                            </div>
                                            <div>재고수량: {customNumberUtils.numberWithCommas2(remainedQuantity)}</div>
                                        </div>
                                    </div>
                                    <div className='form-items'>
                                        <div>
                                            <CustomInput
                                                placeholder={'출고수량'}
                                                name='unit'
                                                value={customNumberUtils.numberWithCommas2(inventoryReleaseItem?.unit) ?? ''}
                                                onChange={(e) => handleChangeUnit(index, e.target.value)}
                                                disabled={deleteModeOpen}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder={'메모'}
                                                name='memo'
                                                value={inventoryReleaseItem?.memo || ''}
                                                onChange={(e) => handleChangeMemo(index, e.target.value)}
                                                disabled={deleteModeOpen}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </St.CardListContainer>
            {!deleteModeOpen &&
                <St.FooterAppBar>
                    <div className="wrapper">
                        <CustomBlockButton
                            type='button'
                            className='confirm-button'
                            onClick={() => handleSubmitRegister()}
                            disabled={disabledBtn}
                        >
                            등록
                        </CustomBlockButton>
                    </div>
                </St.FooterAppBar>
            }
        </>
    );
}