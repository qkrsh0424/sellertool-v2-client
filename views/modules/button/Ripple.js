import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";

const RippleContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
    span {
        transform: scale(0);
        border-radius: 100%;
        position: absolute;
        opacity: 0.75;
        background-color: ${props => props.color};
        animation-name: ripple;
        animation-duration: ${props => props.duration}ms;
    }

    @keyframes ripple {
        to {
            opacity: 0;
            transform: ${props => `scale(${props.scale})`};
        }
    }
`;

const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
    useEffect(() => {
        let bounce = null;
        if (rippleCount > 0) {
            clearTimeout(bounce);

            bounce = setTimeout(() => {
                cleanUpFunction();
                clearTimeout(bounce);
            }, duration * 1.5);
        }

        return () => clearTimeout(bounce);
    }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple = props => {
    const { duration, color, scale } = props;
    const [rippleArray, setRippleArray] = useState([]);

    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
        setRippleArray([]);
    });

    const addRipple = event => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size =
            rippleContainer.width > rippleContainer.height
                ? rippleContainer.width
                : rippleContainer.height;
        const x = event.clientX - rippleContainer.x - size / 2;
        const y = event.clientY - rippleContainer.y - size / 2;
        const newRipple = {
            x,
            y,
            size
        };

        setRippleArray([...rippleArray, newRipple]);
    };
    return (

        <RippleContainer duration={duration} color={color} scale={scale} onMouseDown={addRipple}>
            {rippleArray.length > 0 &&
                rippleArray.map((ripple, index) => {
                    return (
                        <span
                            key={"span" + index}
                            style={{
                                top: ripple.y,
                                left: ripple.x,
                                width: ripple.size,
                                height: ripple.size
                            }}
                        />
                    );
                })}
        </RippleContainer>
    );
};

Ripple.propTypes = {
    duration: PropTypes.number,
    color: PropTypes.string,
    scale: PropTypes.number
};

Ripple.defaultProps = {
    duration: 850,
    color: "#fff",
    scale: 2
};

export default Ripple;
