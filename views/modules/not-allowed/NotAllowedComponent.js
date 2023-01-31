import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
    margin: 100px 0;

    .title{
        text-align: center;
        font-size: 24px;
        font-weight: 500;
    }

    .link{
        margin-top: 20px;
        text-align: center;
        font-size: 18px;
        color:#2C73D2;
        cursor: pointer;

        &:hover{
            text-decoration: underline;
        }
    }
`;

const NotAllowedComponent = (props) => {
    const [notAllowed, setNotAllowed] = useState(false);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setNotAllowed(true);
        }, 3000)

        return () => clearTimeout(timeout);
    }, [])
    return (
        <>
            {!notAllowed &&
                <Container style={{textAlign:'center'}}>
                    <CircularProgress color={'inherit'} style={{color:'#d0d0d0'}}></CircularProgress>
                </Container>
            }
            {notAllowed &&
                <Container>
                    <div className='title'>
                        페이지 접근 권한이 없습니다.😢
                    </div>
                    <div className='link'>
                        <Link
                            href='/'
                            passHref
                            replace={true}
                        >
                            홈으로 이동
                        </Link>
                    </div>
                </Container>
            }
        </>
    );
}
export default NotAllowedComponent;