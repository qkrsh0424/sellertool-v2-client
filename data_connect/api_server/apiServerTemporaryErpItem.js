import axios from "axios"

const API_SERVER_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiServerAddress : process.env.production.apiServerAddress

export function apiServerTemporaryErpItem() {
    return {
        searchList,
        deleteList
    }
}

async function searchList({ params, headers }) {
    return await axios.get(`${API_SERVER_ADDRESS}/api/temporary-erp-items`, {
        headers: headers,
        // withCredentials: true,
    })
}

async function deleteList({ params, headers }) {
    return await axios.delete(`${API_SERVER_ADDRESS}/api/temporary-erp-items`, {
        headers: headers,
        // withCredentials: true,
    })
}