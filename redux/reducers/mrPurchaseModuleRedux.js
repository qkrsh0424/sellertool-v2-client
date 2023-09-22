export default function mrPurchaseModuleRedux(state = {
    mrPurchaseModuleList: null
}, action) {
    switch (action.type) {
        case 'MR_PURCHASE_MODULE_SET_DATA':
            return action.payload;
        case 'MR_PURCHASE_MODULE_CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
        case 'MR_PURCHASE_MODULE_CLEAR':
            return {
                ...state,
                mrPurchaseModuleList: null,
            }
        default:
            return { ...state }
    }
};