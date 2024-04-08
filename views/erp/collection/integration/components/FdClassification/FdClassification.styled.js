import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 20px;
    margin-top: 20px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-radius: 15px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: var(--defaultBoxShadow);

    @media all and (max-width:992px){
        grid-template-columns: repeat(3, 1fr);
    }

    button{
        border: none;
        color: #606060;
    }

    button.active{
        background-color: var(--mainColor);
        color: #fff;
        font-weight: 700;
    }
`;