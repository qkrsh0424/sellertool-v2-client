import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';
import FieldLoading from '../../../modules/loading/FieldLoading';
import useWorkspacesHook from '../hooks/useWorkspacesHook';
import { Container, ListFieldWrapper, TitleFieldWrapper } from './styles/WorkspaceList.styled';

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
                                    src={'http://localhost:3000/images/icon/refresh_default_808080.svg'}
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
                        return (
                            <div
                                key={r.id}
                                className='item-group mgl-flex mgl-flex-alignItems-center'
                            >
                                <div
                                    className='content-group mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'
                                >
                                    <div className='profile-image-figure'>
                                        {r.publicYn === 'y' &&
                                            <Image
                                                className='item-icon-el'
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src='http://localhost:3000/images/icon/groups_default_808080.svg'
                                                layout='fill'
                                                alt='image'
                                                loading='lazy'
                                            ></Image>
                                        }
                                        {r.publicYn === 'n' &&
                                            <Image
                                                className='item-icon-el'
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src='http://localhost:3000/images/icon/person_default_808080.svg'
                                                layout='fill'
                                                alt='image'
                                                loading='lazy'
                                            ></Image>
                                        }
                                    </div>

                                    <div className='info-items mgl-flex'>
                                        <div className='tag-items'>
                                            <div className='grade-tag'>
                                                {r.publicYn === 'n' &&
                                                    '개인용'
                                                }
                                                {r.publicYn === 'y' &&
                                                    '단체용'
                                                }
                                            </div>
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