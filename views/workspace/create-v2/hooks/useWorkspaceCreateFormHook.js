import { useState } from "react";

export default function useWorkspaceCreateFormHook(props) {
    const [workspaceCreateForm, setWorkspaceCreateForm] = useState({
        name: '',
        subscriptionPlan: 'NONE'
    })

    const onActionSelectPublic = () => {
        setWorkspaceCreateForm({
            ...workspaceCreateForm,
            subscriptionPlan: 'PUBLIC'
        })
    }

    const onActionSelectPrivate = () => {
        setWorkspaceCreateForm({
            ...workspaceCreateForm,
            subscriptionPlan: 'NONE'
        })
    }

    return {
        workspaceCreateForm,
        onActionSelectPublic,
        onActionSelectPrivate
    }

}