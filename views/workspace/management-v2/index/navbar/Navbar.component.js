import { useRouter } from "next/router";
import CustomImage from "../../../../modules/image/CustomImage";
import { Container, LinkButton } from "./styles/Navbar.styled";
// TODO
const VIEW_TYPES = [
    {
        type: 'PROFILE',
        title: '프로필',
        iconSrc: '/images/icon/profile_default_808080.svg',
        default: true,
        masterOnly: false,
    },
    {
        type: 'MEMBER_LIST',
        title: '멤버 목록',
        iconSrc: '/images/icon/groups_default_808080.svg',
        default: false,
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
    {
        type: 'SUBSCRIPTION_PLAN',
        title: '구독플랜',
        iconSrc: '/images/icon/rocket_default_808080.svg',
        default: false,
        masterOnly: true,
        alarm: <span className='alram-tag'>구독 필요</span>
    },
    {
        type: 'SETTINGS',
        title: '설정',
        iconSrc: '/images/icon/settings_default_808080.svg',
        default: false,
        masterOnly: true,
        alarm: <span className='alram-tag'>개인 전환 필요</span>
    },
    {
        type: 'API_MANAGEMENT',
        title: 'API 관리',
        iconSrc: '/images/icon/api_default_808080.svg',
        default: false,
        masterOnly: true,
    },
]

export default function NavbarComponent({ workspace, isWorkspaceMaster }) {
    const router = useRouter();
    const wsId = router?.query?.wsId;
    const viewType = router?.query?.view;
    const subscriptionPlan = workspace?.subscriptionPlan;

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
                            <div className='link-text'>
                                {r.title}
                                {(!subscriptionPlan || subscriptionPlan === 'NONE') ? r?.alarm : <></>}
                            </div>
                        </LinkButton>
                    );
                })}
            </Container>
        </>
    );
}