import Link from "next/link";
import styled from "styled-components";

const ContentContainer = styled.div`
    padding: 0 30px;
    margin-top: 30px;
    /* overflow: hidden;
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @media all and (max-width:992px) {
        padding: 10px;
        grid-template-columns: repeat(2, 1fr);
    }

    @media all and (max-width:576px) {
        padding: 10px;
        grid-template-columns: repeat(1, 1fr);
    } */
`;

const ContentWrapper = styled.div`
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 10px 0;
    margin-top: 10px;
    

    @media all and (max-width:992px) {
        padding: 10px;
        grid-template-columns: repeat(2, 1fr);
    }

    @media all and (max-width:576px) {
        padding: 10px;
        grid-template-columns: repeat(1, 1fr);
    }
`;

const CardContainer = styled.div`
    padding: 0 10px;

    @media all and (max-width:992px) {
        padding: 5px;
    }
`;

const CardWrapper = styled.div`
    /* border:2px solid #e1e1e1; */
    border-radius: 5px;
    padding: 10px;
    box-shadow: 
        rgb(0 0 0 / 20%) 0px 2px 1px -1px, 
        rgb(0 0 0 / 14%) 0px 1px 1px 0px, 
        rgb(0 0 0 / 12%) 0px 1px 3px 0px;
    cursor: pointer;
    transition: all .5s;

    &:hover{
        box-shadow: 
            rgb(0 0 0 / 20%) 0px 2px 1px -1px, 
            rgb(0 0 0 / 14%) 0px 1px 1px 0px, 
            rgb(100 100 100 / 24%) 3px 3px 3px 0px;
    }
`;

const CardTitle = styled.div`
    text-align: center;
    color: #444;
    font-weight: 600;
    padding: 20px 0;
    font-size: 18px;

    @media all and (max-width:992px){
        padding: 10px 0;
        font-size: 16px;
    }
`;

const CardDescription = styled.div`
    padding-top: 10px;
    height: 100px;
    line-height: 25px;
    text-align: center;
    color: #666;
    word-break: keep-all;
    font-size: 14px;

    @media all and (max-width:992px){
        font-size: 12px;
        height: 70px;
    }
`;


const HomeBody = () => {
    return (
        <>
            <ContentContainer>
                <div style={{ fontSize: '21px', fontWeight: '500' }}>유용한 기능</div>
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
                <div style={{ fontSize: '24px', fontWeight: '500' }}>관리 기능</div>
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
                            href={'/n-rank/dashboard'}
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

export default HomeBody;