import { useState } from "react";

export default function usePopoverHook(props) {
    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
    const [popoverMessage, setPopoverMessage] = useState('');

    const onActionOpenPopover = (e, message) => {
        setPopoverMessage(message)
        setPopoverAnchorEl(e.currentTarget);
    }

    const onActionClosePopover = () => {
        setPopoverAnchorEl(null);
        setPopoverMessage('');
    }

    return {
        popoverAnchorEl,
        popoverMessage,
        onActionOpenPopover,
        onActionClosePopover
    }
}