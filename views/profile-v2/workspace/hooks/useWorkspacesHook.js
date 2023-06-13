import { useEffect, useState } from "react";
import { workspaceDataConnect } from "../../../../data_connect/workspaceDataConnect";

export default function useWorkspacesHook(props) {
    const [workspaces, setWorkspaces] = useState(null);

    useEffect(()=>{
        reqFetchWorkspaces();
    },[]);

    const reqFetchWorkspaces = async () => {
        await workspaceDataConnect().getWorkspaces()
            .then(res => {
                if (res.status === 200) {
                    setWorkspaces(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return {
        workspaces,
        reqFetchWorkspaces
    }
}