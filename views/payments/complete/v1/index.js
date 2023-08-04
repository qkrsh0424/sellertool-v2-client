import Link from "next/link";
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";
import { Container, Wrapper } from "./index.styled";
import { useSelector } from "react-redux";
import CustomImage from "../../../../components/image/CustomImage";

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    return (
        <>
            <Container>
                <Wrapper>
                    <div className='success-icon-box'>
                        <CustomImage
                            src={'/images/icon/check_circle_5fcf80.svg'}
                        />
                    </div>
                    <div className='success-label'>결제가 성공적으로 완료되었습니다.</div>
                    <div className='button-link-group'>
                        <Link
                            href={`/workspace/management/?view=SETTINGS&wsId=${wsId}`}
                            passHref
                            replace
                        >
                            <a className='button-link'>
                                <CustomBlockButton
                                    type='button'
                                    className='button-item'
                                >결제내역 보기</CustomBlockButton>
                            </a>
                        </Link>
                        <Link
                            href={`/`}
                            passHref
                            replace
                        >
                            <a className='button-link'>
                                <CustomBlockButton
                                    type='button'
                                    className='button-item'
                                >홈으로 이동</CustomBlockButton>
                            </a>
                        </Link>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}