import { useState } from "react";

export function useTargetWorkspaceHook(props) {
    const [targetWorkspace, setTargetWorkspace] = useState(null);

    const onSetTargetWorkspace = (value) => {
        setTargetWorkspace(value);
    }

    return {
        targetWorkspace,
        onSetTargetWorkspace
    }
}