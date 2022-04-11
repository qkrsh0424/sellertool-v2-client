import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`

`;

const UsernameBox = styled.div`
    padding: 8px;
    color: #666;
    font-size: 14px;
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

const WorkspaceListModalComponent = (props) => {
    return (
        <>
            <Container>
                <UsernameBox>
                    user111
                </UsernameBox>
                <ItemListWrapper>
                    <ItemBox>
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
                                <div className='name'>user111의 셀러툴</div>
                                <div className='type'>Private</div>
                            </div>
                        </div>
                        <div className='checked-figure'>
                            <Image
                                loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                src='images/icon/check_icon.png'
                                layout='fill'
                                alt=""
                            ></Image>
                        </div>
                    </ItemBox>
                    <ItemBox>
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
                                <div className='name'>user111의 셀러툴</div>
                                <div className='type'>Public</div>
                            </div>
                        </div>
                        {/* <div className='checked-figure'>
                            <Image
                                loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                src='images/icon/check_icon.png'
                                layout='fill'
                                alt=""
                            ></Image>
                        </div> */}
                    </ItemBox>
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
            </Container>
        </>
    );
}
export default WorkspaceListModalComponent;