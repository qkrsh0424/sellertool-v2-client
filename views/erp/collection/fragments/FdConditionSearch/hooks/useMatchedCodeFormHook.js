import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useMatchedCodeFormHook(props) {
    const router = useRouter();
    const [matchedCode, setMatchedCode] = useState('releaseOptionCode');

    useEffect(() => {
        if (!router?.query?.matchedCode) {
            setMatchedCode('releaseOptionCode');
            return;
        }

        setMatchedCode(router?.query?.matchedCode);

    }, [router?.query?.matchedCode]);

    const onChangeMatchedCode = (e) => {
        let value = e.target.value;
        setMatchedCode(value);
    }

    return {
        matchedCode,
        onChangeMatchedCode
    }
}