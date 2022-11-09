import { useEffect, useState } from "react";

export default function useDisabledBtn(props) {
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000)

        return () => clearTimeout(timeout);

    }, [disabledBtn])

    return [disabledBtn, setDisabledBtn];
}