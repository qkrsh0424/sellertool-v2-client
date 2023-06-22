import Link from "next/link";
import { useRouter } from "next/router";
import { dateToYYYYMMDD } from "../../../utils/dateFormatUtils";
import { Container, LinkItem, SubLinkList } from "./styles/NavList.styled";

export default function NavListComponent({
    purchasingProcessList,
    onActionClickLink
}) {
    const router = useRouter();

    const SUBLINK_LIST = purchasingProcessList?.sort((a, b) => a?.orderNumber - b?.orderNumber);

    return (
        <>
            <Container>
                {NAV_LIST?.map((nav, index) => {
                    if (nav?.name === '구매 프로세스') {
                        return (
                            <LinkItem
                                key={index}
                                active={router?.pathname === nav?.pathname}
                            >
                                <Link
                                    href={nav?.asPath}
                                    passHref
                                >
                                    <a onClick={() => onActionClickLink()}>
                                        {nav?.name}
                                    </a>
                                </Link>
                                <SubLinkList>
                                    {SUBLINK_LIST?.map((purchasingProcessLink, purchasingProcessLinkIdx) => {
                                        return (
                                            <div
                                                key={purchasingProcessLinkIdx}
                                                className="subLink-item"
                                            >
                                                <Link
                                                    href={`${nav?.pathname}/${purchasingProcessLink?.id}`}
                                                    passHref
                                                >
                                                    <a onClick={() => onActionClickLink()}>
                                                        {purchasingProcessLink?.name}
                                                    </a>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </SubLinkList>
                            </LinkItem>
                        );
                    }
                    return (
                        <LinkItem
                            key={index}
                            active={router?.pathname === nav?.pathname}
                        >
                            <Link
                                href={nav?.asPath}
                                passHref
                            >
                                <a onClick={() => onActionClickLink()}>
                                    {nav?.name}
                                </a>
                            </Link>
                        </LinkItem>
                    );
                })}
            </Container>
        </>
    );
}

const NAV_LIST = [
    {
        name: '대시보드',
        pathname: '/purchasing-process/dashboard',
        asPath: '/purchasing-process/dashboard'
    },
    {
        name: '구매 프로세스',
        pathname: '/purchasing-process/process',
        asPath: '/purchasing-process/process'
    },
    {
        name: '구매 프로세스 s',
        pathname: '#',
        asPath: '#'
    },
]