import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 10px;
`;

const Wrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: row;

    @media all and (max-width:992px){
        flex-direction: column;
    }
`;

const LayoutSidebar = styled.div`
    width: 280px;
    background: white;
    margin-right: 20px;

    @media all and (max-width:992px){
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
    }

    .link-item{
        display: flex;
        align-items: center;
        padding: 8px;
        border-left: 4px solid #00000000;

        cursor: pointer;
    }
    
    .link-item-active{
        background: #e0e0e060;
        border-left: 4px solid #2C73D2;
        border-radius: 3px;
    }

    .link-icon-figure{
        position: relative;
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    .link-icon{
        opacity: 0.6;
    }

    .link-name{
        flex:1;
        font-size: 14px;
    }

    .link-name-active{
        font-weight: 600;
    }
`;

const LayoutMain = styled.div`
    flex:1;
`;

const Layout = (props) => {
    const router = useRouter();

    return (
        <>
            <Container>
                <Wrapper>
                    <LayoutSidebar>
                        <Link
                            href='/profile/account'
                            passHref
                        >
                            <div className={`link-item ${router.pathname === '/profile/account' && 'link-item-active'}`}>
                                <div className='link-icon-figure'>
                                    <Image
                                        className='link-icon'
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src='/images/icon/face_icon.png'
                                        layout='fill'
                                        alt="face icon"
                                    ></Image>
                                </div>
                                <div className={`link-name ${router.pathname === '/profile/account' && 'link-name-active'}`}>
                                    내 정보
                                </div>
                            </div>
                        </Link>
                        <Link
                            href='/profile/workspace'
                            passHref
                        >
                            <div className={`link-item ${router.pathname === '/profile/workspace' && 'link-item-active'}`}>
                                <div className='link-icon-figure'>
                                    <Image
                                        className='link-icon'
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src='/images/icon/workspace_icon.png'
                                        layout='fill'
                                        alt="workspace icon"
                                    ></Image>
                                </div>
                                <div className={`link-name ${router.pathname === '/profile/workspace' && 'link-name-active'}`}>
                                    워크스페이스
                                </div>
                            </div>
                        </Link>
                    </LayoutSidebar>
                    <LayoutMain>
                        {props.children}
                    </LayoutMain>
                </Wrapper>
            </Container>
        </>
    );
}
export default Layout;