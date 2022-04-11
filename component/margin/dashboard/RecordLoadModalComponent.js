import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
`;

const TitleWrapper = styled.div`
    position: relative;
    border-bottom: 1px solid #e1e1e1;
`;

const Title = styled.div`
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    color: #444;
`;

const ContentWrapper = styled.div`
    padding:10px;
`;

const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const ItemBox = styled.div`
    width: 100%;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    /* margin-bottom: 10px; */

    cursor: pointer;

    .title{
        padding: 0 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 16px;
        color: #444;
    }

    .flex-wrapper{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin-bottom: 5px;
    }

    .flex-item{
        margin-right: 8px;
        font-size: 12px;
        color: #555;
    }

    &:hover{
        background: #e1e1e140;
    }

    @media all and (max-width: 992px){
        .title{
            font-size: 13px;
        }
        .flex-item{
            font-size: 10px;
        }   
    }
`;

const DeleteBtnBox = styled.div`
    position: relative;
    padding: 3px;

    .btn-item{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        user-select: none;

        cursor: pointer;

        &:hover{
            background: #e1e1e140;
        }
        &:active{
            background: #e1e1e180;
        }
    }

    .icon{
        position: relative;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
`;
const RecordLoadModalComponent = (props) => {
    return (
        <>
            <Container>
                <TitleWrapper>
                    <Title>
                        불러오기
                    </Title>
                </TitleWrapper>
                {props.marginRecordListState &&
                    <ContentWrapper>
                        {props.marginRecordListState?.length <= 0 &&
                            <div style={{ textAlign: 'center', padding: '30px 0', color: '#444', fontSize: '14px' }}>저장된 기록이 없습니다.</div>
                        }
                        {props.marginRecordListState?.map(marginRecordState => {
                            return (
                                <React.Fragment key={marginRecordState.id}>
                                    <FlexWrapper>

                                        <Link
                                            href={`/margin/dashboard/?marginRecordId=${marginRecordState.id}`}
                                            passHref
                                            replace={true}
                                        >
                                            <ItemBox
                                                onClick={() => props.onClose()}
                                            >
                                                <div className='title'>
                                                    {marginRecordState.name}
                                                </div>
                                                <div className='flex-wrapper'>
                                                    <div className='flex-item'>매출 합계 : {marginRecordState.totalExpense} 원</div>
                                                    <div className='flex-item'>마진율 : {marginRecordState.marginRate} %</div>
                                                </div>
                                                <div className='flex-wrapper'>
                                                    <div className='flex-item'>매입 합계: {marginRecordState.totalIncome} 원</div>
                                                    <div className='flex-item'>마진액 : {marginRecordState.margin} 원</div>
                                                </div>
                                            </ItemBox>
                                        </Link>
                                        <DeleteBtnBox>
                                            <div className='btn-item' onClick={() => props.onDelete(marginRecordState.id)}>
                                                <div className='icon'>
                                                    <Image src='/images/icon/trash_icon.png' layout='fill' alt=''></Image>
                                                </div>
                                            </div>
                                        </DeleteBtnBox>
                                    </FlexWrapper>
                                </React.Fragment>
                            );
                        })}
                    </ContentWrapper>
                }
                {!props.marginRecordListState &&
                    <ContentWrapper>
                        <div style={{ textAlign: 'center', padding: '30px 0', color: '#444', fontSize: '14px' }}>저장된 기록이 없습니다.</div>
                    </ContentWrapper>
                }

            </Container>
        </>
    );
}
export default RecordLoadModalComponent;