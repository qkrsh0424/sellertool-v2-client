import { CircularProgress } from "@mui/material";
import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";
import { setBackdropRef } from "../core";
import styled from 'styled-components';

const Container = styled.div`
    position:fixed;
    display: flex;
    background: #00000080;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 19999;
    align-items: center;
    justify-content: center;
`;

export function CustomDefaultBackdrop() {
    const backdropRef = useRef(null);

    useEffect(() => {
        setBackdropRef(backdropRef);
        return () => {
            setBackdropRef(null);
        }
    }, [])

    return (
        <Container
            ref={backdropRef}
            style={{ opacity: 0, visibility: 'hidden', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}
        >

            <CircularProgress color="inherit" />
        </Container>
    );
}

CustomDefaultBackdrop.prototype = {
    // open: PropTypes.bool.isRequired,
    // onClose: PropTypes.func
}