export function GlobalReactQueryUtils(props) {
    return {
        customDefaultOptionsForQueryClient: _customDefaultOptionsForQueryClient,
        customDefaultOptionsForUseQuery: _customDefaultOptionsForUseQuery,
        queryKeys: _queryKeys,
        queryKeyPaths: _queryKeyPaths,
        generateQueryKey: _generateQueryKey
    }
}

const _customDefaultOptionsForQueryClient = {
    queries: {
        retry: 0
    }
}

const _customDefaultOptionsForUseQuery = {
    staleTime: 4 * 60 * 1000,
    meta: {
        errorOrigin: 'DEFAULT' // 메인 서버로의 요청은 null or DEFAULT,
    },
}

const _queryKeys = {
    EXCEL_TRANSLATOR_LIST: 'EXCEL_TRANSLATOR_LIST',
}

const _queryKeyPaths = {
    EXCEL_EDITOR: 'EXCEL_EDITOR'
}

const _generateQueryKey = (key, path, options = {}) => {
    return [key, path, options];
}