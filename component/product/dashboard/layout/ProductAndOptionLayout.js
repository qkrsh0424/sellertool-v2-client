import styled from 'styled-components';

const Container = styled.div`
    max-width: 1280px;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

export default function ProductAndOptionLayout(props) {
    return (
        <Container>
            {props.children}
        </Container>
    );
}