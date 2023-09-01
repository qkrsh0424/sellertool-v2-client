import CustomImage from "../../../modules/image/CustomImage";

import styled from 'styled-components';
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";
import Link from "next/link";
import { useSelector } from "react-redux";

const Container = styled.div`
    padding: 10px 30px;
    position: absolute;
    top: 55px;
    left: 0;
    background: #fff;
    width: 100%;
    z-index: 999;
    border-bottom: 1px solid #f0f0f0;
    overflow-y: scroll;
    max-height: 300px;
    box-shadow: var(--defaultBoxShadow);
    transition: all .3s;

    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #00000025;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;

const CloseButton = styled(CustomBlockButton)`
    width: 40px;
    height: 40px;
    border:none;
    float: right;
`;

const MenuWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    flex-wrap:wrap;
`;

const MenuBox = styled.div`
    margin-right: 20px;
    width: 200px;

    .menu-title{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
        border-left: 3px solid #606060;
        padding-left: 10px;
        color: #606060;
    }

    .menu-item{
        margin-bottom: 10px;
        border-radius: 10px;
        padding:0 10px;
        height: 40px;
        border:1px solid #00000000;
        text-align: left;
        color: #606060;
        font-weight: 500;

        &:hover{
            border: 1px solid var(--mainColor);
            color:var(--mainColor)
        }
    }
`;

const SALES_ANALISIS_CLIENT_ORIGIN = process.env.NODE_ENV == 'development' ? process.env.development.salesAnalisisClientAddress : process.env.production.salesAnalisisClientAddress;

const gtagClickEventHandler = (data) => {
    if (window?.gtag) {
        gtag('event', 'service_link_clicked', {
            custom_source: data?.custom_source,
            custom_link: data?.custom_link,
            custom_name: data?.custom_name
        })
    }
}

const getMenuHref = (href, workspaceId) => {
    if (href === '/sales-analysis/dashboard') {
        return `${SALES_ANALISIS_CLIENT_ORIGIN}${href}?workspaceId=${workspaceId}`
    }

    return href;
}

export default function MenuListComponent({
    onCloseMenuList
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const workspaceId = workspaceRedux?.workspaceInfo?.id;

    return (
        <Container>
            <CloseButton
                type='button'
                onClick={() => onCloseMenuList()}
            >
                <CustomImage src='/images/icon/close_default_959eae.svg' />
            </CloseButton>
            <MenuWrapper>
                {MENU_LIST?.map(menu => {
                    return (
                        <MenuBox key={menu?.title}>
                            <div className='menu-title'>
                                {menu?.title}
                            </div>
                            <div>
                                {menu.subMenuItems?.map(subMenu => {
                                    return (
                                        <Link
                                            key={subMenu?.title}
                                            href={getMenuHref(subMenu?.href, workspaceId)}
                                            passHref
                                        >
                                            <a target={subMenu?.targetBlank ? '_blank' : '_self'} onClick={() => gtagClickEventHandler({ custom_source: 'nav', custom_link: subMenu?.href, custom_name: subMenu?.title })}>
                                                <CustomBlockButton
                                                    className='menu-item'
                                                    style={{ color: subMenu?.disabled ? '#a0a0a0' : '' }}
                                                >
                                                    {subMenu?.title}
                                                </CustomBlockButton>
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                        </MenuBox>
                    );
                })}
            </MenuWrapper>
        </Container>
    );
}

const MENU_LIST = [
    {
        title: '유용한 기능',
        subMenuItems: [
            {
                title: '마진율 계산기',
                href: '/margin/dashboard',
                targetBlank: false
            },
            {
                title: '엑셀 변환기',
                href: '/excel-translator',
                targetBlank: false
            },
            {
                title: '스토어 랭킹(준비중)',
                href: '/',
                targetBlank: false,
                disabled: true
            }
        ]
    },
    {
        title: '창고 관리 서비스',
        subMenuItems: [
            {
                title: '통합 상품 관리',
                href: '/product/dashboard',
                targetBlank: false
            },
            {
                title: '통합 재고 관리',
                href: '/inventory',
                targetBlank: false
            }
        ]
    },
    {
        title: '발주 관리 서비스',
        subMenuItems: [
            {
                title: '통합 발주 관리',
                href: '/erp/collection/dashboard',
                targetBlank: false
            },
            {
                title: '통합 판매 분석',
                href: '/sales-analysis/dashboard',
                targetBlank: false
            }
        ]
    },
    {
        title: '고객센터',
        subMenuItems: [
            {
                title: '셀러툴 이용 가이드',
                href: 'https://sellertool.notion.site/b2533e2649154dae926982488dad3cae?pvs=4',
                targetBlank: true
            },
            {
                title: '이용약관',
                href: 'https://assets.sellertool.io/consent_form/service_terms_v1.html',
                targetBlank: true
            },
            {
                title: '개인정보처리방침',
                href: 'https://assets.sellertool.io/consent_form/privacy_policy_v1.html',
                targetBlank: true
            },
        ]
    }
]