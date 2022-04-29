import PropTypes from 'prop-types';
import { Dialog } from "@mui/material";

const CommonModalComponent = (props) => {
    return (
        <>
            <Dialog
                fullWidth={props.fullWidth || true}
                maxWidth={props.maxWidth || 'xs'}
                open={props.open}
                onClose={typeof (props.onClose) === 'function' ? () => props.onClose() : () => { ; }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {props.children}
            </Dialog>
        </>
    );
}

CommonModalComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default CommonModalComponent;