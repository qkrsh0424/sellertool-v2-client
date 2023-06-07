import styled from 'styled-components';
import Days30Button from './Days30Button';
import Days7Button from './Days7Button';
import Days90Button from './Days90Button';
import Days60Button from './Days60Button';

const Container = styled.div`
    /* display: flex;
    flex-wrap: wrap; */
`;

function DateSelectButtonGroupMain({ children, style, ...props }) {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
}

export const CustomDateSelectButtonGroup = Object.assign(DateSelectButtonGroupMain, {
    Days7Button: Days7Button,
    Days30Button: Days30Button,
    Days60Button: Days60Button,
    Days90Button: Days90Button,
})