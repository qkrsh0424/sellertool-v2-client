import styled from 'styled-components';
import CustomImage from '../../image/CustomImage';
import CustomBlockButton from '../../buttons/block-button/v1/CustomBlockButton';
import { ChevronLeftIcon } from 'lucide-react';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TitleBox = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const FakeBox = styled.div`
    width: 30px;
    height: 30px;
`;

const BackBox = styled.div`
    button{
        width: 30px;
        height: 30px;
        border-radius: 10px;
        border: none;

        &:hover{
            background: #efefef;
        }

        figure.icon{
            width: 70%;
            height: 70%;
        }
    }
`;

const IconButtonBox = styled.div`
    button{
        width: 30px;
        height: 30px;
        border-radius: 10px;
        border: none;

        &:hover{
            background: #efefef;
        }

        figure.icon{
            width: 80%;
            height: 80%;
        }
    }
`;

function HeaderComponent({
    children,
    ...props
}) {
    return (
        <>
            <Container {...props}>
                {children}
            </Container>
        </>
    );
}

function Back({
    onClick
}) {
    return (
        <BackBox>
            <CustomBlockButton
                type='button'
                onClick={() => (onClick && typeof onClick === 'function') ? onClick() : {}}
            >
                {/* <CustomImage src='/images/icon/close_default_000000.svg' /> */}
                <ChevronLeftIcon />
            </CustomBlockButton>
        </BackBox>
    );
}

function Title({
    children
}) {
    return (
        <TitleBox>
            {children}
        </TitleBox>
    );
}

function Close({
    onClick
}) {
    return (
        <IconButtonBox>
            <CustomBlockButton
                type='button'
                onClick={() => (onClick && typeof onClick === 'function') ? onClick() : {}}
            >
                <CustomImage src='/images/icon/close_default_000000.svg' />
            </CustomBlockButton>
        </IconButtonBox>
    );
}

function IconButton({
    onClick,
    children,
    ...props
}) {
    return (
        <IconButtonBox>
            <CustomBlockButton
                type='button'
                onClick={() => (onClick && typeof onClick === 'function') ? onClick() : {}}
            >
                <figure className='icon'>
                    {children}
                </figure>
            </CustomBlockButton>
        </IconButtonBox>
    );
}

function Fake({ children, ...props }) {
    return (
        <FakeBox {...props}>{children}</FakeBox>
    );
}

export const Header = Object.assign(HeaderComponent, {
    Title: Title,
    Back: Back,
    Close: Close,
    IconButton: IconButton,
    Fake: Fake,
})