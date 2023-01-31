
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`

`;

const ContainerTr = styled.tr`
    :hover {
        background: none !important;
    }

    td {
        :hover {
            background: none !important;
        }
    }
`;

const ReverseScrollObserver = ({ elementTagType, totalSize, threshold, startOffset, endOffset, dataViewSize, fetchData, loadingElementTag, endElementTag }) => {
    const [target, setTarget] = useState(null);

    const onIntersect = useCallback(async (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fetchData();
            }
        });

    }, [fetchData]);

    useEffect(() => {
        let observer;

        if (endOffset - startOffset > dataViewSize) {
            return () => observer && observer.disconnect();
        }

        if (target) {
            observer = new IntersectionObserver(onIntersect, {
                threshold: threshold || 0,
            });
            observer.observe(target);

        }
        return () => observer && observer.disconnect();
    }, [onIntersect, target]);

    if (elementTagType === 'tr') {
        return (
            <ContainerTr ref={setTarget}>
                {startOffset === 0 &&
                    (
                        <>
                            {endElementTag || 'end of data'}
                        </>
                    )
                }
                {startOffset !== 0 &&
                    (
                        <>
                            {loadingElementTag || 'loading...'}
                        </>
                    )
                }
            </ContainerTr>
        );
    } else {
        return (
            <ContainerDiv ref={setTarget}>
                {startOffset === 0 &&
                    (
                        <>
                            {endElementTag || 'end of data'}
                        </>
                    )
                }
                {startOffset !== 0 &&
                    (
                        <>
                            {loadingElementTag || 'loading...'}
                        </>
                    )
                }
            </ContainerDiv>
        );
    }
}
export default ReverseScrollObserver;