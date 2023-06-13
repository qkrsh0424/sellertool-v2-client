import React from "react";

export default function CustomDoubleTouch({
    type,
    onDoubleTouch = () => { },
    children,
    ...props
}) {
    let firstPress = true;
    let lastTime = new Date().getTime();
    let timer = false;
    let delay = 300;

    const doubleTouch = (e) => {
        let now = new Date().getTime();
        if (firstPress) {
            firstPress = false;
            timer = setTimeout(() => {
                firstPress = true;
                timer = false;
            }, delay);
            lastTime = now;
        } else {
            let delta = new Date().getTime() - lastTime < delay;
            if (delta) {
                clearTimeout(timer);
                firstPress = true;
                onDoubleTouch(e);
            }
        }
    };

    return React.createElement(
        type,
        {
            onTouchStart: (e) => doubleTouch(e),
            ...props
        },
        children
    )
}