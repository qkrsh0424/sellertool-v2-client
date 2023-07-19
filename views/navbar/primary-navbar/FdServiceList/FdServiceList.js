import Link from "next/link";
import { Nav } from "./FdServiceList.styled";
import { useSelector } from "react-redux";

export function FdServiceList() {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const SERVICE_LIST = [
        {
            href: '/margin/dashboard',
            name: '마진율 계산기',
            isReady: true,
            target: '_self'
        },
        {
            href: '/excel-translator',
            name: '엑셀 변환기',
            isReady: true,
            target: '_self'
        },
        {
            href: '#',
            name: '스토어 랭킹',
            isReady: false,
            target: '_self'
        },
        {
            href: '/inventory',
            name: '통합 재고 관리',
            isReady: true,
            target: '_self'
        },
        {
            href: `https://sales-analysis.sellertool.io/sales-analysis/dashboard?workspaceId=${wsId}`,
            name: '통합 판매 분석',
            isReady: true,
            target: '_self'
        },
        {
            href: `https://sellertool.notion.site/sellertool/b2533e2649154dae926982488dad3cae`,
            name: '셀러툴 이용 가이드',
            isReady: true,
            target: '_blank'
        }
    ]

    return (
        <>
            <Nav>
                <ul className='main-menu'>
                    {SERVICE_LIST?.map(r => {
                        return (
                            <li key={r?.name} className='menu-item'>
                                <Link
                                    href={r?.href}
                                    passHref
                                >
                                    <a className='serviceLink' style={{ opacity: !r?.isReady ? 0.7 : '' }} target={r?.target}>
                                        {r?.name}
                                        {!r?.isReady &&
                                            <sup>준비중</sup>
                                        }
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Nav>
        </>
    );
}