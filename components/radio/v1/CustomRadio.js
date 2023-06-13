import styled from 'styled-components';
import Radio from './Radio';

const Container = styled.div`
    
`

/**
 * 
 * @param {object} param
 * @param {boolean} param.isFlex
 * @param {string} param.className
 * @param {object} param.style
 * @returns 
 */
function Main(
    {
        isFlex = false,
        className,
        style,
        children
    }
) {
    return (
        <Container
            className={className}
            style={isFlex ? {
                display: 'flex',
                alignItems: 'center',
                ...style
            } : {
                ...style
            }}
        >
            {children}
        </Container>
    );
}

export const CustomRadioGroup = Object.assign(Main, {
    Radio: Radio
})