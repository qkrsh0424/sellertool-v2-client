import { useEffect, useState } from "react";
import PagenationComponentV2 from "../../../../modules/pagenation/PagenationComponentV2";
import { PagenationContainer } from "./FloatingPagenation.styled";

export default function FloatingPagenationComponent({
    erpItemPage,
    totalSize,
    totalPages
}) {
    const [pageIndex, setPageIndex] = useState(1);
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(true);

    useEffect(() => {
        if (!erpItemPage) {
            return;
        }
        setPageIndex(erpItemPage?.number);
        setIsFirst(erpItemPage?.first);
        setIsLast(erpItemPage?.last);
    }, [erpItemPage]);

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
                    sizeElements={[50, 100, 500]}
                    autoScrollTop={false}
                    popperDisablePortal={true}
                    viewTotal={true}
                />
            </PagenationContainer>
        </>
    );
}