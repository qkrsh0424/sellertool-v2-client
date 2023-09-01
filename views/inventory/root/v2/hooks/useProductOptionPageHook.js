import { useState } from "react";

export function useProductOptionPageHook() {
    const [productOptionPage, setProductOptionPage] = useState(null);

    const onSetProductOptionPage = (pageItem) => {
        setProductOptionPage(pageItem);
    }

    return {
        productOptionPage,
        onSetProductOptionPage
    }
}