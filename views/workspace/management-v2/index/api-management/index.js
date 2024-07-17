import { useEffect, useState } from "react";
import { FdAdd } from "./components/FdAdd/FdAdd";
import { useApiHook } from "./hooks/useApiHook";
import * as St from './index.styled';
import { FdApiKeyList } from "./components/FdApiKeyList/FdApiKeyList";

export function ApiManagementComponent({
    workspace
}) {
    const apiHook = useApiHook();

    const [apiKeyList, setApiKeyList] = useState([]);

    useEffect(() => {
        if (!workspace?.id) {
            return;
        }

        reqFetchApiKeyList();
    }, [workspace?.id]);

    const reqFetchApiKeyList = async () => {
        const headers = {
            wsId: workspace?.id
        }
        const result = await apiHook.searchList({ headers: headers })

        if (result?.content) {
            setApiKeyList(result?.content);
        }
    }

    const reqGenerateKey = async (description) => {
        const body = {
            description: description
        }
        const headers = {
            wsId: workspace?.id
        }

        const result = await apiHook.generateKey({ body: body, headers: headers })

        if (result?.content) {
            setApiKeyList(prev => {
                return prev.concat(result?.content)
            })
        }
    }

    const reqDeleteKey = async (id) => {
        const params = {
            id: id
        }
        const headers = {
            wsId: workspace?.id
        }

        const result = await apiHook.deleteKey({ params: params, headers: headers })

        if (result?.content) {
            setApiKeyList(prev => {
                return prev?.filter(r => r.id !== id);
            })
        }

    }

    const reqPatchDescription = async ({ body }) => {
        const headers = {
            wsId: workspace?.id
        }

        const result = await apiHook.patchDescription({ body, headers });

        if (result?.content) {
            setApiKeyList(prev => {
                return prev?.map(r => {
                    if (r.id === result?.content?.id) {
                        return result?.content
                    } else {
                        return r;
                    }
                })
            })
        }
    }

    return (
        <>
            <St.Container>
                <St.TitleFieldWrapper>
                    API 관리
                </St.TitleFieldWrapper>
                <FdAdd
                    onReqGenerateKey={reqGenerateKey}
                />
                <FdApiKeyList
                    workspace={workspace}
                    apiKeyList={apiKeyList}
                    onReqDeleteKey={reqDeleteKey}
                    onReqPatchDescription={reqPatchDescription}
                />
            </St.Container>
        </>
    );
}