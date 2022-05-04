import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
    text-align: ${props => props.align};
    margin-top: ${props => props.marginTop}px;
    margin-bottom: ${props => props.marginBottom}px;
`;

/**
 * 
 * @param {Object} props
 * @param {string} props.align
 * @param {Number} props.marginTop
 * @param {Number} props.marginBottom
 * @param {Number} props.size
 * @param {string} props.color
 * @returns 
 */
const FieldLoading = (props) => {
    return (
        <>
            <Container
                align={props.align || 'center'}
                marginTop={props.marginTop || 8}
                marginBottom={props.marginBottom || 8}
            >
                <CircularProgress size={props.size || 20} style={{ color: props.color || '' }} />
            </Container>
        </>
    );
}
export default FieldLoading;