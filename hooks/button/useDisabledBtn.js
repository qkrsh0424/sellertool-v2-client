import { useEffect, useState } from "react";

export default function useDisabledBtn(duration) {
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, duration ?? 2000)

        return () => clearTimeout(timeout);

    }, [disabledBtn])

    return [disabledBtn, setDisabledBtn];
}