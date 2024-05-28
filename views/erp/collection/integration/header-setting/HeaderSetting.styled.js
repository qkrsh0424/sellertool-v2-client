import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px 20px 0 20px;

    @media all and (max-width:992px){
        padding: 20px 10px 0 10px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;

    .button-item{
        padding: 0;
        margin: 0;
        width: 150px;
        height: 48px;
        background: var(--mainColor);
        color: #fff;
        border: none;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        font-size: 14px;
    }
`;