import { Container } from "./styles/Head.styled";

export default function HeadComponent(props){
    return (
        <>
            <Container>
                <div className='title'>
                    마진율 계산기 뷰어
                </div>
            </Container>
        </>
    );
}