import { useState } from "react";
import { ArrowRight, Container, ProcessGroup, ProcessItem, ProcessList, Title } from "./index.styled";
import CustomImage from "../../../modules/image/CustomImage";

export default function PurchasingProcessListComponent(props) {
    const PURCHASING_REQUEST_PROCESS = purchasingProcessList?.find(r => r.processType === 'PURCHASING_REQUEST');
    const PURCHASING_COMPLETED_PROCESS = purchasingProcessList?.find(r => r.processType === 'PURCHASING_COMPLETED');
    const ARRIVAL_PROCESS = purchasingProcessList?.find(r => r.processType === 'ARRIVAL');
    // const COMMON1_PROCESS_LIST = purchasingProcessList?.filter(r => r.processType === 'COMMON1').sort((a, b) => a.orderNumber - b.orderNumber);
    const COMMON1_PROCESS_LIST = null;
    const COMMON2_PROCESS_LIST = purchasingProcessList?.filter(r => r.processType === 'COMMON2').sort((a, b) => a.orderNumber - b.orderNumber);
    return (
        <>
            <Container>
                <Title>
                    프로세스 설정
                </Title>
                <ProcessList>
                    <ProcessGroup style={{ background: '#f9f9f9' }}>
                        <ProcessItem>{PURCHASING_REQUEST_PROCESS?.name}</ProcessItem>
                    </ProcessGroup>
                    <ArrowRight>
                        <CustomImage
                            src='/images/icon/arrowRight_chevron_808080.svg'
                        />
                    </ArrowRight>
                    <ProcessGroup>
                        {!COMMON1_PROCESS_LIST && <ProcessItem style={{ cursor: 'pointer' }}>중간과정 생성</ProcessItem>}
                        {COMMON1_PROCESS_LIST && COMMON1_PROCESS_LIST?.map(process => {
                            return (
                                <ProcessItem
                                    key={process?.id}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {process?.name}
                                </ProcessItem>
                            );
                        })}
                    </ProcessGroup>
                    <ArrowRight>
                        <CustomImage
                            src='/images/icon/arrowRight_chevron_808080.svg'
                        />
                    </ArrowRight>
                    <ProcessGroup style={{ background: '#f9f9f9' }}>
                        <ProcessItem>{PURCHASING_COMPLETED_PROCESS?.name}</ProcessItem>
                    </ProcessGroup>
                    <ArrowRight>
                        <CustomImage
                            src='/images/icon/arrowRight_chevron_808080.svg'
                        />
                    </ArrowRight>
                    <ProcessGroup>
                        {COMMON2_PROCESS_LIST?.map(process => {
                            return (
                                <ProcessItem key={process?.id}>
                                    {process?.name}
                                </ProcessItem>
                            );
                        })}
                    </ProcessGroup>
                    <ArrowRight>
                        <CustomImage
                            src='/images/icon/arrowRight_chevron_808080.svg'
                        />
                    </ArrowRight>
                    <ProcessGroup style={{ background: '#f9f9f9' }}>
                        <ProcessItem>{ARRIVAL_PROCESS?.name}</ProcessItem>
                    </ProcessGroup>
                </ProcessList>
            </Container>
        </>
    );
}