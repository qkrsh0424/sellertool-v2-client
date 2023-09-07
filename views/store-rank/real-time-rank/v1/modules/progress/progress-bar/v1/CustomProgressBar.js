import styled from "styled-components";
import { CircularProgress, LinearProgress } from "@mui/material";

const LinearBar = styled(LinearProgress)`

    &.css-eglki6-MuiLinearProgress-root {
        height: 6px;
        background-color: ${props => props.customcolor + '88'}
    }
    
    .MuiLinearProgress-bar {
        background-color: ${props => props.customcolor};
    }

`

const CircularBar = styled(CircularProgress)`
    &.css-18lrjg1-MuiCircularProgress-root {
        color: ${props => props.customcolor};
    }
`

export function CustomProgressBar({
    type = 'circle',
    color,
    variant,
    value,
    className,
    thickness,
    size = '40px',
    customcolor = '#efefef',
    ...props
}) {
    return (
        <>
            {type === 'circle' &&
                <CircularBar
                    className={className}
                    variant={variant}
                    value={value}
                    thickness={thickness}
                    size={size}
                    customcolor={customcolor}
                    {...props}
                />
            }
            {type === 'linear' &&
                <LinearBar
                    className={className}
                    color={color}
                    variant={variant}
                    value={value}
                    customcolor={customcolor}
                    {...props}
                />
            }
        </>
    );
}