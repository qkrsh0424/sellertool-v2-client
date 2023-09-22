import { useState } from "react"

export default function useNRankRecordCategoriesHook() {
    const [categories, setCategories] = useState(null);

    const onSetCategories = (data) => {
        setCategories([...data])
    }

    return {
        categories,
        onSetCategories
    }
}