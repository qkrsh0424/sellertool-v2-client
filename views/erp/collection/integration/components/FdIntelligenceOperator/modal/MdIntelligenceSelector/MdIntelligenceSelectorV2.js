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
            sortTypes: CustomURIEncoderUtils().encodeJSONList(['CHANNEL_ORDER_DATE$ASC', 'CREATED_AT$ASC']),
        }

        const fetchErpItemListResult = await apiHook.reqFetchErpItemList({ params: params, headers: headers });

        if (fetchErpItemListResult?.content) {
            return fetchErpItemListResult?.content;
        } else {
            throw new Error('주문건 조회중 에러가 발생했습니다.');
        }
    }

    const handleClassifyErpItemList = (erpItemList) => {
        let classifiedErpItemList = [];
        let newErpItemList = [];
        let confirmErpItemList = [];
        let completeErpItemList = [];
        let postponeErpItemList = [];
        let excludeErpItemList = [];
        let currentTabErpItemList = [];

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
                    classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(newErpItemList));
                    break;
                case 'CONFIRM':
                    classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(confirmErpItemList));
                    break;
                case 'COMPLETE':
                    classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(completeErpItemList));
                    break;
                case 'POSTPONE':
                    classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(postponeErpItemList));
                    break;
                default: break;
            }
        }

        // 현재 바라보고 있는 탭의 주문건들을 결과값에 담는다.
        switch (classificationType) {
            case 'NEW':
                currentTabErpItemList = currentTabErpItemList.concat(_.cloneDeep(newErpItemList))
                classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(newErpItemList));
                break;
            case 'CONFIRM':
                currentTabErpItemList = currentTabErpItemList.concat(_.cloneDeep(confirmErpItemList))
                classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(confirmErpItemList));
                break;
            case 'COMPLETE':
                currentTabErpItemList = currentTabErpItemList.concat(_.cloneDeep(completeErpItemList))
                classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(completeErpItemList));
                break;
            case 'POSTPONE':
                currentTabErpItemList = currentTabErpItemList.concat(_.cloneDeep(postponeErpItemList))
                classifiedErpItemList = classifiedErpItemList.concat(_.cloneDeep(postponeErpItemList));
                break;
            default: break;
        }

        return {
            classifiedErpItemList: classifiedErpItemList,
            excludeErpItemList: excludeErpItemList,
            currentTabErpItemList: currentTabErpItemList,
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
        let { classifiedErpItemList, excludeErpItemList, currentTabErpItemList } = handleClassifyErpItemList(erpItemList);
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

        classifiedErpItemList?.forEach(classifiedErpItem => {
            if (classifiedErpItem?.packageYn === 'y') {
                const targetPackageOptionInfoList = productPackageInfoList?.filter(productPackageInfo => productPackageInfo.parentProductOptionId === classifiedErpItem?.productOptionId);
                let copiedInventoryStockList = _.cloneDeep(inventoryStockList?.filter(inventoryStock => targetPackageOptionInfoList?.some(productPackageInfo => productPackageInfo.productOptionId === inventoryStock.productOptionId)));
                let isPassed = true;

                targetPackageOptionInfoList?.forEach(packageOptionInfo => {
                    copiedInventoryStockList = copiedInventoryStockList?.map(copiedInventoryStock => {
                        if (copiedInventoryStock?.productOptionId === packageOptionInfo?.productOptionId) {
                            let unit = packageOptionInfo?.unit * classifiedErpItem?.unit;
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
                    excludeErpItemList.push(classifiedErpItem);
                }
            } else {
                inventoryStockList = inventoryStockList?.map(inventoryStock => {
                    if (inventoryStock?.productOptionId === classifiedErpItem?.productOptionId) {
                        if (classifiedErpItem?.unit <= inventoryStock?.stockUnit) {
                            return {
                                ...inventoryStock,
                                stockUnit: inventoryStock?.stockUnit - classifiedErpItem?.unit
                            }
                        } else {
                            excludeErpItemList.push(classifiedErpItem);
                        }
                    }

                    return { ...inventoryStock }
                })
            }
        });

        // 제외 대상의 동일 수취인 정보를 가져온다.
        excludeErpItemList?.forEach(excludeErpItem => {
            let sameReceiverHint = Base64Utils().encodeBase64(`${excludeErpItem?.receiver}${excludeErpItem?.receiverContact1}${excludeErpItem?.destination}${excludeErpItem?.destinationDetail}`)
            if (!excludeSameReceiverHintSet.has(sameReceiverHint)) {
                excludeSameReceiverHintSet.add(sameReceiverHint);
            }
        })

        // 동일 수취인 다른 주문건에 의해 제외 대상이 되는 특별한 경우의 주문건을 담는 리스트
        const specialExcludedErpItemList = [];

        newSelectedErpItemList = currentTabErpItemList?.filter(erpItem => {
            let sameReceiverHint = Base64Utils().encodeBase64(`${erpItem?.receiver}${erpItem?.receiverContact1}${erpItem?.destination}${erpItem?.destinationDetail}`)
            const isExcludedErpItem = excludeErpItemList?.find(r => r.id === erpItem?.id);
            const isExcludedSameReceiver = excludeSameReceiverHintSet.has(sameReceiverHint);

            // 주문건이 제외 대상이고 동일 수취인 제외 대상인 경우 => 자신은 어차피 재고가 없는 상태에서 제외 대상에 포함되었으므로 롤백이 필요 없음.
            if (isExcludedErpItem && isExcludedSameReceiver) {
                return false;
            }

            // 동일 수취인 제외 대상인 경우 => 자신은 재고가 있지만 동일 수취인의 다른 주문건에 재고가 없어서 제외되어야 하는 대상이므로 재고 수량 롤백이 필요함.
            if (!isExcludedErpItem && isExcludedSameReceiver) {
                specialExcludedErpItemList.push(erpItem);
                if (erpItem?.packageYn === 'y') {
                    const targetPackageOptionInfoList = productPackageInfoList?.filter(productPackageInfo => productPackageInfo.parentProductOptionId === erpItem?.productOptionId);

                    targetPackageOptionInfoList?.forEach(packageOptionInfo => {
                        inventoryStockList = inventoryStockList?.map(inventoryStock => {
                            if (inventoryStock?.productOptionId === packageOptionInfo?.productOptionId) {
                                let unit = packageOptionInfo?.unit * erpItem?.unit;
                                return {
                                    ...inventoryStock,
                                    stockUnit: Number(inventoryStock?.stockUnit) + Number(unit)
                                }
                            }

                            return { ...inventoryStock };
                        })
                    })
                } else {
                    inventoryStockList = inventoryStockList?.map(inventoryStock => {
                        if (inventoryStock?.productOptionId === erpItem?.productOptionId) {
                            return {
                                ...inventoryStock,
                                stockUnit: Number(inventoryStock?.stockUnit) + Number(erpItem?.unit)
                            }
                        }

                        return { ...inventoryStock }
                    })
                }
                return false;
            }

            return true;
        });

        currentTabErpItemList.forEach(erpItem => {
            const isSelectedErpItem = newSelectedErpItemList?.find(r => r.id === erpItem?.id);
            const isFinalExcludedErpItem = specialExcludedErpItemList?.find(r => r.id === erpItem?.id);

            // 이미 선택된 데이터는 로직을 타지 않는다.
            if (isSelectedErpItem || isFinalExcludedErpItem) {
                return;
            }

            console.log(erpItem);
            if (erpItem?.packageYn === 'y') {
                const targetPackageOptionInfoList = productPackageInfoList?.filter(productPackageInfo => productPackageInfo.parentProductOptionId === erpItem?.productOptionId);
                let copiedInventoryStockList = _.cloneDeep(inventoryStockList?.filter(inventoryStock => targetPackageOptionInfoList?.some(productPackageInfo => productPackageInfo.productOptionId === inventoryStock.productOptionId)));
                let isPassed = true;

                targetPackageOptionInfoList?.forEach(packageOptionInfo => {
                    copiedInventoryStockList = copiedInventoryStockList?.map(copiedInventoryStock => {
                        if (copiedInventoryStock?.productOptionId === packageOptionInfo?.productOptionId) {
                            let unit = packageOptionInfo?.unit * erpItem?.unit;
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
                    newSelectedErpItemList.push(erpItem);
                    inventoryStockList = inventoryStockList?.map(inventoryStock => {
                        let copiedInventoryStock = copiedInventoryStockList?.find(r => r.productOptionId === inventoryStock?.productOptionId);
                        if (copiedInventoryStock) {
                            return { ...copiedInventoryStock }
                        }

                        return { ...inventoryStock };
                    })
                }
            } else {
                inventoryStockList = inventoryStockList?.map(inventoryStock => {
                    if (inventoryStock?.productOptionId === erpItem?.productOptionId) {
                        if (erpItem?.unit <= inventoryStock?.stockUnit) {
                            newSelectedErpItemList.push(erpItem);
                            return {
                                ...inventoryStock,
                                stockUnit: inventoryStock?.stockUnit - erpItem?.unit
                            }
                        }
                    }

                    return { ...inventoryStock }
                })
            }
        })
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