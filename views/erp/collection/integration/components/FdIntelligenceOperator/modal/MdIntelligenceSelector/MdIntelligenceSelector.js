import { useState } from "react";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import { useApiHook } from "../../../../hooks/useApiHook";
import * as St from './MdIntelligenceSelector.styled';
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { useRouter } from "next/router";
import { StatusUtils } from "../../../../utils/StatusUtils";
import CustomImage from "../../../../../../../../components/image/CustomImage";
import { CustomDateUtils } from "../../../../../../../../utils/CustomDateUtils";
import { CustomURIEncoderUtils } from "../../../../../../../../utils/CustomURIEncoderUtils";
import { useSelector } from "react-redux";
import { useSelectedErpItemListActionsHook } from "../../../../contexts/SelectedErpItemListProvider";
import _ from "lodash";
import { Base64Utils } from "../../../../../../../../utils/base64Utils";
import { customBackdropController } from "../../../../../../../../components/backdrop/default/v1";

const STATUS_LIST = [
    {
        classificationType: 'COMPLETE',
        name: '출고완료'
    },
    {
        classificationType: 'CONFIRM',
        name: '주문확정'
    },
    {
        classificationType: 'POSTPONE',
        name: '보류데이터'
    },
    {
        classificationType: 'NEW',
        name: '신규주문'
    },
];
export function MdIntelligenceSelector({
    open = false,
    toggleIntelligenceSelectorModalOpen
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const classificationType = router?.query?.classificationType;
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [priorityTabList, setPriorityTabList] = useState(STATUS_LIST?.filter(r => r.classificationType !== classificationType));
    const [addPriorityTabModeOpen, setAddPriorityTabModeOpen] = useState(false);

    const toggleAddPriorityTabModeOpen = (bool) => {
        setAddPriorityTabModeOpen(bool);
    }

    const handleCloseModal = () => {
        toggleIntelligenceSelectorModalOpen(false);
    }

    const handleRemovePriorityTab = (targetClassificationType) => {
        setPriorityTabList(prev => {
            return prev.filter(r => r.classificationType !== targetClassificationType);
        })
    }

    const handleAddPriorityTab = (targetStatus) => {
        if (!priorityTabList?.some(r => r.classificationType === targetStatus?.classificationType)) {
            setPriorityTabList(prev => {
                return [...prev, { ...targetStatus }];
            })
        }
        setAddPriorityTabModeOpen(false);
    }

    const handleGetErpItemList = async () => {
        let headers = {
            wsId: wsId
        }

        let endDateTime = new Date();
        let startDateTime = CustomDateUtils().getStartDate(endDateTime);

        let params = {
            periodSearchCondition: 'createdAt',
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            mpSearchCondition: null,
            mpSearchQuery: null,
            oiSearchCondition: null,
            oiSearchQuery: null,
            riSearchCondition: null,
            riSearchQuery: null,
            diSearchCondition: null,
            diSearchQuery: null,
            mmSearchCondition: null,
            mmSearchQuery: null,
            matchedCode: 'releaseOptionCode',
            stockReflectYn: 'n',
            sortTypes: CustomURIEncoderUtils().encodeJSONList(['CREATED_AT$ASC', 'CHANNEL_ORDER_DATE$ASC']),
        }

        const fetchErpItemListResult = await apiHook.reqFetchErpItemList({ params: params, headers: headers });

        if (fetchErpItemListResult?.content) {
            return fetchErpItemListResult?.content;
        } else {
            throw new Error('주문건 조회중 에러가 발생했습니다.');
        }
    }

    const handleClassifyErpItemList = (erpItemList) => {
        let resultList = [];
        let newErpItemList = [];
        let confirmErpItemList = [];
        let completeErpItemList = [];
        let postponeErpItemList = [];
        let excludeErpItemList = [];

        // 옵션코드가 없는 주문건은 패스
        for (let i = 0; i < erpItemList?.length; i++) {
            const erpItem = { ...erpItemList[i] };

            if (!erpItem?.productOptionId) {
                excludeErpItemList.push(erpItem);
                continue;
            }

            const currStatus = StatusUtils().getClassificationTypeForFlags({ salesYn: erpItem?.salesYn, releaseYn: erpItem?.releaseYn, holdYn: erpItem?.holdYn });
            switch (currStatus) {
                case 'NEW':
                    newErpItemList.push(erpItem);
                    break;
                case 'CONFIRM':
                    confirmErpItemList.push(erpItem);
                    break;
                case 'COMPLETE':
                    completeErpItemList.push(erpItem);
                    break;
                case 'POSTPONE':
                    postponeErpItemList.push(erpItem);
                    break;
                default: break;
            }
        }

        // 우선순위로 분류되는 주문건들 먼저 결과값에 담는다.
        for (let i = 0; i < priorityTabList?.length; i++) {
            const priorityTab = priorityTabList[i];
            switch (priorityTab?.classificationType) {
                case 'NEW':
                    resultList = resultList.concat(newErpItemList);
                    break;
                case 'CONFIRM':
                    resultList = resultList.concat(confirmErpItemList);
                    break;
                case 'COMPLETE':
                    resultList = resultList.concat(completeErpItemList);
                    break;
                case 'POSTPONE':
                    resultList = resultList.concat(postponeErpItemList);
                    break;
                default: break;
            }
        }

        // 현재 바라보고 있는 탭의 주문건들을 결과값에 담는다.
        switch (classificationType) {
            case 'NEW':
                resultList = resultList.concat(newErpItemList);
                break;
            case 'CONFIRM':
                resultList = resultList.concat(confirmErpItemList);
                break;
            case 'COMPLETE':
                resultList = resultList.concat(completeErpItemList);
                break;
            case 'POSTPONE':
                resultList = resultList.concat(postponeErpItemList);
                break;
            default: break;
        }

        return {
            classifiedErpItemList: resultList,
            excludeErpItemList: excludeErpItemList
        };
    }

    const handleGetProductPackageInfoList = async (productOptionIds) => {
        let headers = { wsId: wsId }
        let body = {
            productOptionIds: productOptionIds
        }
        const fetchResult = await apiHook.reqFetchProductOptionPackageList({ body: body, headers: headers });

        if (fetchResult?.content) {
            return fetchResult?.content;
        }
    }

    const handleGetInventoryStockList = async (productOptionIds) => {
        const fetchResult = await apiHook.reqFetchInventoryStockList({ body: { productOptionIds: productOptionIds }, headers: { wsId: wsId } })

        if (fetchResult?.content) {
            return fetchResult?.content;
        }
    }

    const handleLaunchOperator = async () => {
        customBackdropController().showBackdrop();
        const erpItemList = await handleGetErpItemList();
        let { classifiedErpItemList, excludeErpItemList } = handleClassifyErpItemList(erpItemList);
        const packageProductOptionIdSet = new Set();
        const productOptionIdSet = new Set();
        // let excludeErpItemList = [];
        let excludeSameReceiverHintSet = new Set();
        let newSelectedErpItemList = [];

        for (let i = 0; i < classifiedErpItemList?.length; i++) {
            const item = classifiedErpItemList[i];
            if (item?.packageYn === 'y') {
                if (!packageProductOptionIdSet.has(item?.productOptionId)) {
                    packageProductOptionIdSet.add(item?.productOptionId);
                }
            } else {
                if (!productOptionIdSet.has(item?.productOptionId)) {
                    productOptionIdSet.add(item?.productOptionId);
                }
            }
        }

        // 패키지 인포 불러오기
        const productPackageInfoList = await handleGetProductPackageInfoList([...packageProductOptionIdSet]);
        // 패키지에 포함된 옵션 아이디를 전체에 포함 시키기
        for (let i = 0; i < productPackageInfoList?.length; i++) {
            const item = productPackageInfoList[i];
            if (!productOptionIdSet.has(item?.productOptionId)) {
                productOptionIdSet.add(item?.productOptionId);
            }
        }

        // 상품의 재고 리스트 불러오기
        let inventoryStockList = await handleGetInventoryStockList([...productOptionIdSet]);


        for (let i = 0; i < classifiedErpItemList?.length; i++) {
            let item = classifiedErpItemList[i];
            // 패키지 상품을 추종하는 주문건에 대한 출고 가능 여부 확인.
            if (item?.packageYn === 'y') {
                const targetPackageOptionInfoList = productPackageInfoList?.filter(productPackageInfo => productPackageInfo.parentProductOptionId === item?.productOptionId);
                let copiedInventoryStockList = _.cloneDeep(inventoryStockList?.filter(inventoryStock => targetPackageOptionInfoList?.some(productPackageInfo => productPackageInfo.productOptionId === inventoryStock.productOptionId)));
                let isPassed = true;

                targetPackageOptionInfoList?.forEach(packageOptionInfo => {
                    copiedInventoryStockList = copiedInventoryStockList?.map(copiedInventoryStock => {
                        if (copiedInventoryStock?.productOptionId === packageOptionInfo?.productOptionId) {
                            let unit = packageOptionInfo?.unit * item?.unit;
                            if (unit <= copiedInventoryStock?.stockUnit) {
                                return {
                                    ...copiedInventoryStock,
                                    stockUnit: copiedInventoryStock?.stockUnit - unit
                                }
                            } else {
                                isPassed = false;
                            }
                        }

                        return { ...copiedInventoryStock };
                    })
                })

                if (isPassed) {
                    inventoryStockList = inventoryStockList?.map(inventoryStock => {
                        let copiedInventoryStock = copiedInventoryStockList?.find(r => r.productOptionId === inventoryStock?.productOptionId);
                        if (copiedInventoryStock) {
                            return { ...copiedInventoryStock }
                        }

                        return { ...inventoryStock };
                    })
                } else {
                    excludeErpItemList.push(item);
                }
            } else {
                inventoryStockList = inventoryStockList?.map(inventoryStock => {
                    if (inventoryStock?.productOptionId === item?.productOptionId) {
                        if (item?.unit <= inventoryStock?.stockUnit) {
                            return {
                                ...inventoryStock,
                                stockUnit: inventoryStock?.stockUnit - item?.unit
                            }
                        } else {
                            excludeErpItemList.push(item);
                        }
                    }

                    return { ...inventoryStock }
                })
            }
        }

        // 제외 대상의 동일 수취인 정보를 가져온다.
        excludeErpItemList?.forEach(excludeErpItem => {
            let sameReceiverHint = Base64Utils().encodeBase64(`${excludeErpItem?.receiver}${excludeErpItem?.receiverContact1}${excludeErpItem?.destination}${excludeErpItem?.destinationDetail}`)
            if (!excludeSameReceiverHintSet.has(sameReceiverHint)) {
                excludeSameReceiverHintSet.add(sameReceiverHint);
            }
        })

        newSelectedErpItemList = classifiedErpItemList?.filter(erpItem => {
            let sameReceiverHint = Base64Utils().encodeBase64(`${erpItem?.receiver}${erpItem?.receiverContact1}${erpItem?.destination}${erpItem?.destinationDetail}`)
            const currStatus = StatusUtils().getClassificationTypeForFlags({ salesYn: erpItem?.salesYn, releaseYn: erpItem?.releaseYn, holdYn: erpItem?.holdYn });
            const isExcludedErpItem = excludeErpItemList?.find(r => r.id === erpItem?.id);
            const isExcludedSameReceiver = excludeSameReceiverHintSet.has(sameReceiverHint);

            if (
                isExcludedErpItem
                || isExcludedSameReceiver
                || currStatus !== classificationType
            ) {
                return false;
            }

            return true;
        });
        console.log('classifiedErpItemList', classifiedErpItemList);
        console.log('excludeErpItemList', excludeErpItemList);
        console.log('inventoryStockList', inventoryStockList);
        console.log('excludeSameReceiverHintSet', excludeSameReceiverHintSet);
        console.log('newSelectedErpItemList', newSelectedErpItemList);
        selectedErpItemListActionsHook.onSet(newSelectedErpItemList);
        customBackdropController().hideBackdrop();
        handleCloseModal();
    }

    return (
        <>
            <CustomDialog open={open} onClose={() => handleCloseModal()}>
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <St.BodyContainer>
                    <St.SettingFieldWrapper>
                        <div className='priorityTabListBox'>
                            <div className='titleBox'>
                                <div className='title'>
                                    출고 우선순위
                                </div>
                                {addPriorityTabModeOpen ?
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => toggleAddPriorityTabModeOpen(false)}
                                    >
                                        <CustomImage src='/images/icon/close_default_e56767.svg' />
                                    </CustomBlockButton>
                                    :
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => toggleAddPriorityTabModeOpen(true)}
                                    >
                                        <CustomImage src='/images/icon/add_default_000000.svg' />
                                    </CustomBlockButton>
                                }
                            </div>
                            {addPriorityTabModeOpen ?
                                <div className='flexBox gap-5'>
                                    {STATUS_LIST?.filter(r => (!priorityTabList?.some(r2 => r2.classificationType === r.classificationType) && r.classificationType !== classificationType))?.map(priorityTab => {
                                        return (
                                            <div
                                                key={priorityTab?.classificationType}
                                                className='tabBox'
                                            >
                                                <div className='tabBox__name'>
                                                    {priorityTab?.name}
                                                </div>
                                                <CustomBlockButton
                                                    type='button'
                                                    className='tabBox__iconButton'
                                                    onClick={() => handleAddPriorityTab(priorityTab)}
                                                >
                                                    <CustomImage src='/images/icon/add_default_000000.svg' />
                                                </CustomBlockButton>
                                            </div>
                                        );
                                    })}
                                </div>
                                :
                                <div className='flexBox gap-5'>
                                    {priorityTabList?.map(priorityTab => {
                                        return (
                                            <div
                                                key={priorityTab?.classificationType}
                                                className='tabBox'
                                            >
                                                <div className='tabBox__name'>
                                                    {priorityTab?.name}
                                                </div>
                                                <CustomBlockButton
                                                    type='button'
                                                    className='tabBox__iconButton'
                                                    onClick={() => handleRemovePriorityTab(priorityTab?.classificationType)}
                                                >
                                                    <CustomImage src='/images/icon/close_default_e56767.svg' />
                                                </CustomBlockButton>
                                            </div>
                                        );
                                    })}
                                </div>
                            }
                        </div>
                    </St.SettingFieldWrapper>
                    <St.LaunchFieldWrapper>
                        <CustomBlockButton
                            type='button'
                            onClick={() => handleLaunchOperator()}
                            className='launchButton'
                        >
                            <div className='flexBox'>
                                <section className='icon'>
                                    <CustomImage src='/images/icon/stars_default_000000.svg' />
                                </section>
                                <section>출고가능 주문건 선택</section>
                            </div>
                        </CustomBlockButton>
                    </St.LaunchFieldWrapper>
                </St.BodyContainer>
            </CustomDialog>
        </>
    );
}