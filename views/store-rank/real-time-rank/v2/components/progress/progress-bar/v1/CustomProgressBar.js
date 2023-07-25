import styled from "styled-components";
import { CircularProgress, LinearProgress } from "@mui/material";

const LinearBar = styled(LinearProgress)`

    &.css-eglki6-MuiLinearProgress-root {
        height: 6px;
        background-color: ${props => props.customColor + '88'}
    }
    
    .MuiLinearProgress-bar {
        background-color: ${props => props.customColor};
    }

`

const CircularBar = styled(CircularProgress)`
`

export function CustomProgressBar({
    type = 'circle',
    color,
    variant,
    value,
    className,
    thickness,
    customColor = '#efefef',
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
                    {...props}
                />
            }
            {type === 'linear' &&
                <LinearBar
                    className={className}
                    color={color}
                    variant={variant}
                    value={value}
                    customColor={customColor}
                    {...props}
                />
            }
        </>
    );
}