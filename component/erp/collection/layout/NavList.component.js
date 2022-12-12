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
        name: '대시보드',
        pathname: '/erp/collection/dashboard'
    },
    {
        name: '주문 업로드',
        pathname: '/erp/collection/order-upload'
    },
    {
        name: '주문수집관리',
        pathname: '/erp/collection/order'
    },
    {
        name: '판매상태관리',
        pathname: '/erp/collection/sales'
    },
    {
        name: '출고상태관리',
        pathname: '/erp/collection/release-complete'
    },
    {
        name: '설정',
        pathname: '/erp/collection/settings'
    }
]