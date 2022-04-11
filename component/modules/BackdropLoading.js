import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object} props 
 * @param {boolean} props.open
 * 
 * @version 1.0.0
 * @author Austin Park
 */
export default function BackdropLoading(props) {
    return (
        <div>
            <Backdrop
                // sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                sx={{ color: '#fff', zIndex: '999999' }}
                open={props.open || false}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

BackdropLoading.prototype ={
    open: PropTypes.bool.isRequired
}