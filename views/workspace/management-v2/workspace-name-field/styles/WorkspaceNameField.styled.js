import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 20px;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;

    &:hover{
        .button-box{
            display: block;
        }
    }
    .title-box{
        font-size: 24px;
        font-weight: 600;

    }

    .button-box{
        display: none;
        margin-left: 5px;
    }
    
    .button-el{
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        border: none;
        background: none;

        cursor: pointer;

        &:hover{
            background: #e0e0e060;
        }
    }

    .button-icon-figure{
        position: relative;
        width: 70%;
        height: 70%;
        margin: auto;
        opacity: 0.6;
    }
`;