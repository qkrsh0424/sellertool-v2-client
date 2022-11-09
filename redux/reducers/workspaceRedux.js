export default function workspaceRedux(state = {
    isLoading: true,
    workspaceInfo: null
}, action) {
    switch (action.type) {
        case 'WORKSPACE_REDUX_SET_DATA':
            return action.payload;
        case 'WORKSPACE_REDUX_CLEAR_WORKSPACE_INFO':
            return {
                ...state,
                workspaceInfo: null,
                isLoading: false
            }
        default:
            return { ...state }
    }
};