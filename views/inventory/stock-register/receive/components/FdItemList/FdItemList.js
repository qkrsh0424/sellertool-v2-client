import { useEffect, useState } from "react";
import CustomImage from "../../../../../../components/image/CustomImage";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import { St } from "./FdItemList.styled";
import { usePrepareReceiveItemListActionsHook, usePrepareReceiveItemListValueHook } from "../../contexts/PrepareReceiveItemListProvider";
import { v4 as uuidv4 } from 'uuid';
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

    const prepareReceiveItemListValueHook = usePrepareReceiveItemListValueHook();
    const prepareReceiveItemListActionsHook = usePrepareReceiveItemListActionsHook();

    const apiHook = useApiHook();
    const inventoryStocksHook = useInventoryStocksHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const [inventoryReceiveItemList, setInventoryReceiveItemList] = useState([]);
    const [stockReflectDateTime, setStockReflectDateTime] = useState(null);

    useEffect(() => {
        if (!wsId || !prepareReceiveItemListValueHook || prepareReceiveItemListValueHook?.length <= 0) {
            setInventoryReceiveItemList([]);
            return;
        }

        initializeInventoryReceiveItemList();
        initializeInventoryStocks();
    }, [prepareReceiveItemListValueHook, wsId]);

    useEffect(() => {
        if (!inventoryReceiveItemList || inventoryReceiveItemList?.length <= 0) {
            return;
        }


    }, [inventoryReceiveItemList])

    const initializeInventoryReceiveItemList = () => {
        setInventoryReceiveItemList((prev) => {
            return prepareReceiveItemListValueHook?.map(prepareReceiveItem => {
                let existedItem = prev?.find(r => r?.productOptionId === prepareReceiveItem?.id);
                if (existedItem) {
                    return {
                        ...existedItem
                    }
                }

                return {
                    id: uuidv4(),
                    unit: '',
                    memo: '',
                    purchaseCost: prepareReceiveItem?.totalPurchasePrice,
                    productOptionId: prepareReceiveItem?.id,
                    productThumbnailUri: prepareReceiveItem?.product?.thumbnailUri,
                    productName: prepareReceiveItem?.product?.name,
                    productTag: prepareReceiveItem?.product?.productTag,
                    productOptionCode: prepareReceiveItem?.code,
                    productOptionName: prepareReceiveItem?.name,
                    productOptionTag: prepareReceiveItem?.optionTag,
                }
            })
        })
    }

    const initializeInventoryStocks = async () => {
        if (!wsId || !prepareReceiveItemListValueHook || prepareReceiveItemListValueHook?.length <= 0) {
            return;
        }

        let resultInventoryStocks = null;
        let productOptionIds = prepareReceiveItemListValueHook?.map(r => r.id);

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

    const handleDeleteItem = (productOptionId) => {
        let newItemList = [...prepareReceiveItemListValueHook];
        newItemList = newItemList.filter(r => r.id !== productOptionId);
        prepareReceiveItemListActionsHook.onSet(newItemList);
    }

    const handleChangeUnit = (reqIndex, value) => {
        value = value.replaceAll(',', '');
        value = customNumberUtils.getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,4}$/)) {
            setInventoryReceiveItemList((prev) => {
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

        if (value.match(/^[0-9]{0,4}$/)) {
            setInventoryReceiveItemList((prev) => {
                return prev?.map((r, index) => {
                    return {
                        ...r,
                        unit: value
                    }
                })
            });
        }
    }

    const handleChangePurchaseCost = (reqIndex, value) => {
        value = value.replaceAll(',', '');
        value = customNumberUtils.getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,8}$/)) {
            setInventoryReceiveItemList((prev) => {
                return prev?.map((r, index) => {
                    if (reqIndex === index) {
                        return {
                            ...r,
                            purchaseCost: value
                        }
                    }
                    return {
                        ...r
                    }
                })
            });
        }
    }

    const handleChangePurchaseCostBulk = (value) => {
        value = value.replaceAll(',', '');
        value = customNumberUtils.getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,8}$/)) {
            setInventoryReceiveItemList((prev) => {
                return prev?.map((r, index) => {
                    return {
                        ...r,
                        purchaseCost: value
                    }
                })
            });
        }
    }

    const handleChangeMemo = (reqIndex, value) => {
        if (value && value?.length > 150) {
            return;
        }

        setInventoryReceiveItemList((prev) => {
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

        setInventoryReceiveItemList((prev) => {
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
        inventoryReceiveItemList.forEach((r, index) => {
            if (r.unit < 1 || r.unit > 9999) {
                throw new Error(`${index + 1}행, ${r.productName} / ${r.productOptionName}\n수량을 정확히 입력해 주세요.\n허용 범위 [1-9,999]`);
            }
        })
    }

    const checkMemoFormatValid = () => {
        inventoryReceiveItemList.forEach((r, index) => {
            if (r.memo.length > 150) {
                throw new Error(`${index + 1}행, ${r.productName} / ${r.productOptionName}\n메모를 정확히 입력해 주세요.\n허용 범위 [0-150]`);
            }
        })
    }

    const checkPurchaseCostFormatValid = () => {
        inventoryReceiveItemList.forEach((r, index) => {
            if (r.purchaseCost > 99999999) {
                throw new Error(`${index + 1}행, ${r.productName} / ${r.productOptionName}\n매입단가를 정확히 입력해 주세요.\n허용 범위 [0-99,999,999]`);
            }
        })
    }

    const handleSubmitRegister = async () => {
        try {
            checkUnitFormatValid();
            checkMemoFormatValid();
            checkPurchaseCostFormatValid();
        } catch (err) {
            customToast.error(err.message);
            return;
        }

        setDisabledBtn(true);
        customBackdropControl.showBackdrop();
        const body = {
            inventoryReceives: inventoryReceiveItemList?.map(r => {
                return {
                    id: r?.id,
                    unit: r?.unit,
                    memo: r?.memo ? r?.memo : '',
                    purchaseCost: r?.purchaseCost ? r?.purchaseCost : 0,
                    productOptionId: r?.productOptionId,
                    stockReflectDateTime: !stockReflectDateTime ? new Date() : new Date(stockReflectDateTime)
                }
            })
        }

        await apiHook.reqCreateAllInventoryReceiveList({ body: body, headers: { wsId: wsId } },
            () => {
                router.back();
            }
        );
        customBackdropControl.hideBackdrop();

    }

    if (!inventoryReceiveItemList || inventoryReceiveItemList?.length <= 0) {
        return null;
    }

    return (
        <>
            <St.ControllerContainer>
                <FdBulkInput
                    onChangeUnitBulk={handleChangeUnitBulk}
                    onChangePurchaseCostBulk={handleChangePurchaseCostBulk}
                    onChangeMemoBulk={handleChangeMemoBulk}
                />
                <FdDateTimeSelector
                    stockReflectDateTime={stockReflectDateTime}
                    onChangeStockReflectDateTime={handleChangeStockReflectDateTime}
                />
            </St.ControllerContainer>
            <St.CardListContainer>
                <div className="wrapper">
                    {inventoryReceiveItemList?.map((inventoryReceiveItem, index) => {
                        const remainedQuantity = inventoryStocksHook?.inventoryStocks?.find(r => r.productOptionId === inventoryReceiveItem?.productOptionId)?.stockUnit;

                        return (
                            <div key={inventoryReceiveItem?.id} className='cardItem'>
                                <div className='delete-button-field'>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleDeleteItem(inventoryReceiveItem?.productOptionId)}
                                    >
                                        <CustomImage
                                            src={'/images/icon/close_default_e56767.svg'}
                                        />
                                    </CustomBlockButton>
                                </div>
                                <div className='image-figure'>
                                    <CustomImage
                                        src={inventoryReceiveItem?.productThumbnailUri}
                                    />
                                </div>
                                <div className='contents'>
                                    <div className='information'>
                                        <div>
                                            {inventoryReceiveItem?.productName} <span className='tag'>[{inventoryReceiveItem?.productTag ? inventoryReceiveItem?.productTag : '태그 미지정'}]</span>
                                        </div>
                                        <div>
                                            {inventoryReceiveItem?.productOptionName} <span className='tag'>[{inventoryReceiveItem?.productOptionTag ? inventoryReceiveItem?.productOptionTag : '태그 미지정'}]</span>
                                        </div>
                                        <div>
                                            <div>
                                                {inventoryReceiveItem?.productOptionCode}
                                            </div>
                                            <div>재고수량: {customNumberUtils.numberWithCommas2(remainedQuantity)}</div>
                                        </div>
                                    </div>
                                    <div className='form-items'>
                                        <div>
                                            <CustomInput
                                                placeholder={'입고수량'}
                                                name='unit'
                                                value={customNumberUtils.numberWithCommas2(inventoryReceiveItem?.unit) || ''}
                                                onChange={(e) => handleChangeUnit(index, e.target.value)}
                                            />
                                            <CustomInput
                                                placeholder={'매입단가'}
                                                name='purchaseCost'
                                                value={customNumberUtils.numberWithCommas2(inventoryReceiveItem?.purchaseCost) || ''}
                                                onChange={(e) => handleChangePurchaseCost(index, e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <textarea
                                                placeholder={'메모'}
                                                name='memo'
                                                value={inventoryReceiveItem?.memo || ''}
                                                onChange={(e) => handleChangeMemo(index, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </St.CardListContainer>
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
        </>
    );
}