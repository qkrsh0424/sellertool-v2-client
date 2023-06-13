import Link from "next/link";
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";
import { dateToYYYYMMDD, dateToYYYYMMDDhhmmss } from "../../../../utils/dateFormatUtils";
import { ButtonElement, ButtonGroup, Container, Wrapper } from "./styles/ResultField.styled";

export default function ResultFieldComponent({
    info,
    toggleModeType
}) {
    return (
        <Container>
            <Wrapper>
                <h2 className='title'>아이디 찾기</h2>
                <div>총 {info?.length} 개의 아이디를 찾았습니다.</div>
                {info?.map((r, index) => {
                    return (
                        <div key={r.username} className='info-wrapper'>
                            <div className='counting'>{index + 1}.</div>
                            <div className='info-box'>
                                <div className='username'>
                                    <div> <span style={{ fontWeight: '700' }}>{r?.username}</span></div>
                                </div>
                                <div className='created'>
                                    가입일자 : {dateToYYYYMMDD(r?.createdAt)}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <ButtonGroup>
                    <Link href='/login' passHref>
                        <a>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                style={{
                                    borderColor: 'var(--mainColor)',
                                    color: 'var(--mainColor)'
                                }}
                            >
                                로그인 페이지
                            </CustomBlockButton>
                        </a>
                    </Link>
                    <Link href='/find/password' passHref>
                        <a>
                            <CustomBlockButton
                                className='button-item'
                            >
                                비밀번호 찾기
                            </CustomBlockButton>
                        </a>
                    </Link>
                    <CustomBlockButton
                        className='button-item'
                        onClick={() => toggleModeType('default')}
                    >
                        이전으로
                    </CustomBlockButton>
                </ButtonGroup>
            </Wrapper>
        </Container>
    );
}