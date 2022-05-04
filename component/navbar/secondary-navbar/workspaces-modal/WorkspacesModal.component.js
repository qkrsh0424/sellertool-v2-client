import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Ripple from '../../../modules/button/Ripple';

const Container = styled.div`

`;

const HeadFieldWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;

    .username-box{
        color: #666;
        font-size: 14px;    
    }

    .button-el{
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding: 0;
        margin: 0;
        border: 1px solid #fff;
        background: #fff;

        cursor: pointer;

        &:hover{
            background:#e0e0e060;
        }
    }

    .button-icon-figure{
        position: relative;
        width: 70%;
        height: 70%;
        margin: auto;
    }

    .button-icon{
        opacity: 0.7;
    }
`;

const ItemListWrapper = styled.div`
    
`;

const ItemBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding:8px;
    justify-content: space-between;

    cursor: pointer;

    &:hover{
        background: #e0e0e040;
    }

    .flex-box{
        display: flex;
        align-items: center;
    }

    .workspace-box{
        margin-left:8px;
    }

    .workspace-box .name{
        font-size: 15px;
        font-weight: 500;
    }

    .workspace-box .type{
        font-size: 14px;
        color: #666;
    }

    .avatar-figure{
        position: relative;
        width: 40px;
        height: 40px;
        /* background: #7DC2FF; */
        /* background: #e1e1e160; */
        border-radius: 5px;
    }

    .avatar-icon-el{
        opacity: 0.7;
    }

    .checked-figure{
        position: relative;
        width: 26px;
        height: 26px;
    }
`;

const AddBox = styled.div`
    padding: 8px;

    &:hover{
        background: #e0e0e040;
    }

    cursor: pointer;

    .figure{
        position: relative;
        width: 26px;
        height: 26px;
        margin: auto;
    }
`;

const WorkspacesModalComponent = (props) => {
    return (
        <>
            <Container>
                <HeadFieldWrapper>
                    <div className='username-box'>
                        {props.userInfo?.nickname}
                    </div>
                    <Link
                        href='/workspace/management'
                        passHref
                    >
                        <button
                            className='button-el'
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/setting_icon.png'
                                    layout='fill'
                                    alt=""
                                    className='button-icon'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                        </button>
                    </Link>
                </HeadFieldWrapper>
                {(props.workspaces && props.workspaceInfo) &&
                    <ItemListWrapper>
                        {props.workspaces?.map(r => {
                            if (r.publicYn === 'y') {
                                return (
                                    <ItemBox
                                        key={r.id}
                                        onClick={() => props.onActionSelectWorkspace(r)}
                                    >
                                        <div className='flex-box'>
                                            <div className='avatar-figure'>
                                                <Image
                                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                                    src='images/icon/default_group_icon.png'
                                                    layout='fill'
                                                    alt=""
                                                    className='avatar-icon-el'
                                                ></Image>
                                            </div>
                                            <div className='workspace-box'>
                                                <div className='name'>{r.name}</div>
                                                <div className='type'>Public</div>
                                            </div>
                                        </div>
                                        {r.id === props.workspaceInfo?.id &&
                                            <div className='checked-figure'>
                                                <Image
                                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                                    src='images/icon/check_icon.png'
                                                    layout='fill'
                                                    alt=""
                                                ></Image>
                                            </div>
                                        }
                                    </ItemBox>
                                )
                            }
                            if (r.publicYn === 'n') {
                                return (
                                    <ItemBox
                                        key={r.id}
                                        onClick={() => props.onActionSelectWorkspace(r)}
                                    >
                                        <div className='flex-box'>
                                            <div className='avatar-figure'>
                                                <Image
                                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                                    src='images/icon/default_private_icon.png'
                                                    layout='fill'
                                                    alt=""
                                                    className='avatar-icon-el'
                                                ></Image>
                                            </div>
                                            <div className='workspace-box'>
                                                <div className='name'>{r.name}</div>
                                                <div className='type'>Private</div>
                                            </div>
                                        </div>
                                        {r.id === props.workspaceInfo?.id &&
                                            <div className='checked-figure'>
                                                <Image
                                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                                    src='images/icon/check_icon.png'
                                                    layout='fill'
                                                    alt=""
                                                ></Image>
                                            </div>
                                        }
                                    </ItemBox>
                                );
                            }


                        })}
                        <Link
                            href='/workspace/create'
                            passHref
                        >
                            <AddBox>
                                <div className='figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                        src='images/icon/add_icon.png'
                                        layout='fill'
                                        alt=""
                                    ></Image>
                                </div>
                            </AddBox>
                        </Link>
                    </ItemListWrapper>
                }
            </Container>
        </>
    );
}
export default WorkspacesModalComponent;

const initialWorkspaces = null;

const workspacesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialWorkspaces;
    }
}