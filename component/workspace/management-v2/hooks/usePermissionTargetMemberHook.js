import _ from "lodash";
import { useState } from "react";

export default function usePermissionTargetMemberHook(props) {
    const [permissionTargetMember, setPermissionTargetMember] = useState(null);

    const onSetPermissionTargetMember = (workspaceMember) => {
        setPermissionTargetMember(_.cloneDeep(workspaceMember))
    }

    const onActionChangePermissionOfName = (e) => {
        let targetName = e.currentTarget.name;
        let currentPermissionValue = permissionTargetMember[targetName];

        if (currentPermissionValue === 'y') {
            setPermissionTargetMember({
                ...permissionTargetMember,
                [targetName]: 'n'
            })
        } else {
            setPermissionTargetMember({
                ...permissionTargetMember,
                [targetName]: 'y'
            })
        }

    }

    const onCheckPermissionsFormatValid = () => {
        let readPermissionYn = permissionTargetMember.readPermissionYn;
        let writePermissionYn = permissionTargetMember.writePermissionYn;
        let updatePermissionYn = permissionTargetMember.updatePermissionYn;
        let deletePermissionYn = permissionTargetMember.deletePermissionYn;

        if (!(readPermissionYn === 'y' || readPermissionYn === 'n')) {
            throw new Error('잘못된 접근방법 입니다.');
        }

        if (!(writePermissionYn === 'y' || writePermissionYn === 'n')) {
            throw new Error('잘못된 접근방법 입니다.');
        }

        if (!(updatePermissionYn === 'y' || updatePermissionYn === 'n')) {
            throw new Error('잘못된 접근방법 입니다.');
        }

        if (!(deletePermissionYn === 'y' || deletePermissionYn === 'n')) {
            throw new Error('잘못된 접근방법 입니다.');
        }
    }

    return {
        permissionTargetMember,
        onSetPermissionTargetMember,
        onActionChangePermissionOfName,
        onCheckPermissionsFormatValid
    }
}