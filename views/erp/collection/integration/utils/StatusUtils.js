import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";

/**
 * 신규주문 -> salesYn:n, releaseYn:n, holdYn:n,
 * 주문확정 -> salesYn:y, releaseYn:n, holdYn:n,
 * 출고완료 -> salesYn:y, releaseYn:y, holdYn:n
 * 보류데이터 -> salesYn:n, releaseYn:n, holdYn:y
 * 재고반영 -> salesYn:y, releaseYn:y, holdYn:n, stockReflectYn:y
 * 
 * 신규주문 -> 주문확정 | NEW -> CONFIRM
 * createdAt -> maintain, salesYn -> y, salesAt -> now, releaseYn -> n, releaseAt -> null, holdYn -> n, holdAt -> null
 * 
 * 신규주문 -> 출고완료 | NEW -> COMPLETE
 * createdAt -> maintain, salesYn -> y, salesAt -> now, releaseYn -> y, releaseAt -> now, holdYn -> n, holdAt -> null
 * 
 * any -> 보류데이터 | ANY -> POSTPONE
 * createdAt -> maintain, salesYn -> n, salesAt -> null, releaseYn -> n, releaseAt -> null, holdYn -> y, holdAt -> now
 * 
 * 주문확정 -> 신규주문 | CONFIRM -> NEW
 * createdAt -> maintain, salesYn -> n, salesAt -> null, releaseYn -> n, releaseAt -> null, holdYn -> n, holdAt -> null
 * 
 * 주문확정 -> 출고완료 | CONFIRM -> COMPLETE
 * createdAt -> maintain, salesYn -> y, salesAt -> maintain, releaseYn -> y, releaseAt -> now, holdYn -> n, holdAt -> null
 * 
 * 출고완료 -> 주문확정 | COMPLETE -> CONFIRM
 * createdAt -> maintain, salesYn -> y, salesAt -> maintain, releaseYn -> n, releaseAt -> null, holdYn -> n, holdAt -> null
 * 
 * 출고완료 -> 신규주문 | COMPLETE -> NEW
 * createdAt -> maintain, salesYn -> n, salesAt -> null, releaseYn -> n, releaseAt -> null, holdYn -> n, holdAt -> null
 * 
 * 보류데이터 -> 신규주문 | POSTPONE -> NEW
 * createdAt -> now, salesYn -> n, salesAt -> null, releaseYn -> n, releaseAt -> null, holdYn -> n, holdAt -> null
 * 
 * 보류데이터 -> 주문확정 | POSTPONE -> CONFIRM
 * createdAt -> now, salesYn -> y, salesAt -> now, releaseYn -> n, releaseAt -> null, holdYn -> n, holdAt -> null
 * 
 * 보류데이터 -> 출고완료 | POSTPONE -> COMPLETE
 * createdAt -> now, salesYn -> y, salesAt -> now, releaseYn -> y, releaseAt -> now, holdYn -> n, holdAt -> null
 * 
 */

const customDateUtils = CustomDateUtils();

export const StatusUtils = () => {
    return {
        getClassificationTypeForFlags: getClassificationTypeForFlags,
        getFlagsForClassificationType: getFlagsForClassificationType,
        getFlagsForErpItemAndTargetClassificationType: getFlagsForErpItemAndTargetClassificationType
    }
}

function getClassificationTypeForFlags({ salesYn, releaseYn, holdYn }) {
    if (salesYn === 'n' && releaseYn === 'n' && holdYn === 'n') {
        return 'NEW';
    } else if (salesYn === 'y' && releaseYn === 'n' && holdYn === 'n') {
        return 'CONFIRM';
    } else if (salesYn === 'y' && releaseYn === 'y' && holdYn === 'n') {
        return 'COMPLETE';
    } else if (salesYn === 'n' && releaseYn === 'n' && holdYn === 'y') {
        return 'POSTPONE';
    } else { // Default is NEW
        return 'NEW';
    }
}

function getFlagsForClassificationType({ classificationType }) {
    switch (classificationType) {
        case 'NEW':
            return {
                salesYn: 'n',
                releaseYn: 'n',
                holdYn: 'n'
            };
        case 'CONFIRM':
            return {
                salesYn: 'y',
                releaseYn: 'n',
                holdYn: 'n'
            }
        case 'COMPLETE':
            return {
                salesYn: 'y',
                releaseYn: 'y',
                holdYn: 'n'
            };
        case 'POSTPONE':
            return {
                salesYn: 'n',
                releaseYn: 'n',
                holdYn: 'y'
            };
        default: // Default is NEW
            return {
                salesYn: 'n',
                releaseYn: 'n',
                holdYn: 'n'
            }
    }
}

function getFlagsForErpItemAndTargetClassificationType({ erpItem, targetClassificationType }) {
    const sourceClassificationType = getClassificationTypeForFlags({ salesYn: erpItem?.salesYn, releaseYn: erpItem?.releaseYn, holdYn: erpItem?.holdYn });

    if (sourceClassificationType === 'NEW') {
        if (targetClassificationType === 'CONFIRM') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'y',
                salesAt: customDateUtils.getCurrentUTCDateTime(),
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'COMPLETE') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'y',
                salesAt: customDateUtils.getCurrentUTCDateTime(),
                releaseYn: 'y',
                releaseAt: customDateUtils.getCurrentUTCDateTime(),
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'POSTPONE') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'n',
                salesAt: null,
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'y',
                holdAt: customDateUtils.getCurrentUTCDateTime(),
            };
        } else {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: erpItem?.salesYn,
                salesAt: erpItem?.salesAt,
                releaseYn: erpItem?.releaseYn,
                releaseAt: erpItem?.releaseAt,
                holdYn: erpItem?.holdYn,
                holdAt: erpItem?.holdAt
            };
        }
    }

    if (sourceClassificationType === 'CONFIRM') {
        if (targetClassificationType === 'NEW') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'n',
                salesAt: null,
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'COMPLETE') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'y',
                salesAt: erpItem?.salesAt,
                releaseYn: 'y',
                releaseAt: customDateUtils.getCurrentUTCDateTime(),
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'POSTPONE') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'n',
                salesAt: null,
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'y',
                holdAt: customDateUtils.getCurrentUTCDateTime(),
            };
        } else {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: erpItem?.salesYn,
                salesAt: erpItem?.salesAt,
                releaseYn: erpItem?.releaseYn,
                releaseAt: erpItem?.releaseAt,
                holdYn: erpItem?.holdYn,
                holdAt: erpItem?.holdAt
            };
        }
    }

    if (sourceClassificationType === 'COMPLETE') {
        if (targetClassificationType === 'NEW') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'n',
                salesAt: null,
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'CONFIRM') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'y',
                salesAt: erpItem?.salesAt,
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'POSTPONE') {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: 'n',
                salesAt: null,
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'y',
                holdAt: customDateUtils.getCurrentUTCDateTime(),
            };
        } else {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: erpItem?.salesYn,
                salesAt: erpItem?.salesAt,
                releaseYn: erpItem?.releaseYn,
                releaseAt: erpItem?.releaseAt,
                holdYn: erpItem?.holdYn,
                holdAt: erpItem?.holdAt
            };
        }
    }

    if (sourceClassificationType === 'POSTPONE') {
        if (targetClassificationType === 'NEW') {
            return {
                createdAt: customDateUtils.getCurrentUTCDateTime(),
                salesYn: 'n',
                salesAt: null,
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'CONFIRM') {
            return {
                createdAt: customDateUtils.getCurrentUTCDateTime(),
                salesYn: 'y',
                salesAt: customDateUtils.getCurrentUTCDateTime(),
                releaseYn: 'n',
                releaseAt: null,
                holdYn: 'n',
                holdAt: null
            };
        } else if (targetClassificationType === 'COMPLETE') {
            return {
                createdAt: customDateUtils.getCurrentUTCDateTime(),
                salesYn: 'y',
                salesAt: customDateUtils.getCurrentUTCDateTime(),
                releaseYn: 'y',
                releaseAt: customDateUtils.getCurrentUTCDateTime(),
                holdYn: 'y',
                holdAt: null,
            };
        } else {
            return {
                createdAt: erpItem?.createdAt,
                salesYn: erpItem?.salesYn,
                salesAt: erpItem?.salesAt,
                releaseYn: erpItem?.releaseYn,
                releaseAt: erpItem?.releaseAt,
                holdYn: erpItem?.holdYn,
                holdAt: erpItem?.holdAt
            };
        }
    }
}