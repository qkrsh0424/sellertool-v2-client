import { useState } from "react";

export function useProductOptionHook(props) {
    const [productOptionPage, setProductOptionPage] = useState(null);

    const onSetProductOptionPage = (value) => {
        setProductOptionPage(value);
    }

    return {
        productOptionPage,
        onSetProductOptionPage
    }
}