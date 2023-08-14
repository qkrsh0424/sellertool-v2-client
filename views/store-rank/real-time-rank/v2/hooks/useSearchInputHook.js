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

    const onClearKeyword = () => {
        setKeyword(null);
    }

    const onClearMallName = () => {
        setMallName(null);
    }

    const checkSearchInfoForm = () => {
        if(!keyword || keyword.trim() === '') {
            throw new Error("검색 키워드를 정확하게 입력해주세요.")
        }

        if(!mallName || mallName.trim() === '') {
            throw new Error("검색 스토어명을 정확하게 입력해주세요.")
        }

        if(keyword.length > 50) {
            throw new Error("키워드는 50자 이내로 입력해주세요.")
        }

        if(mallName.length > 50) {
            throw new Error("스토어명은 50자 이내로 입력해주세요.")
        }
    }

    return {
        keyword,
        mallName,
        onChangeKeyword,
        onChangeMallName,
        onClearKeyword,
        onClearMallName,
        checkSearchInfoForm
    }
}