import { Dialog } from '@mui/material';
import styled from 'styled-components';

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
export default function DialogMain({
    open,
    fullWidth,
    maxWidth,
    onClose,
    backdropColor,
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
                {children}
            </DialogContainer>
        </>
    );
}