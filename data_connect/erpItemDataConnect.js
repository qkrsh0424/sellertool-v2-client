import { axiosAuthInterceptor } from "./axiosInterceptors"
import { csrfDataConnect } from "./csrfDataConnect"
import qs from 'qs';
import withMainApiCsrfWrapper from "../utils/withMainApiCsrfWrapper";

const API_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiAddress : process.env.production.apiAddress


export const ErpItemDataConnect = {
    baseErpCollectionPage: baseErpCollectionPage
}

function baseErpCollectionPage() {
    const BASE_URL = `${API_ADDRESS}/page-api/erpc/v1/erp-items`;

    return {
        count: async function ({ params, headers }) {
            return await axiosAuthInterceptor.get(`${BASE_URL}/count`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        },
        searchSlice: async function ({ params, headers }) {
            return await axiosAuthInterceptor.get(`${BASE_URL}/slice`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        },
    }
}

export const erpItemDataConnect = () => {
    return {
        /**
         * 
         * @param {object} params 
         * @param {string} params.salesYn
         * @param {string} params.releaseYn
         * @param {string} params.periodSearchCondition
         * @param {string} params.startDateTime
         * @param {string} params.endDateTime
         * @param {string} params.mpSearchCondition
         * @param {string} params.mpSearchQuery
         * @param {string} params.oiSearchCondition
         * @param {string} params.oiSearchQuery
         * @param {string} params.riSearchCondition
         * @param {string} params.riSearchQuery
         * @param {string} params.diSearchCondition
         * @param {string} params.diSearchQuery
         * @param {string} params.matchedCode
         * 
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        count: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erp-items/count`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        },
        /**
         * 
         * @param {object} params 
         * @param {string} params.salesYn
         * @param {string} params.releaseYn
         * @param {string} params.periodSearchCondition
         * @param {string} params.startDateTime
         * @param {string} params.endDateTime
         * @param {string} params.mpSearchCondition
         * @param {string} params.mpSearchQuery
         * @param {string} params.oiSearchCondition
         * @param {string} params.oiSearchQuery
         * @param {string} params.riSearchCondition
         * @param {string} params.riSearchQuery
         * @param {string} params.diSearchCondition
         * @param {string} params.diSearchQuery
         * @param {string} params.matchedCode
         * 
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        searchSlice: async function (params, headers) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erp-items/slice`, {
                headers: headers,
                params: params,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN',
                paramsSerializer: params => {
                    return qs.stringify(params, { arrayFormat: 'brackets' })
                }
            })
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string[]} body.ids
         * @returns 
         */
        searchListByIds: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-items/search/ids`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN',
                    paramsSerializer: params => {
                        return qs.stringify(params, { arrayFormat: 'brackets' })
                    }
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.sameReceiverHint
         * @param {string} body.matchedCode
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        searchListBySameReceiverHint: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-items/same-receiver`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string} body.id
         * @param {string} body.optionCode
         * @returns 
         */
        changeOptionCode: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/erp-items/${body.id}/target:optionCode`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string} body.id
         * @param {string} body.releaseOptionCode
         * @returns 
         */
        changeReleaseOptionCode: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/erp-items/${body.id}/target:releaseOptionCode`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        updateAll: async function (body, headers) {
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.put(`${API_ADDRESS}/api/v1/erp-items`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string[]} body.ids
         * @returns 
         */
        deleteByIds: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.delete(`${API_ADDRESS}/api/v1/erp-items/ids`, {
                    headers: headers,
                    data: body,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string[]} body.ids
         * @param {boolean} body.initializeFlag
         * @returns 
         */
        changeStatusToSales: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/erp-items/target:status/action:sales`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string[]} body.ids
         * @param {boolean} body.initializeFlag
         * @returns 
         */
        changeStatusToHold: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/erp-items/target:status/action:hold`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string[]} body.ids
         * @param {boolean} body.initializeFlag
         * @returns 
         */
        changeStatusToRelease: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/erp-items/target:status/action:release`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string[]} body.ids
         * @param {boolean} body.initializeFlag
         * @returns 
         */
        changeStatusToOrder: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/erp-items/target:status/action:order`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {string[]} body.ids
         * @param {boolean} body.initializeFlag
         * @returns 
         */
        changeStatusHoldToOrder: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.patch(`${API_ADDRESS}/api/v1/erp-items/target:status/action:holdToOrder`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {FormData} formData 
         * @param {object} headers
         * @param {string} headers.wsId
         * @returns 
         */
        uploadWithExcel: async function (formData, headers) {
            // return await withMainApiCsrfWrapper(
            //     () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-items/upload/excel`, formData, {
            //         headers: headers,
            //         withCredentials: true,
            //         xsrfCookieName: 'x_api_csrf_token',
            //         xsrfHeaderName: 'X-XSRF-TOKEN'
            //     })
            // )
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/page-api/erpc/v1/erp-items/upload/excel`, formData, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} formData
         * @param {string} formData.workspaceId
         * @param {object[]} formData.contents
         * @returns 
         */
        createAll: async function (formData) {
            let headers = {
                wsId: formData.workspaceId
            }
            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-items`, formData, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string[]} body.erpItemIds
         * @param {string} body.workspaceId
         * @returns 
         */
        copyCreateErpItems: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-items/copy-create`, body, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {object} body 
         * @param {string} body.workspaceId
         * @param {object[]} body.items
         * @returns 
         */
        releaseListExcelDownload: async function (body) {
            let headers = {
                wsId: body.workspaceId
            }

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-items/release-list/download/excel`, body, {
                    headers: headers,
                    responseType: 'blob',
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * 
         * @param {FormData} formData 
         * @param {object} headers 
         * @param {string} headers.wsId
         * @returns 
         */
        uploadWaybillForm: async function (formData, headers) {

            return await withMainApiCsrfWrapper(
                () => axiosAuthInterceptor.post(`${API_ADDRESS}/api/v1/erp-items/waybill/upload`, formData, {
                    headers: headers,
                    withCredentials: true,
                    xsrfCookieName: 'x_api_csrf_token',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
                })
            )
        },
        /**
         * @param {object} headers,
         * @param {string} headers.wsId
         * @param {object} params
         * @param {date} params.startDateTime
         * @param {date} params.endDateTime
         */
        countOrderManagement: async function (headers, params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erp-items/count/order-management`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        },
        /**
         * @param {object} headers,
         * @param {string} headers.wsId
         * @param {object} params
         * @param {date} params.startDateTime
         * @param {date} params.endDateTime
         */
        countOrderWith24H: async function (headers, params) {
            return await axiosAuthInterceptor.get(`${API_ADDRESS}/api/v1/erp-items/count/order-with-24h`, {
                params: params,
                headers: headers,
                withCredentials: true,
                xsrfCookieName: 'x_api_csrf_token',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            })
        }
    }
}