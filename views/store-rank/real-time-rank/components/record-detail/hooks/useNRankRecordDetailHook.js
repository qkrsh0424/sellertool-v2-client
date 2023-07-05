import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useNRankRecordDetailHook() {
    const router = useRouter()
    const [recordDetail, setRecordDetail] = useState(null);

    useEffect(() => {
    }, [])

    return {
        recordDetail
    }
}