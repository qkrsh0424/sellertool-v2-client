import _ from "lodash";
import { useState } from "react";

export default function useRemoveTargetMember(props) {
    const [removeTargetMember, setRemoveTargetMember] = useState(null);

    const onSetRemoveTargetMember = (workspaceMember) => {
        setRemoveTargetMember(_.cloneDeep(workspaceMember));
    }

    return {
        removeTargetMember,
        onSetRemoveTargetMember
    }
}