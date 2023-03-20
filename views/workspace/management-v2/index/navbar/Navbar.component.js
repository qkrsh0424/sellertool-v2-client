import { useRouter } from "next/router";
import CustomImage from "../../../../modules/image/CustomImage";
import { Container, LinkButton } from "./styles/Navbar.styled";
// TODO
const VIEW_TYPES = [
    {
        type: 'MEMBER_LIST',
        title: '멤버 목록',
        iconSrc: '/images/icon/groups_default_808080.svg',
        default: true,
        masterOnly: false,
    },
    {
        type: 'INVITE_MEMBER',
        title: '멤버 초대',
        iconSrc: '/images/icon/groupAdd_default_808080.svg',
        default: false,
        masterOnly: true,
    },
    {
        type: 'AUTH_TEMPLATE',
        title: '권한 템플릿 관리',
        iconSrc: '/images/icon/lock_default_808080.svg',
        default: false,
        masterOnly: true,
    },

]

export default function NavbarComponent({ isWorkspaceMaster }) {
    const router = useRouter();
    const wsId = router?.query?.wsId;
    const viewType = router?.query?.view;

    const handleRouteTo = (type) => {
        router.push({
            pathname: router.pathname,
            query: {
                wsId: wsId,
                view: type
            }
        })
    }

    return (
        <>
            <Container>
                {VIEW_TYPES?.map(r => {
                    if (r.masterOnly && !isWorkspaceMaster) {
                        return;
                    }

                    return (
                        <LinkButton
                            key={r.type}
                            onClick={() => handleRouteTo(r.type)}
                            style={{
                                background: (!viewType && r.default) || (viewType === r.type) ? '#f0f0f0' : ''
                            }}
                        >
                            <div
                                className='icon-figure'
                            >
                                <CustomImage src={r.iconSrc} />
                            </div>
                            <div className='link-text'>{r.title}</div>
                        </LinkButton>
                    );
                })}
            </Container>
        </>
    );
}