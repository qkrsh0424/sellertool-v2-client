import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object} props 
 * @param {boolean} props.open
 * @param {function} props.onClose
 * 
 * @version 1.0.0
 * @author Austin Park
 */
export default function BackdropLoadingComponent(props) {
    return (
        <div>
            <Backdrop
                // sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                sx={{
                    color: '#000',
                    zIndex: (theme) => theme.zIndex.drawer + 9999
                }}
                open={props.open || false}
                onClick={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

BackdropLoadingComponent.prototype ={
    open: PropTypes.bool.isRequired
}