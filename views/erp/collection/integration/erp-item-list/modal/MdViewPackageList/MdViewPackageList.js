import { useEffect, useState } from 'react';
import { CustomDialog } from '../../../../../../../components/dialog/v1/CustomDialog';
import { useApiHook } from '../../../hooks/useApiHook';
import * as St from './MdViewPackageList.styled';
import { useSelector } from 'react-redux';

export function MdViewPackageList({
    open = false,
    toggleViewPackageListModalOpen,
    targetErpItem
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const [productOptionPackageInfoList, setProductOptionPackageInfoList] = useState(null);


    const handleCloseModal = () => {
        toggleViewPackageListModalOpen(false);
    }

    const handleReqFetchProductOptionPackageInfoList = async () => {
        const fetchResult = await apiHook.reqFetchProductOptionPackageList({ body: { productOptionIds: [targetErpItem?.productOptionId] }, headers: { wsId: wsId } });
        if (fetchResult?.content) {
            setProductOptionPackageInfoList(fetchResult?.content);
        }
    }

    useEffect(() => {
        if (!targetErpItem || !wsId) {
            return;
        }

        handleReqFetchProductOptionPackageInfoList();
    }, [targetErpItem, wsId]);

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => handleCloseModal()}
            >
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <CustomDialog.Title>패키지의 하위 상품 리스트</CustomDialog.Title>
                <St.BodyContainer>
                    <St.ParentProductOptionInfoWrapper>
                        <h3>패키지</h3>
                        <div>{targetErpItem?.productName} - {targetErpItem?.productOptionName} x {targetErpItem?.unit}개</div>
                    </St.ParentProductOptionInfoWrapper>
                    <St.CardListWrapper>
                        {productOptionPackageInfoList?.map(productOptionPackageInfo => {
                            return (
                                <St.CardBox key={productOptionPackageInfo?.productOptionId}>
                                    <div className='productInfoText'>{productOptionPackageInfo?.productName} - {productOptionPackageInfo?.productOptionName} x {productOptionPackageInfo?.unit}개</div>
                                    <div className='stockInfoFlexBox'>
                                        <div className='text-blue'>필요수량: {productOptionPackageInfo?.unit * targetErpItem?.unit}개</div>
                                        <div>남은재고: {productOptionPackageInfo?.stockUnit}개</div>
                                        {(productOptionPackageInfo?.unit * targetErpItem?.unit) - productOptionPackageInfo?.stockUnit > 0 &&
                                            <div className='text-red'>부족한재고: {(productOptionPackageInfo?.unit * targetErpItem?.unit) - productOptionPackageInfo?.stockUnit}개</div>
                                        }
                                    </div>
                                </St.CardBox>
                            );
                        })}
                    </St.CardListWrapper>
                </St.BodyContainer>
            </CustomDialog>
        </>
    );
}