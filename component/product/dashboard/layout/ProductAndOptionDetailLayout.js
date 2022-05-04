import styled from 'styled-components';

const Container = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

export default function ProductAndOptionDetailLayout(props) {

    return (
        <Container>
            {props.children}
        </Container>
    );
}