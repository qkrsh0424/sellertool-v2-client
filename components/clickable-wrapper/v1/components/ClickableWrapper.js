import { useEffect, useRef } from "react";
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    height: 100%;
`;
export function ClickableWrapper({
    children,
    isActive = true,
    onClickInside = () => { },
    onClickOutside = () => { }
}) {
    const targetRef = useRef();

    useEffect(() => {
        if (isActive) {
            document.addEventListener('mousedown', handleMouseDownEvent);
        }

        return () => {
            document.removeEventListener('mousedown', handleMouseDownEvent);
        };
    }, [targetRef, isActive]);

    const handleMouseDownEvent = (e) => {
        if (targetRef.current && targetRef.current.contains(e.target)) {
            onClickInside();
        }

        if (targetRef.current && !targetRef.current.contains(e.target)) {
            onClickOutside();
        }
    }

    return (
        <Container ref={targetRef}>
            {children}
        </Container>
    );
}