import { useState } from "react";

export default function useSearchInputHook() {
    const [keyword, setKeyword] = useState(null);
    const [mallName, setMallName] = useState(null);

    const onChangeKeyword = (e) => {
        let value = e.target.value;
        setKeyword(value)
    }

    const onChangeMallName = (e) => {
        let value = e.target.value;
        setMallName(value)
    }

    return {
        keyword,
        mallName,
        onChangeKeyword,
        onChangeMallName
    }
}