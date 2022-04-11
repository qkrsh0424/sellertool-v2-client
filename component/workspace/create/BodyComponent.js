import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding-top: 30px;
`;

const TitleBox = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: 600;
`;

const DescriptionBox = styled.div`
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    color: #555;
`;

const ItemWrapper = styled.div`
    width: 30%;
    margin: auto;
    margin-top: 20px;
    display: flex;


    @media all and (max-width:992px) {
        width: 90%;
    }
`;

const ItemBox = styled.div`
    border: ${props => props.checked ? '1px solid #309fff' : '1px solid #e1e1e1'};
    border-radius: 5px;
    margin: 5px;
    width: 50%;

    cursor: pointer;

    .check-box{
        display: flex;
        padding: 5px;
        justify-content: right;
    }

    .check-figure{
        position: relative;
        /* margin: auto; */
        width: 20px;
        height: 20px;
        border-radius: 5px;
    }

    .avatar-box{
        padding: 30px 0;
    }

    .avatar-figure{
        position: relative;
        margin: auto;
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }

    .title{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
    }

    .description{
        margin-top: 10px;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
        word-break: keep-all;
    }

    .description2{
        margin-top: 10px;
        padding: 10px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        word-break: keep-all;
    }

    .active{
        color: #309fff;
    }
`;

const BodyComponent = (props) => {
    const [workspaceType, setWorkspaceType] = useState('private');

    const _onSelect = (type) =>{
        setWorkspaceType(type);
    }

    return (
        <>
            <Container>
                <TitleBox>
                    셀러툴을 어떤 용도로 사용하실 계획인가요?
                </TitleBox>
                <DescriptionBox>
                    사용목적에 맞게 워크스페이스를 생성해보세요.
                </DescriptionBox>
                <ItemWrapper>
                    <ItemBox
                        checked={workspaceType === 'public'}
                        onClick={()=>_onSelect('public')}
                    >
                        {workspaceType === 'public' &&
                            <div className='check-box'>
                                <div className='check-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                        src='images/icon/checked_icon.png'
                                        layout='fill'
                                        alt=""
                                    ></Image>
                                </div>
                            </div>
                        }

                        {workspaceType !== 'public' &&
                            <div className='check-box'>
                                <div className='check-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                        src='images/icon/unchecked_icon.png'
                                        layout='fill'
                                        alt=""
                                    ></Image>
                                </div>
                            </div>
                        }
                        <div className='avatar-box'>
                            <div className='avatar-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                    src='images/icon/default_group_icon.png'
                                    layout='fill'
                                    alt=""
                                ></Image>
                            </div>
                        </div>
                        <div className='title'>
                            팀용
                        </div>
                        <div className='description'>
                            팀원들과 셀러툴의 기능들을 함께 사용해 보세요.
                        </div>
                        <div className={`description2 ${workspaceType === 'public' ? 'active' : ''}`}>
                            무료 서비스 체험하기
                        </div>
                    </ItemBox>
                    <ItemBox
                        checked={workspaceType === 'private'}
                        onClick={()=>_onSelect('private')}
                    >
                        {workspaceType === 'private' &&
                            <div className='check-box'>
                                <div className='check-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                        src='images/icon/checked_icon.png'
                                        layout='fill'
                                        alt=""
                                    ></Image>
                                </div>
                            </div>
                        }

                        {workspaceType !== 'private' &&
                            <div className='check-box'>
                                <div className='check-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                        src='images/icon/unchecked_icon.png'
                                        layout='fill'
                                        alt=""
                                    ></Image>
                                </div>
                            </div>
                        }

                        <div className='avatar-box'>
                            <div className='avatar-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `http://localhost:3000/${src}?q=${quality || 75}`}
                                    src='images/icon/default_private_icon.png'
                                    layout='fill'
                                    alt=""
                                ></Image>
                            </div>
                        </div>
                        <div className='title'>
                            개인용
                        </div>
                        <div className='description'>
                            사용 목적에 맞게 더욱 체계적으로 관리해 보세요.
                        </div>
                        <div className={`description2 ${workspaceType === 'private' ? 'active' : ''}`}>
                            개인 사용자에게 무료 제공
                        </div>
                    </ItemBox>
                </ItemWrapper>
            </Container>
        </>
    );
}
export default BodyComponent;