import styled from 'styled-components';

export const Container = styled.div`
    overflow: hidden;
    padding: 0 30px;
    border-bottom: 1px solid #f1f1f1;
    background: white;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const SelectorBtnBox = styled.div`
    /* float: right; */
    padding:10px 0;

    .button-el{
        padding:10px;
        margin:0;
        border-radius: 10px;
        color:#505050;

        &:hover{
            background: var(--mainColor);
            border: 1px solid var(--mainColor);
            color: white;
        }
    }
`;
export const SelectorBtn = styled.button`
    padding: 5px 10px;

    background: white;
    border: 1px solid #f1f1f1;
    border-radius: 5px;

    cursor: pointer;

    transition: all .3s;

    &:hover{
        background: #309FFF;
        border: 1px solid #309FFF;
        color: white;
    }

    &:active{
        transition: all 0s;
        background: #609FFF;
        border: 1px solid #609FFF;
    }
`;
