import { useState } from "react";

export default function useWorkspaceCreateFormHook(props) {
    const [workspaceCreateForm, setWorkspaceCreateForm] = useState({
        name: '',
        publicYn: 'n'
    })

    const onActionSelectPublic = () => {
        setWorkspaceCreateForm({
            ...workspaceCreateForm,
            publicYn: 'y'
        })
    }

    const onActionSelectPrivate = () => {
        setWorkspaceCreateForm({
            ...workspaceCreateForm,
            publicYn: 'n'
        })
    }

    return {
        workspaceCreateForm,
        onActionSelectPublic,
        onActionSelectPrivate
    }

}