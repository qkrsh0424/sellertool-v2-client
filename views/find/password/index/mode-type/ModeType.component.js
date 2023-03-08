import Link from "next/link";
import { Container, ItemBox, Others, Wrapper } from "./styles/ModeType.styled";

export default function ModeTypeComponent({
    toggleChangeModeType
}) {
    return (
        <>
            <Container>
                <Wrapper>
                    <h2 className='title'>비밀번호 찾기</h2>
                    <ItemBox
                        type='button'
                        onClick={() => toggleChangeModeType('phone')}
                    >
                        등록된 <span style={{ color: 'var(--mainColor)', fontWeight: '600' }}>휴대전화</span>로 찾기
                    </ItemBox>
                    <ItemBox
                        type='button'
                        onClick={() => toggleChangeModeType('email')}
                    >
                        등록된 <span style={{ color: 'var(--mainColor)', fontWeight: '600' }}>이메일</span>로 찾기
                    </ItemBox>
                    <Others>
                        <Link
                            href='/login'
                        >
                            <a>
                                로그인
                            </a>
                        </Link>
                        <span> | </span>
                        <Link
                            href='/find/username'
                        >
                            <a>
                                아이디 찾기
                            </a>
                        </Link>
                    </Others>
                </Wrapper>
            </Container>
        </>
    );
}