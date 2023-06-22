import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CardContainer, CardDescription, CardTitle, CardWrapper, CategoryTitle, ContentContainer, ContentWrapper } from "./styles/ServiceList.styled";
const SALES_ANALISIS_CLIENT_ORIGIN = process.env.NODE_ENV == 'development' ? process.env.development.salesAnalisisClientAddress : process.env.production.salesAnalisisClientAddress;

const ServiceListComponent = () => {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    return (
        <>
            <ContentContainer>
                <ContentWrapper>
                    <CardContainer>
                        <Link
                            href={'/margin/dashboard'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>마진율 계산기</CardTitle>
                                <CardDescription>마진율 계산기 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/excel-translator'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>엑셀 변환기</CardTitle>
                                <CardDescription>엑셀 변환기 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/product/dashboard'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>통합 상품 관리</CardTitle>
                                <CardDescription>통합 상품 관리 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/inventory'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>통합 재고 관리</CardTitle>
                                <CardDescription>통합 재고 관리 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/erp/collection/dashboard'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>통합 발주 관리</CardTitle>
                                <CardDescription>통합 발주 관리 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={`${SALES_ANALISIS_CLIENT_ORIGIN}/sales-analysis/dashboard?workspaceId=${workspaceRedux?.workspaceInfo?.id}`}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>통합 판매 분석</CardTitle>
                                <CardDescription>통합 판매 분석 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={`/purchasing-process/dashboard`}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>구매 프로세스</CardTitle>
                                <CardDescription>구매 프로세스 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                </ContentWrapper>
            </ContentContainer>
        </>
    );
}

export default ServiceListComponent;