import styled from 'styled-components';
import BodyComponent from './BodyComponent';

const Container = styled.div`
    margin-bottom: 150px;
`;

const MainComponent = (props) => {
    return (
        <>
            <Container>
                <BodyComponent></BodyComponent>
            </Container>
        </>
    );
}
export default MainComponent;