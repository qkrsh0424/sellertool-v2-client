import React, { useRef, useState } from 'react';
import * as St from './weget-data-table.styled';
import { TdSalesChannel } from './td-fragments/TdSalesChannel';
import { useReturnExchangeValueHook } from '../../contexts/ReturnExchangeProvider';
import { TdOrderNumber } from './td-fragments/TdOrderNumber';
import { TdWaybillNumber } from './td-fragments/TdWaybillNumber';
import { TdReceiverInfo } from './td-fragments/TdReceiverInfo';
import { TdClaim } from './td-fragments/TdClaim';
import { TdCustomerRequestCollectionMethod } from './td-fragments/TdCustomerRequestCollectionMethod';
import { TdReturnExchangeDeliveryPaidMethod } from './td-fragments/TdReturnExchangeDeliveryPaidMethod';
import { TdReturnExchangeDeliveryCharge } from './td-fragments/TdReturnExchangeDeliveryCharge';
import { TdReturnExchangeExtraCharge } from './td-fragments/TdReturnExchangeExtraCharge';
import { TdReturnExchangeMemo1 } from './td-fragments/TdReturnExchangeMemo1';
import { TdReturnExchangeMemo2 } from './td-fragments/TdReturnExchangeMemo2';
import { TdChannelOrderDate } from './td-fragments/TdChannelOrderDate';
import { TdReturnExchangeAppliedAt } from './td-fragments/TdReturnExchangeAppliedAt';
import { TdReturnExchangeCollectionRequestedAt } from './td-fragments/TdReturnExchangeCollectionRequestedAt';
import { TdExchangeReShippedAt } from './td-fragments/TdExchangeReShippedAt';
import { TdProductInfo } from './td-fragments/TdProductInfo';
import { TdExchangeProductInfo } from './td-fragments/TdExchangeProductInfo';
import { TdStatus } from './td-fragments/TdStatus';


export function WegetDataTable() {
    const returnExchangeValueHook = useReturnExchangeValueHook();

    const returnExchanges = returnExchangeValueHook.returnExchanges;

    return (
        <>
            <St.Frame.Container>
                <St.Table.Container>
                    <table>
                        <colgroup>
                            <col width="120" />
                            <col width="120" />
                            <col width="120" />
                            <col width="120" />
                            <col width="120" />
                            <col width="200" />
                            <col width="200" />
                            <col width="300" />
                            <col width="120" />
                            <col width="120" />
                            <col width="120" />
                            <col width="120" />
                            <col width="300" />
                            <col width="300" />
                            <col width="120" />
                            <col width="120" />
                            <col width="120" />
                            <col width="120" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>상태</th>
                                <th>판매채널</th>
                                <th>주문번호</th>
                                <th>운송장번호</th>
                                <th>수취인정보</th>
                                <th>[M]상품정보</th>
                                <th>교환상품정보</th>
                                <th>클레임</th>
                                <th>고객요청 수거방식</th>
                                <th>배송비 결제방식</th>
                                <th>교환/반품 배송비</th>
                                <th>추가비용</th>
                                <th>메모1</th>
                                <th>메모2</th>
                                <th>채널주문일시</th>
                                <th>교환반품일시</th>
                                <th>회수신청일시</th>
                                <th>재출고일시</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnExchanges?.map((returnExchange, index) => {
                                return (
                                    <React.Fragment key={returnExchange?.id}>
                                        <tr>
                                            <TdStatus returnExchange={returnExchange} />
                                            <TdSalesChannel returnExchange={returnExchange} />
                                            <TdOrderNumber returnExchange={returnExchange} />
                                            <TdWaybillNumber returnExchange={returnExchange} />
                                            <TdReceiverInfo returnExchange={returnExchange} />
                                            <TdProductInfo returnExchange={returnExchange} />
                                            <TdExchangeProductInfo returnExchange={returnExchange} />
                                            <TdClaim returnExchange={returnExchange} />
                                            <TdCustomerRequestCollectionMethod returnExchange={returnExchange} />
                                            <TdReturnExchangeDeliveryPaidMethod returnExchange={returnExchange} />
                                            <TdReturnExchangeDeliveryCharge returnExchange={returnExchange} />
                                            <TdReturnExchangeExtraCharge returnExchange={returnExchange} />
                                            <TdReturnExchangeMemo1 returnExchange={returnExchange} />
                                            <TdReturnExchangeMemo2 returnExchange={returnExchange} />
                                            <TdChannelOrderDate returnExchange={returnExchange} />
                                            <TdReturnExchangeAppliedAt returnExchange={returnExchange} />
                                            <TdReturnExchangeCollectionRequestedAt returnExchange={returnExchange} />
                                            <TdExchangeReShippedAt returnExchange={returnExchange} />
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </St.Table.Container>
            </St.Frame.Container>
        </>
    );
}