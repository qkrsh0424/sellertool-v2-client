import Image from 'next/image';
import Link from 'next/link';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';
import { Container, ListFieldWrapper, TitleFieldWrapper } from './styles/WorkspaceList.styled';

const returnSubscriptionPlans = (subscriptionPlan) => {
    return subscriptionPlan?.split('.');
}

const WorkspaceListComponent = ({
    workspaces,
    onSubmitRefreshWorkspaces
}) => {
    const __handle = {
        submit: {
            refresh: () => {
                onSubmitRefreshWorkspaces();
            }
        }
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            나의 워크스페이스
                        </div>
                        <SingleBlockButton
                            type='button'
                            className='refresh-button-el'
                            onClick={() => __handle.submit.refresh()}
                        >
                            <div className='refresh-button-icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/refresh_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                        </SingleBlockButton>
                    </div>
                </TitleFieldWrapper>
                <ListFieldWrapper>
                    {workspaces?.map(r => {
                        const disabledWorkspace = r?.subscriptionPlan === 'NONE' || (r?.subscriptionPlan === 'PRIVATE' && !r?.masterFlag);
                        if (disabledWorkspace) {
                            return (
                                <div
                                    key={r.id}
                                    className='item-group mgl-flex mgl-flex-alignItems-center'
                                >
                                    <div
                                        className='content-group mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'
                                    >
                                        <div className='info-items mgl-flex'>
                                            <div className='tag-items'>
                                                {r?.subscriptionPlan === 'NONE' && <div className='workspaceTag disabledWorkspace-tag'>구독 필요</div>}
                                            </div>
                                            <div className='user-items tag-items'>
                                                <div className='user-item mgl-font-color-primary user-item-disabled'>
                                                    <Link
                                                        href={`/workspace/management/?wsId=${r.id}`}
                                                        passHref
                                                    >
                                                        <a>
                                                            {r.name}
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div className='disabledWorkspace-notification'>구독플랜을 연장하거나 개인 워크스페이스로 전환 해주세요.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div
                                key={r.id}
                                className='item-group mgl-flex mgl-flex-alignItems-center'
                            >
                                <div
                                    className='content-group mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'
                                >
                                    <div className='info-items mgl-flex'>
                                        <div className='tag-items'>
                                            {r?.subscriptionPlan === 'PRIVATE' && <div className='workspaceTag privateWorkspace-tag'>PRIVATE</div>}
                                            {r?.subscriptionPlan === 'PUBLIC' && <div className='workspaceTag publicWorkspace-tag'>PUBLIC</div>}
                                            {r?.subscriptionPlan === 'PLUS' && <div className='workspaceTag plusWorkspace-tag'>PLUS+</div>}
                                        </div>
                                        <div className='user-items'>
                                            <div className='user-item mgl-font-color-primary'>
                                                <Link
                                                    href={`/workspace/management/?wsId=${r.id}`}
                                                    passHref
                                                >
                                                    <a>
                                                        {r.name}
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ListFieldWrapper>
            </Container>
        </>
    );
}
export default WorkspaceListComponent;