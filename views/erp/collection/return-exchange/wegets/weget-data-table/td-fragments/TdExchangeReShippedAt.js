import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { ReturnExchangeDataConnect } from "../../../../../../../data_connect/ReturnExchangeDataConnect";
import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import { useReturnExchangeActionsHook, useReturnExchangeValueHook } from "../../../contexts/ReturnExchangeProvider";
import CustomDateTimeSelector from "../../../../../../../components/date-time-selector/v1/CustomDateTimeSelector";
import { CustomDateUtils } from "../../../../../../../utils/CustomDateUtils";
import { customToast } from "../../../../../../../components/toast/custom-react-toastify/v1";
import FieldCircleLoading from "../../../../../../../components/loading/field-loading/v1/FieldCircleLoading";
import ConcurrencyRequest from "../../../../../../../utils/ConcurrencyRequest";

const EditBox = styled.div`
    position: absolute;
    background-color: #fff;
    top: 50%;
    left: inherit;
    transform: translateY(-50%);
    border: 1px solid #e0e0e0;
    padding: 10px;
    z-index: 15;
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
`;

const ClickableSpan = styled.span`
    cursor: pointer;
    white-space: pre-wrap;
`;

export function TdExchangeReShippedAt({
    returnExchange
}) {
    const returnExchangeActionsHook = useReturnExchangeActionsHook();

    const [isEditMode, setIsEditMode] = useState(false);
    const [inputValues, setInputValues] = useState({
        exchangeReShippedAt: ''
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
                            exchangeReShippedAt: newItem?.exchangeReShippedAt,
                        };
                    } else {
                        return prevItem;
                    }
                })
            })
        }

        setIsLoading(false);
    }

    const handleClickOpenEditMode = () => {
        setIsEditMode(true);
        setInputValues({
            exchangeReShippedAt: returnExchange?.exchangeReShippedAt || new Date()
        });
    }

    const handleSubmit = async (value) => {
        inputValuesRef.current.exchangeReShippedAt = value;

        await handleReqBulkUpdate();
        setIsEditMode(false);
    }

    return (
        <>
            <td>
                <div>
                    <div>
                        <ClickableSpan onClick={() => handleClickOpenEditMode()}>{returnExchange?.exchangeReShippedAt ? CustomDateUtils().dateToYYYYMMDDhhmmss(returnExchange?.exchangeReShippedAt) : <i style={{ color: '#606060' }}><u>클릭해서 수정</u></i>}</ClickableSpan>
                        {isLoading &&
                            <FieldCircleLoading
                                progressSize={20}
                            />
                        }
                    </div>
                </div>
            </td>
            {isEditMode &&
                <>
                    <CustomDateTimeSelector
                        open={isEditMode}
                        onClose={(e) => { e.stopPropagation(); setIsEditMode(false) }}
                        onConfirm={(value) => handleSubmit(value)}
                        initialDateTime={new Date(inputValues?.exchangeReShippedAt)}
                        label='날짜'
                    />
                </>
            }
        </>
    );
}