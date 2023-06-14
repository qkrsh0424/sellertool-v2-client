import React, { useState } from "react";

function CustomDragAndTouch({
    type,
    onClick = () => {},
    children,
    ...props
}) {
    const [startPositionX, setStartPositionX] = useState(null);

    const handleClickStart = (e) => {
        setStartPositionX(e.pageX);
    }

    const activeClickEvent = (e) => {
        let moveX = Math.abs(startPositionX - e.pageX);
        
        if(moveX < 5) {
            onClick(e);
        }
    }

    return React.createElement(
        type,
        {
            ...props,
            onMouseDown: (e) => handleClickStart(e),
            onMouseUp: (e) => activeClickEvent(e),
        },
        children
    );
}

export default CustomDragAndTouch;