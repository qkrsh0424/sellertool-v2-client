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
                                href={r.asPath}
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
        name: '실시간 랭킹',
        pathname: '/store-rank/real-time-rank',
        asPath: '/store-rank/real-time-rank'
    }
]