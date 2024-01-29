import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 10px 20px;
    background: #f7f7f7e0;
    gap: 10px;

    @media all and (max-width:992px){
        padding: 10px;
    }

    button{
        width: 100px;
        background: var(--grayButtonColor2);
        color: #fff;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 700;
    }

    .button-submit{
        background: var(--mainColor);
        color: #fff;
        font-weight: 700;
    }
`;