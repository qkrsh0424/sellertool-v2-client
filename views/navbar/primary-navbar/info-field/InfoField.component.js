import Link from "next/link";
import { useSelector } from "react-redux";
import { Container } from "./InfoField.styled";

const InfoFieldComponent = (props) => {
    const userRedux = useSelector(state => state.userRedux);

    return (
        <>
            {(userRedux.isLoading === false && userRedux.userInfo === null) &&
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

            {(userRedux.isLoading === false && userRedux.userInfo) &&
                <Container>
                    <Link
                        href='/profile/account'
                        passHref
                    >
                        <div className='rt-el'>내 정보</div>
                    </Link>
                    <div className='rt-el' onClick={props.onLogout}>로그아웃</div>
                </Container>
            }
        </>
    );
}
export default InfoFieldComponent;