import React, { ReactElement, useRef } from "react";
import { ReactNode } from "react";

interface DoubleTapDancerProps {
    type: string;
    delay?: number;
    onSingleTap?: (e: React.MouseEvent) => void;
    onDoubleTap?: (e: React.MouseEvent) => void;
    children?: ReactNode;
}

export function DoubleTapDancer({
    type = "div",
    delay = 200,
    onSingleTap = (e: React.MouseEvent) => {},
    onDoubleTap = (e: React.MouseEvent) => {},
    children,
    ...props
}: React.PropsWithChildren<DoubleTapDancerProps>): ReactElement {
    const firstPress = useRef(true);
    const lastTime = useRef(new Date().getTime());
    const timer = useRef<number | null>(null);

    const handleDoubleTap = (e: React.MouseEvent) => {
        let now = new Date().getTime();
        if (firstPress.current) {
            firstPress.current = false;
            timer.current = window.setTimeout(() => {
                firstPress.current = true;
                onSingleTap(e);
            }, delay);
            lastTime.current = now;
        } else {
            let delta = new Date().getTime() - lastTime.current < delay;
            if (delta) {
                if (timer.current === null) return;

                window.clearTimeout(timer.current);
                timer.current = null;
                firstPress.current = true;
                onDoubleTap(e);
            }
        }
    };

    return React.createElement(
        type,
        {
            ...props,
            onClick: (e) => handleDoubleTap(e),
        },
        children,
    );
}
