import { useState } from "react";
import styled from 'styled-components';

const Resizer = styled.div`
    display: none;
    border-right: 3px double #d0d0d0;
    /* height: 60%; */
    height: 20px;

    position: absolute;
    right: 3px;
    top: 50%;
    box-sizing: border-box;
    transform: translate(50%, -50%);
    z-index: 1;
    touch-action:none;

    &:hover{
        cursor:col-resize;
    }
`;

const Th = styled.th`
    user-select: none;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    height: 43px;
    position:relative;

    &:hover{
        ${Resizer} {
            display: inline-block;
        }
    }
`;

/**
 * 
 * @param {object} params
 * @param {number} params.width
 * @param {number} params.minWidth
 * @param {number} params.maxWidth
 * @param {string} params.className
 * @param {object} params.style
 * @returns 
 */
export default function ResizableTh({
    width,
    minWidth,
    maxWidth,
    className,
    style,
    children,
    ...props
}) {
    const [colWidth, setColWidth] = useState(width || 100);
    const colMinWidth = minWidth || 40;
    const colMaxWidth = maxWidth || 1000;

    return (
        <Th
            className={className}
            style={{
                width: colWidth,
                ...style
            }}
            {...props}
        >
            <Resizer
                onTouchStart={e => {
                    const startSize = colWidth;
                    const pageX = e.changedTouches[0].pageX;
                    
                    function onTouchMove(touchMoveEvent) {
                        
                        let currentWidth = startSize - pageX + touchMoveEvent.changedTouches[0].pageX;

                        setColWidth(currentWidth < colMinWidth ? colMinWidth : currentWidth > colMaxWidth ? colMaxWidth : currentWidth);
                    }

                    function onTouchEnd() {
                        document.body.removeEventListener("touchmove", onTouchMove)
                    }

                    document.body.addEventListener("touchmove", onTouchMove);
                    document.body.addEventListener("touchend", onTouchEnd, { once: true });
                }}
                onMouseDown={e => {
                    const startSize = colWidth;
                    const pageX = e.pageX;

                    function onMouseMove(mouseMoveEvent) {
                        let currentWidth = startSize - pageX + mouseMoveEvent.pageX;

                        setColWidth(currentWidth < colMinWidth ? colMinWidth : currentWidth > colMaxWidth ? colMaxWidth : currentWidth);
                    }

                    function onMouseUp() {
                        document.body.removeEventListener("mousemove", onMouseMove)
                    }

                    document.body.addEventListener("mousemove", onMouseMove);
                    document.body.addEventListener("mouseup", onMouseUp, { once: true });

                }}
            ></Resizer>
            {children}
        </Th>
    );
}