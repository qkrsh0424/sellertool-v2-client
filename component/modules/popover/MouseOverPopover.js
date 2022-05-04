import * as React from 'react';
import Popover from '@mui/material/Popover';
import styled from 'styled-components';

const MessageField = styled.div`
    /* background: #00000030; */
    font-size: 12px;
    color: #555;
    padding: 8px;
`;
export default function MouseOverPopover(props) {
    return (
        <div>
            <Popover
                // id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={props.open}
                anchorEl={props.anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={()=>props.onClose()}
                disableRestoreFocus
            >
                <MessageField>{props.message}</MessageField>
            </Popover>
        </div>
    );
}