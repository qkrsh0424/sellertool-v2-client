import Link from "next/link";
import CustomBlockButton from "../../../../components/buttons/block-button/v1/CustomBlockButton";
import { Container, Wrapper } from "./index.styled";
import { useSelector } from "react-redux";
import CustomImage from "../../../../components/image/CustomImage";
import { useRouter } from "next/router";

export default function MainComponent(props) {
    const router = useRouter();

    const wsId = router?.query?.wsId;
    const imp_success = router?.query?.imp_success === 'true' ? true : false;
    const error_msg = router?.query?.error_msg;

    if (imp_success) {
        return (
            <>
                <SuccessCard
                    wsId={wsId}
                />
            </>
        );
    } else {
        return (
            <>
                <FailureCard
                    wsId={wsId}
                    error_msg={error_msg}
                />
            </>
        );
    }
}

function SuccessCard({
    wsId
}) {
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
                            href={{
                                pathname: '/workspace/management',
                                query: {
                                    view: 'SETTINGS',
                                    wsId: wsId
                                }
                            }}
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

function FailureCard({
    wsId,
    error_msg,
}) {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='success-icon-box'>
                        <CustomImage
                            src={'/images/icon/close_default_e56767.svg'}
                        />
                    </div>
                    <div className='success-label'>{error_msg}</div>
                    <div className='button-link-group'>
                        <Link
                            href={{
                                pathname: '/workspace/management',
                                query: {
                                    view: 'SUBSCRIPTION_PLAN',
                                    wsId: wsId
                                }
                            }}
                            passHref
                            replace
                        >
                            <a className='button-link'>
                                <CustomBlockButton
                                    type='button'
                                    className='button-item'
                                >이전</CustomBlockButton>
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