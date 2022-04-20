import Image from 'next/image';
import styled from 'styled-components';
import { Container, ListFieldWrapper, TitleFieldWrapper } from './WorkspaceList.styled';

function TitleFieldView() {
    return (
        <TitleFieldWrapper>
            <div className='title'>나의 워크스페이스</div>
        </TitleFieldWrapper>
    );
}

const WorkspaceListComponent = (props) => {
    console.log(props.workspaces)
    return (
        <>
            <Container>
                <TitleFieldView />
                <ListFieldWrapper>
                    {props.workspaces?.map(r => {
                        return (
                            <div
                                key={r.id}
                                className='item-box'
                            >
                                <div className='item-icon-figure'>
                                    <Image
                                        className='item-icon-el'
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src='http://localhost:3000/images/icon/default_private_icon.png'
                                        layout='fill'
                                        alt="face icon"
                                    ></Image>
                                </div>
                                <div className='info-box'>
                                    <div>
                                        {r.name}
                                    </div>
                                    <div>
                                        {r.publicYn === 'y' && 'Public'}
                                        {r.publicYn === 'n' && 'Private'}
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