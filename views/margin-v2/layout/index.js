import Link from "next/link";
import { St } from "./index.styled";
import { useRouter } from "next/router";

export default function Layout({ children }) {
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <>
            <St.Container>
                <St.SidebarContainer>
                    <div>
                        <Link
                            href='/margin/dashboard'
                            passHref
                        >
                            <a
                                type='button'
                                className={`linkBtn ${pathname === '/margin/dashboard' ? 'linkBtn-active' : ''}`}
                            >
                                일반
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link
                            href='/margin/plus'
                            passHref
                        >
                            <a
                                type='button'
                                className={`linkBtn ${pathname === '/margin/plus' ? 'linkBtn-active' : ''}`}
                            >
                                플러스+
                            </a>
                        </Link>
                    </div>
                </St.SidebarContainer>
                <St.MainContainer>
                    {children}
                </St.MainContainer>
            </St.Container>
        </>
    );
}