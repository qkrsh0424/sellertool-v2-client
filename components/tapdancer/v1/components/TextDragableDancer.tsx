import React, { ReactElement, ReactNode, useRef } from "react";

interface TextDragableDancerProps {
    type: string;
    rangeX?: number;
    rangeY?: number;
    onTapDown?: (event: any) => void;
    onTapUp?: (event: any) => void;
    onTapInRange?: (e: React.MouseEvent) => void;
    onTapOutOfRange?: (e: React.MouseEvent) => void;
    children?: ReactNode;
}

export function TextDragableDancer({
    type = "div",
    rangeX = 5,
    rangeY = 5,
    onTapDown = (event) => {},
    onTapUp = (event) => {},
    onTapInRange = (event) => {},
    onTapOutOfRange = (event) => {},
    children,
    ...props
}: React.PropsWithChildren<TextDragableDancerProps>): ReactElement {
    const positionXRef = useRef<number | null>(null);
    const positionYRef = useRef<number | null>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        const pageX = e.pageX;
        const pageY = e.pageY;

        positionXRef.current = pageX;
        positionYRef.current = pageY;

        const event = {
            pageX: pageX,
            pageY: pageY,
        };

        onTapDown(event);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (positionXRef.current === null || positionYRef.current === null)
            return;

        const pageX = e.pageX;
        const pageY = e.pageY;

        let moveX = Math.abs(positionXRef.current - pageX);
        let moveY = Math.abs(positionYRef.current - pageY);

        const event = {
            pageX: pageX,
            pageY: pageY,
        };

        onTapUp(event);

        if (moveX < rangeX && moveY < rangeY) {
            onTapInRange(e);
        } else {
            onTapOutOfRange(e);
        }

        positionXRef.current = null;
        positionYRef.current = null;
    };

    return React.createElement(
        type,
        {
            ...props,
            onMouseDown: (e) => handleMouseDown(e),
            onMouseUp: (e) => handleMouseUp(e),
            onClick: () => {},
        },
        children,
    );
}
