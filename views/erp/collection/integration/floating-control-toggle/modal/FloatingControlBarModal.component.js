import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import styled from 'styled-components';
import CustomImage from '../../../../../modules/image/CustomImage';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { useRouter } from 'next/router';

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
    padding: 0 30px;
`;

const ContentGroup = styled.div`
    margin-top: 20px;
    display:flex;
    flex-direction: column;
    gap: 10px;

    .title{
        font-size: 12px;
        font-weight: 600;
        color: #808080;
    }

    .button-item{
        width: 180px;
        font-size: 13px;
        color: #606060;
        border-color: #f0f0f0;
        border-radius: 5px;
        height: 38px;
        border-radius: 30px;

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
    onActionOpenDeleteErpItemsConfirmModal,
    onActionOpenExcelDownloadModal,
    onActionOpenCopyCreateErpItemModal,
    onActionOpenViewSelectedModal,
    onActionOpenProductListModal,
    onActionOpenStockReleaseModal,
    onActionOpenCancelStockReleaseModal,
    onActionOpenWaybillRegistrationModal,
    onActionOpenChangeStatusModal,

    onActionClearAllSelectedItems,
}) {
    const router = useRouter();
    const classificationType = router?.query?.classificationType || null;

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
                        <CustomBlockButton
                            type='button'
                            className='button-item'
                            onClick={() => onClose()}
                        >
                            <div className='icon-figure'>
                                <CustomImage
                                    src='/images/icon/arrowRight_chevron_a0a0a0.svg'
                                />
                            </div>
                        </CustomBlockButton>
                    </CloseButtonBox>
                    <ContentContainer>
                        <ContentGroup>
                            <div className='title'>일괄 데이터 처리</div>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenEditErpItemsModal()}
                            >
                                수정
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenCopyCreateErpItemModal()}
                            >
                                복사 생성
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenWaybillRegistrationModal()}
                            >
                                운송장 일괄등록
                            </CustomBlockButton>
                        </ContentGroup>
                        {['COMPLETE'].includes(classificationType) &&
                            <ContentGroup>
                                <div className='title'>재고 관리</div>
                                <CustomBlockButton
                                    type='button'
                                    className='button-item'
                                    onClick={() => onActionOpenStockReleaseModal()}
                                >
                                    재고반영
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='button'
                                    className='button-item'
                                    onClick={() => onActionOpenCancelStockReleaseModal()}
                                >
                                    재고반영 취소
                                </CustomBlockButton>
                            </ContentGroup>
                        }
                        <ContentGroup>
                            <div className='title'>상태 관리</div>
                            {['NEW', 'CONFIRM', 'COMPLETE', 'POSTPONE'].includes(classificationType) &&
                                <CustomBlockButton
                                    type='button'
                                    className='button-item'
                                    onClick={() => onActionOpenChangeStatusModal()}
                                >
                                    상태변경
                                </CustomBlockButton>
                            }
                            <CustomBlockButton
                                type='button'
                                className='button-item warning-button'
                                onClick={() => onActionOpenDeleteErpItemsConfirmModal()}
                            >
                                데이터 삭제
                            </CustomBlockButton>
                        </ContentGroup>
                        <ContentGroup>
                            <div className='title'>기타</div>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenViewSelectedModal()}
                            >
                                선택 데이터 보기
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenProductListModal()}
                            >
                                상품리스트
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionOpenExcelDownloadModal()}
                            >
                                엑셀 다운로드
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => onActionClearAllSelectedItems()}
                            >
                                전체해제
                            </CustomBlockButton>
                        </ContentGroup>
                    </ContentContainer>
                </div>
            </Drawer>
        </div>
    );
}