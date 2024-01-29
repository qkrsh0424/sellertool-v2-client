import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 20px;
    border: 1px solid #e0e0e0;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    height: 250px;
`;

export const ContentBox = styled.div`
    height: 100%;
    display: flex;
    align-items: center;

    .button-item{
        margin: 0 auto;
        padding: 0;
        height: 48px;
        border: none;
        background: var(--mainColor);
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        width: 300px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }
`;