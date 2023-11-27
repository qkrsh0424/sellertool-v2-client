import CloseButton from "./CloseButton";
import FooterButtonGroup from "./FooterButtonGroup";
import Title from "./Title";

import { Dialog } from '@mui/material';
import styled from 'styled-components';
import FooterButton from "./FooterButton";
import React from "react";

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
        border-radius: ${props => `${props.border_radius}px`};
    }
`;

const Container = styled.div`
`;


/**
 * 
 * @param {object} props
 * @param {boolean} props.open
 * @param {string} props.fullWidth
 * @param {string} props.maxWidth
 * @param {function} props.onClose
 * @param {string} props.backdropColor
 * @returns 
 */
function DialogMain({
    open,
    fullScreen = false,
    fullWidth,
    maxWidth,
    onClose,
    backdropColor,
    backgroundColor,
    borderRadius = 15,
    children,
}) {

    return (
        <>
            <DialogContainer
                open={open ?? false}
                fullScreen={fullScreen}
                fullWidth={fullWidth ?? true}
                maxWidth={maxWidth || 'xs'}
                onClose={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
                backdropcolor={backdropColor || '#00000080'}
                border_radius={borderRadius}
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