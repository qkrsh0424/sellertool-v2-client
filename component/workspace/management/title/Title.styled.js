import styled from 'styled-components';

const Container = styled.div`
    padding: 0 40px;
    margin-top: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;

    .title-box{
        font-size: 20px;
        font-weight: 600;
    }

    .button-box{
        /* margin-left: 5px; */
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
        background: white;

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

export {
    Container,
    Wrapper
}