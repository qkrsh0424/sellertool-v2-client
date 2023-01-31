import { Alert, Snackbar } from "@mui/material";
import PropTypes from 'prop-types';

/**
 * 
 * @param {Object} props 
 * @param {string} props.vertical - Vertical [top, bottom], Default = top
 * @param {string} props.horizontal - Horizontal [left, right, center], Default = center
 * @param {boolean} props.open
 * @param {string} props.message
 * @param {string} props.severity - Severity [success, info, warning, error], Default = error
 * @param {number} props.autoHideDuration - Is milliseconds, Default = 3000ms
 * @param {func} props.onClose
 * 
 * @version 1.0.0
 * @author Austin Park
 */
export default function SnackbarCenter(props) {
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: props.vertical || 'top',
                    horizontal: props.horizontal || 'center'
                }}
                open={props.open || false}
                onClose={typeof (props.onClose) === 'function' ? () => props.onClose() : () => { ; }}
                autoHideDuration={props.autoHideDuration || 3000}
                key={(props.vertical || 'top') + (props.horizontal || 'center')}
            >
                <Alert
                    onClose={typeof (props.onClose) === 'function' ? () => props.onClose() : () => { ; }}
                    severity={props.severity || 'error'}
                    sx={{ width: '100%' }}
                >
                    {props.message || 'no message'}
                </Alert>
            </Snackbar>
        </>
    );
}

SnackbarCenter.prototype = {
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    open: PropTypes.bool.isRequired,
    message: PropTypes.string,
    severity: PropTypes.string,
    autoHideDuration: PropTypes.number,

    onClose: PropTypes.func.isRequired
}