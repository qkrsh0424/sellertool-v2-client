import styled from 'styled-components';

const Container = styled.div`
    .title{
        font-size: 24px;
        color:#24292f;
    }
`;

const HeadComponent = (props) => {
    return (
        <>
            <Container>
                <div className='title'>
                    워크스페이스
                </div>
            </Container>
        </>
    );
}
export default HeadComponent;