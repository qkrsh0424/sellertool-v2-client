import { useState } from "react"

export default function useItemCountHook() {
    const [totalSize, setTotalSize] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const onSetTotalSize = (data) => {
        setTotalSize(data)
    }

    const onSetTotalPages = (data) => {
        setTotalPages(data)
    }

    return {
        totalSize,
        totalPages,
        onSetTotalSize,
        onSetTotalPages
    }
}