import styled from 'styled-components';
import { useReturnExchangeActionsHook } from '../../../contexts/ReturnExchangeProvider';
import { useEffect, useRef, useState } from 'react';
import { Popover } from '@mui/material';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import FieldCircleLoading from '../../../../../../../components/loading/field-loading/v1/FieldCircleLoading';
import ConcurrencyRequest from '../../../../../../../utils/ConcurrencyRequest';
import { ReturnExchangeDataConnect } from '../../../../../../../data_connect/ReturnExchangeDataConnect';
import { customToast } from '../../../../../../../components/toast/custom-react-toastify/v1';
import { TdReturnExchangeCollectionRequestedAt } from './TdReturnExchangeCollectionRequestedAt';

const Td = styled.td`
    .status_box{
        display: flex;
        flex-direction: column;
        gap: 5px;
        .return_exchange_type{
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;

            &.return{
                background: var(--defaultRedColor);
                color: #fff;
            }

            &.exchange{
                background: var(--defaultBlueColor);
                color: #fff;
            }
        }

        .proceed_status{
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: 700;
            text-align: center;
            cursor: pointer;

            &.preparing{
                background: #a0a0a0; /* 다크 오렌지 회수신청 */
                color: #fff;
            }

            &.collection_request {
                background: #FF8C00; /* 다크 오렌지 회수신청 */
                color: #fff;
            }

            &.collecting {
                background: #FFD700; /* 골드 회수중 */
                color: #fff;
            }

            &.collection_complete {
                background: #32CD32; /* 라임 그린 수거완료 */
                color: #fff;
            }

            &.inspection_complete {
                background: #4682B4; /* 스틸 블루 검수완료 */
                color: #fff;
            }

            &.processing_complete {
                background: #006400; /* 다크 그린 처리완료 */
                color: #fff;
            }

            &.return_shipment {
                background: #DC143C; /* 크림슨 반송 */
                color: #fff;
            }

            &.exchange_re_shipment_preparation {
                background: #1E90FF; /* 다저 블루 교환재출고준비 */
                color: #fff;
            }

            &.exchange_re_shipment_complete {
                background: #00008B; /* 다크 블루 교환재출고 */
                color: #fff;
            }
        }
    }
            
`;

const EditBox = styled.div`
    background-color: #fff;
    border: 1px solid #e0e0e0;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;

    button{
        border: none;
        width: 100px;
        height: 30px;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;

        &.return{
            background: var(--defaultRedColor);
            color: #fff;
        }

        &.exchange{
            background: var(--defaultBlueColor);
            color: #fff;
        }

        &.preparing{
            background: #a0a0a0; /* 다크 오렌지 회수신청 */
            color: #fff;
        }

        &.collection_request {
            background: #FF8C00; /* 다크 오렌지 회수신청 */
            color: #fff;
        }

        &.collecting {
            background: #FFD700; /* 골드 회수중 */
            color: #fff;
        }

        &.collection_complete {
            background: #32CD32; /* 라임 그린 수거완료 */
            color: #fff;
        }

        &.inspection_complete {
            background: #4682B4; /* 스틸 블루 검수완료 */
            color: #fff;
        }

        &.processing_complete {
            background: #006400; /* 다크 그린 처리완료 */
            color: #fff;
        }

        &.return_shipment {
            background: #DC143C; /* 크림슨 반송 */
            color: #fff;
        }

        &.exchange_re_shipment_preparation {
            background: #1E90FF; /* 다저 블루 교환재출고준비 */
            color: #fff;
        }

        &.exchange_re_shipment_complete {
            background: #00008B; /* 다크 블루 교환재출고 */
            color: #fff;
        }
    }
`;

export function TdStatus({
    returnExchange
}) {
    const returnExchangeActionsHook = useReturnExchangeActionsHook();

    const [returnExchangeTypeAnchorEl, setReturnExchangeTypeAnchorEl] = useState(null);
    const [returnExchangeProceedStatusAnchorEl, setReturnExchangeProceedStatusAnchorEl] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const returnExchangeTypeEditOpen = Boolean(returnExchangeTypeAnchorEl);
    const returnExchangeProceedStatusEditOpen = Boolean(returnExchangeProceedStatusAnchorEl);

    const handleChangeReturnExchangeType = (type) => {
        handleReqBulkUpdate({ returnExchangeType: type });
        setReturnExchangeTypeAnchorEl(null);
    }

    const handleChangeReturnExchangeProceedStatus = (status) => {
        handleReqBulkUpdate({ returnExchangeProceedStatus: status });
        setReturnExchangeProceedStatusAnchorEl(null);
    }

    const handleReqBulkUpdate = async ({ returnExchangeType, returnExchangeProceedStatus }) => {
        setIsLoading(true);
        returnExchangeActionsHook.returnExchangesActions.setValue(prev => {
            return prev.map(prevItem => {
                const targetItem = prevItem.id === returnExchange.id ? {
                    ...prevItem,
                    returnExchangeType: returnExchangeType || returnExchange?.returnExchangeType,
                    returnExchangeProceedStatus: returnExchangeProceedStatus || returnExchange?.returnExchangeProceedStatus,
                    returnExchangeCollectionRequestedAt: returnExchangeProceedStatus === 'COLLECTION_REQUEST' ? new Date() : returnExchange?.returnExchangeCollectionRequestedAt,
                    exchangeReShippedAt: returnExchangeProceedStatus === 'EXCHANGE_RE_SHIPMENT_COMPLETE' ? new Date() : returnExchange?.exchangeReShippedAt,
                } : null;
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
                    returnExchangeType: returnExchangeType || returnExchange?.returnExchangeType,
                    returnExchangeProceedStatus: returnExchangeProceedStatus || returnExchange?.returnExchangeProceedStatus
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
                            returnExchangeType: newItem?.returnExchangeType,
                            returnExchangeProceedStatus: newItem?.returnExchangeProceedStatus,
                        };
                    } else {
                        return prevItem;
                    }
                })
            })
        }

        setIsLoading(false);
    }

    return (
        <>
            <Td>
                <div className='status_box'>
                    <div onClick={(e) => setReturnExchangeTypeAnchorEl(e.currentTarget)}>
                        <ElementReturnExchangeType
                            returnExchangeType={returnExchange?.returnExchangeType}
                        />
                    </div>
                    <div onClick={(e) => setReturnExchangeProceedStatusAnchorEl(e.currentTarget)}>
                        <ElementReturnExchangeProceedStatus
                            returnExchangeProceedStatus={returnExchange?.returnExchangeProceedStatus}
                        />
                    </div>
                </div>
                {isLoading &&
                    <FieldCircleLoading
                        progressSize={20}
                    />
                }
            </Td>
            {returnExchangeTypeEditOpen &&
                <Popover
                    open={returnExchangeTypeEditOpen}
                    anchorEl={returnExchangeTypeAnchorEl}
                    onClose={() => setReturnExchangeTypeAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    <EditBox>
                        <CustomBlockButton
                            type='button'
                            className='return'
                            onClick={() => handleChangeReturnExchangeType('RETURN')}
                        >
                            반품
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='exchange'
                            onClick={() => handleChangeReturnExchangeType('EXCHANGE')}
                        >
                            교환
                        </CustomBlockButton>
                    </EditBox>
                </Popover>
            }

            {returnExchangeProceedStatusEditOpen &&
                <Popover
                    open={returnExchangeProceedStatusEditOpen}
                    anchorEl={returnExchangeProceedStatusAnchorEl}
                    onClose={() => setReturnExchangeProceedStatusAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    <EditBox>
                        <CustomBlockButton
                            type='button'
                            className='preparing'
                            onClick={() => handleChangeReturnExchangeProceedStatus('PREPARING')}
                        >
                            준비중
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='collection_request'
                            onClick={() => handleChangeReturnExchangeProceedStatus('COLLECTION_REQUEST')}
                        >
                            회수요청
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='collecting'
                            onClick={() => handleChangeReturnExchangeProceedStatus('COLLECTING')}
                        >
                            회수중
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='collection_complete'
                            onClick={() => handleChangeReturnExchangeProceedStatus('COLLECTION_COMPLETE')}
                        >
                            회수완료
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='inspection_complete'
                            onClick={() => handleChangeReturnExchangeProceedStatus('INSPECTION_COMPLETE')}
                        >
                            검수완료
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='processing_complete'
                            onClick={() => handleChangeReturnExchangeProceedStatus('PROCESSING_COMPLETE')}
                        >
                            처리완료
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='return_shipment'
                            onClick={() => handleChangeReturnExchangeProceedStatus('RETURN_SHIPMENT')}
                        >
                            반송
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='exchange_re_shipment_preparation'
                            onClick={() => handleChangeReturnExchangeProceedStatus('EXCHANGE_RE_SHIPMENT_PREPARATION')}
                        >
                            교환재출고준비
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='exchange_re_shipment_complete'
                            onClick={() => handleChangeReturnExchangeProceedStatus('EXCHANGE_RE_SHIPMENT_COMPLETE')}
                        >
                            교환재출고완료
                        </CustomBlockButton>
                    </EditBox>
                </Popover>
            }
        </>
    );
}

function ElementReturnExchangeType({
    returnExchangeType,
    onClick
}) {
    switch (returnExchangeType) {
        case 'RETURN':
            return <div className={`return_exchange_type return`}>반품</div>;
        case 'EXCHANGE':
            return <div className={`return_exchange_type exchange`}>교환</div>;
        default: return null;
    }
}

function ElementReturnExchangeProceedStatus({
    returnExchangeProceedStatus
}) {
    // prompt: PREPARING, COLLECTION_REQUEST, COLLECTING, COLLECTION_COMPLETE, INSPECTION_COMPLETE, PROCESSING_COMPLETE, RETURN_SHIPMENT, EXCHANGE_RE_SHIPMENT_PREPARATION, EXCHANGE_RE_SHIPMENT_COMPLETE
    switch (returnExchangeProceedStatus) {
        case 'PREPARING':
            return <div className={`proceed_status preparing`}>준비중</div>;
        case 'COLLECTION_REQUEST':
            return <div className={`proceed_status collection_request`}>회수요청</div>;
        case 'COLLECTING':
            return <div className={`proceed_status collecting`}>회수중</div>;
        case 'COLLECTION_COMPLETE':
            return <div className={`proceed_status collection_complete`}>회수완료</div>;
        case 'INSPECTION_COMPLETE':
            return <div className={`proceed_status inspection_complete`}>검수완료</div>;
        case 'PROCESSING_COMPLETE':
            return <div className={`proceed_status processing_complete`}>처리완료</div>;
        case 'RETURN_SHIPMENT':
            return <div className={`proceed_status return_shipment`}>반송</div>;
        case 'EXCHANGE_RE_SHIPMENT_PREPARATION':
            return <div className={`proceed_status exchange_re_shipment_preparation`}>교환재출고준비</div>;
        case 'EXCHANGE_RE_SHIPMENT_COMPLETE':
            return <div className={`proceed_status exchange_re_shipment_complete`}>교환재출고완료</div>;
        default: return null
    }
}