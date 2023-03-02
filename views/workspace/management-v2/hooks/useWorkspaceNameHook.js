import _ from "lodash";
import { useState } from "react";
import formatValidUtils from "../../../../utils/formatValidUtils";

export default function useWorkspaceNameHook(props) {
    const [workspaceName, setWorkspaceName] = useState(null);

    const onSetWorkspaceName = (name) => {
        setWorkspaceName(name);
    }

    const onCheckWorkspaceNameFormatValid = () => {
        if (!formatValidUtils.isWorkspaceNameFormatValid(workspaceName)) {
            throw new Error('워크스페이스 이름은 2-30자로 지정해 주세요.\n첫 글자와 마지막 글자의 공백은 허용하지 않습니다.');
        }
    }

    return {
        workspaceName,
        onSetWorkspaceName,
        onCheckWorkspaceNameFormatValid
    }
}