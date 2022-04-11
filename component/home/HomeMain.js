import styled from "styled-components";
import HomeBody from "./HomeBody";

const Container = styled.div`
    margin-bottom: 150px;
`;

const HomeMain = () => {
    
    return (
        <>
            <Container>
                <HomeBody></HomeBody>
            </Container>
        </>
    );
}

export default HomeMain;