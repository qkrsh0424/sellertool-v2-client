import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useStockReflectYnFormHook(props) {
    const router = useRouter();
    const [stockReflectYn, setStockReflectYn] = useState('');

    useEffect(() => {
        if (!router?.query?.stockReflectYn) {
            setStockReflectYn('');
            return;
        }

        setStockReflectYn(router?.query?.stockReflectYn);
    }, [router?.query?.stockReflectYn]);

    const onChangeStockReflectYn = (e) => {
        let value = e.target.value;
        setStockReflectYn(value);
    }

    return {
        stockReflectYn,
        onChangeStockReflectYn
    }
}