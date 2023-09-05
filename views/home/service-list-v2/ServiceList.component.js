import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CardContainer, CardDescription, CardTitle, CardWrapper, CategoryTitle, ContentContainer, ContentWrapper } from "./styles/ServiceList.styled";
const SALES_ANALISIS_CLIENT_ORIGIN = process.env.NODE_ENV == 'development' ? process.env.development.salesAnalisisClientAddress : process.env.production.salesAnalisisClientAddress;

const gtagClickEventHandler = (data) => {
    if (window?.gtag) {
        gtag('event', 'service_link_clicked', {
            custom_source: data?.custom_source,
            custom_link: data?.custom_link,
            custom_name: data?.custom_name
        })
    }
}

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
                            <CardWrapper onClick={() => gtagClickEventHandler({ custom_source: 'home', custom_link: '/margin/dashboard', custom_name: '마진율 계산기' })}>
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
                            <CardWrapper onClick={() => gtagClickEventHandler({ custom_source: 'home', custom_link: '/excel-translator', custom_name: '엑셀 변환기' })}>
                                <CardTitle>엑셀 변환기</CardTitle>
                                <CardDescription>엑셀 변환기 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            // href={`/store-rank/real-time-rank`}
                            href={`/`}
                            passHref
                        >
                            <CardWrapper className='isReady' onClick={() => gtagClickEventHandler({ custom_source: 'home', custom_link: '/store-rank/real-time-rank', custom_name: '스토어 랭킹'})}>
                                <CardTitle>스토어 랭킹</CardTitle>
                                <CardDescription>준비중</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/product/dashboard'}
                            passHref
                        >
                            <CardWrapper onClick={() => gtagClickEventHandler({ custom_source: 'home', custom_link: '/product/dashboard', custom_name: '통합 상품 관리' })}>
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
                            <CardWrapper onClick={() => gtagClickEventHandler({ custom_source: 'home', custom_link: '/inventory', custom_name: '통합 재고 관리' })}>
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
                            <CardWrapper onClick={() => gtagClickEventHandler({ custom_source: 'home', custom_link: '/erp/collection/dashboard', custom_name: '통합 발주 관리' })}>
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
                            <CardWrapper onClick={() => gtagClickEventHandler({ custom_source: 'home', custom_link: `/sales-analysis/dashboard`, custom_name: '통합 판매 분석' })}>
                                <CardTitle>통합 판매 분석</CardTitle>
                                <CardDescription>통합 판매 분석 체험하기</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                </ContentWrapper>
            </ContentContainer>
        </>
    );
}

export default ServiceListComponent;