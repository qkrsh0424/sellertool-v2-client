import styled from "styled-components";
import { BarLoader, BeatLoader, PulseLoader } from "react-spinners";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #a0a0a010;
    backdrop-filter: blur(1px);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const BeatBox = styled(BeatLoader)`
    color: ${props => props.color};
`

const BarBox = styled(BarLoader)`
    color: ${props => props.color};
`

const PluseBox = styled(PulseLoader)`
    color: ${props => props.color};
`

export function CustomProgressIcon({
    type = 'bar',
    className,
    color = '#000000',
    size = 15,
    margin = 2,
    loading = true,
    speedMultiplier = 1,
    ...props
}) {
    return (
        <>
            <Container>
                {type === 'bar' &&
                    <BarBox
                        className={className}
                        color={color}
                        size={size}
                        margin={margin}
                        loading={loading}
                        speedMultiplier={speedMultiplier}
                        {...props}
                    />
                }
                {type === 'beat' &&
                    <BeatBox
                        className={className}
                        color={color}
                        size={size}
                        margin={margin}
                        loading={loading}
                        speedMultiplier={speedMultiplier}
                        {...props}
                    />
                }
                {type === 'pluse' &&
                    <PluseBox
                        className={className}
                        color={color}
                        size={size}
                        margin={margin}
                        loading={loading}
                        speedMultiplier={speedMultiplier}
                        {...props}
                    />
                }
            </Container>
        </>
    );
}