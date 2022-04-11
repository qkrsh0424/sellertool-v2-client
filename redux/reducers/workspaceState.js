const workspaceState = (state = {
    info:null
}, action) => {
    switch (action.type) {
        case 'WORKSPACE_STATE_INIT_INFO':
            return {
                ...state,
                info:action.payload
            };
        case 'WORKSPACE_STATE_CLEAR_INFO':
            return {
                ...state,
                info:null
            }
        default:
            return { ...state }
    }
};

export default workspaceState;