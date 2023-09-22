import { useEffect, useState } from "react";
import { PagenationContainer } from "./FloatingPagenation.styled";
import PagenationComponentV2 from "../../../../../modules/pagenation/PagenationComponentV2";

export default function FloatingPagenationComponent({
    itemPage,
    totalSize,
    totalPages
}) {
    const [pageIndex, setPageIndex] = useState(1);
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(true);

    useEffect(() => {
        if (!itemPage) {
            return;
        }

        if (!totalPages) {
            return;
        }
                
        setPageIndex(itemPage.number);
        
        let isFirstPage = (itemPage.number === 0);
        let isLastPage = (itemPage.number === totalPages-1);
        setIsFirst(isFirstPage);
        setIsLast(isLastPage);
    }, [itemPage, totalPages]);

    return (
        <>
            <PagenationContainer>
                <PagenationComponentV2
                    align={'center'}
                    pageIndex={pageIndex}
                    totalPages={totalPages}
                    isFirst={isFirst}
                    isLast={isLast}
                    totalElements={totalSize}
                    sizeElements={[20, 50, 100]}
                    autoScrollTop={false}
                    popperDisablePortal={true}
                    viewTotal={true}
                />
            </PagenationContainer>
        </>
    );
}