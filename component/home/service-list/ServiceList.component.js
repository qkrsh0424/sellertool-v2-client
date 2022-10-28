import Link from "next/link";
import styled from "styled-components";
import { CardContainer, CardDescription, CardTitle, CardWrapper, CategoryTitle, ContentContainer, ContentWrapper } from "./styles/ServiceList.styled";


const ServiceListComponent = () => {
    return (
        <>
            <ContentContainer>
                <CategoryTitle>유용한 기능</CategoryTitle>
                <ContentWrapper>
                    <CardContainer>
                        <Link
                            href={'/margin/dashboard'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>마진율 계산기</CardTitle>
                                <CardDescription>올바른 판매 전략을 세우는 첫 단계, 상품 판매전 내 상품의 마진율부터 확인해야겠죠?</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <CardWrapper>
                            <CardTitle>엑셀 변환기</CardTitle>
                            <CardDescription>네이버, 쿠팡, 자사몰... 너무 다양한 발주서 양식... 나만의 양식으로 자유롭게 변환해요.</CardDescription>
                        </CardWrapper>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/n-rank/dashboard'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>네이버 랭킹 조회</CardTitle>
                                <CardDescription>네이버 쇼핑의 내 상품은 도대체 어디에 있는 걸까?... 쉽게 찾아볼 수 있는 방법이 없을까?</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                </ContentWrapper>
            </ContentContainer>
            <ContentContainer>
                <CategoryTitle>관리 기능</CategoryTitle>
                <ContentWrapper>
                    <CardContainer>
                        <Link
                            href={'/product/dashboard'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>상품 관리</CardTitle>
                                <CardDescription>모든 상품을 한곳에서 관리해 보세요.</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <CardWrapper>
                            <CardTitle>재고 관리</CardTitle>
                            <CardDescription>네이버, 쿠팡, 자사몰... 너무 다양한 발주서 양식... 나만의 양식으로 자유롭게 변환해요.</CardDescription>
                        </CardWrapper>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/erp/management/order-upload'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>리소스 관리</CardTitle>
                                <CardDescription>네이버 쇼핑의 내 상품은 도대체 어디에 있는 걸까?... 쉽게 찾아볼 수 있는 방법이 없을까?</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                    <CardContainer>
                        <Link
                            href={'/n-rank/dashboard'}
                            passHref
                        >
                            <CardWrapper>
                                <CardTitle>리소스 분석</CardTitle>
                                <CardDescription>네이버 쇼핑의 내 상품은 도대체 어디에 있는 걸까?... 쉽게 찾아볼 수 있는 방법이 없을까?</CardDescription>
                            </CardWrapper>
                        </Link>
                    </CardContainer>
                </ContentWrapper>
            </ContentContainer>
        </>
    );
}

export default ServiceListComponent;