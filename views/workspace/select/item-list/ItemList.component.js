import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import valueUtils from "../../../../utils/valueUtils";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import useWorkspacesHook from "../hooks/useWorkspacesHook";
import { Container, CreateButtonWrapper, ItemListWrapper, Title, Wrapper } from "../styles/ItemList.styled";

export default function ItemListComponent(props) {
    const router = useRouter();
    const reduxDispatch = useDispatch();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const {
        workspaces,
    } = useWorkspacesHook();

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
                            const disabledWorkspace = r.subscriptionPlan === 'NONE' && !r.masterFlag;
                            if (disabledWorkspace) {
                                return (
                                    <div
                                        key={r.id}
                                        className='item-group'
                                        style={{ background: '#f0f0f060' }}
                                    >
                                        <div
                                            className={`item-box ${workspaceRedux?.workspaceInfo?.id === r.id ? 'item-box-active' : ''}`}
                                            style={{color: '#808080'}}
                                        >
                                            <span className='workspaceName'>{r.name}</span>
                                            <span className='disabledWorkspaceTag'>구독플랜 필요</span>
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
                                        <span className='workspaceName'>{r.name}</span>
                                        {r?.subscriptionPlan === 'PUBLIC' && <span className='subscriptionPlan-tag'>퍼블릭</span>}
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