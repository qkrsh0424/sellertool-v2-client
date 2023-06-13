import React, { useRef, useState } from "react";

// export default function CustomDoubleTouch({
//     type,
//     onDoubleTouch = () => { },
//     children,
//     ...props
// }) {
//     let firstPress = true;
//     let lastTime = new Date().getTime();
//     let timer = null;
//     let delay = 300;

//     const doubleTouch = (e) => {
//         let now = new Date().getTime();
//         if (firstPress) {
//             firstPress = false;
//             timer = setTimeout(() => {
//                 firstPress = true;
//             }, delay);
//             lastTime = now;
//         } else {
//             let delta = new Date().getTime() - lastTime < delay;
//             if (delta) {
//                 clearTimeout(timer);
//                 firstPress = true;
//                 onDoubleTouch(e);
//             }
//         }
//     };

//     return React.createElement(
//         type,
//         {
//             onTouchStart: (e) => doubleTouch(e),
//             ...props
//         },
//         children
//     )
// }

function CustomDoubleTouch({ type, onDoubleTouch = () => { }, children, ...props }) {
    const [firstPress, setFirstPress] = useState(true);
    const lastTimeRef = useRef(new Date().getTime());
    const timerRef = useRef(null);
    const delay = 500;

    const doubleTouch = (e) => {
        const now = new Date().getTime();
        if (firstPress) {
            setFirstPress(false);
            timerRef.current = setTimeout(() => {
                setFirstPress(true);
            }, delay);
            lastTimeRef.current = now;
        } else {
            const delta = now - lastTimeRef.current < delay;
            if (delta) {
                clearTimeout(timerRef.current);
                setFirstPress(true);
                onDoubleTouch(e);
            }
        }
    };

    return React.createElement(
        type,
        {
            onTouchStart: (e) => doubleTouch(e),
            ...props,
        },
        children
    );
}

export default CustomDoubleTouch;
