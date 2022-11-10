import { Container } from "./styles/Head.styled";

export default function HeadComponent(props){
    return (
        <>
            <Container>
                <div className='title'>
                    상품 관리
                </div>
            </Container>
        </>
    );
}