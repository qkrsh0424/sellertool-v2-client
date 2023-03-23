import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";

export default function CustomScrollTrigger({
    onEnter = () => { },
    onLeave = () => { },
    threshold = 0,
    tag: Wrapper = 'div',
    children,
    ...props
}) {
    const element = useRef();

    const handleScroll = useCallback(
        ([entry]) => {
            if (entry.isIntersecting) {
                onEnter(entry);
            } else {
                onLeave(entry);
            }
        },
        [onEnter, onLeave],
    );

    useEffect(() => {
        let observer;
        const { current } = element;

        if (current) {
            observer = new IntersectionObserver(handleScroll, { threshold: threshold });
            observer.observe(current);
        }

        return () => observer && observer.disconnect();
    }, [handleScroll, threshold]);

    return (
        <Wrapper ref={element} {...props}>
            {children}
        </Wrapper>
    );
}