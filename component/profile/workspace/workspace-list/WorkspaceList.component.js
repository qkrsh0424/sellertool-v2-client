import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FieldLoading from '../../../modules/FieldLoading';
import { Container, ListFieldWrapper, TitleFieldWrapper } from './WorkspaceList.styled';

function TitleFieldView() {
    return (
        <TitleFieldWrapper>
            <div className='title'>나의 워크스페이스</div>
        </TitleFieldWrapper>
    );
}

const WorkspaceListComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const userRdx = useSelector(state => state.userState);

    useEffect(() => {
        if (props.workspaces) {
            setIsLoading(false)
        }
    }, [props.workspaces]);

    return (
        <>
            <Container>
                <TitleFieldView />
                <ListFieldWrapper>
                    {isLoading &&
                        <FieldLoading
                            marginTop={130}
                            marginBottom={130}
                            size={20}
                        />
                    }
                    {!isLoading && props.workspaces?.map(r => {
                        return (
                            <div
                                key={r.id}
                                className='item-wrapper'
                            >
                                <div
                                    className='item-box'
                                >
                                    <div className='item-icon-figure'>
                                        {r.publicYn === 'y' &&
                                            <Image
                                                className='item-icon-el'
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src='http://localhost:3000/images/icon/default_group_icon.png'
                                                layout='fill'
                                                alt="face icon"
                                            ></Image>
                                        }
                                        {r.publicYn === 'n' &&
                                            <Image
                                                className='item-icon-el'
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src='http://localhost:3000/images/icon/default_private_icon.png'
                                                layout='fill'
                                                alt="face icon"
                                            ></Image>
                                        }
                                    </div>
                                    <div className='info-box'>
                                        <Link
                                            href={`/workspace/management/?wsId=${r.id}`}
                                            passHref
                                        >
                                            <a className='workspace-name-el'>
                                                {r.name}
                                            </a>
                                        </Link>
                                        <div className='workspace-type-el'>
                                            {r.publicYn === 'y' && 'Public'}
                                            {r.publicYn === 'n' && 'Private'}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {userRdx?.info?.id === r.masterId &&
                                        <span className='badge'>HOST</span>
                                    }
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