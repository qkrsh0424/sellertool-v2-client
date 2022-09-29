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
        privateWorkspaces,
        publicWorkspaces
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
                router.back();
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>
                        개인 워크스페이스
                    </Title>
                    <ItemListWrapper>
                        {privateWorkspaces &&
                            (
                                <>
                                    {privateWorkspaces?.map(r => {
                                        return (
                                            <div
                                                key={r.id}
                                                className='item-group'
                                            >
                                                <div
                                                    className={`item-box ${workspaceRedux?.workspaceInfo?.id === r.id ? 'item-box-active' : ''}`}
                                                    onClick={() => __handle.action.selectWorkspace(r)}
                                                >
                                                    {r.name}
                                                </div>
                                                <SingleBlockButton
                                                    type='button'
                                                    className='manage-button-el'
                                                >
                                                    <div className='manage-button-icon-figure'>
                                                        <Image
                                                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                            src={`http://localhost:3000/images/icon/settings_default_808080.svg`}
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

                                    {valueUtils.isEmptyValues(privateWorkspaces) &&
                                        (
                                            <div className='empty-item'>
                                                워크스페이스가 비었습니다.
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </ItemListWrapper>
                </Wrapper>
                <Wrapper>
                    <Title>
                        공유 워크스페이스
                    </Title>
                    <ItemListWrapper>
                        {publicWorkspaces && valueUtils.isEmptyValues(publicWorkspaces) &&
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