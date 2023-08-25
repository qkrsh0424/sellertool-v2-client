import { St } from "./FdHead.styled";

export function FdHead(props) {
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