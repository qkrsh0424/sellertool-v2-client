import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import valueUtils from "../../../../utils/valueUtils";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import useWorkspacesHook from "../hooks/useWorkspacesHook";
import { Container, CreateButtonWrapper, ItemListWrapper, Title, Wrapper } from "../styles/ItemList.styled";
import { useSellertoolDatas } from "../../../../hooks/sellertool-datas";
import { useEffect } from "react";

export default function ItemListComponent(props) {
    const router = useRouter();
    const reduxDispatch = useDispatch();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const sellertoolDatas = useSellertoolDatas();

    const {
        workspaces,
    } = useWorkspacesHook();

    useEffect(() => {
        if (!workspaces || workspaces?.length <= 0) {
            return;
        }

        sellertoolDatas._onResetDatas(workspaces);
    }, [workspaces]);

    const __handle = {
        action: {
            selectWorkspace: (workspace) => {
                localStorage.setItem('sellertool-wsId', workspace.id);
                reduxDispatch({
                    type: 'WORKSPACE_REDUX_SET_DATA',
                    payload: {
                        isLoading: false,
                        workspaceInfo: { ...workspace }
                    }
                })
                router.push({
                    pathname: '/'
                });
            },
            routeToPath: (path, query) => {
                router.push({
                    pathname: path,
                    query: {
                        ...router.query,
                        ...query
                    }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>
                        워크스페이스
                    </Title>
                    <ItemListWrapper>
                        {workspaces?.map(r => {
                            const disabledWorkspace = r?.subscriptionPlan === 'NONE' || (r?.subscriptionPlan === 'PRIVATE' && !r?.masterFlag);
                            if (disabledWorkspace) {
                                return (
                                    <div
                                        key={r.id}
                                        className='item-group'
                                        style={{ background: '#f0f0f0a0' }}
                                    >
                                        <div
                                            className={`item-box ${workspaceRedux?.workspaceInfo?.id === r.id ? 'item-box-active' : ''}`}
                                            style={{ color: '#808080' }}
                                        >
                                            <div className='workspaceTag disabledWorkspace-tag'>
                                                구독 필요
                                            </div>
                                            <div className='workspaceName'>
                                                {r.name}
                                                <div className='disabledWorkspace-notification'>구독플랜을 연장하거나 개인 워크스페이스로 전환 해주세요.</div>
                                            </div>
                                        </div>
                                        <SingleBlockButton
                                            type='button'
                                            className='manage-button-el'
                                            onClick={() => __handle.action.routeToPath(`/workspace/management`, { wsId: r.id })}
                                        >
                                            <div className='manage-button-icon-figure'>
                                                <Image
                                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                    src={`/images/icon/settings_default_808080.svg`}
                                                    className='icon-el'
                                                    layout="responsive"
                                                    width={1}
                                                    height={1}
                                                    alt={'add icon'}
                                                />
                                            </div>
                                        </SingleBlockButton>
                                    </div>
                                );
                            }
                            return (
                                <div
                                    key={r.id}
                                    className='item-group'
                                >
                                    <div
                                        className={`item-box ${workspaceRedux?.workspaceInfo?.id === r.id ? 'item-box-active' : ''}`}
                                        onClick={() => __handle.action.selectWorkspace(r)}
                                    >
                                        {r?.subscriptionPlan === 'PRIVATE' && <div className='workspaceTag privateWorkspace-tag'>PRIVATE</div>}
                                        {r?.subscriptionPlan === 'PUBLIC' && <div className='workspaceTag publicWorkspace-tag'>PUBLIC</div>}
                                        {r?.subscriptionPlan === 'PLUS' && <div className='workspaceTag plusWorkspace-tag'>PLUS+</div>}
                                        <div className='workspaceName'>{r.name}</div>
                                    </div>
                                    <SingleBlockButton
                                        type='button'
                                        className='manage-button-el'
                                        onClick={() => __handle.action.routeToPath(`/workspace/management`, { wsId: r.id })}
                                    >
                                        <div className='manage-button-icon-figure'>
                                            <Image
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src={`/images/icon/settings_default_808080.svg`}
                                                className='icon-el'
                                                layout="responsive"
                                                width={1}
                                                height={1}
                                                alt={'add icon'}
                                            />
                                        </div>
                                    </SingleBlockButton>
                                </div>
                            );
                        })}

                        {valueUtils.isEmptyValues(workspaces) &&
                            (
                                <div className='empty-item'>
                                    워크스페이스가 비었습니다.
                                </div>
                            )
                        }
                    </ItemListWrapper>
                </Wrapper>
                <CreateButtonWrapper>
                    <Link
                        href='/workspace/create'
                        passHref
                        replace
                    >
                        <a>
                            <SingleBlockButton
                                type='button'
                                className='button-el'
                            >
                                워크스페이스 생성
                            </SingleBlockButton>
                        </a>
                    </Link>
                </CreateButtonWrapper>
            </Container>
        </>
    );
}