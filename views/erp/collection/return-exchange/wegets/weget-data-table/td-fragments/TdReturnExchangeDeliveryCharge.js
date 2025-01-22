import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { ReturnExchangeDataConnect } from "../../../../../../../data_connect/ReturnExchangeDataConnect";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import { useReturnExchangeActionsHook } from "../../../contexts/ReturnExchangeProvider";
import { Popover } from "@mui/material";
import { CustomNumberUtils } from "../../../../../../../utils/CustomNumberUtils";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";
import FieldCircleLoading from "../../../../../../../components/loading/field-loading/v1/FieldCircleLoading";
import ConcurrencyRequest from "../../../../../../../utils/ConcurrencyRequest";

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
            min-width: 40px;
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

export function TdReturnExchangeDeliveryCharge({
    returnExchange
}) {
    const returnExchangeActionsHook = useReturnExchangeActionsHook();

    const [anchorEl, setAnchorEl] = useState(null);
    const [inputValues, setInputValues] = useState({
        returnExchangeDeliveryCharge: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // 항상 ref에도 기록해둠
    const inputValuesRef = useRef(inputValues);
    useEffect(() => {
        inputValuesRef.current = inputValues;
    }, [inputValues]);

    const handleReqBulkUpdate = async () => {
        setIsLoading(true);
        returnExchangeActionsHook.returnExchangesActions.setValue(prev => {
            return prev.map(prevItem => {
                const targetItem = prevItem.id === returnExchange.id ? { ...prevItem, ...inputValuesRef.current } : null;
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
                    ...inputValuesRef.current
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
                            returnExchangeDeliveryCharge: newItem?.returnExchangeDeliveryCharge,
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
        setInputValues({
            returnExchangeDeliveryCharge: returnExchange?.returnExchangeDeliveryCharge,
        });
    }

    const handleCloseEditMode = async () => {
        setAnchorEl(null);
        await handleReqBulkUpdate();
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

    const editOpen = Boolean(anchorEl);

    return (
        <>
            <td>
                <div>
                    <div>
                        <ClickableSpan onClick={(e) => handleClickOpenEditMode(e)}>{returnExchange?.returnExchangeDeliveryCharge ? `${CustomNumberUtils().numberWithCommas2(returnExchange?.returnExchangeDeliveryCharge)}원` : <i style={{ color: '#606060' }}><u>클릭해서 수정</u></i>}</ClickableSpan>
                        {isLoading &&
                            <FieldCircleLoading
                                progressSize={20}
                            />
                        }
                    </div>
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
                    <EditBox>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='inputBox'>
                                <div>
                                    <input type="number" name='returnExchangeDeliveryCharge' value={inputValues?.returnExchangeDeliveryCharge || ''} onChange={(e) => handleChangeInputValues(e)} autoFocus />
                                </div>
                            </div>
                            <input type="submit" value="저장" hidden />
                        </form>
                    </EditBox>
                </Popover>
            }
        </>
    );
}