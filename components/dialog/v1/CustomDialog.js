import CloseButton from "./CloseButton";
import FooterButtonGroup from "./FooterButtonGroup";
import Title from "./Title";

import { Dialog } from '@mui/material';
import styled from 'styled-components';
import FooterButton from "./FooterButton";

const DialogContainer = styled(Dialog)`
    .MuiPaper-root::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .MuiPaper-root::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .MuiPaper-root::-webkit-scrollbar-thumb{
        background-color: #00000020;
        border-radius: 10px;
    }

    .MuiBackdrop-root{
        background-color:${props => props.backdropcolor ? props.backdropcolor : 'inherit'};
    }

    .MuiPaper-rounded{
        border-radius: 15px;
    }
`;

const Container = styled.div`
`;


/**
 * 
 * @param {boolean} open
 * @param {string} fullWidth
 * @param {string} maxWidth
 * @param {function} onClose
 * @param {string} backdropColor
 * @returns 
 */
function DialogMain({
    open,
    fullWidth,
    maxWidth,
    onClose,
    backdropColor,
    backgroundColor,
    children,
}) {

    return (
        <>
            <DialogContainer
                open={open ?? false}
                fullWidth={fullWidth ?? true}
                maxWidth={maxWidth || 'xs'}
                onClose={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
                backdropcolor={backdropColor || '#00000080'}
            >
                <Container style={{ background: backgroundColor ? backgroundColor : 'var(--defaultBackground)' }}>
                    {children}
                </Container>
            </DialogContainer>
        </>
    );
}

export const CustomDialog = Object.assign(DialogMain, {
    CloseButton: CloseButton,
    Title: Title,
    FooterButtonGroup: FooterButtonGroup,
    FooterButton: FooterButton
})