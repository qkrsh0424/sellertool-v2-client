import Link from "next/link";
import { useRouter } from "next/router";
import { Container, LinkItem } from "./styles/NavList.styled";

export default function NavListComponent({
    onActionClickLink
}) {
    const router = useRouter();

    return (
        <>
            <Container>
                {NAV_LIST?.map((r, index) => {
                    return (
                        <LinkItem
                            key={index}
                            active={router?.pathname === r.pathname}
                        >
                            <Link
                                href={r.pathname}
                                passHref
                            >
                                <a onClick={() => onActionClickLink()}>
                                    {r.name}
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
        name: '재고조회 / 입출고 관리',
        pathname: '/inventory'
    },
    {
        name: '재고주기',
        pathname: '/inventory/주기'
    }
]