import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useIsWorkspaceMasterHook({
    workspace
}) {
    const [isWorkspaceMaster, setIsWorkspaceMaster] = useState(false);

    const userRedux = useSelector(state => state.userRedux);

    useEffect(() => {
        if (workspace?.masterId === userRedux?.userInfo?.id) {
            setIsWorkspaceMaster(true);
            return;
        }

        setIsWorkspaceMaster(false);
    }, [workspace?.masterId, userRedux?.userInfo?.id]);

    return {
        isWorkspaceMaster
    }
}