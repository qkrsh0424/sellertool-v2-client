import styled from 'styled-components';

const Container = styled.div`
    margin-top: 30px;
`;

const HeadFieldWrapper = styled.div`
    padding: 0 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-el{
        font-size: 24px;
        font-weight: 500;
    }

    .button-el{
        background: #2C73D2;
        border: none;
        padding: 7px 15px;
        margin: 0;
        color: white;

        cursor: pointer;

        &:hover{
            background: #2C73C2;
        }
    }
`;

export {
    Container,
    HeadFieldWrapper
}