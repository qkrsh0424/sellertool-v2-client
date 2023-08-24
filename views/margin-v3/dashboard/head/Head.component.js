import { Container, St } from "./styles/Head.styled";

export default function HeadComponent(props) {
    return (
        <>
            <St.Container>
                <St.Title>
                    <div className='title'>마진율 계산기</div>
                    <div className='tagBadge'>일반</div>
                </St.Title>
            </St.Container>
        </>
    );
}