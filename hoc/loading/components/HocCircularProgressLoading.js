import { CircularProgress } from "@mui/material";

import styled, { css } from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;

    ${props => {
        let justifyContent = 'center';
        switch (props?.alignment) {
            case 'left':
                justifyContent = 'flex-start';
                break;
            case 'right':
                justifyContent = 'flex-end';
                break;
            default:
                justifyContent = 'center';
                break;
        }

        return css`
            justify-content: ${justifyContent};
        `;
    }}
`;

const Progress = styled(CircularProgress)`
    color: var(--defaultBlueColor);
`;

export function HocCircularProgressLoading({
    alignment = 'center',
    ...props
}) {
    return (
        <>
            <Container alignment={alignment}>
                <Progress />
            </Container>
        </>
    );
}