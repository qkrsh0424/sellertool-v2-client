import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import SingleBlockButton from '../../../../../modules/button/SingleBlockButton';
import styled from 'styled-components';
import CustomImage from '../../../../../modules/image/CustomImage';
const CloseButtonBox = styled.div`
    height: 100%;
    .button-item{
        height: 100%;
        width: 40px;
        margin: 0;
        padding: 0;
        border: none;
        border-right: 1px solid #f6f6f6;
    }

    .icon-figure{
        width: 70%;
        margin: 0 auto;
    }
`;

const ContentContainer = styled.div`
    height: 100%;
    overflow: auto;
    padding: 0 30px;
`;

const ContentGroup = styled.div`
    margin-top: 20px;
    .title{
        font-size: 12px;
        font-weight: 600;
        color: #808080;
        border-bottom: 1px solid #f0f0f0;
        padding: 10px 0;
    }

    .button-item{
        width: 180px;
        font-size: 13px;
        color: #606060;
        border-color: #f0f0f0;
        border-radius: 5px;

        @media all and (max-width: 992px){
            width: 150px;
        }
    }

    .warning-button{
        
        color: var(--defaultRedColor);

        &:hover{
            border: 1px solid var(--defaultRedColor);
            background: var(--defaultRedColor);
            color: #fff;
        }
    }
`;



export default function FloatingControlBarModalComponent({
    open,

    onClose,
    onActionOpenEditErpItemsModal,
    onActionOpenChangeStatusToSalesModal,
    onActionOpenDeleteErpItemsConfirmModal,
    onActionOpenExcelDownloadModal,
    onActionOpenCopyCreateErpItemModal,
    onActionClearAllSelectedItems,
    onActionOpenViewSelectedModal
}) {
    return (
        <div>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={() => onClose()}
            >
                <div
                    className='mgl-flex mgl-flex-alignItems-flexStart'
                    style={{
                        height: '100%'
                    }}
                >
                    <CloseButtonBox>
                        <SingleBlockButton
                            type='button'
                            className='button-item'
                            onClick={() => onClose()}
                        >
                            <div className='icon-figure'>
                                <CustomImage
                                    src='/images/icon/arrowRight_chevron_a0a0a0.svg'
                                />
                            </div>
                        </SingleBlockButton>
                    </CloseButtonBox>
                    <ContentContainer>
                        <ContentGroup>
                            <div className='title'>일괄 데이터 처리</div>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenEditErpItemsModal()}
                            >
                                수정
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenCopyCreateErpItemModal()}
                            >
                                복사 생성
                            </SingleBlockButton>
                            {/* <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenEditErpItemsModal()}
                            >
                                운송장 등록
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenEditErpItemsModal()}
                            >
                                출고리스트
                            </SingleBlockButton> */}
                        </ContentGroup>
                        {/* <ContentGroup>
                            <div className='title'>재고 관리</div>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenEditErpItemsModal()}
                            >
                                재고반영
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenEditErpItemsModal()}
                            >
                                재고반영 취소
                            </SingleBlockButton>
                        </ContentGroup> */}
                        <ContentGroup>
                            <div className='title'>상태 관리</div>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenChangeStatusToSalesModal()}
                            >
                                판매전환
                            </SingleBlockButton>
                            {/* <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenChangeStatusToSalesModal()}
                            >
                                판매취소
                            </SingleBlockButton> */}
                            <SingleBlockButton
                                type='button'
                                className='button-item warning-button'
                                onClick={() => onActionOpenDeleteErpItemsConfirmModal()}
                            >
                                데이터 삭제
                            </SingleBlockButton>
                        </ContentGroup>
                        <ContentGroup>
                            <div className='title'>기타</div>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenViewSelectedModal()}
                            >
                                선택 데이터 보기
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenExcelDownloadModal()}
                            >
                                엑셀 다운로드
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionClearAllSelectedItems()}
                            >
                                전체해제
                            </SingleBlockButton>
                        </ContentGroup>
                    </ContentContainer>
                </div>
            </Drawer>
        </div>
    );
}