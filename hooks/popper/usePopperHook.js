import { useCallback, useState } from "react";

export default function usePopperHook(props) {
    const [popperAnchorEl, setPopperAnchorEl] = useState(null);

    const onActionOpenPopper = useCallback((e) => {
        setPopperAnchorEl(popperAnchorEl ? null : e.currentTarget);
    }, [popperAnchorEl]);

    const onActionClosePopper = useCallback((e) => {
        setPopperAnchorEl(null);
    }, []);

    const popperOpen = Boolean(popperAnchorEl);

    return {
        popperAnchorEl,
        popperOpen,
        onActionOpenPopper,
        onActionClosePopper
    }
}