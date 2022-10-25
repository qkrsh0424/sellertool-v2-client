import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, LinkButton } from "./styles/Navbar.styled";

export default function NavbarComponent(props) {
    const router = useRouter();

    const onActionRouteToPath = (path) => {
        switch (path) {
            case 'memberList':
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        settings: 'member-list'
                    }
                })
                break;
            case 'inviteMember':
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        settings: 'invite-member'
                    }
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
                    onClick={() => onActionRouteToPath('memberList')}
                    style={{
                        background: (!router.query?.settings || router.query?.settings === 'member-list') ? '#f0f0f0' : ''
                    }}
                >
                    <div
                        className='icon-figure'
                    >
                        <Image
                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                            src={'http://localhost:3000/images/icon/groups_default_808080.svg'}
                            layout='responsive'
                            width={1}
                            height={1}
                            objectFit={'cover'}
                            alt='image'
                            loading='lazy'
                        ></Image>
                    </div>
                    <div className='link-text'>멤버목록</div>
                </LinkButton>
                <LinkButton
                    onClick={() => onActionRouteToPath('inviteMember')}
                    style={{
                        background: (router.query?.settings === 'invite-member') ? '#f0f0f0' : ''
                    }}
                >
                    <div
                        className='icon-figure'
                    >
                        <Image
                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                            src={'http://localhost:3000/images/icon/groupAdd_default_808080.svg'}
                            layout='responsive'
                            width={1}
                            height={1}
                            objectFit={'cover'}
                            alt='image'
                            loading='lazy'
                        ></Image>
                    </div>
                    <div className='link-text'>멤버초대</div>
                </LinkButton>
            </Container>
        </>
    );
}