import { customToast } from "../../../../../../components/toast/custom-react-toastify/v1";
import { workspaceApiDataConnect } from "../../../../../../data_connect/workspaceApiDataConnect"

export function useApiHook(props) {
    const searchList = async ({ params, headers }) => {
        return await workspaceApiDataConnect().searchList({ headers: headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        res: res,
                        content: res?.data?.data
                    }
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo);
            })
    }

    const searchDetail = async ({ params, headers }) => {
        return await workspaceApiDataConnect().searchDetail({ params: params, headers: headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        res: res,
                        content: res?.data?.data
                    }
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo);
            })
    }

    const generateKey = async ({ body, headers }) => {
        return await workspaceApiDataConnect().generateKey({ body: body, headers: headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        res: res,
                        content: res?.data?.data
                    }
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo);
            })
    }

    const deleteKey = async ({ params, headers }) => {
        return await workspaceApiDataConnect().deleteKey({ params: params, headers: headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        res: res,
                        content: res?.data?.data
                    }
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo);
            })
    }

    const patchDescription = async ({ body, headers }) => {
        return await workspaceApiDataConnect().patchDescription({ body: body, headers: headers })
            .then(res => {
                if (res?.status === 200) {
                    return {
                        res: res,
                        content: res?.data?.data
                    }
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo);
            })
    }

    return {
        searchList,
        searchDetail,
        generateKey,
        deleteKey,
        patchDescription
    }
}