import { useEffect, useRef, useState } from "react";
import FieldCircleLoading from "../../../../../../../components/loading/field-loading/v1/FieldCircleLoading";
import { useReturnExchangeActionsHook, useReturnExchangeValueHook } from "../../../contexts/ReturnExchangeProvider";
import styled from 'styled-components';
import { Popover } from "@mui/material";
import CustomBlockButton from "../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomSearchOptionCodesModal } from "../../../../../../../components/search-option-codes/v3";
import _ from "lodash";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";
import ConcurrencyRequest from "../../../../../../../utils/ConcurrencyRequest";
import { ReturnExchangeDataConnect } from "../../../../../../../data_connect/ReturnExchangeDataConnect";

const EditBox = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .inputBox{
        display: flex;
        gap: 5px;
        align-items: center;

        .label{
            font-size: 10px;
            font-weight: 600;
            min-width: 40px;
        }

        .productSelectButton{
            background-color: var(--defaultBlueColor);
            color: #fff;
            padding: 5px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            height: 30px;
            border: none;
        }
    }

    input{
        min-width: 200px;
        padding: 5px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        outline: none;
        font-size: 12px;
        padding: 8px;
        &:focus{
            border: 1px solid var(--defaultBlueColor);
        }
    }

    textarea{
        min-width: 200px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        outline: none;
        font-size: 12px;
        padding: 8px;
        vertical-align: top;
        &:focus{
            border: 1px solid var(--defaultBlueColor);
        }
    }
`;

const ClickableSpan = styled.span`
    cursor: pointer;
    white-space: pre-wrap;
`;

export function TdExchangeProductInfo({
    returnExchange
}) {
    const returnExchangeValueHook = useReturnExchangeValueHook();
    const returnExchangeActionsHook = useReturnExchangeActionsHook();

    const [anchorEl, setAnchorEl] = useState(null);
    const [inputValues, setInputValues] = useState({
        exchangeProductOptionCode: '',
        exchangeProductQuantity: 0
    });
    const [previewProductOptionData, setPreviewProductOptionData] = useState(null);
    const [selectOptionCodeModalOpen, setSelectOptionCodeModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const releaseProductOptionData = returnExchangeValueHook.productOptions?.find(productOption => productOption.code === returnExchange?.exchangeProductOptionCode);

    const editOpen = Boolean(anchorEl);

    const handleReqBulkUpdate = async () => {
        setIsLoading(true);
        returnExchangeActionsHook.returnExchangesActions.setValue(prev => {
            return prev.map(prevItem => {
                const targetItem = prevItem.id === returnExchange.id ? { ...prevItem, ...inputValues } : null;
                if (targetItem) {
                    return targetItem;
                } else {
                    return prevItem;
                }
            })
        })
        const updateResult = await ConcurrencyRequest(() => ReturnExchangeDataConnect().bulkUpdate({
            body: {
                returnExchanges: [{
                    ...returnExchange,
                    ...inputValues
                }]
            },
            headers: {
                wsId: returnExchange?.workspaceId
            }
        })
            .then(res => res?.status === 200 ? { res: res, content: res?.data?.data } : { res: res, content: null })
            .catch(err => {
                customToast.error(err?.response?.data?.memo || '에러가 발생했습니다.');
                return null;
            }))

        if (updateResult?.content) {
            returnExchangeActionsHook.returnExchangesActions.setValue(prev => {
                return prev.map(prevItem => {
                    const newItem = updateResult?.content?.find(r => r.id === prevItem.id)
                    if (newItem) {
                        return {
                            ...prevItem,
                            exchangeProductOptionCode: newItem?.exchangeProductOptionCode,
                            exchangeProductQuantity: newItem?.exchangeProductQuantity,
                        };
                    } else {
                        return prevItem;
                    }
                })
            })
        }

        setIsLoading(false);
    }

    const handleClickOpenEditMode = (e) => {
        setAnchorEl(e.currentTarget);
        setPreviewProductOptionData(_.cloneDeep(releaseProductOptionData));
        setInputValues({
            exchangeProductOptionCode: returnExchange?.exchangeProductOptionCode,
            exchangeProductQuantity: returnExchange?.exchangeProductQuantity
        });
    }

    const handleCloseEditMode = async () => {
        setAnchorEl(null);
        await handleReqBulkUpdate();
    }

    const handleOpenSelectOptionCodeModal = () => {
        setSelectOptionCodeModalOpen(true);
    }

    const handleCloseSelectOptionCodeModal = () => {
        setSelectOptionCodeModalOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCloseEditMode();
    }

    const handleChangeInputValues = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValues(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    return (
        <>
            <td>
                <div>
                    {releaseProductOptionData ?
                        <>
                            <div>
                                <ClickableSpan onClick={(e) => handleClickOpenEditMode(e)}>{releaseProductOptionData?.product?.name}</ClickableSpan>
                            </div>
                            <div>
                                <ClickableSpan onClick={(e) => handleClickOpenEditMode(e)}>{releaseProductOptionData?.name}</ClickableSpan>
                            </div>
                            <div>
                                <ClickableSpan onClick={(e) => handleClickOpenEditMode(e)}>{returnExchange?.exchangeProductQuantity}개</ClickableSpan>
                            </div>
                        </>
                        :
                        <div>
                            <ClickableSpan onClick={(e) => handleClickOpenEditMode(e)}><i style={{ color: '#606060' }}><u>지정되지않음</u></i></ClickableSpan>
                        </div>
                    }
                    {isLoading &&
                        <FieldCircleLoading
                            progressSize={20}
                        />
                    }
                </div>
            </td>
            {editOpen &&
                <Popover
                    open={editOpen}
                    anchorEl={anchorEl}
                    onClose={handleCloseEditMode}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <EditBox>
                            <div className='inputBox'>
                                <div>
                                    <CustomBlockButton
                                        type='button'
                                        className='productSelectButton'
                                        onClick={() => handleOpenSelectOptionCodeModal()}
                                    >상품선택</CustomBlockButton>
                                </div>
                            </div>
                            <div className='inputBox'>
                                <div>
                                    <div className='label'>
                                        {previewProductOptionData?.code}
                                    </div>
                                    <div className='label'>
                                        {previewProductOptionData?.product?.name}
                                    </div>
                                    <div className='label'>
                                        {previewProductOptionData?.name}
                                    </div>
                                </div>
                            </div>
                            <div className='inputBox'>
                                <div className="label">수량)</div>
                                <div>
                                    <input type="number" name='exchangeProductQuantity' value={inputValues?.exchangeProductQuantity || ''} onChange={(e) => handleChangeInputValues(e)} autoFocus />
                                </div>
                            </div>
                            <input type="submit" value="저장" hidden />
                        </EditBox>
                    </form>
                </Popover>
            }

            {selectOptionCodeModalOpen &&
                <CustomSearchOptionCodesModal
                    open={selectOptionCodeModalOpen}
                    onClose={() => handleCloseSelectOptionCodeModal()}
                    initialSearchQuery={previewProductOptionData?.product?.name}
                    onSelect={(code, productOptionData) => {
                        setPreviewProductOptionData(productOptionData);
                        setInputValues(prev => {
                            return {
                                ...prev,
                                exchangeProductOptionCode: productOptionData?.code
                            }
                        });
                        returnExchangeActionsHook.productOptionsActions.setValue(prev => {
                            if (!prev.some(option => option.code === productOptionData.code)) {
                                return prev.concat(productOptionData);
                            }
                            return prev;
                        });
                        handleCloseSelectOptionCodeModal();
                    }}
                />
            }
        </>
    );
}