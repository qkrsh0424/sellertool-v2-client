import Link from "next/link";
import { Container } from "./InfoField.styled";

const InfoFieldComponent = (props) => {
    return (
        <>
            {(props.isLoading === false && props.userInfo === null) &&
                <Container>
                    <Link
                        href='/login'
                        passHref
                    >
                        <div className='rt-el'>로그인</div>
                    </Link>
                    <Link
                        href='/signup'
                        passHref
                    >
                        <div className='rt-el'>회원가입</div>
                    </Link>
                </Container>
            }

            {(props.isLoading === false && props.userInfo) &&
                <Container>
                    <Link
                        href='/login'
                        passHref
                    >
                        <div className='rt-el'>내정보</div>
                    </Link>
                    <div className='rt-el' onClick={props.onLogout}>로그아웃</div>
                </Container>
            }
        </>
    );
}
export default InfoFieldComponent;