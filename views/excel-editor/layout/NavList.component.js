import Link from "next/link";
import { useRouter } from "next/router";
import * as St from "./styles/NavList.styled";

export default function NavListComponent({
    onActionClickLink
}) {
    const router = useRouter();

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    {NAV_LIST?.map((link, index) => {
                        return (
                            <St.LinkItemWrapper
                                key={index}
                            >
                                <St.LinkItem
                                    active={router?.pathname?.includes(link.matcher)}
                                    style={link?.isPreparingService ? {color:'#cccccc'} : {}}
                                >
                                    <Link
                                        href={link.pathname}
                                        passHref
                                    >
                                        <a onClick={() => onActionClickLink()}>
                                            {link.name}
                                        </a>
                                    </Link>
                                </St.LinkItem>
                                {link?.subLinkList &&
                                    <St.SubLinkListWrapper>
                                        {link?.subLinkList?.map(subLink => {
                                            return (
                                                <St.SubLinkItem
                                                    key={subLink.pathname}
                                                    active={router?.pathname === subLink.matcher}
                                                    style={link?.isPreparingService ? {color:'#cccccc'} : {}}
                                                >
                                                    <Link
                                                        href={subLink.pathname}
                                                        passHref
                                                    >
                                                        <a onClick={() => onActionClickLink()}>
                                                            {subLink.name}
                                                        </a>
                                                    </Link>
                                                </St.SubLinkItem>
                                            );
                                        })}
                                    </St.SubLinkListWrapper>
                                }
                            </St.LinkItemWrapper>
                        );
                    })}
                </St.Wrapper>
            </St.Container>
        </>
    );
}

const NAV_LIST = [
    {
        name: '엑셀 변환기',
        pathname: '/excel-editor/translator',
        matcher: '/excel-editor/translator',
        subLinkList: [
            {
                name: '대시보드',
                pathname: '/excel-editor/translator',
                matcher: '/excel-editor/translator'
            },
            {
                name: '등록',
                pathname: '/excel-editor/translator/register',
                matcher: '/excel-editor/translator/register'
            },
            {
                name: '수정 및 삭제',
                pathname: '/excel-editor/translator/setting',
                matcher: '/excel-editor/translator/setting'
            }
        ]
    },
    {
        name: '엑셀 조합기',
        // pathname: `/excel-editor/combinator`,
        pathname: `#`,
        matcher: '/excel-editor/combinator',
        isPreparingService: true,
        subLinkList: [
            // {
            //     name: '대시보드',
            //     pathname: '/excel-editor/combinator',
            //     matcher: '/excel-editor/combinator'
            // },
            {
                name: '서비스 준비중',
                // pathname: '/excel-editor/combinator',
                pathname: '#',
                matcher: '/excel-editor/combinator',
                isPreparingService: true,
            },
        ]
    },
]