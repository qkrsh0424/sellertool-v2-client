import _ from "lodash";
import { useState } from "react";

export default function usePermissionTargetMemberHook(props) {
    const [permissionTargetMember, setPermissionTargetMember] = useState(null);

    const onSetPermissionTargetMember = (workspaceMember) => {
        setPermissionTargetMember(_.cloneDeep(workspaceMember))
    }

    return {
        permissionTargetMember,
        onSetPermissionTargetMember,
    }
}