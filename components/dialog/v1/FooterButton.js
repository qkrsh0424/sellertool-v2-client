import CustomBlockButton from "../../buttons/block-button/v1/CustomBlockButton";
import styled from 'styled-components';

const Button = styled(CustomBlockButton)`
    margin: 0;
    padding: 0;
    height: 48px;
    border: none;
    color: #444;
    font-size: 18px;
    font-weight: 500;
`;

export default function FooterButton({
    type = 'button',
    flex,
    width,
    backgroundColor,
    fontColor,
    onClick,
    children,
    style,
    ...props
}) {
    return (
        <>
            <Button
                type={type}
                onClick={typeof (onClick) === 'function' ? () => onClick() : () => { ; }}
                style={{
                    flex: flex,
                    width: width,
                    backgroundColor: backgroundColor,
                    color: fontColor,
                    ...style
                }}
                {...props}
            >
                {children}
            </Button>
        </>
    );
}