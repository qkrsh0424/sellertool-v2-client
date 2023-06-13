import Link from "next/link";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import { Container, NoticeElement } from "../../navbar/secondary-navbar-v2/styles/WorkspaceNoticeModal.styled";

export default function WorkspaceNoticeModalComponent({

}) {
    return (
        <>
            <Container>
                <NoticeElement>
                    작업하실 워크스페이스를 먼저 선택해 주세요.
                </NoticeElement>
                <Link
                    href='/workspace/select'
                    passHref
                >
                    <a>
                        <SingleBlockButton
                            className='link-button-el'
                        >
                            워크스페이스 선택창으로 이동
                        </SingleBlockButton>
                    </a>
                </Link>
            </Container>
        </>
    );
}