import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, LinkButton } from "./styles/Navbar.styled";

export default function NavbarComponent(props) {
    const router = useRouter();

    const onActionRouteToPath = (path) => {
        switch (path) {
            case 'account':
                router.push({
                    pathname: '/profile/account'
                })
                break;
            case 'workspace':
                router.push({
                    pathname: '/profile/workspace'
                })
                break;
            default:
                break;
        }
    }
    return (
        <>
            <Container>
                <LinkButton
                    onClick={() => onActionRouteToPath('account')}
                    style={{
                        background: (router.pathname === '/profile/account') ? '#f0f0f0' : ''
                    }}
                >
                    <div
                        className='icon-figure'
                    >
                        <Image
                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                            src='/images/icon/profile_default_808080.svg'
                            layout='responsive'
                            width={1}
                            height={1}
                            objectFit={'cover'}
                            alt='image'
                            loading='lazy'
                        ></Image>
                    </div>
                    <div className='link-text'>기본정보</div>
                </LinkButton>
                <LinkButton
                    onClick={() => onActionRouteToPath('workspace')}
                    style={{
                        background: (router.pathname === '/profile/workspace') ? '#f0f0f0' : ''
                    }}
                >
                    <div
                        className='icon-figure'
                    >
                        <Image
                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                            src='/images/icon/workspaces_default_808080.svg'
                            layout='responsive'
                            width={1}
                            height={1}
                            objectFit={'cover'}
                            alt='image'
                            loading='lazy'
                        ></Image>
                    </div>
                    <div className='link-text'>워크스페이스</div>
                </LinkButton>
            </Container>
        </>
    );
}