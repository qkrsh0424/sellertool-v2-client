import { useState } from "react"

export function useSearchOptionCodesModalControl() {
    const [open, setOpen] = useState(false);

    const toggleOpen = (o) => {
        setOpen(o);
    }

    return {
        open,
        toggleOpen
    }
}