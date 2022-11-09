import { useEffect, useState } from "react";
import { workspaceDataConnect } from "../../../../data_connect/workspaceDataConnect";

export default function useWorkspacesHook(props) {
    const [workspaces, setWorkspaces] = useState(null);
    const [privateWorkspaces, setPrivateWorkspaces] = useState(null);
    const [publicWorkspaces, setPublicWorkspaces] = useState(null);

    useEffect(() => {
        reqFetchWorkspaces();
    }, []);

    useEffect(() => {
        if (!workspaces) {
            return;
        }

        let privateItems = workspaces.filter(r => r.publicYn === 'n');
        let publicItems = workspaces.filter(r => r.publicYn === 'y');

        onSetPrivateWorkspaces(privateItems);
        onSetPublicWorkspaces(publicItems);

    }, [workspaces]);

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
            ;
    }

    const onSetPrivateWorkspaces = (items) => {
        setPrivateWorkspaces([...items]);
    }

    const onSetPublicWorkspaces = (items) => {
        setPublicWorkspaces([...items])
    }

    return {
        workspaces,
        privateWorkspaces,
        publicWorkspaces
    }
}