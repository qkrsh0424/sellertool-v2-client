import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    bottom:30px;
    right:30px;
    z-index: 30;

    .float-button{
        margin:0;
        padding:0;
        width:64px;
        height: 64px;
        border-radius: 50%;
        background:var(--mainColor);
        border:none;
        box-shadow: var(--defaultBoxShadow);
        
        .icon-figure{
            width: 70%;
            height: 70%;
            margin-left:auto;
            margin-right: auto;
        }
    }
`;