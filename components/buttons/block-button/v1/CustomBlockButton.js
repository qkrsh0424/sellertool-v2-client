import styled from 'styled-components';
import Ripple from '../../../ripple/v1/Ripple';

const Button = styled.button`
    user-select: none;
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 1;
    width: 100%;
    background: white;
    border:1px solid #e0e0e0;
    height: 48px;
    font-size: 14px;
    font-weight: 500;
    box-sizing: border-box;
    color:#323232;
    cursor: pointer;
    -webkit-tap-highlight-color: #00000000;
    outline: none;
    margin:0;
    padding:0;

    &:hover{
        color:${props => props.hoverColor && props.hoverColor};
        background:${props => props.hoverBackground && props.hoverBackground};
    }

    &:disabled{
        cursor: not-allowed;
        opacity: 0.7;
    }
`;

export default function CustomBlockButton({
    children,
    hoverColor,
    hoverBackground,
    rippleColor,
    rippleDuration,
    ...props
}) {
    return (
        <Button
            hoverColor={hoverColor}
            hoverBackground={hoverBackground}
            {...props}
        >
            {children}
            <Ripple color={rippleColor || '#e0e0e0'} duration={rippleDuration || 1000} />
        </Button>
    );
}