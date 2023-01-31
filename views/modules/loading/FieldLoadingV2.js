import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: #a0a0a010;
    backdrop-filter: blur(1px);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function FieldLoadingV2({
    progressSize = 30,
    boxStyle,
    progressStyle = {
        color: 'var(--mainColor)'
    },
    ...props
}) {
    return (
        <>
            <Container
                style={{
                    ...boxStyle
                }}
                {...props}
            >
                <CircularProgress
                    size={progressSize}
                    style={{
                        ...progressStyle
                    }}
                />
            </Container>
        </>
    );
}