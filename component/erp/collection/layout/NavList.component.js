import Link from "next/link";
import { useRouter } from "next/router";
import { dateToYYYYMMDD } from "../../../../utils/dateFormatUtils";
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
        name: '대시보드',
        pathname: '/erp/collection/dashboard',
        asPath: '/erp/collection/dashboard'
    },
    {
        name: '발주업로드',
        pathname: '/erp/collection/order-upload',
        asPath: '/erp/collection/order-upload'
    },
    {
        name: '주문관리',
        pathname: `/erp/collection/order`,
        asPath: `/erp/collection/order/?periodSearchCondition=createdAt&startDateTime=${dateToYYYYMMDD(new Date())}&endDateTime=${dateToYYYYMMDD(new Date())}`
    },
    {
        name: '판매관리',
        pathname: '/erp/collection/sales',
        asPath: `/erp/collection/sales/?periodSearchCondition=salesAt&startDateTime=${dateToYYYYMMDD(new Date())}&endDateTime=${dateToYYYYMMDD(new Date())}`
    },
    {
        name: '출고관리',
        pathname: '/erp/collection/release-complete',
        asPath: `/erp/collection/release-complete/?periodSearchCondition=releaseAt&startDateTime=${dateToYYYYMMDD(new Date())}&endDateTime=${dateToYYYYMMDD(new Date())}`
    },
    {
        name: '설정',
        pathname: '/erp/collection/settings',
        asPath: '/erp/collection/settings'
    }
]